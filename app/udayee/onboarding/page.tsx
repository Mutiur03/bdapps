"use client";

import { useState, useEffect } from "react";
import { UdayeeOnboarding } from "@/components/udayee/udayee-onboarding";

export default function UdayeeOnboardingPage() {
  // Add client-side detection
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once component mounts on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {isClient ? (
        <UdayeeOnboarding />
      ) : (
        // Show loading state during server-side rendering
        <div className="h-screen w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      )}
    </div>
  );
}
