import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminLayout } from "@/components/admin/admin-layout";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </div>
  );
}
