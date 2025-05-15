import { ChatInterface } from "@/components/shared/chat-interface"
import { UdayeeLayout } from "@/components/udayee/udayee-layout"

export default function UdayeeChatPage({ params }: { params: { id: string } }) {
  return (
    <UdayeeLayout>
      <ChatInterface recipientId={params.id} recipientType="investor" userType="udayee" />
    </UdayeeLayout>
  )
}
