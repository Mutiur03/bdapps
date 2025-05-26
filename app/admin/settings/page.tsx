import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminSettings } from "@/components/admin/admin-settings";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminLayout>
        <AdminSettings />
      </AdminLayout>
    </div>
  );
}
