import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    GraduationCap,
    Plus,
    ArrowLeft,
    Save
} from 'lucide-react';

export function AddIntern() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        location: '',
        education: '',
        experience: '',
        skills: '',
        notes: ''
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Adding intern:', formData);
        // Here you would typically send data to your backend
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
                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="text-gray-300 hover:text-white">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Add New Intern</h1>
                        <p className="text-gray-400">Fill in the details to add a new intern to your team</p>
                    </div>
                </div>
            </motion.div>

            {/* Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information Card */}
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        First Name *
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter first name"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Last Name *
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter last name"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address *
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="Enter email address"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <Input
                                        type="tel"
                                        placeholder="Enter phone number"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Date of Birth
                                    </label>
                                    <Input
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Location
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter location"
                                        value={formData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Professional Information Card */}
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <GraduationCap className="w-5 h-5" />
                                Professional Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Education
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter education details"
                                        value={formData.education}
                                        onChange={(e) => handleInputChange('education', e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Experience
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter experience details"
                                        value={formData.experience}
                                        onChange={(e) => handleInputChange('experience', e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Skills
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Enter skills (comma separated)"
                                    value={formData.skills}
                                    onChange={(e) => handleInputChange('skills', e.target.value)}
                                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Additional Notes
                                </label>
                                <textarea
                                    placeholder="Enter any additional notes"
                                    value={formData.notes}
                                    onChange={(e) => handleInputChange('notes', e.target.value)}
                                    className="w-full h-24 px-3 py-2 bg-gray-700 border border-gray-600 rounded-2xl text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center justify-end gap-4 pt-6"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 rounded-2xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-purpleRain hover:bg-purpleRain.hover text-white rounded-2xl gap-2"
                        >
                            <Save className="w-4 h-4" />
                            Add Intern
                        </Button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
} 