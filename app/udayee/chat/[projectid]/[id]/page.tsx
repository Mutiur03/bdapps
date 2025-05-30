import ChatInterface from "@/components/shared/chat-interface";
import { UdayeeLayout } from "@/components/udayee/udayee-layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // You may need to adjust this import based on your project structure
import { redirect } from "next/navigation";

interface PageParams {
  params: Promise<{
    id: string, projectid: string
  }>;
}

export default async function UdayeeChatPage({ params }: PageParams) {
  // Await the params
  const { id, projectid } = await params;

  // Get session server-side
  const session = await getServerSession(authOptions);

  // Redirect if not authenticated
  if (!session || !session.user) {
    redirect("/api/auth/signin"); // Redirect to sign-in page
  }

  const userId = session.user.id;
  console.log(`User ID: ${userId}`);


  return (
    <UdayeeLayout>
      <ChatInterface
        recipientId={id}
        project={projectid}
        recipientType="admin"
        userType="user"
        currentUserId={userId}
      />
    </UdayeeLayout>
  );
}
