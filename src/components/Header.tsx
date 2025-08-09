import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Search, Bell, ChevronDown } from 'lucide-react';

export function Header() {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-40"
        >
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search"
                        className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-2xl h-10 focus:ring-2 focus:ring-purpleRain focus:border-transparent"
                    />
                </div>
            </div>

            {/* User Section */}
            <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 rounded-2xl">
                    <Bell className="w-5 h-5" />
                </Button>

                {/* User Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-gray-800 rounded-2xl">
                            <span className="text-sm font-medium">Hi, John</span>
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/placeholder-avatar.jpg" alt="John" />
                                <AvatarFallback className="bg-purpleRain text-white text-sm">
                                    J
                                </AvatarFallback>
                            </Avatar>
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
                        <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </motion.header>
    );
} 