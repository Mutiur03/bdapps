"use client";
import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeFooter } from "@/components/home/home-footer";
import { ContactComponent } from "@/components/root/contact";

export default function ContactPage() {
  return (
    <>
      <HomeNavbar />
      <ContactComponent />
      <HomeFooter />
    </>
  );
}
