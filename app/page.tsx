'use client'
import useUserStore from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
export default function Home() {
  const { user, isLoading } = useUserStore();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
       <Loader2 className="animate-spin"/>
      </div>
    );
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      <div>
        {user ? (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">Welcome, {user.id}!</h2>
            <p className="text-lg">Your email: {user.phone}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">Welcome, Guest!</h2>
            <p className="text-lg">Please log in to see your information.</p>
          </div>
        )
        }
      </div>
      
    </div>
  );
}
