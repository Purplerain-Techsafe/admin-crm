import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';


interface FilterBarProps {
    onFilterChange: (filters: FilterState) => void;
    totalLeads: number;
    filteredCount: number;
}

export interface FilterState {
    search: string;
    status: string[];
    source: string[];
    assignedTo: string[];
    engagementMin: number;
    engagementMax: number;
}

const statusOptions = ['new', 'contacted', 'responded', 'qualified', 'converted', 'lost'];
const sourceOptions = ['twitter_search', 'twitter_engagement', 'referral', 'manual'];

export function FilterBar({ onFilterChange, totalLeads, filteredCount }: FilterBarProps) {
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        status: [],
        source: [],
        assignedTo: [],
        engagementMin: 0,
        engagementMax: 100
    });

    const [isExpanded, setIsExpanded] = useState(false);

    const handleFilterChange = (newFilters: Partial<FilterState>) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const toggleStatus = (status: string) => {
        const newStatus = filters.status.includes(status)
            ? filters.status.filter(s => s !== status)
            : [...filters.status, status];
        handleFilterChange({ status: newStatus });
    };

    const toggleSource = (source: string) => {
        const newSource = filters.source.includes(source)
            ? filters.source.filter(s => s !== source)
            : [...filters.source, source];
        handleFilterChange({ source: newSource });
    };

    const clearFilters = () => {
        const clearedFilters = {
            search: '',
            status: [],
            source: [],
            assignedTo: [],
            engagementMin: 0,
            engagementMax: 100
        };
        setFilters(clearedFilters);
        onFilterChange(clearedFilters);
    };

    const hasActiveFilters = filters.search || filters.status.length > 0 || filters.source.length > 0 || filters.assignedTo.length > 0;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
                    <Input
                        placeholder="Search leads by name, company, or Twitter handle..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange({ search: e.target.value })}
                        className="pl-10"
                    />
                </div>
                <Button
                    variant="outline"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2"
                >
                    <Filter className="w-4 h-4" />
                    Filters
                    {hasActiveFilters && (
                        <Badge variant="default" className="ml-1">
                            {filters.status.length + filters.source.length + filters.assignedTo.length}
                        </Badge>
                    )}
                </Button>
                {hasActiveFilters && (
                    <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Clear
                    </Button>
                )}
            </div>

            <div className="text-sm text-text-secondary">
                Showing {filteredCount} of {totalLeads} leads
            </div>

            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 p-4 bg-background-secondary rounded-2xl border border-gray-600"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Status Filter */}
                        <div>
                            <h4 className="font-medium text-text mb-2">Status</h4>
                            <div className="flex flex-wrap gap-2">
                                {statusOptions.map((status) => (
                                    <Badge
                                        key={status}
                                        variant={filters.status.includes(status) ? "default" : "outline"}
                                        className="cursor-pointer transition-colors"
                                        onClick={() => toggleStatus(status)}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Source Filter */}
                        <div>
                            <h4 className="font-medium text-text mb-2">Source</h4>
                            <div className="flex flex-wrap gap-2">
                                {sourceOptions.map((source) => (
                                    <Badge
                                        key={source}
                                        variant={filters.source.includes(source) ? "default" : "outline"}
                                        className="cursor-pointer transition-colors"
                                        onClick={() => toggleSource(source)}
                                    >
                                        {source.replace('_', ' ').charAt(0).toUpperCase() + source.replace('_', ' ').slice(1)}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Engagement Range */}
                        <div>
                            <h4 className="font-medium text-text mb-2">Engagement Score</h4>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.engagementMin}
                                    onChange={(e) => handleFilterChange({ engagementMin: parseInt(e.target.value) || 0 })}
                                    className="w-20"
                                />
                                <span className="text-text-secondary">-</span>
                                <Input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.engagementMax}
                                    onChange={(e) => handleFilterChange({ engagementMax: parseInt(e.target.value) || 100 })}
                                    className="w-20"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
} 