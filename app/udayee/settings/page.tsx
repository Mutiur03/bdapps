import { UdayeeLayout } from "@/components/udayee/udayee-layout";
import { UdayeeSettings } from "@/components/udayee/udayee-settings";

export default function UdayeeSettingsPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <UdayeeLayout>
        <UdayeeSettings />
      </UdayeeLayout>
    </div>
  );
}
