"use client";

import { useEffect, useState } from "react";
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
import { safeUrl } from "@/app/udayee/projects/[id]/manage/page";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

interface Startup {
  id: string;
  title: string;
  user: any;
  profile_picture: string;
  cover_image: string;
  university: string;
  description: string;
  budget: string;
  raised_amount: string;
  category: string;
  tags: string;
  trending?: boolean;
  image?: string;
  logo?: string;
  createdAt: string;
}

export function StartupBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await axios.get("/api/projects");
        const data = response.data;
        console.log("Fetched startups:", data);

        setStartups(data);
      } catch (error) {
        console.error("Error fetching startups:", error);
      }
    };

    fetchStartups();
  }, []);

  // Filter startups based on search query
  const filteredStartups = startups.filter(
    (startup) =>
      startup?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup?.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup?.tags?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      startup?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get trending startups
  const trendingStartups = startups.filter((startup) => startup?.trending);
  const addedRecentlyStartups = startups.filter(
    (startup) => new Date(startup.createdAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const universityStartups = startups.filter(
    (startup) => startup?.user?.university === "Some University"
  );
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
              Showing {filteredStartups.length} results for &ldquo;{searchQuery}&rdquo;
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {addedRecentlyStartups.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>
          {addedRecentlyStartups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No trending startups at the moment.
              </p>
            </div>
          )}
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
function StartupCard({ startup }: { startup: Startup }) {
  // Add default values and safeguards
  const raised_amount = startup?.raised_amount || "0";
  const budget = startup?.budget || "1";

  const fundingProgress =
    (Number.parseInt((raised_amount.toString() || "0").replace(/[^0-9]/g, "") || "0") /
      Number.parseInt((budget.toString() || "1").replace(/[^0-9]/g, "") || "1")) *
    100;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {/* Add Image to Card */}
      <CardImage
        src={
          safeUrl(startup?.cover_image) ||
          `https://source.unsplash.com/random/800x400?${(startup?.category || "startup").toLowerCase()}`
        }
        alt={`${startup?.title || "Startup"} cover image`}
        aspectRatio="wide"
      />

      <CardHeader className="pb-2 relative">
        {/* Logo overlay on the image */}
        <div className="absolute -top-8 left-4 w-12 h-12 rounded-full overflow-hidden border-2 border-background bg-background shadow-sm">
          <CardImage
            src={
              safeUrl(startup?.profile_picture) ||
              `https://ui-avatars.com/api/?name=${startup?.title || "Startup"}&background=random`
            }
            alt={`${startup?.title || "Startup"} logo`}
            aspectRatio="square"
            className="w-full h-full"
            fallback={
              <div className="bg-primary/10 text-primary h-full w-full flex items-center justify-center font-semibold text-xl">
                {(startup?.title || "S").charAt(0)}
              </div>
            }
          />
        </div>

        <div className="flex justify-between items-start pt-2">
          <div>
            <CardTitle className="text-lg text-foreground">
              {startup?.title || "Unnamed Startup"}
            </CardTitle>
            <CardDescription>
              {startup?.user.name || "Anonymous"} • {startup?.user.university || "Unknown University"}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20"
          >
            {startup?.category || "Uncategorized"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {startup?.description?.length > 50
            ? startup.description.slice(0, 50) + "..."
            : startup?.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {(startup?.tags.split(',') || []).map((tag: string) => (
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
              {startup?.budget || "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Raised So Far:</span>
            <span className="font-medium text-foreground">
              {startup?.raised_amount || "N/A"}
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

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-xs">
            {startup?.trending ? (
              <>
                <TrendingUp className="h-3.5 w-3.5 text-primary fill-primary/20" />
                <span className="text-primary font-medium">Trending</span>
              </>
            ) : (
              <>
                {new Date(startup.createdAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                  <>
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Added recently</span>
                  </>
                )}
              </>
            )}
          </div>
          <Link href={`/investor/startups/${startup?.id || ""}`}>
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
    </Card >
  );
}
