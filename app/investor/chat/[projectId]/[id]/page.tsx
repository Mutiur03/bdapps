import { InvestorLayout } from "@/components/investor/investor-layout";
import ChatInterface from "@/components/shared/chat-interface";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function InvestorChatPage({
  params,
}: {
  params: { id: string, projectId: string };
}) {

  // Get session server-side
  const session = await getServerSession(authOptions);
  // Redirect if not authenticated
  if (!session || !session.user) {
    redirect("/api/auth/signin"); // Redirect to sign-in page
  }
  const userId = session.user.id;
  console.log(`User ID: ${userId}`);

  return (
    <InvestorLayout>
      <ChatInterface
        project={params.projectId}
        recipientId={params.id}
        recipientType="user"
        userType="investor"
        currentUserId={userId}
      />
    </InvestorLayout>
  );
}
