import { AdminLayout } from "@/components/admin/admin-layout";
import { StartupBrowser } from "@/components/shared/startup-browser";

export default function StartupBrowsePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminLayout>
        <StartupBrowser />
      </AdminLayout>
    </div>
  );
}
