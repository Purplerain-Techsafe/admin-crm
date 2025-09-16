import { Reports } from '@/components/Reports';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function ReportsPage() {
    return (
        <DashboardLayout activePage="reports">
            <Reports />
        </DashboardLayout>
    );
}
