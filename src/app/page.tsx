'use client';

import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Dashboard } from '@/components/Dashboard';

export default function AdminPanel() {
  return (
    <DashboardLayout activePage="dashboard">
      <Dashboard />
    </DashboardLayout>
  );
}
