import ChatInterface from "@/components/shared/chat-interface";
import { UdayeeLayout } from "@/components/udayee/udayee-layout";

interface PageParams {
  params: {
    id: string;
  };
}

export default async function UdayeeChatPage({ params }: PageParams) {
  // Fetch any necessary data using the ID
  // For example:
  // const recipientData = await fetchRecipientData(params.id);

  // Ensure id is a string before passing it
  const recipientId = params.id.toString();

  return (
    <UdayeeLayout>
      <ChatInterface
        recipientId={recipientId}
        recipientType="investor"
        userType="udayee"
      />
    </UdayeeLayout>
  );
}
