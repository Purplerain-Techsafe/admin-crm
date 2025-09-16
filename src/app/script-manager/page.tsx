import { ScriptManager } from '@/components/ScriptManager';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function ScriptManagerPage() {
    return (
        <DashboardLayout activePage="script-manager">
            <ScriptManager />
        </DashboardLayout>
    );
}
