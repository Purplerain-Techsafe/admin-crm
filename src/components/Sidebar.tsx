import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Users,
    UserCheck,
    FileText,
    TrendingUp,
    BarChart3,
    Settings,
    Plus,
    MessageSquare
} from 'lucide-react';

interface SidebarProps {
    activePage?: string;
}

const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { id: 'my-leads', label: 'My Leads', icon: Users, href: '/leads' },
    { id: 'intern-leads', label: 'Intern Leads', icon: UserCheck, href: '/intern-leads' },
    { id: 'script-manager', label: 'Script Manager', icon: FileText, href: '/script-manager' },
    { id: 'intern-performance', label: 'Intern Performance', icon: TrendingUp, href: '/intern-performance' },
    { id: 'intern-feedback', label: 'Intern Feedback', icon: MessageSquare, href: '/intern-feedback' },
    { id: 'reports', label: 'Reports', icon: BarChart3, href: '/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

export function Sidebar({ activePage = 'dashboard' }: SidebarProps) {
    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col fixed left-0 top-0 z-50"
        >
            {/* PurpleRain Branding */}
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purpleRain rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">P</span>
                    </div>
                    <span className="text-white font-semibold text-xl">PurpleRain</span>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4 space-y-2">
                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;

                    return (
                        <Link href={item.href} key={item.id}>
                            <Button
                                variant={isActive ? "default" : "ghost"}
                                className={`w-full justify-start gap-3 h-12 rounded-2xl transition-all duration-200 ${isActive
                                    ? 'bg-purpleRain text-white shadow-soft'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Button>
                        </Link>
                    );
                })}
            </nav>

            {/* Add Intern Button */}
            <div className="p-4 border-t border-gray-800">
                <Link href="/add-intern">
                    <Button
                        className="w-full bg-purpleRain hover:bg-purpleRain.hover text-white shadow-soft hover:shadow-soft-hover rounded-2xl h-12 gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Intern
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
} 