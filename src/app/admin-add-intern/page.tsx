'use client';

import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { AdminAddIntern } from '@/components/AdminAddIntern';

export default function AdminAddInternPage() {
    return (
        <DashboardLayout activePage="admin-add-intern">
            <AdminAddIntern />
        </DashboardLayout>
    );
} 