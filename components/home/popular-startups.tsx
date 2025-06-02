"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import React from "react";
import { useCommonStore } from "@/store/useCommonStore";
import Image from "next/image";

export function PopularStartups() {
  const { isLoading, startups } = useCommonStore();

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">
            Popular Startups
          </h2>
          <p className="text-base sm:text-lg text-neutral max-w-2xl mx-auto">
            Discover innovative ideas from student entrepreneurs across
            Bangladesh
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : startups.slice(0, 4).map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link href="/signin">
            <Button className="px-6 py-3 sm:px-8 sm:py-6 bg-primary hover:bg-primary/90 text-white text-base sm:text-lg">
              Explore All Startups
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function SkeletonCard() {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="w-full h-32 bg-gray-200 animate-pulse" />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-2 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}

function StartupCard({ startup }: { startup: any }) {
  const fundingProgress =
    startup.milestones.length > 0
      ? (Number(startup.raised_amount) / Number(startup.budget)) * 100
      : 0;

  const tags = startup.tags
    ? startup.tags.split(",").map((tag: string) => tag.trim())
    : [];

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Image placeholder */}
      <div className="w-full h-32 flex items-center justify-center bg-accent border-b">
        {startup.cover_image ? (
          <Image
            src={startup.cover_image}
            alt={startup.title}
            className="w-full h-full object-cover"
            width={1280}
            height={720}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span
            className="text-4xl text-accent-foreground font-bold"
            style={{
              fontFamily: "'Outfit', 'Poppins', sans-serif",
              letterSpacing: "1px",
            }}
          >
            {startup.title[0]}
          </span>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-secondary-foreground">
              {startup.title}
            </CardTitle>
            <CardDescription>
              {startup.user.name} • {startup.user.university}
            </CardDescription>
          </div>
          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
            {startup.category?.name || "Startup"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {startup.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 2).map((tag: string, index: number) => (
            <span
              key={index}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Funding Goal:</span>
            <span className="font-medium">
              ৳{Number(startup.budget).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Raised So Far:</span>
            <span className="font-medium">
              ৳{Number(startup.raised_amount).toLocaleString()}
            </span>
          </div>
          <Progress value={fundingProgress} className="h-2 bg-accent" />
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {startup.trending ? (
            <>
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-primary font-medium">Trending</span>
            </>
          ) : (
            <>
              <Clock className="h-3 w-3" />
              <span>Added recently</span>
            </>
          )}
        </div>
        <Link href="/startup/[id]" as={`/startup/${startup.id}`}>
          <Button
            size="sm"
            className="text-sm bg-primary hover:bg-primary/90 text-white flex items-center"
          >
            View Details
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
