import ChatInterface from "@/components/shared/chat-interface";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/admin/admin-layout";
export default async function InvestorChatPage({
  params,
}: {
  params: Promise<{ id: string, projectId: string }>;
}) {

  const { id, projectId } = await params;

  // Get session server-side
  const session = await getServerSession(authOptions);
  // Redirect if not authenticated
  if (!session || !session.user) {
    redirect("/api/auth/signin"); // Redirect to sign-in page
  }
  const userId = session.user.id;
  console.log(`User ID: ${userId}`);

  return (
    <AdminLayout>
      <ChatInterface
        project={projectId}
        recipientId={id}
        recipientType="user"
        userType="admin"
        currentUserId={userId}
      />
    </AdminLayout>
  );
}
