import { AdminMessages } from "@/components/admin/admin-messages";
import { AdminLayout } from "@/components/admin/admin-layout";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminLayout>
        <AdminMessages />
      </AdminLayout>
    </div>
  );
}
