import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    MessageSquare,
    Star,
    Send,
    Filter,
    Calendar,
    User,
    ThumbsUp,
    ThumbsDown,
    Plus,
    Search
} from 'lucide-react';

// Mock data for feedback
const feedbackData = [
    {
        id: 1,
        internName: 'Alex Johnson',
        internEmail: 'alex.johnson@company.com',
        feedback: 'Alex has shown excellent communication skills and consistently meets deadlines. Great team player!',
        rating: 5,
        category: 'Communication',
        date: '2024-01-15',
        status: 'Submitted',
        type: 'Positive'
    },
    {
        id: 2,
        internName: 'Maria Garcia',
        internEmail: 'maria.garcia@company.com',
        feedback: 'Maria needs to improve her response time to leads. Consider additional training on lead management.',
        rating: 3,
        category: 'Performance',
        date: '2024-01-14',
        status: 'In Review',
        type: 'Constructive'
    },
    {
        id: 3,
        internName: 'Tom Chen',
        internEmail: 'tom.chen@company.com',
        feedback: 'Tom demonstrates exceptional problem-solving skills and has a great attitude towards learning.',
        rating: 5,
        category: 'Skills',
        date: '2024-01-13',
        status: 'Submitted',
        type: 'Positive'
    },
    {
        id: 4,
        internName: 'Sarah Wilson',
        internEmail: 'sarah.wilson@company.com',
        feedback: 'Sarah needs more guidance on our CRM system. Recommend pairing with a senior intern.',
        rating: 2,
        category: 'Training',
        date: '2024-01-12',
        status: 'Action Required',
        type: 'Constructive'
    }
];

const feedbackColors = {
    'Positive': 'bg-green-100 text-green-800 border-green-200',
    'Constructive': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Critical': 'bg-red-100 text-red-800 border-red-200'
};

const statusColors = {
    'Submitted': 'bg-blue-500',
    'In Review': 'bg-yellow-500',
    'Action Required': 'bg-red-500',
    'Completed': 'bg-green-500'
};

export function InternFeedback() {
    const [selectedIntern, setSelectedIntern] = useState('');
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmitFeedback = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting feedback:', { selectedIntern, rating, feedback, category });
        // Reset form
        setSelectedIntern('');
        setRating(0);
        setFeedback('');
        setCategory('');
    };

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
                    <h1 className="text-2xl font-bold text-white">Intern Feedback</h1>
                    <p className="text-gray-400">Provide feedback and track intern development</p>
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
                        className="bg-purpleRain hover:bg-purpleRain.hover text-white rounded-2xl gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        New Feedback
                    </Button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Feedback Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" />
                                Submit New Feedback
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmitFeedback} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Select Intern
                                    </label>
                                    <select
                                        value={selectedIntern}
                                        onChange={(e) => setSelectedIntern(e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Choose an intern...</option>
                                        <option value="alex">Alex Johnson</option>
                                        <option value="maria">Maria Garcia</option>
                                        <option value="tom">Tom Chen</option>
                                        <option value="sarah">Sarah Wilson</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select category...</option>
                                        <option value="communication">Communication</option>
                                        <option value="performance">Performance</option>
                                        <option value="skills">Skills</option>
                                        <option value="training">Training</option>
                                        <option value="attitude">Attitude</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Rating
                                    </label>
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className={`p-1 rounded-full transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-400'
                                                    }`}
                                            >
                                                <Star className="w-6 h-6 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Feedback
                                    </label>
                                    <textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Provide detailed feedback..."
                                        className="w-full h-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded-2xl text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-purpleRain hover:bg-purpleRain.hover text-white rounded-2xl gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    Submit Feedback
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Feedback History */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Recent Feedback
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {feedbackData.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="bg-gray-700 rounded-2xl p-4 space-y-3"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <span className="font-medium text-white">{item.internName}</span>
                                            </div>
                                            <Badge
                                                className={`${feedbackColors[item.type as keyof typeof feedbackColors]} rounded-full`}
                                            >
                                                {item.type}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-4 h-4 ${star <= item.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-gray-400 text-sm">{item.category}</span>
                                        </div>

                                        <p className="text-gray-300 text-sm">{item.feedback}</p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-xs">{item.date}</span>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${statusColors[item.status as keyof typeof statusColors]}`}></div>
                                                <span className="text-gray-400 text-xs">{item.status}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Feedback Analytics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Total Feedback</p>
                                <p className="text-white text-2xl font-bold">24</p>
                            </div>
                            <MessageSquare className="w-8 h-8 text-purpleRain" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Avg Rating</p>
                                <p className="text-white text-2xl font-bold">4.2</p>
                            </div>
                            <Star className="w-8 h-8 text-yellow-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">This Month</p>
                                <p className="text-white text-2xl font-bold">8</p>
                            </div>
                            <Calendar className="w-8 h-8 text-blue-400" />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
} 