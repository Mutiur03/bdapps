"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardImage,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function UdayeeInvest() {
  const [searchQuery, setSearchQuery] = useState("");

  // Define a consistent color theme
  const themeColors = {
    primary: "emerald-600",
    primaryHover: "emerald-700",
    secondary: "amber-500",
    accent: "indigo-600",
    progress: "emerald-100",
    progressFill: "emerald-600",
  };

  // Mock data - in a real app, this would come from an API
  const startups = [
    {
      id: "1",
      name: "EcoSolutions",
      founder: "Rahul Ahmed",
      university: "BUET",
      description: "Sustainable waste management solutions for urban areas",
      fundingGoal: "৳25,000",
      raisedSoFar: "৳18,000",
      category: "Environment",
      tags: ["sustainability", "waste management", "urban"],
      trending: true,
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "2",
      name: "HealthTech",
      founder: "Nusrat Khan",
      university: "Dhaka University",
      description: "AI-powered health diagnostics for rural communities",
      fundingGoal: "৳30,000",
      raisedSoFar: "৳12,000",
      category: "Healthcare",
      tags: ["healthcare", "AI", "rural development"],
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "3",
      name: "EduConnect",
      founder: "Tanvir Rahman",
      university: "NSU",
      description: "Connecting students with mentors for career guidance",
      fundingGoal: "৳18,000",
      raisedSoFar: "৳15,000",
      category: "Education",
      tags: ["education", "mentorship", "career"],
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "4",
      name: "AgriTech Solutions",
      founder: "Fahmida Akter",
      university: "BAU",
      description: "Smart farming solutions for small-scale farmers",
      fundingGoal: "৳20,000",
      raisedSoFar: "৳8,000",
      category: "Agriculture",
      tags: ["agriculture", "IoT", "farming"],
      trending: true,
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      logo: "https://images.unsplash.com/photo-1560241804-02b7b1bc9d55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "5",
      name: "FinLit",
      founder: "Samir Hossain",
      university: "IBA, DU",
      description: "Financial literacy app for university students",
      fundingGoal: "৳15,000",
      raisedSoFar: "৳3,000",
      category: "Finance",
      tags: ["finance", "education", "mobile app"],
      image:
        "https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "6",
      name: "LocalMarket",
      founder: "Tasnim Jahan",
      university: "CUET",
      description: "Connecting local artisans with global markets",
      fundingGoal: "৳22,000",
      raisedSoFar: "৳10,000",
      category: "E-commerce",
      tags: ["e-commerce", "artisans", "global market"],
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      logo: "https://images.unsplash.com/photo-1490129375591-2658b3e2ee50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
  ];

  // Filter startups based on search query
  const filteredStartups = startups.filter(
    (startup) =>
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Get trending startups
  const trendingStartups = startups.filter((startup) => startup.trending);

  return (
    <div className="space-y-6">
      <div>
        <h1
          className={`text-3xl font-bold tracking-tight text-${themeColors.primary}`}
        >
          Invest in Startups
        </h1>
        <p className="text-muted-foreground">
          Support fellow student entrepreneurs by investing in their startups
        </p>
      </div>
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search startups, categories, or tags..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className={`flex items-center gap-2 border-${themeColors.primary}/50 hover:border-${themeColors.primary} hover:bg-${themeColors.primary}/10 text-${themeColors.primary}`}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
      {/* Tabs for different views */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-transparent border rounded-md p-1">
          <TabsTrigger
            value="all"
            className={`data-[state=active]:bg-${themeColors.primary} data-[state=active]:text-white`}
          >
            All Startups
          </TabsTrigger>
          <TabsTrigger
            value="trending"
            className={`data-[state=active]:bg-${themeColors.primary} data-[state=active]:text-white`}
          >
            Trending
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className={`data-[state=active]:bg-${themeColors.primary} data-[state=active]:text-white`}
          >
            Recently Added
          </TabsTrigger>
          <TabsTrigger
            value="university"
            className={`data-[state=active]:bg-${themeColors.primary} data-[state=active]:text-white`}
          >
            By University
          </TabsTrigger>
        </TabsList>

        {/* All Startups Tab */}
        <TabsContent value="all" className="space-y-4">
          {searchQuery && (
            <p className="text-sm text-muted-foreground">
              Showing {filteredStartups.length} results for "{searchQuery}"
            </p>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredStartups.map((startup) => (
              <StartupCard
                key={startup.id}
                startup={startup}
                themeColors={themeColors}
              />
            ))}
          </div>

          {filteredStartups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No startups found matching your search criteria.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Trending Tab */}
        <TabsContent value="trending" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trendingStartups.map((startup) => (
              <StartupCard
                key={startup.id}
                startup={startup}
                themeColors={themeColors}
              />
            ))}
          </div>

          {trendingStartups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No trending startups at the moment.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Other tabs would be implemented similarly */}
        <TabsContent value="recent">
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Recently added startups will appear here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="university">
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              University filter will be implemented here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Startup Card Component
function StartupCard({
  startup,
  themeColors,
}: {
  startup: any;
  themeColors: any;
}) {
  const fundingProgress =
    (Number.parseInt(startup.raisedSoFar.replace(/[^0-9]/g, "")) /
      Number.parseInt(startup.fundingGoal.replace(/[^0-9]/g, ""))) *
    100;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {/* Add the image at the top of the card */}
      <CardImage
        src={startup.image}
        alt={`${startup.name} cover image`}
        aspectRatio="wide"
      />

      <CardHeader className="pb-2 relative">
        {/* Logo overlay on the image */}
        <div className="absolute -top-8 left-4 w-16 h-16 rounded-full overflow-hidden border-4 border-white bg-white shadow-sm">
          <CardImage
            src={startup.logo}
            alt={`${startup.name} logo`}
            aspectRatio="square"
            className="w-full h-full"
            fallback={
              <div
                className={`bg-${themeColors.primary}/20 text-${themeColors.primary} h-full w-full flex items-center justify-center font-semibold text-xl`}
              >
                {startup.name.charAt(0)}
              </div>
            }
          />
        </div>

        <div className="flex justify-between items-start pt-4">
          <div>
            <CardTitle className={`text-lg text-${themeColors.primary}`}>
              {startup.name}
            </CardTitle>
            <CardDescription>
              {startup.founder} • {startup.university}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={`bg-${themeColors.primary}/10 text-${themeColors.primary} border-${themeColors.primary}/20`}
          >
            {startup.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {startup.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {startup.tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="outline"
              className={`text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200`}
            >
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Funding Goal:</span>
            <span className="font-medium">{startup.fundingGoal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Raised So Far:</span>
            <span className="font-medium">{startup.raisedSoFar}</span>
          </div>
          <Progress
            value={fundingProgress}
            className={`h-2 bg-${themeColors.progress}`}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{fundingProgress.toFixed(0)}%</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {startup.trending ? (
              <>
                <TrendingUp
                  className={`h-3 w-3 text-${themeColors.secondary}`}
                />
                <span className={`font-medium text-${themeColors.secondary}`}>
                  Trending
                </span>
              </>
            ) : (
              <>
                <Clock className="h-3 w-3" />
                <span>Added recently</span>
              </>
            )}
          </div>
          <Link href={`/udayee/invest/${startup.id}`}>
            <Button
              size="sm"
              className={`text-sm flex items-center bg-${themeColors.primary} hover:bg-${themeColors.primaryHover} text-white`}
            >
              View Details
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
