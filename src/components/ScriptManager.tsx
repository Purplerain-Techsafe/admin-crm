'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    FileText,
    Plus,
    Search,
    Edit,
    Copy,
    Trash2,
    Eye,
    MessageSquare,
    Clock,
    Save,
    X,
    ArrowUpRight
} from 'lucide-react';

interface Script {
    id: string;
    title: string;
    type: 'first_contact' | 'follow_up' | 'cold_email' | 'linkedin' | 'twitter_dm';
    content: string;
    variables: string[];
    lastUsed: string;
    usageCount: number;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    isActive: boolean;
}

const mockScripts: Script[] = [
    {
        id: '1',
        title: 'Twitter First Contact - Tech Startups',
        type: 'first_contact',
        content: `Hi {{name}},

I noticed your work at {{company}} and was impressed by your approach to {{specific_interest}}. 

I help tech startups like yours optimize their {{pain_point}} processes. Would you be open to a quick 15-minute chat about how we could potentially help {{company}} achieve similar results?

Best regards,
{{sender_name}}`,
        variables: ['name', 'company', 'specific_interest', 'pain_point', 'sender_name'],
        lastUsed: '2024-01-15T10:30:00Z',
        usageCount: 24,
        createdAt: '2024-01-01T09:00:00Z',
        updatedAt: '2024-01-10T14:20:00Z',
        tags: ['twitter', 'first-contact', 'tech', 'b2b'],
        isActive: true
    },
    {
        id: '2',
        title: 'Follow-up After No Response',
        type: 'follow_up',
        content: `Hi {{name}},

I reached out last week about helping {{company}} with {{service_area}}. I understand you're probably busy, so I'll keep this brief.

I recently helped {{similar_company}} achieve {{specific_result}}. If this could be valuable for {{company}}, I'd love to share more details in a quick call.

Would {{preferred_time}} work for a brief chat?

Best,
{{sender_name}}`,
        variables: ['name', 'company', 'service_area', 'similar_company', 'specific_result', 'preferred_time', 'sender_name'],
        lastUsed: '2024-01-14T16:45:00Z',
        usageCount: 18,
        createdAt: '2024-01-02T11:15:00Z',
        updatedAt: '2024-01-12T09:30:00Z',
        tags: ['follow-up', 'persistence', 'results'],
        isActive: true
    },
    {
        id: '3',
        title: 'Cold Email - Enterprise',
        type: 'cold_email',
        content: `Subject: Quick question about {{company}}'s {{department}} strategy

Hi {{name}},

I've been following {{company}}'s growth and noticed you're expanding your {{department}} operations. 

I work with enterprise companies to {{value_proposition}}. We recently helped {{case_study_company}} achieve {{specific_metric}} improvement.

Would you be interested in learning how we could potentially help {{company}} achieve similar results?

I'd be happy to share a quick case study - would {{day}} work for a 15-minute call?

Best regards,
{{sender_name}}
{{title}}
{{company_name}}`,
        variables: ['company', 'department', 'name', 'value_proposition', 'case_study_company', 'specific_metric', 'day', 'sender_name', 'title', 'company_name'],
        lastUsed: '2024-01-13T14:20:00Z',
        usageCount: 31,
        createdAt: '2024-01-01T15:45:00Z',
        updatedAt: '2024-01-11T11:10:00Z',
        tags: ['email', 'enterprise', 'case-study'],
        isActive: true
    },
    {
        id: '4',
        title: 'LinkedIn Connection Message',
        type: 'linkedin',
        content: `Hi {{name}},

I noticed we're both in the {{industry}} space and thought it would be great to connect! I particularly enjoyed your recent post about {{recent_post_topic}}.

I help companies like {{company}} with {{service_area}} and would love to share insights from our industry.

Looking forward to connecting!

Best,
{{sender_name}}`,
        variables: ['name', 'industry', 'recent_post_topic', 'company', 'service_area', 'sender_name'],
        lastUsed: '2024-01-12T09:15:00Z',
        usageCount: 15,
        createdAt: '2024-01-03T10:30:00Z',
        updatedAt: '2024-01-08T16:20:00Z',
        tags: ['linkedin', 'connection', 'industry'],
        isActive: true
    },
    {
        id: '5',
        title: 'Twitter DM - Warm Lead',
        type: 'twitter_dm',
        content: `Hey {{name}}! 👋

Loved your tweet about {{tweet_topic}}. It really resonated with challenges I see at {{industry}} companies.

I actually help businesses like yours with {{solution_area}}. Would you be up for a quick chat about {{specific_benefit}}?

I promise to keep it brief and valuable! 😊

Cheers,
{{sender_name}}`,
        variables: ['name', 'tweet_topic', 'industry', 'solution_area', 'specific_benefit', 'sender_name'],
        lastUsed: '2024-01-11T13:45:00Z',
        usageCount: 12,
        createdAt: '2024-01-04T14:15:00Z',
        updatedAt: '2024-01-09T10:05:00Z',
        tags: ['twitter', 'dm', 'warm', 'casual'],
        isActive: false
    }
];

const scriptTypeLabels = {
    first_contact: 'First Contact',
    follow_up: 'Follow-up',
    cold_email: 'Cold Email',
    linkedin: 'LinkedIn',
    twitter_dm: 'Twitter DM'
};

const scriptTypeColors = {
    first_contact: 'default',
    follow_up: 'secondary',
    cold_email: 'destructive',
    linkedin: 'outline',
    twitter_dm: 'success'
} as const;

