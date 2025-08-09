'use client';

import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { MyLeads } from '@/components/MyLeads';

export default function LeadsPage() {
    return (
        <DashboardLayout activePage="my-leads">
            <MyLeads />
        </DashboardLayout>
    );
}