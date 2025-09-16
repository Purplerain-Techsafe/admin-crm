import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Settings as SettingsIcon,
    User,
    Bell,
    Shield,
    Database,
    Palette,
    Globe,
    Mail,
    Phone,
    Save,
    Key,
    Eye,
    EyeOff,
    Check,
    X,
    AlertTriangle,
    Trash2,
    Upload,
    Download
} from 'lucide-react';

interface SettingsSection {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
}

const settingsSections: SettingsSection[] = [
    {
        id: 'profile',
        title: 'Profile Settings',
        icon: <User className="w-5 h-5" />,
        description: 'Manage your personal information and preferences'
    },
    {
        id: 'notifications',
        title: 'Notifications',
        icon: <Bell className="w-5 h-5" />,
        description: 'Configure notification preferences and alerts'
    },
    {
        id: 'security',
        title: 'Security',
        icon: <Shield className="w-5 h-5" />,
        description: 'Security settings and password management'
    },
    {
        id: 'integrations',
        title: 'Integrations',
        icon: <Globe className="w-5 h-5" />,
        description: 'Connect external services and APIs'
    },
    {
        id: 'data',
        title: 'Data & Export',
        icon: <Database className="w-5 h-5" />,
        description: 'Data management and export options'
    },
    {
        id: 'appearance',
        title: 'Appearance',
        icon: <Palette className="w-5 h-5" />,
        description: 'Customize the look and feel of your dashboard'
    }
];