export function ScriptManager() {
    const [scripts, setScripts] = useState<Script[]>(mockScripts);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [selectedScript, setSelectedScript] = useState<Script | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Filter scripts
    const filteredScripts = scripts.filter(script => {
        const matchesSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            script.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            script.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesType = typeFilter === 'all' || script.type === typeFilter;

        return matchesSearch && matchesType;
    });

    const handleCreateScript = () => {
        const newScript: Script = {
            id: Date.now().toString(),
            title: 'New Script',
            type: 'first_contact',
            content: 'Hi {{name}},\n\n[Your message here]\n\nBest regards,\n{{sender_name}}',
            variables: ['name', 'sender_name'],
            lastUsed: new Date().toISOString(),
            usageCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: [],
            isActive: true
        };
        setScripts([newScript, ...scripts]);
        setSelectedScript(newScript);
        setIsEditing(true);
    };

    const handleEditScript = (script: Script) => {
        setSelectedScript(script);
        setIsEditing(true);
    };

    const handleDeleteScript = (scriptId: string) => {
        setScripts(scripts.filter(s => s.id !== scriptId));
        if (selectedScript?.id === scriptId) {
            setSelectedScript(null);
            setIsEditing(false);
        }
    };

    const handleCopyScript = (script: Script) => {
        navigator.clipboard.writeText(script.content);
        // You could add a toast notification here
    };

    const handleToggleActive = (scriptId: string) => {
        setScripts(scripts.map(script =>
            script.id === scriptId ? { ...script, isActive: !script.isActive } : script
        ));
    };

    const handleSaveScript = (updatedScript: Script) => {
        setScripts(scripts.map(script =>
            script.id === updatedScript.id
                ? { ...updatedScript, updatedAt: new Date().toISOString() }
                : script
        ));
        setSelectedScript(updatedScript);
        setIsEditing(false);
    };

    const renderVariables = (variables: string[]) => {
        return variables.map(variable => (
            <Badge key={variable} variant="outline" className="text-xs">
                {`{{${variable}}}`}
            </Badge>
        ));
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
                    <h1 className="text-3xl font-bold text-white">Script Manager</h1>
                    <p className="text-gray-400 mt-1">
                        Create and manage outreach templates for your team
                    </p>
                </div>
                <Button
                    onClick={handleCreateScript}
                    className="bg-purpleRain hover:bg-purpleRain.hover text-white rounded-2xl gap-2"
                >
                    <Plus className="w-4 h-4" />
                    New Script
                </Button>
            </motion.div>

            {/* Statistics */}
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
                                <p className="text-gray-400 text-sm">Total Scripts</p>
                                <p className="text-2xl font-bold text-white mt-1">{scripts.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                                <FileText className="w-6 h-6 text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Active Scripts</p>
                                <p className="text-2xl font-bold text-white mt-1">
                                    {scripts.filter(s => s.isActive).length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                                <ArrowUpRight className="w-6 h-6 text-green-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Total Usage</p>
                                <p className="text-2xl font-bold text-white mt-1">
                                    {scripts.reduce((sum, s) => sum + s.usageCount, 0)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-purple-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Avg. Usage</p>
                                <p className="text-2xl font-bold text-white mt-1">
                                    {scripts.length > 0 ? Math.round(scripts.reduce((sum, s) => sum + s.usageCount, 0) / scripts.length) : 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-orange-400" />
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
                            placeholder="Search scripts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="all">All Types</option>
                    {Object.entries(scriptTypeLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </motion.div>

            {/* Scripts Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
                <AnimatePresence>
                    {filteredScripts.map((script) => (
                        <motion.div
                            key={script.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="group"
                        >
                            <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors h-full">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-white text-lg line-clamp-2 mb-2">
                                                {script.title}
                                            </CardTitle>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge
                                                    variant={scriptTypeColors[script.type]}
                                                    className="text-xs"
                                                >
                                                    {scriptTypeLabels[script.type]}
                                                </Badge>
                                                <Badge
                                                    variant={script.isActive ? "default" : "secondary"}
                                                    className="text-xs"
                                                >
                                                    {script.isActive ? "Active" : "Inactive"}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleToggleActive(script.id)}
                                            className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="space-y-3">
                                        <p className="text-gray-300 text-sm line-clamp-3">
                                            {script.content}
                                        </p>

                                        <div className="flex flex-wrap gap-1">
                                            {renderVariables(script.variables.slice(0, 3))}
                                            {script.variables.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{script.variables.length - 3} more
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>Used {script.usageCount} times</span>
                                            <span>Last used {new Date(script.lastUsed).toLocaleDateString()}</span>
                                        </div>

                                        <div className="flex items-center gap-2 pt-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleEditScript(script)}
                                                className="flex-1"
                                            >
                                                <Edit className="w-3 h-3 mr-1" />
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleCopyScript(script)}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleDeleteScript(script.id)}
                                                className="text-gray-400 hover:text-red-400"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredScripts.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-gray-400 text-lg font-medium">No scripts found</h3>
                    <p className="text-gray-500 mt-2">
                        {searchQuery ? 'Try adjusting your search criteria' : 'Create your first script to get started'}
                    </p>
                </motion.div>
            )}

            {/* Edit Modal would go here - simplified for this example */}
            {isEditing && selectedScript && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Edit Script</h2>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setIsEditing(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Title
                                </label>
                                <Input
                                    value={selectedScript.title}
                                    onChange={(e) => setSelectedScript({ ...selectedScript, title: e.target.value })}
                                    className="bg-gray-700 border-gray-600 text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Content
                                </label>
                                <textarea
                                    value={selectedScript.content}
                                    onChange={(e) => setSelectedScript({ ...selectedScript, content: e.target.value })}
                                    className="w-full h-40 px-3 py-2 bg-gray-700 border border-gray-600 rounded-2xl text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button
                                    onClick={() => handleSaveScript(selectedScript)}
                                    className="bg-purpleRain hover:bg-purpleRain.hover text-white flex-1"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Script
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-700 border-gray-600 text-white"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
