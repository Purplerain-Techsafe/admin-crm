'use client';

import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { InternFeedback } from '@/components/InternFeedback';

export default function InternFeedbackPage() {
    return (
        <DashboardLayout activePage="intern-feedback">
            <InternFeedback />
        </DashboardLayout>
    );
} 