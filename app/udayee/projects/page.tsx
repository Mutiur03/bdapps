import { UdayeeLayout } from "@/components/udayee/udayee-layout";
import { UdayeeProjects } from "@/components/udayee/udayee-projects";

export default function UdayeeProjectsPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <UdayeeLayout>
        <UdayeeProjects />
      </UdayeeLayout>
    </div>
  );
}
