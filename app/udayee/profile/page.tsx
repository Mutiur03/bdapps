import { UdayeeLayout } from "@/components/udayee/udayee-layout";
import { UdayeeProfileEditor } from "@/components/udayee/udayee-profile-editor";

export default function UdayeeProfilePage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <UdayeeLayout>
        <UdayeeProfileEditor />
      </UdayeeLayout>
    </div>
  );
}
