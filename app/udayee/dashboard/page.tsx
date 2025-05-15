import { UdayeeLayout } from "@/components/udayee/udayee-layout";
import { UdayeeDashboard } from "@/components/udayee/udayee-dashboard";

export default function UdayeeDashboardPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <UdayeeLayout>
        <UdayeeDashboard />
      </UdayeeLayout>
    </div>
  );
}
