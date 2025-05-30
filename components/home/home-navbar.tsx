"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export function HomeNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  // const fetchUser = async () => {
  //   try {
  //     const session = await getSession();
  //     if (session) {
  //       console.log("Session:", session);
  //       // Fix role extraction - check multiple possible locations
  //       const role = session.user?.role;
  //       console.log("Extracted role:", role);
  //       if (role === "user") {
  //         router.push("/udayee/dashboard");
  //       }
  //       else if (role === "investor") {
  //         router.push("/investor/dashboard");
  //       }
  //     }
  //   } catch (err) {
  //     location.href = "/";
  //     console.error("Failed to load user:", err);
  //   }
  // };
  // useEffect(() => {
  //   fetchUser();
  // }, []);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[var(--background)] shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/logo_light.png" alt="logo" height={135} width={135} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-[var(--foreground)] hover:text-[var(--primary)] font-semibold transition-colors hover:bg-[var(--muted)]/20"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-1.5 text-[var(--foreground)] hover:text-[var(--primary)] font-semibold transition-colors hover:bg-[var(--muted)]/20"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="rounded-md px-3 py-1.5 text-[var(--foreground)] hover:text-[var(--primary)] font-semibold transition-colors hover:bg-[var(--muted)]/20"
          >
            Contact Us
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/signin">
            <Button
              variant="ghost"
              className="rounded-full px-5 font-semibold text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--accent)]/20 transition-colors"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="rounded-full px-5 font-semibold bg-[var(--primary)] hover:bg-[color-mix(in_oklch,var(--primary),#fff_10%)] text-[var(--primary-foreground)] shadow-md transition-colors">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[var(--foreground)] rounded-full hover:bg-[var(--muted)]/20 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--background)]/95 border-b border-[var(--border)] shadow-lg fixed inset-x-0 top-16 z-50 rounded-b-xl">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-[var(--foreground)] hover:text-[var(--primary)] font-semibold transition-colors hover:bg-[var(--muted)]/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-md px-3 py-2 text-[var(--foreground)] hover:text-[var(--primary)] font-semibold transition-colors hover:bg-[var(--muted)]/20"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="rounded-md px-3 py-2 text-[var(--foreground)] hover:text-[var(--primary)] font-semibold transition-colors hover:bg-[var(--muted)]/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
            <div className="flex flex-col space-y-2 pt-2">
              <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full rounded-full font-semibold text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--accent)]/20 transition-colors"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full rounded-full font-semibold bg-[var(--primary)] hover:bg-[color-mix(in_oklch,var(--primary),#fff_10%)] text-[var(--primary-foreground)] shadow-md transition-colors">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
