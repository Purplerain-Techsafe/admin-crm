'use client';

import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { InternPerformance } from '@/components/InternPerformance';

export default function InternPerformancePage() {
    return (
        <DashboardLayout activePage="intern-performance">
            <InternPerformance />
        </DashboardLayout>
    );
} 