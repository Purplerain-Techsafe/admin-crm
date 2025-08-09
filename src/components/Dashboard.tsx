import React from 'react';
import { motion } from 'framer-motion';

export function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Welcome Message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-white mb-2">
                    Welcome to your Dashboard
                </h1>
                <p className="text-gray-400">
                    Manage your leads, track performance, and grow your business
                </p>
            </motion.div>

            {/* Placeholder for KPI Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <div className="bg-purpleRain rounded-2xl p-6 shadow-soft">
                    <h3 className="text-white font-semibold mb-2">Total Leads</h3>
                    <p className="text-white/80 text-sm">This Month</p>
                </div>
                <div className="bg-blue-600 rounded-2xl p-6 shadow-soft">
                    <h3 className="text-white font-semibold mb-2">Conversion Rate</h3>
                    <p className="text-white/80 text-sm">This Month</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                    <h3 className="text-gray-900 font-semibold mb-2">Revenue</h3>
                    <p className="text-gray-600 text-sm">This Month</p>
                </div>
            </motion.div>

            {/* Placeholder for Leads Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-800 rounded-2xl p-6 shadow-soft"
            >
                <h2 className="text-2xl font-bold text-white mb-4">My Leads</h2>
                <p className="text-gray-400">
                    Your leads table and management tools will be implemented here.
                </p>
            </motion.div>
        </div>
    );
} 