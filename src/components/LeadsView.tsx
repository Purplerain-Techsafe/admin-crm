import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LeadCard } from './LeadCard';
import { FilterBar, FilterState } from './FilterBar';
import { Button } from '@/components/ui/button';
import { Lead } from '@/data/mockLeads';
import { ChevronLeft, ChevronRight, Download, Plus } from 'lucide-react';

interface LeadsViewProps {
    leads: Lead[];
    onAssignLead?: (leadId: string, internId: string) => void;
    onEditLead?: (lead: Lead) => void;
}

const ITEMS_PER_PAGE = 12;

export function LeadsView({ leads, onAssignLead, onEditLead }: LeadsViewProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        status: [],
        source: [],
        assignedTo: [],
        engagementMin: 0,
        engagementMax: 100
    });

    // Filter leads based on current filters
    const filteredLeads = useMemo(() => {
        return leads.filter(lead => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    lead.name.toLowerCase().includes(searchLower) ||
                    lead.twitterHandle.toLowerCase().includes(searchLower) ||
                    (lead.company && lead.company.toLowerCase().includes(searchLower)) ||
                    (lead.email && lead.email.toLowerCase().includes(searchLower));

                if (!matchesSearch) return false;
            }

            // Status filter
            if (filters.status.length > 0 && !filters.status.includes(lead.status)) {
                return false;
            }

            // Source filter
            if (filters.source.length > 0 && !filters.source.includes(lead.source)) {
                return false;
            }

            // Assigned to filter
            if (filters.assignedTo.length > 0 && !filters.assignedTo.includes(lead.assignedTo || '')) {
                return false;
            }

            // Engagement score filter
            if (lead.engagementScore < filters.engagementMin || lead.engagementScore > filters.engagementMax) {
                return false;
            }

            return true;
        });
    }, [leads, filters]);

    // Pagination
    const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentLeads = filteredLeads.slice(startIndex, endIndex);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page when filters change
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const exportLeads = () => {
        // Mock export functionality
        const csvContent = [
            ['Name', 'Twitter Handle', 'Email', 'Company', 'Status', 'Engagement Score', 'Last Contact'],
            ...filteredLeads.map(lead => [
                lead.name,
                lead.twitterHandle,
                lead.email || '',
                lead.company || '',
                lead.status,
                lead.engagementScore.toString(),
                new Date(lead.lastContact).toLocaleDateString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text">Leads Management</h1>
                    <p className="text-text-secondary mt-1">
                        Manage and track all your Twitter-based leads
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={exportLeads} className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                    <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Lead
                    </Button>
                </div>
            </div>

            {/* Filter Bar */}
            <FilterBar
                onFilterChange={handleFilterChange}
                totalLeads={leads.length}
                filteredCount={filteredLeads.length}
            />

            {/* Leads Grid */}
            {currentLeads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="wait">
                        {currentLeads.map((lead) => (
                            <motion.div
                                key={lead.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <LeadCard
                                    lead={lead}
                                    onAssign={onAssignLead}
                                    onEdit={onEditLead}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <div className="text-text-secondary text-lg">
                        {filters.search || filters.status.length > 0 || filters.source.length > 0
                            ? "No leads match your current filters"
                            : "No leads found"}
                    </div>
                    <p className="text-text-secondary mt-2">
                        Try adjusting your filters or add new leads
                    </p>
                </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </Button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === currentPage ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePageChange(page)}
                                className="w-8 h-8 p-0"
                            >
                                {page}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
} 