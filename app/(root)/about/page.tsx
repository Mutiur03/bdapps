"use client";
import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeFooter } from "@/components/home/home-footer";
import { AboutComponent } from "@/components/root/about";

export default function AboutPage() {
  return (
    <>
      <HomeNavbar />
      <AboutComponent />
      <HomeFooter />
    </>
  );
}
