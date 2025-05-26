import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminProfile } from "@/components/admin/admin-profile";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminLayout>
        <AdminProfile />
      </AdminLayout>
    </div>
  );
}
