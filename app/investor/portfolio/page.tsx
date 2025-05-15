import { InvestorLayout } from "@/components/investor/investor-layout";
import { InvestorPortfolio } from "@/components/investor/investor-portfolio";

export default function InvestorPortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <InvestorLayout>
        <InvestorPortfolio />
      </InvestorLayout>
    </div>
  );
}
