"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  MessageSquare,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HomeFooter } from "../home/home-footer";
import useInvestorStore from "@/store/useInvestorStore";
import { signOut } from "next-auth/react";
import { safeUrl } from "@/app/udayee/projects/[id]/manage/page";

interface InvestorLayoutProps {
  children: React.ReactNode;
}

export function InvestorLayout({ children }: InvestorLayoutProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { investor, fetchInvestor } = useInvestorStore()
  useEffect(() => {
    setMounted(true);

  }, []);
  useEffect(() => {
    async function loadInvestorData() {
      try {
        await fetchInvestor();
        console.log(investor?.profile_picture);
      } catch (err) {
        console.error("Failed to fetch investor data:", err);
      }
    }

    loadInvestorData();
  }, [fetchInvestor]);

  const routes = [
    {
      href: "/investor/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/investor/dashboard",
    },
    {
      href: "/investor/startups",
      label: "Browse Startups",
      icon: Search,
      active:
        pathname === "/investor/startups" ||
        pathname.startsWith("/investor/startups/"),
    },
    // {
    //   href: "/investor/messages",
    //   label: "Messages",
    //   icon: MessageSquare,
    //   active:
    //     pathname === "/investor/messages" ||
    //     pathname.startsWith("/investor/chat/"),
    // },
    {
      href: "/investor/profile",
      label: "My Profile",
      icon: Briefcase,
      active: pathname === "/investor/portfolio",
    },
    {
      href: "/investor/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/investor/settings",
    },
  ];

  const NavLinks = () => (
    <ul className="space-y-1">
      {routes.map((route) => (
        <li key={route.href}>
          <Link
            href={route.href}
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200 group",
              route.active
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground/80 hover:bg-muted hover:text-foreground"
            )}
            onClick={() => setOpen(false)}
          >
            <span className="flex items-center gap-3">
              <route.icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  route.active
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {route.label}
            </span>
            {route.active && (
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  if (!mounted) return null;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Mobile Navigation Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden fixed top-4 left-4 z-50">
            <Button
              variant="outline"
              size="icon"
              className="bg-background border-border shadow-sm hover:bg-muted"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-72 border-r border-border"
            title="Investor Navigation"
          >
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-border bg-card">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">FundMyIdea </h2>
                    <p className="text-xs text-muted-foreground">
                      Investor Portal
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation section with proper sticky behavior */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                <div className="sticky top-16 bg-card pt-2 pb-4 z-10">
                  <h3 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Main Navigation
                  </h3>
                  <NavLinks />
                </div>
              </nav>

              {/* User Profile & Logout - Sticky at bottom */}
              <div className="sticky bottom-0 left-0 right-0 p-4 border-t border-border bg-card shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={safeUrl(investor?.profile_picture)}
                      alt={investor?.name}
                      className="object-cover"
                    />                    <AvatarFallback className="bg-primary/10 text-primary">
                      {investor?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {investor?.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {investor?.email}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    signOut({
                      callbackUrl: "/",
                    });
                  }
                  }
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Main content area with sidebar */}
        <div className="flex flex-1">
          {/* Desktop Sidebar - Non-fixed */}
          <aside className="hidden md:block md:w-72 border-r border-border bg-card h-screen sticky top-0 left-0">
            <div className="h-full flex flex-col">
              {/* Logo and Header */}
              <div className="p-6 border-b border-border flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">FundMyIdea </h2>
                    <p className="text-xs text-muted-foreground">
                      Investor Portal
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation section - independently scrollable */}
              <div className="flex-1 overflow-auto">
                <nav className="px-4 py-6">
                  <h3 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Main Navigation
                  </h3>
                  <NavLinks />
                </nav>
              </div>

              {/* User Profile & Logout - Fixed at bottom */}
              <div className="flex-shrink-0 p-4 border-t border-border bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={(investor?.profile_picture instanceof File ? URL.createObjectURL(investor.profile_picture) : investor?.profile_picture as string)}
                      alt={investor?.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {investor?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {investor?.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {investor?.email}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    signOut({
                      callbackUrl: "/",
                    });
                  }
                  }
                  variant="ghost"
                  className="w-full justify-start text-destructive/90 hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-grow w-full pt-16 md:pt-0">
            <div className="max-w-6xl mx-auto p-4 md:p-8">{children}</div>
          </main>
        </div>
      </div>

      {/* Footer - Positioned outside the flex layout */}
      <footer className="w-full bg-black text-white">
        <HomeFooter />
      </footer>
    </>
  );
}
