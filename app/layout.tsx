import React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { SessionProviderWrapper } from "@/components/providers/session-provider";
export const metadata: Metadata = {
  title: "Fundit",
  description:
    "A platform for student founders to connect with investors and bring their ideas to life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        // className={cn(
        //   "min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-sans antialiased",
        //   inter.className
        // )}
      >
        <SessionProviderWrapper>
          <Toaster />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
