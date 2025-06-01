import React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { SessionProviderWrapper } from "@/components/providers/session-provider";
import Project from "@/components/root/Project";
export const metadata: Metadata = {
  title: "UdayeeConnect - Connecting Student Founders with Investors",
  description:
    "A platform for student founders to connect with investors and bring their ideas to life",
  generator: "v0.dev",
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
      // className="bg-gradient-to-br from-primary/30 via-cyan-500/10 to-background"
      >
        <SessionProviderWrapper>
          <Toaster />
          <Project />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