export function Settings() {
    const [activeSection, setActiveSection] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    // Profile settings state
    const [profileData, setProfileData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        phone: '+1 (555) 123-4567',
        company: 'PurpleRain CRM',
        role: 'Sales Manager',
        timezone: 'UTC-5',
        language: 'English'
    });

    // Notification settings state
    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        newLeads: true,
        leadResponses: true,
        internUpdates: true,
        weeklyReports: true,
        systemAlerts: true,
        marketingEmails: false
    });

    // Security settings state
    const [securitySettings, setSecuritySettings] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: false,
        sessionTimeout: '30',
        loginAlerts: true
    });

    // Integration settings state
    const [integrationSettings, setIntegrationSettings] = useState({
        twitterApi: {
            connected: true,
            apiKey: 'tw_••••••••••••••',
            lastSync: '2024-01-15T10:30:00Z'
        },
        linkedinApi: {
            connected: false,
            apiKey: '',
            lastSync: null
        },
        emailProvider: {
            connected: true,
            provider: 'Gmail',
            email: 'john.doe@company.com'
        },
        webhooks: {
            enabled: true,
            url: 'https://api.company.com/webhooks/crm',
            secret: 'wh_••••••••••••••'
        }
    });

    // Appearance settings state
    const [appearanceSettings, setAppearanceSettings] = useState({
        theme: 'dark',
        accentColor: 'purple',
        compactMode: false,
        sidebarCollapsed: false,
        animations: true
    });

    const handleProfileChange = (field: string, value: string) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
        setUnsavedChanges(true);
    };

    const handleNotificationChange = (field: string, value: boolean) => {
        setNotificationSettings(prev => ({ ...prev, [field]: value }));
        setUnsavedChanges(true);
    };

    const handleSecurityChange = (field: string, value: string | boolean) => {
        setSecuritySettings(prev => ({ ...prev, [field]: value }));
        setUnsavedChanges(true);
    };

    const handleSaveSettings = () => {
        // Mock save functionality
        console.log('Saving settings...', {
            profile: profileData,
            notifications: notificationSettings,
            security: securitySettings,
            integrations: integrationSettings,
            appearance: appearanceSettings
        });
        setUnsavedChanges(false);
    };

    const renderProfileSettings = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                    </label>
                    <Input
                        value={profileData.firstName}
                        onChange={(e) => handleProfileChange('firstName', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                    </label>
                    <Input
                        value={profileData.lastName}
                        onChange={(e) => handleProfileChange('lastName', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                    </label>
                    <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                    </label>
                    <Input
                        value={profileData.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                    </label>
                    <Input
                        value={profileData.company}
                        onChange={(e) => handleProfileChange('company', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Role
                    </label>
                    <Input
                        value={profileData.role}
                        onChange={(e) => handleProfileChange('role', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Timezone
                    </label>
                    <select
                        value={profileData.timezone}
                        onChange={(e) => handleProfileChange('timezone', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-7">Mountain Time (UTC-7)</option>
                        <option value="UTC-6">Central Time (UTC-6)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">UTC</option>
                        <option value="UTC+1">Central European Time (UTC+1)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Language
                    </label>
                    <select
                        value={profileData.language}
                        onChange={(e) => handleProfileChange('language', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderNotificationSettings = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Notification Channels</h3>
                <div className="space-y-3">
                    {[
                        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                        { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive browser push notifications' }
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-700 rounded-2xl">
                            <div>
                                <p className="text-white font-medium">{item.label}</p>
                                <p className="text-gray-400 text-sm">{item.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                                    onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Event Notifications</h3>
                <div className="space-y-3">
                    {[
                        { key: 'newLeads', label: 'New Leads', description: 'When new leads are added to the system' },
                        { key: 'leadResponses', label: 'Lead Responses', description: 'When leads respond to outreach' },
                        { key: 'internUpdates', label: 'Intern Updates', description: 'Updates about intern performance' },
                        { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly performance summaries' },
                        { key: 'systemAlerts', label: 'System Alerts', description: 'Important system notifications' }
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-700 rounded-2xl">
                            <div>
                                <p className="text-white font-medium">{item.label}</p>
                                <p className="text-gray-400 text-sm">{item.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                                    onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSecuritySettings = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Change Password</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Current Password
                        </label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={securitySettings.currentPassword}
                                onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            New Password
                        </label>
                        <Input
                            type="password"
                            value={securitySettings.newPassword}
                            onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Confirm New Password
                        </label>
                        <Input
                            type="password"
                            value={securitySettings.confirmPassword}
                            onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Security Options</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-2xl">
                        <div>
                            <p className="text-white font-medium">Two-Factor Authentication</p>
                            <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={securitySettings.twoFactorEnabled}
                                onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-2xl">
                        <div>
                            <p className="text-white font-medium">Login Alerts</p>
                            <p className="text-gray-400 text-sm">Get notified of new login attempts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={securitySettings.loginAlerts}
                                onChange={(e) => handleSecurityChange('loginAlerts', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                    </div>

                    <div className="p-4 bg-gray-700 rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-white font-medium">Session Timeout</p>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">Automatically log out after inactivity</p>
                        <select
                            value={securitySettings.sessionTimeout}
                            onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                            <option value="480">8 hours</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderIntegrationSettings = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Twitter API */}
                <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm font-bold">T</span>
                            </div>
                            Twitter API
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Status:</span>
                                <Badge variant={integrationSettings.twitterApi.connected ? "default" : "secondary"}>
                                    {integrationSettings.twitterApi.connected ? "Connected" : "Disconnected"}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">API Key:</span>
                                <span className="text-gray-400 font-mono text-sm">{integrationSettings.twitterApi.apiKey}</span>
                            </div>
                            {integrationSettings.twitterApi.lastSync && (
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Last Sync:</span>
                                    <span className="text-gray-400 text-sm">
                                        {new Date(integrationSettings.twitterApi.lastSync).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                            <Button
                                size="sm"
                                variant={integrationSettings.twitterApi.connected ? "destructive" : "default"}
                                className="w-full"
                            >
                                {integrationSettings.twitterApi.connected ? "Disconnect" : "Connect"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* LinkedIn API */}
                <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm font-bold">in</span>
                            </div>
                            LinkedIn API
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Status:</span>
                                <Badge variant={integrationSettings.linkedinApi.connected ? "default" : "secondary"}>
                                    {integrationSettings.linkedinApi.connected ? "Connected" : "Disconnected"}
                                </Badge>
                            </div>
                            <Button
                                size="sm"
                                variant="default"
                                className="w-full"
                            >
                                Connect LinkedIn
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Email Provider */}
                <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            Email Provider
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Provider:</span>
                                <span className="text-white">{integrationSettings.emailProvider.provider}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Email:</span>
                                <span className="text-gray-400 text-sm">{integrationSettings.emailProvider.email}</span>
                            </div>
                            <Button size="sm" variant="outline" className="w-full">
                                Reconfigure
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Webhooks */}
                <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            Webhooks
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Status:</span>
                                <Badge variant={integrationSettings.webhooks.enabled ? "default" : "secondary"}>
                                    {integrationSettings.webhooks.enabled ? "Enabled" : "Disabled"}
                                </Badge>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">Webhook URL:</label>
                                <Input
                                    value={integrationSettings.webhooks.url}
                                    className="bg-gray-600 border-gray-500 text-white text-sm"
                                    readOnly
                                />
                            </div>
                            <Button size="sm" variant="outline" className="w-full">
                                Test Webhook
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    const renderDataSettings = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            Export Data
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300 text-sm mb-4">
                            Download your data in various formats for backup or migration purposes.
                        </p>
                        <div className="space-y-2">
                            <Button size="sm" variant="outline" className="w-full justify-start">
                                <Download className="w-4 h-4 mr-2" />
                                Export Leads (CSV)
                            </Button>
                            <Button size="sm" variant="outline" className="w-full justify-start">
                                <Download className="w-4 h-4 mr-2" />
                                Export Scripts (JSON)
                            </Button>
                            <Button size="sm" variant="outline" className="w-full justify-start">
                                <Download className="w-4 h-4 mr-2" />
                                Export Reports (PDF)
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Import Data
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300 text-sm mb-4">
                            Import leads and other data from external sources.
                        </p>
                        <div className="space-y-2">
                            <Button size="sm" variant="outline" className="w-full justify-start">
                                <Upload className="w-4 h-4 mr-2" />
                                Import Leads (CSV)
                            </Button>
                            <Button size="sm" variant="outline" className="w-full justify-start">
                                <Upload className="w-4 h-4 mr-2" />
                                Import Contacts (vCard)
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-red-900/20 border-red-800">
                <CardHeader>
                    <CardTitle className="text-red-400 text-lg flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Danger Zone
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-white font-medium mb-2">Delete All Data</h4>
                            <p className="text-gray-300 text-sm mb-3">
                                Permanently delete all leads, scripts, and reports. This action cannot be undone.
                            </p>
                            <Button size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete All Data
                            </Button>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-2">Delete Account</h4>
                            <p className="text-gray-300 text-sm mb-3">
                                Permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                            <Button size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderAppearanceSettings = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { value: 'dark', label: 'Dark', description: 'Dark theme (current)' },
                        { value: 'light', label: 'Light', description: 'Light theme' },
                        { value: 'auto', label: 'Auto', description: 'Follow system preference' }
                    ].map((theme) => (
                        <div
                            key={theme.value}
                            className={`p-4 border-2 rounded-2xl cursor-pointer transition-colors ${appearanceSettings.theme === theme.value
                                    ? 'border-purple-500 bg-purple-500/10'
                                    : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                                }`}
                            onClick={() => setAppearanceSettings(prev => ({ ...prev, theme: theme.value }))}
                        >
                            <h4 className="text-white font-medium">{theme.label}</h4>
                            <p className="text-gray-400 text-sm">{theme.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Accent Color</h3>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {[
                        { value: 'purple', color: 'bg-purple-500' },
                        { value: 'blue', color: 'bg-blue-500' },
                        { value: 'green', color: 'bg-green-500' },
                        { value: 'red', color: 'bg-red-500' },
                        { value: 'orange', color: 'bg-orange-500' },
                        { value: 'yellow', color: 'bg-yellow-500' },
                        { value: 'pink', color: 'bg-pink-500' },
                        { value: 'indigo', color: 'bg-indigo-500' }
                    ].map((color) => (
                        <div
                            key={color.value}
                            className={`w-12 h-12 rounded-2xl cursor-pointer border-2 transition-all ${color.color} ${appearanceSettings.accentColor === color.value
                                    ? 'border-white scale-110'
                                    : 'border-gray-600 hover:border-gray-400'
                                }`}
                            onClick={() => setAppearanceSettings(prev => ({ ...prev, accentColor: color.value }))}
                        >
                            {appearanceSettings.accentColor === color.value && (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Display Options</h3>
                <div className="space-y-3">
                    {[
                        { key: 'compactMode', label: 'Compact Mode', description: 'Reduce spacing for more content' },
                        { key: 'sidebarCollapsed', label: 'Collapsed Sidebar', description: 'Start with sidebar collapsed' },
                        { key: 'animations', label: 'Animations', description: 'Enable smooth animations and transitions' }
                    ].map((option) => (
                        <div key={option.key} className="flex items-center justify-between p-4 bg-gray-700 rounded-2xl">
                            <div>
                                <p className="text-white font-medium">{option.label}</p>
                                <p className="text-gray-400 text-sm">{option.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={appearanceSettings[option.key as keyof typeof appearanceSettings] as boolean}
                                    onChange={(e) => setAppearanceSettings(prev => ({ ...prev, [option.key]: e.target.checked }))}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'profile':
                return renderProfileSettings();
            case 'notifications':
                return renderNotificationSettings();
            case 'security':
                return renderSecuritySettings();
            case 'integrations':
                return renderIntegrationSettings();
            case 'data':
                return renderDataSettings();
            case 'appearance':
                return renderAppearanceSettings();
            default:
                return renderProfileSettings();
        }
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
                    <h1 className="text-3xl font-bold text-white">Settings</h1>
                    <p className="text-gray-400 mt-1">
                        Manage your account preferences and application settings
                    </p>
                </div>
                {unsavedChanges && (
                    <Button
                        onClick={handleSaveSettings}
                        className="bg-purpleRain hover:bg-purpleRain.hover text-white rounded-2xl gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </Button>
                )}
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Settings Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="lg:w-80"
                >
                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-6">
                            <nav className="space-y-2">
                                {settingsSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full text-left p-3 rounded-2xl transition-colors ${activeSection === section.id
                                                ? 'bg-purpleRain text-white'
                                                : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {section.icon}
                                            <div>
                                                <p className="font-medium">{section.title}</p>
                                                <p className="text-xs opacity-80">{section.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </nav>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Settings Content */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-1"
                >
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                {settingsSections.find(s => s.id === activeSection)?.icon}
                                {settingsSections.find(s => s.id === activeSection)?.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {renderSectionContent()}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
