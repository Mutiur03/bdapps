import AdminInvestments from "@/components/admin/admin-investments";
import { AdminLayout } from "@/components/admin/admin-layout";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminLayout>
        <AdminInvestments />
      </AdminLayout>
    </div>
  );
}
