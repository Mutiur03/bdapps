import { UdayeeLayout } from "@/components/udayee/udayee-layout";
import { UdayeeMessages } from "@/components/udayee/udayee-messages";

export default function UdayeeMessagesPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <UdayeeLayout>
        <UdayeeMessages />
      </UdayeeLayout>
    </div>
  );
}
