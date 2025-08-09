'use client';

import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { AddIntern } from '@/components/AddIntern';

export default function AddInternPage() {
    return (
        <DashboardLayout activePage="add-intern">
            <AddIntern />
        </DashboardLayout>
    );
} 