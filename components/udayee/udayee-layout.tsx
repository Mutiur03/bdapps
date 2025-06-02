"use client";
import Image from "next/image";
import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  Menu,
  Search,
  FolderKanban,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HomeFooter } from "../home/home-footer";
import { signOut } from "next-auth/react";
import useUserStore from "@/store/useUserStore";
interface UdayeeLayoutProps {
  children: React.ReactNode;
}
import safeUrl from "@/lib/safeURL";

export function UdayeeLayout({ children }: UdayeeLayoutProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useUserStore();
  const { isLoading, setIsLoading, getUser } = useUserStore();
  useEffect(() => {
    setMounted(true);
    fetchUser();
  }, []);
  const fetchUser = async () => {
    setIsLoading(true);
    try {
      await getUser(); // Make sure this is awaited
    } catch (err) {
      location.href = "/";
      console.error("Failed to load user:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const routes = [
    {
      href: "/udayee/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/udayee/dashboard",
    },
    {
      href: "/udayee/projects",
      label: "My Projects",
      icon: FolderKanban,
      active:
        pathname === "/udayee/projects" ||
        pathname.startsWith("/udayee/projects/"),
    },
    {
      href: "/udayee/profile",
      label: "My Profile",
      icon: FileText,
      active: pathname === "/udayee/profile",
    },
    // {
    //   href: "/udayee/milestones",
    //   label: "Milestones",
    //   icon: Target,
    //   active: pathname === "/udayee/milestones",
    // },
    {
      href: "/udayee/messages",
      label: "Messages",
      icon: MessageSquare,
      active:
        pathname === "/udayee/messages" || pathname.startsWith("/udayee/chat/"),
    },
    // {
    //   href: "/udayee/invest",
    //   label: "Invest in Startups",
    //   icon: Search,
    //   active:
    //     pathname === "/udayee/invest" || pathname.startsWith("/udayee/invest/"),
    // },
    {
      href: "/udayee/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/udayee/settings",
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

  if (!mounted) return null; // Prevent hydration issues

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
            title="udayeeNavigation"
          >
            <div className="flex flex-col h-full">
              <div className="border-b border-border bg-card">
                <div className="flex items-center justify-center">
                  <div className="h-12 w-full flex items-center justify-center overflow-hidden">
                    <Image
                      src="/logo_light.png"
                      alt="logo"
                      height={32}
                      width={80}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
                <p className="text-md text-foreground text-center pb-4">
                  udayeePortal
                </p>
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
                      src={safeUrl(user?.profile_picture)}
                      alt="User"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      ST
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.university_email}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    signOut({
                      callbackUrl: "/",
                    });
                  }}
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
              <div className=" border-b border-border flex-shrink-0">
                <div className="flex items-center justify-center">
                  <div className="h-12 w-full flex items-center justify-center overflow-hidden">
                    <Image
                      src="/logo_light.png"
                      alt="logo"
                      height={32}
                      width={80}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
                <p className="text-md text-foreground text-center pb-4">
                  udayeePortal
                </p>
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
                      src={safeUrl(user?.profile_picture)}
                      alt="User"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      ST
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.university_email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive/90 hover:text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    signOut({
                      callbackUrl: "/",
                    });
                  }}
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
