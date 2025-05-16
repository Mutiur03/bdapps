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
import {
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function StartupBrowser() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data with image URLs added
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
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      logo: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
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
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      logo: "https://images.unsplash.com/photo-1518709268803-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
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
        "https://images.unsplash.com/photo-1517632298125-c1d6f8b6f1a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
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
        "https://images.unsplash.com/photo-1517632298125-c1d6f8b6f1a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Browse Startups
        </h1>
        <p className="text-muted-foreground">
          Discover and invest in promising student-led startups
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
          className="flex items-center gap-2 border-primary text-primary hover:bg-primary/5"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-muted text-muted-foreground p-1 rounded-md">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            All Startups
          </TabsTrigger>
          <TabsTrigger
            value="trending"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            Trending
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            Recently Added
          </TabsTrigger>
          <TabsTrigger
            value="university"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground"
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
              <StartupCard key={startup.id} startup={startup} />
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
              <StartupCard key={startup.id} startup={startup} />
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

// Enhanced Startup Card Component with Image
function StartupCard({ startup }: { startup: any }) {
  const fundingProgress =
    (Number.parseInt(startup.raisedSoFar.replace(/[^0-9]/g, "")) /
      Number.parseInt(startup.fundingGoal.replace(/[^0-9]/g, ""))) *
    100;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {/* Add Image to Card */}
      <CardImage
        src={
          startup.image ||
          `https://source.unsplash.com/random/800x400?${startup.category.toLowerCase()}`
        }
        alt={`${startup.name} cover image`}
        aspectRatio="wide"
      />

      <CardHeader className="pb-2 relative">
        {/* Logo overlay on the image */}
        <div className="absolute -top-8 left-4 w-12 h-12 rounded-full overflow-hidden border-2 border-background bg-background shadow-sm">
          <CardImage
            src={
              startup.logo ||
              `https://ui-avatars.com/api/?name=${startup.name}&background=random`
            }
            alt={`${startup.name} logo`}
            aspectRatio="square"
            className="w-full h-full"
            fallback={
              <div className="bg-primary/10 text-primary h-full w-full flex items-center justify-center font-semibold text-xl">
                {startup.name.charAt(0)}
              </div>
            }
          />
        </div>

        <div className="flex justify-between items-start pt-2">
          <div>
            <CardTitle className="text-lg text-foreground">
              {startup.name}
            </CardTitle>
            <CardDescription>
              {startup.founder} • {startup.university}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20"
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
              className="text-xs bg-muted/50 text-muted-foreground hover:bg-muted border-muted flex items-center gap-1"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Funding Goal:</span>
            <span className="font-medium text-foreground">
              {startup.fundingGoal}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Raised So Far:</span>
            <span className="font-medium text-foreground">
              {startup.raisedSoFar}
            </span>
          </div>
          <Progress
            value={fundingProgress}
            className="h-2"
            indicatorClassName="bg-primary"
          />
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-muted-foreground font-medium">
              {fundingProgress.toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-border">
          <div className="flex items-center gap-1 text-xs">
            {startup.trending ? (
              <>
                <TrendingUp className="h-3.5 w-3.5 text-primary fill-primary/20" />
                <span className="text-primary font-medium">Trending</span>
              </>
            ) : (
              <>
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Added recently</span>
              </>
            )}
          </div>
          <Link href={`/investor/startups/${startup.id}`}>
            <Button
              size="sm"
              className="h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1"
            >
              View Details
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
