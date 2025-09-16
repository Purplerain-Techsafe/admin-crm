import { Settings } from '@/components/Settings';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function SettingsPage() {
    return (
        <DashboardLayout activePage="settings">
            <Settings />
        </DashboardLayout>
    );
}
