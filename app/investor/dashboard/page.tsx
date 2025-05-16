import { InvestorDashboard } from "@/components/investor/investor-dashboard";
import { InvestorLayout } from "@/components/investor/investor-layout";

export default function InvestorDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <InvestorLayout>
        <InvestorDashboard />
      </InvestorLayout>
    </div>
  );
}
