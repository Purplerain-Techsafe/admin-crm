import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
    children: React.ReactNode;
    activePage?: string;
}

export function DashboardLayout({ children, activePage = 'dashboard' }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <Sidebar activePage={activePage} />

            {/* Main Content Area */}
            <div className="ml-64">
                {/* Header */}
                <Header />

                {/* Page Content */}
                <main className="pt-16 px-6 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
} 