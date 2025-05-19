import { InvestorLayout } from "@/components/investor/investor-layout";
import { InvestorProfile } from "@/components/investor/investor-profile";

export default function InvestorProfilePage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <InvestorLayout>
        <InvestorProfile />
      </InvestorLayout>
    </div>
  );
}
