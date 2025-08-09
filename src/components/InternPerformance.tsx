import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    TrendingUp,
    Users,
    Target,
    Award,
    Calendar,
    Filter,
    Download,
    BarChart3,
    Activity,
    Star
} from 'lucide-react';

// Mock data for intern performance
const internPerformanceData = [
    {
        id: 1,
        name: 'Alex Johnson',
        email: 'alex.johnson@company.com',
        leadsAssigned: 45,
        leadsConverted: 12,
        conversionRate: 26.7,
        avgResponseTime: '2.3h',
        lastActive: '2 hours ago',
        status: 'Active',
        performance: 'Excellent'
    },
    {
        id: 2,
        name: 'Maria Garcia',
        email: 'maria.garcia@company.com',
        leadsAssigned: 38,
        leadsConverted: 8,
        conversionRate: 21.1,
        avgResponseTime: '3.1h',
        lastActive: '1 hour ago',
        status: 'Active',
        performance: 'Good'
    },
    {
        id: 3,
        name: 'Tom Chen',
        email: 'tom.chen@company.com',
        leadsAssigned: 52,
        leadsConverted: 15,
        conversionRate: 28.8,
        avgResponseTime: '1.8h',
        lastActive: '30 minutes ago',
        status: 'Active',
        performance: 'Excellent'
    },
    {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        leadsAssigned: 29,
        leadsConverted: 5,
        conversionRate: 17.2,
        avgResponseTime: '4.2h',
        lastActive: '3 hours ago',
        status: 'Inactive',
        performance: 'Needs Improvement'
    }
];

const performanceColors = {
    'Excellent': 'bg-green-100 text-green-800 border-green-200',
    'Good': 'bg-blue-100 text-blue-800 border-blue-200',
    'Needs Improvement': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Poor': 'bg-red-100 text-red-800 border-red-200'
};

const statusColors = {
    'Active': 'bg-green-500',
    'Inactive': 'bg-gray-500'
};

export function InternPerformance() {
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-2xl font-bold text-white">Intern Performance</h1>
                    <p className="text-gray-400">Track and analyze your intern team&apos;s performance</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 rounded-2xl"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 rounded-2xl"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </Button>
                </div>
            </motion.div>

            {/* Performance Overview Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <Card className="bg-purpleRain border-purpleRain">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/80 text-sm">Total Interns</p>
                                <p className="text-white text-2xl font-bold">12</p>
                            </div>
                            <Users className="w-8 h-8 text-white/80" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-blue-600 border-blue-600">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/80 text-sm">Avg Conversion Rate</p>
                                <p className="text-white text-2xl font-bold">23.4%</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-white/80" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-green-600 border-green-600">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/80 text-sm">Total Leads</p>
                                <p className="text-white text-2xl font-bold">164</p>
                            </div>
                            <Target className="w-8 h-8 text-white/80" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Avg Response Time</p>
                                <p className="text-gray-900 text-2xl font-bold">2.8h</p>
                            </div>
                            <Activity className="w-8 h-8 text-gray-600" />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Performance Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-800 rounded-2xl overflow-hidden"
            >
                {/* Table Header */}
                <div className="bg-purpleRain px-6 py-4">
                    <div className="grid grid-cols-8 gap-4 text-white font-medium">
                        <div>Intern</div>
                        <div>Leads Assigned</div>
                        <div>Converted</div>
                        <div>Conversion Rate</div>
                        <div>Avg Response</div>
                        <div>Last Active</div>
                        <div>Performance</div>
                        <div>Actions</div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-700">
                    {internPerformanceData.map((intern, index) => (
                        <motion.div
                            key={intern.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="grid grid-cols-8 gap-4 px-6 py-4 text-white hover:bg-gray-700 transition-colors"
                        >
                            <div>
                                <div className="font-medium">{intern.name}</div>
                                <div className="text-gray-400 text-sm">{intern.email}</div>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium">{intern.leadsAssigned}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium text-green-400">{intern.leadsConverted}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium">{intern.conversionRate}%</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-300">{intern.avgResponseTime}</span>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${statusColors[intern.status as keyof typeof statusColors]}`}></div>
                                    <span className="text-gray-300">{intern.lastActive}</span>
                                </div>
                            </div>
                            <div>
                                <Badge
                                    className={`${performanceColors[intern.performance as keyof typeof performanceColors]} rounded-full`}
                                >
                                    {intern.performance}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <BarChart3 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Star className="h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Performance Charts Placeholder */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">Conversion Rate Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 bg-gray-700 rounded-2xl flex items-center justify-center">
                            <div className="text-center text-gray-400">
                                <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                                <p>Chart will be implemented here</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">Response Time Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 bg-gray-700 rounded-2xl flex items-center justify-center">
                            <div className="text-center text-gray-400">
                                <Activity className="w-12 h-12 mx-auto mb-4" />
                                <p>Chart will be implemented here</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
} 