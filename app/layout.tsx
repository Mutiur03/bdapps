import React from "react";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LoadUserClient from "@/components/LoadUserClient";
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ["latin"] });
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
      >
        <LoadUserClient />
        <Toaster />

        {children}
      </body>
    </html>
  );
}
