import { InvestorLayout } from "@/components/investor/investor-layout";
import ChatInterface from "@/components/shared/chat-interface";

export default async function InvestorChatPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <InvestorLayout>
      <ChatInterface
        recipientId={params.id}
        recipientType="udayee"
        userType="investor"
      />
    </InvestorLayout>
  );
}
