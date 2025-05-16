import { InvestorLayout } from "@/components/investor/investor-layout";
import { StartupBrowser } from "@/components/investor/startup-browser";

export default function StartupBrowsePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <InvestorLayout>
        <StartupBrowser />
      </InvestorLayout>
    </div>
  );
}
