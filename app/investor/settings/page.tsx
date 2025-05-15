import { InvestorLayout } from "@/components/investor/investor-layout";
import { InvestorSettings } from "@/components/investor/investor-settings";

export default function InvestorSettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <InvestorLayout>
        <InvestorSettings />
      </InvestorLayout>
    </div>
  );
}
