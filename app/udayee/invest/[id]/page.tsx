import { UdayeeLayout } from "@/components/udayee/udayee-layout";
import { UdayeeStartupDetails } from "@/components/udayee/udayee-startup-details";

export default async function UdayeeStartupDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;

}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <UdayeeLayout>
        <UdayeeStartupDetails id={id} />
      </UdayeeLayout>
    </div>
  );
}
