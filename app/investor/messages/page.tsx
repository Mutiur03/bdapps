import { InvestorLayout } from "@/components/investor/investor-layout";
import { InvestorMessages } from "@/components/investor/investor-messages";

export default function InvestorMessagesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <InvestorLayout>
        <InvestorMessages />
      </InvestorLayout>
    </div>
  );
}
