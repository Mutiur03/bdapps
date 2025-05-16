import { UdayeeLayout } from "@/components/udayee/udayee-layout";
import { UdayeeInvest } from "@/components/udayee/udayee-invest";

export default function UdayeeInvestPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <UdayeeLayout>
        <UdayeeInvest />
      </UdayeeLayout>
    </div>
  );
}
