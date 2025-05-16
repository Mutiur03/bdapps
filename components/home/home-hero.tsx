"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HomeHero() {
  const startupsRef = useRef<HTMLDivElement | null>(null);

  const scrollToStartups = () => {
    startupsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-[calc(100vh-64px)] overflow-hidden flex flex-col">
      {/* Background Elements - Bluish/Greenish Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-cyan-500/10 to-background"></div>

      {/* Hero Content */}
      <div className="container relative z-10 px-4 mx-auto flex flex-col lg:flex-row items-center justify-between flex-1">
        {/* Text Content - Left Side */}
        <div className="max-w-xl space-y-6 text-center lg:text-left z-10 py-12 lg:py-0">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
              Empowering Student Entrepreneurs
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground animate-fade-in">
              Connecting <span className="text-primary">Student Founders</span>{" "}
              with <span className="text-primary">Investors</span>
            </h1>
          </div>

          <p className="text-lg text-muted-foreground animate-fade-in animation-delay-200">
            UdayeeConnect empowers student entrepreneurs to showcase their ideas
            and connect with investors who believe in their vision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in animation-delay-400">
            <Link href="/signup">
              <Button className="px-6 py-5 text-lg gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Join Udayee Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              onClick={scrollToStartups}
              variant="outline"
              className="gap-2 px-6 py-5 text-lg border-primary text-primary hover:bg-primary/10"
            >
              Explore Startups
            </Button>
          </div>
        </div>

        {/* Image - Right Side - Hidden on mobile, zoomed in */}
        <div className="hidden lg:flex">
          <div className="relative h-full flex items-end">
            <img
              src="/hero.png"
              alt="Student entrepreneur with laptop"
              className="h-auto max-h-[calc(100vh-64px)] object-contain object-bottom z-10 origin-bottom"
              style={{
                filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))",
                scale: "1.8",
                transform: "translateY(250px) translateX(-120px)",
              }}
            />

            {/* Highlight effect behind the person */}
            <div className="absolute bottom-0 w-72 h-40 bg-primary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Reference for Smooth Scroll - kept for functionality but arrow removed */}
      <div ref={startupsRef} className="absolute bottom-0" />
    </div>
  );
}
