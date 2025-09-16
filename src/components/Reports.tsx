'use client'
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lead, Intern, mockLeads, mockInterns } from '@/data/mockLeads';
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    Target,
    Calendar,
    Download,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    Clock,
    Mail,
    MessageSquare,
    Star,
    PieChart
} from 'lucide-react';

interface ReportsProps {
    leads?: Lead[];
    interns?: Intern[];
}

interface MetricCard {
    title: string;
    value: string | number;
    change: number;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: React.ReactNode;
    color: string;
}

interface ChartData {
    name: string;
    value: number;
    color: string;
}

export function Reports({ leads = mockLeads, interns = mockInterns }: ReportsProps) {
    const [dateRange, setDateRange] = useState('30d');
    const [selectedMetric, setSelectedMetric] = useState('overview');

    // Calculate metrics
    const metrics = useMemo(() => {
        const totalLeads = leads.length;
        const assignedLeads = leads.filter(lead => lead.assignedTo).length;
        const convertedLeads = leads.filter(lead => lead.status === 'converted').length;
        const qualifiedLeads = leads.filter(lead => lead.status === 'qualified').length;
        const responsedLeads = leads.filter(lead => lead.status === 'responded').length;
        const contactedLeads = leads.filter(lead => lead.status === 'contacted').length;
        const newLeads = leads.filter(lead => lead.status === 'new').length;
        const lostLeads = leads.filter(lead => lead.status === 'lost').length;

        const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
        const responseRate = contactedLeads > 0 ? (responsedLeads / contactedLeads) * 100 : 0;
        const avgEngagementScore = totalLeads > 0 ? leads.reduce((sum, lead) => sum + lead.engagementScore, 0) / totalLeads : 0;

        const activeInterns = interns.filter(intern => intern.isActive).length;
        const avgInternConversion = activeInterns > 0
            ? interns.filter(intern => intern.isActive).reduce((sum, intern) => sum + intern.conversionRate, 0) / activeInterns
            : 0;

        return {
            totalLeads,
            assignedLeads,
            convertedLeads,
            qualifiedLeads,
            responsedLeads,
            contactedLeads,
            newLeads,
            lostLeads,
            conversionRate,
            responseRate,
            avgEngagementScore,
            activeInterns,
            avgInternConversion
        };
    }, [leads, interns]);

    // Mock previous period data for comparison (simplified)
    const previousMetrics = {
        totalLeads: Math.round(metrics.totalLeads * 0.85),
        convertedLeads: Math.round(metrics.convertedLeads * 0.9),
        conversionRate: metrics.conversionRate * 0.92,
        responseRate: metrics.responseRate * 0.88,
        avgEngagementScore: metrics.avgEngagementScore * 0.95
    };

    const metricCards: MetricCard[] = [
        {
            title: 'Total Leads',
            value: metrics.totalLeads,
            change: ((metrics.totalLeads - previousMetrics.totalLeads) / previousMetrics.totalLeads) * 100,
            changeType: 'positive',
            icon: <Users className="w-6 h-6" />,
            color: 'bg-blue-500/20 text-blue-400'
        },
        {
            title: 'Conversion Rate',
            value: `${metrics.conversionRate.toFixed(1)}%`,
            change: ((metrics.conversionRate - previousMetrics.conversionRate) / previousMetrics.conversionRate) * 100,
            changeType: metrics.conversionRate >= previousMetrics.conversionRate ? 'positive' : 'negative',
            icon: <Target className="w-6 h-6" />,
            color: 'bg-green-500/20 text-green-400'
        },
        {
            title: 'Response Rate',
            value: `${metrics.responseRate.toFixed(1)}%`,
            change: ((metrics.responseRate - previousMetrics.responseRate) / previousMetrics.responseRate) * 100,
            changeType: metrics.responseRate >= previousMetrics.responseRate ? 'positive' : 'negative',
            icon: <MessageSquare className="w-6 h-6" />,
            color: 'bg-purple-500/20 text-purple-400'
        },
        {
            title: 'Avg. Engagement',
            value: Math.round(metrics.avgEngagementScore),
            change: ((metrics.avgEngagementScore - previousMetrics.avgEngagementScore) / previousMetrics.avgEngagementScore) * 100,
            changeType: 'positive',
            icon: <Star className="w-6 h-6" />,
            color: 'bg-orange-500/20 text-orange-400'
        }
    ];

    // Chart data for lead status distribution
    const leadStatusData: ChartData[] = [
        { name: 'New', value: metrics.newLeads, color: '#6B7280' },
        { name: 'Contacted', value: metrics.contactedLeads, color: '#3B82F6' },
        { name: 'Responded', value: metrics.responsedLeads, color: '#F59E0B' },
        { name: 'Qualified', value: metrics.qualifiedLeads, color: '#10B981' },
        { name: 'Converted', value: metrics.convertedLeads, color: '#8B5CF6' },
        { name: 'Lost', value: metrics.lostLeads, color: '#EF4444' }
    ];

    // Source distribution
    const sourceData: ChartData[] = [
        { name: 'Twitter Search', value: leads.filter(l => l.source === 'twitter_search').length, color: '#1DA1F2' },
        { name: 'Twitter Engagement', value: leads.filter(l => l.source === 'twitter_engagement').length, color: '#1DA1F2' },
        { name: 'Referral', value: leads.filter(l => l.source === 'referral').length, color: '#10B981' },
        { name: 'Manual', value: leads.filter(l => l.source === 'manual').length, color: '#F59E0B' }
    ];

    const internPerformanceData = interns.filter(intern => intern.isActive).map(intern => {
        const internLeads = leads.filter(lead => lead.assignedTo === intern.id);
        const convertedCount = internLeads.filter(lead => lead.status === 'converted').length;
        return {
            name: intern.name,
            assignedLeads: internLeads.length,
            convertedLeads: convertedCount,
            conversionRate: internLeads.length > 0 ? (convertedCount / internLeads.length) * 100 : 0
        };
    });

    const exportReport = () => {
        const reportData = {
            dateRange,
            generatedAt: new Date().toISOString(),
            metrics,
            leadStatusDistribution: leadStatusData,
            sourceDistribution: sourceData,
            internPerformance: internPerformanceData
        };

        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `crm-report-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const renderChart = (data: ChartData[], title: string) => (
        <div className="space-y-3">
            <h4 className="text-white font-medium">{title}</h4>
            <div className="space-y-2">
                {data.map((item, index) => {
                    const total = data.reduce((sum, d) => sum + d.value, 0);
                    const percentage = total > 0 ? (item.value / total) * 100 : 0;

                    return (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-gray-300 text-sm">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white text-sm font-medium">{item.value}</span>
                                <span className="text-gray-400 text-xs">({percentage.toFixed(1)}%)</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

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
                    <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
                    <p className="text-gray-400 mt-1">
                        Track performance and gain insights into your lead generation
                    </p>
                </div>
                <div className="flex gap-2">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                        <option value="1y">Last year</option>
                    </select>
                    <Button
                        onClick={exportReport}
                        variant="outline"
                        className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 rounded-2xl gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                </div>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {metricCards.map((metric, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">{metric.title}</p>
                                    <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        {metric.changeType === 'positive' ? (
                                            <ArrowUpRight className="w-3 h-3 text-green-400" />
                                        ) : (
                                            <ArrowDownRight className="w-3 h-3 text-red-400" />
                                        )}
                                        <span className={`text-xs font-medium ${metric.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {Math.abs(metric.change).toFixed(1)}%
                                        </span>
                                        <span className="text-xs text-gray-500">vs last period</span>
                                    </div>
                                </div>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${metric.color}`}>
                                    {metric.icon}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            {/* Charts Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                {/* Lead Status Distribution */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <PieChart className="w-5 h-5" />
                            Lead Status Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {renderChart(leadStatusData, '')}
                    </CardContent>
                </Card>

                {/* Lead Sources */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Lead Sources
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {renderChart(sourceData, '')}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Intern Performance */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            Intern Performance Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-left text-gray-400 text-sm font-medium py-3">Intern</th>
                                        <th className="text-left text-gray-400 text-sm font-medium py-3">Assigned Leads</th>
                                        <th className="text-left text-gray-400 text-sm font-medium py-3">Converted</th>
                                        <th className="text-left text-gray-400 text-sm font-medium py-3">Conversion Rate</th>
                                        <th className="text-left text-gray-400 text-sm font-medium py-3">Performance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {internPerformanceData.map((intern, index) => (
                                        <tr key={index} className="border-b border-gray-700 last:border-b-0">
                                            <td className="py-4">
                                                <span className="text-white font-medium">{intern.name}</span>
                                            </td>
                                            <td className="py-4">
                                                <span className="text-gray-300">{intern.assignedLeads}</span>
                                            </td>
                                            <td className="py-4">
                                                <span className="text-gray-300">{intern.convertedLeads}</span>
                                            </td>
                                            <td className="py-4">
                                                <span className={`font-medium ${intern.conversionRate >= 70 ? 'text-green-400' :
                                                    intern.conversionRate >= 50 ? 'text-yellow-400' : 'text-red-400'
                                                    }`}>
                                                    {intern.conversionRate.toFixed(1)}%
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <Badge
                                                    variant={
                                                        intern.conversionRate >= 70 ? "default" :
                                                            intern.conversionRate >= 50 ? "secondary" : "destructive"
                                                    }
                                                    className="text-xs"
                                                >
                                                    {intern.conversionRate >= 70 ? 'Excellent' :
                                                        intern.conversionRate >= 50 ? 'Good' : 'Needs Improvement'}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Recent Activity Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white text-lg">Recent Conversions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {leads.filter(lead => lead.status === 'converted').slice(0, 3).map(lead => (
                                <div key={lead.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white text-sm font-medium">{lead.name}</p>
                                        <p className="text-gray-400 text-xs">{lead.company}</p>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant="default" className="text-xs">Converted</Badge>
                                        <p className="text-gray-400 text-xs mt-1">
                                            {new Date(lead.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white text-lg">Top Performers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {interns
                                .filter(intern => intern.isActive)
                                .sort((a, b) => b.conversionRate - a.conversionRate)
                                .slice(0, 3)
                                .map(intern => (
                                    <div key={intern.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white text-sm font-medium">{intern.name}</p>
                                            <p className="text-gray-400 text-xs">{intern.assignedLeads} leads assigned</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-green-400 text-sm font-medium">
                                                {intern.conversionRate}%
                                            </span>
                                            <p className="text-gray-400 text-xs">conversion</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white text-lg">Action Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                                <div>
                                    <p className="text-white text-sm">Follow up on {metrics.responsedLeads} responded leads</p>
                                    <p className="text-gray-400 text-xs">High priority</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                                <div>
                                    <p className="text-white text-sm">Assign {leads.filter(l => !l.assignedTo).length} unassigned leads</p>
                                    <p className="text-gray-400 text-xs">Medium priority</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                                <div>
                                    <p className="text-white text-sm">Review intern performance metrics</p>
                                    <p className="text-gray-400 text-xs">Low priority</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
