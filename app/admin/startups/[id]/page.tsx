import { StartupProfile } from "@/components/admin/startup-profile";
import { AdminLayout } from "@/components/admin/admin-layout";
export default function StartupProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminLayout>
        <StartupProfile id={params.id} />
      </AdminLayout>
    </div>
  );
}
