import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Filter, Plus, Download, MoreHorizontal } from 'lucide-react';

// Mock data - replace with real data later
const leadsData = [
    {
        id: 1,
        name: 'Ethan Harper',
        email: 'ethanharper12@gmail.com',
        region: 'Tech Solutions',
        status: 'Contacted',
        lastUpdated: '03-04-2025',
        followUp: '07-04-2025',
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        region: 'Marketing',
        status: 'Negotiation',
        lastUpdated: '02-04-2025',
        followUp: '06-04-2025',
    },
    {
        id: 3,
        name: 'Mike Chen',
        email: 'mike.chen@startup.com',
        region: 'Tech Solutions',
        status: 'Closed',
        lastUpdated: '01-04-2025',
        followUp: '05-04-2025',
    },
    {
        id: 4,
        name: 'Lisa Wong',
        email: 'lisa.wong@enterprise.com',
        region: 'Sales',
        status: 'Prospect',
        lastUpdated: '04-04-2025',
        followUp: '08-04-2025',
    },
];

const statusBadgeVariants = {
    'Contacted': 'bg-orange-100 text-orange-800 border-orange-200',
    'Negotiation': 'bg-red-100 text-red-800 border-red-200',
    'Closed': 'bg-green-100 text-green-800 border-green-200',
    'Prospect': 'bg-blue-100 text-blue-800 border-blue-200',
};

export function MyLeads() {
    const [activeTab, setActiveTab] = useState('all');

    const filteredLeads = activeTab === 'all'
        ? leadsData
        : leadsData.filter(lead => lead.status.toLowerCase() === activeTab);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-2xl font-bold text-white">My Leads</h1>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 rounded-2xl"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                    <Button
                        className="bg-purpleRain hover:bg-purpleRain-hover text-white rounded-2xl"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Leads
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 rounded-2xl"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </motion.div>

            {/* Tabs Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="bg-gray-800 border-gray-700 rounded-2xl p-1">
                        <TabsTrigger
                            value="all"
                            className="data-[state=active]:bg-purpleRain data-[state=active]:text-white text-gray-300 rounded-xl"
                        >
                            All
                        </TabsTrigger>
                        <TabsTrigger
                            value="prospect"
                            className="data-[state=active]:bg-purpleRain data-[state=active]:text-white text-gray-300 rounded-xl"
                        >
                            Prospect
                        </TabsTrigger>
                        <TabsTrigger
                            value="contacted"
                            className="data-[state=active]:bg-purpleRain data-[state=active]:text-white text-gray-300 rounded-xl"
                        >
                            Contacted
                        </TabsTrigger>
                        <TabsTrigger
                            value="negotiation"
                            className="data-[state=active]:bg-purpleRain data-[state=active]:text-white text-gray-300 rounded-xl"
                        >
                            Negotiation
                        </TabsTrigger>
                        <TabsTrigger
                            value="closed"
                            className="data-[state=active]:bg-purpleRain data-[state=active]:text-white text-gray-300 rounded-xl"
                        >
                            Closed
                        </TabsTrigger>
                    </TabsList>

                    {/* Table Content */}
                    <TabsContent value={activeTab} className="mt-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-gray-800 rounded-2xl overflow-hidden"
                        >
                            {/* Table Header with Purple Background */}
                            <div className="bg-purpleRain px-6 py-4">
                                <div className="grid grid-cols-7 gap-4 text-white font-medium">
                                    <div>Name</div>
                                    <div>Email Address</div>
                                    <div>Region</div>
                                    <div>Status</div>
                                    <div>Last Updated</div>
                                    <div>Follow-up</div>
                                    <div>Actions</div>
                                </div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-gray-700">
                                {filteredLeads.map((lead, index) => (
                                    <motion.div
                                        key={lead.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="grid grid-cols-7 gap-4 px-6 py-4 text-white hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="font-medium">{lead.name}</div>
                                        <div className="text-gray-300">{lead.email}</div>
                                        <div className="text-gray-300">{lead.region}</div>
                                        <div>
                                            <Badge
                                                className={`${statusBadgeVariants[lead.status as keyof typeof statusBadgeVariants]} rounded-full`}
                                            >
                                                {lead.status}
                                            </Badge>
                                        </div>
                                        <div className="text-gray-300">{lead.lastUpdated}</div>
                                        <div className="text-gray-300">{lead.followUp}</div>
                                        <div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                                                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                                                        Delete
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                                                        View Details
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    );
}