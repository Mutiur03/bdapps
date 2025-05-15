import { UdayeeLayout } from "@/components/udayee/udayee-layout";
import { UdayeeStartupDetails } from "@/components/udayee/udayee-startup-details";

export default function UdayeeStartupDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <UdayeeLayout>
        <UdayeeStartupDetails id={params.id} />
      </UdayeeLayout>
    </div>
  );
}
