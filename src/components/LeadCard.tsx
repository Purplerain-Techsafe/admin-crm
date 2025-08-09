import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lead, statusColors } from '@/data/mockLeads';
import { Twitter, Mail, Building, User, Calendar, Star } from 'lucide-react';

interface LeadCardProps {
    lead: Lead;
    onAssign?: (leadId: string, internId: string) => void;
    onEdit?: (lead: Lead) => void;
}

export function LeadCard({ lead, onAssign, onEdit }: LeadCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getEngagementColor = (score: number) => {
        if (score >= 90) return 'text-green-400';
        if (score >= 80) return 'text-yellow-400';
        if (score >= 70) return 'text-blue-400';
        return 'text-red-400';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
        >
            <Card className="h-full flex flex-col">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <CardTitle className="text-lg font-semibold text-text mb-1">
                                {lead.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
                                <Twitter className="w-4 h-4" />
                                <span>{lead.twitterHandle}</span>
                            </div>
                            {lead.company && (
                                <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
                                    <Building className="w-4 h-4" />
                                    <span>{lead.company}</span>
                                </div>
                            )}
                        </div>
                        <Badge variant={statusColors[lead.status] as "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info"}>
                            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                    <div className="space-y-3 mb-4">
                        {lead.email && (
                            <div className="flex items-center gap-2 text-text-secondary text-sm">
                                <Mail className="w-4 h-4" />
                                <span className="truncate">{lead.email}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-text-secondary text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>Last contact: {formatDate(lead.lastContact)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-text-secondary text-sm">
                            <Star className={`w-4 h-4 ${getEngagementColor(lead.engagementScore)}`} />
                            <span>Engagement: {lead.engagementScore}/100</span>
                        </div>

                        {lead.assignedTo && (
                            <div className="flex items-center gap-2 text-text-secondary text-sm">
                                <User className="w-4 h-4" />
                                <span>Assigned to: {lead.assignedTo}</span>
                            </div>
                        )}
                    </div>

                    {lead.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                            {lead.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                            {lead.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{lead.tags.length - 3}
                                </Badge>
                            )}
                        </div>
                    )}

                    {lead.notes && (
                        <div className="mb-4">
                            <p className="text-sm text-text-secondary line-clamp-2">
                                {lead.notes}
                            </p>
                        </div>
                    )}

                    <div className="mt-auto flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => onEdit?.(lead)}
                        >
                            Edit
                        </Button>
                        {!lead.assignedTo && (
                            <Button
                                size="sm"
                                className="flex-1"
                                onClick={() => onAssign?.(lead.id, 'intern-1')}
                            >
                                Assign
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
} 