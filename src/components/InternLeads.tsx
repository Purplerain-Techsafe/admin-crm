'use client'
import React, { useState, useMemo } from 'react';
import { motion, } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lead, Intern, mockLeads, mockInterns, statusColors } from '@/data/mockLeads';
import {
    Users,
    Search,
    Filter,
    UserCheck,
    Mail,
    Phone,
    Clock,
    TrendingUp,
    ArrowUpRight,
    ChevronDown,
    MoreHorizontal,
    Star,
    MessageCircle,
    Calendar
} from 'lucide-react';

interface InternLeadsProps {
    leads?: Lead[];
    interns?: Intern[];
}

export function InternLeads({ leads = mockLeads, interns = mockInterns }: InternLeadsProps) {
    const [selectedIntern, setSelectedIntern] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Filter leads based on selected intern and filters
    const filteredLeads = useMemo(() => {
        return leads.filter(lead => {
            // Intern filter
            if (selectedIntern !== 'all' && lead.assignedTo !== selectedIntern) {
                return false;
            }

            // Search filter
            if (searchQuery) {
                const searchLower = searchQuery.toLowerCase();
                const matchesSearch =
                    lead.name.toLowerCase().includes(searchLower) ||
                    lead.twitterHandle.toLowerCase().includes(searchLower) ||
                    (lead.company && lead.company.toLowerCase().includes(searchLower));
                if (!matchesSearch) return false;
            }

            // Status filter
            if (statusFilter !== 'all' && lead.status !== statusFilter) {
                return false;
            }

            return lead.assignedTo; // Only show assigned leads
        });
    }, [leads, selectedIntern, searchQuery, statusFilter]);

    // Calculate statistics
    const stats = useMemo(() => {
        const activeInterns = interns.filter(intern => intern.isActive);
        const totalAssignedLeads = leads.filter(lead => lead.assignedTo).length;
        const convertedLeads = leads.filter(lead => lead.status === 'converted' && lead.assignedTo).length;
        const avgConversionRate = activeInterns.length > 0
            ? activeInterns.reduce((sum, intern) => sum + intern.conversionRate, 0) / activeInterns.length
            : 0;

        return {
            activeInterns: activeInterns.length,
            totalAssignedLeads,
            convertedLeads,
            avgConversionRate: Math.round(avgConversionRate)
        };
    }, [leads, interns]);

    const getInternName = (internId: string) => {
        const intern = interns.find(i => i.id === internId);
        return intern ? intern.name : 'Unknown';
    };

    const getInternStats = (internId: string) => {
        const intern = interns.find(i => i.id === internId);
        const internLeads = leads.filter(lead => lead.assignedTo === internId);
        const convertedCount = internLeads.filter(lead => lead.status === 'converted').length;

        return {
            intern: intern || null,
            totalLeads: internLeads.length,
            convertedCount,
            conversionRate: internLeads.length > 0 ? Math.round((convertedCount / internLeads.length) * 100) : 0
        };
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white">Intern Leads</h1>
                    <p className="text-gray-400 mt-1">
                        Manage and monitor leads assigned to your interns
                    </p>
                </div>
            </motion.div>

            {/* Statistics Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
                <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Active Interns</p>
                                <p className="text-2xl font-bold text-white mt-1">{stats.activeInterns}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                                <UserCheck className="w-6 h-6 text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Assigned Leads</p>
                                <p className="text-2xl font-bold text-white mt-1">{stats.totalAssignedLeads}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Converted</p>
                                <p className="text-2xl font-bold text-white mt-1">{stats.convertedLeads}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-green-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Avg. Conversion</p>
                                <p className="text-2xl font-bold text-white mt-1">{stats.avgConversionRate}%</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                                <Star className="w-6 h-6 text-orange-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search leads..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <select
                    value={selectedIntern}
                    onChange={(e) => setSelectedIntern(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="all">All Interns</option>
                    {interns.filter(intern => intern.isActive).map(intern => (
                        <option key={intern.id} value={intern.id}>{intern.name}</option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="responded">Responded</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                </select>
            </motion.div>

            {/* Leads List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Assigned Leads ({filteredLeads.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {filteredLeads.length > 0 ? (
                            <div className="space-y-4">
                                {filteredLeads.map((lead) => {
                                    const internStats = getInternStats(lead.assignedTo!);
                                    return (
                                        <motion.div
                                            key={lead.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-4 bg-gray-700 rounded-2xl border border-gray-600 hover:border-gray-500 transition-colors"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-white font-semibold">{lead.name}</h3>
                                                        <Badge
                                                            variant={statusColors[lead.status] as "default" | "secondary" | "destructive" | "outline"}
                                                            className="capitalize"
                                                        >
                                                            {lead.status}
                                                        </Badge>
                                                        <div className="flex items-center gap-1 text-sm text-gray-400">
                                                            <Star className="w-3 h-3" />
                                                            {lead.engagementScore}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                                                        <span>{lead.twitterHandle}</span>
                                                        {lead.company && <span>• {lead.company}</span>}
                                                        <span>• Assigned to {getInternName(lead.assignedTo!)}</span>
                                                    </div>

                                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            Last contact: {new Date(lead.lastContact).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <TrendingUp className="w-3 h-3" />
                                                            Intern conversion: {internStats.conversionRate}%
                                                        </div>
                                                    </div>

                                                    {lead.notes && (
                                                        <p className="text-sm text-gray-300 mt-2 bg-gray-600 p-2 rounded-lg">
                                                            {lead.notes}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                                        <MessageCircle className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                                        <Calendar className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                <h3 className="text-gray-400 text-lg font-medium">No assigned leads found</h3>
                                <p className="text-gray-500 mt-2">
                                    {selectedIntern !== 'all'
                                        ? `No leads assigned to ${getInternName(selectedIntern)}`
                                        : 'No leads have been assigned to interns yet'
                                    }
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Intern Performance Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            Intern Performance Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {interns.filter(intern => intern.isActive).map(intern => {
                                const internStats = getInternStats(intern.id);
                                return (
                                    <div
                                        key={intern.id}
                                        className="p-4 bg-gray-700 rounded-2xl border border-gray-600"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-white font-medium">{intern.name}</h4>
                                            <Badge
                                                variant={intern.isActive ? "default" : "secondary"}
                                                className="text-xs"
                                            >
                                                {intern.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Assigned Leads:</span>
                                                <span className="text-white">{internStats.totalLeads}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Converted:</span>
                                                <span className="text-white">{internStats.convertedCount}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Conversion Rate:</span>
                                                <span className={`font-medium ${internStats.conversionRate >= 70 ? 'text-green-400' :
                                                    internStats.conversionRate >= 50 ? 'text-yellow-400' : 'text-red-400'
                                                    }`}>
                                                    {internStats.conversionRate}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
