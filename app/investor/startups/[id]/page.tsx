import { InvestorLayout } from "@/components/investor/investor-layout";
import { StartupProfile } from "@/components/investor/startup-profile";

export default function StartupProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <InvestorLayout>
        <StartupProfile id={params.id} />
      </InvestorLayout>
    </div>
  );
}
