import { UdayeeLayout } from "@/components/udayee/udayee-layout";
import { UdayeeMilestones } from "@/components/udayee/udayee-milestones";

export default function UdayeeMilestonesPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <UdayeeLayout>
        <UdayeeMilestones />
      </UdayeeLayout>
    </div>
  );
}
