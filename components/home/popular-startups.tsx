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

export function PopularStartups() {
  // Mock data for popular startups
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
    },
  ];

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
          {startups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link href="/signup">
            <Button className="px-6 py-3 sm:px-8 sm:py-6 bg-primary hover:bg-primary/90 text-white text-base sm:text-lg">
              Explore All Startups
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function StartupCard({ startup }: { startup: any }) {
  const fundingProgress =
    (Number.parseInt(startup.raisedSoFar.replace(/[^0-9]/g, "")) /
      Number.parseInt(startup.fundingGoal.replace(/[^0-9]/g, ""))) *
    100;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Image placeholder */}
      <div className="w-full h-32 flex items-center justify-center bg-accent border-b">
        <span
          className="text-4xl text-accent-foreground font-bold"
          style={{
            fontFamily: "'Outfit', 'Poppins', sans-serif",
            letterSpacing: "1px",
          }}
        >
          {/* Use first letter of startup name as placeholder "logo" */}
          {startup.name[0]}
        </span>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-secondary-foreground">
              {startup.name}
            </CardTitle>
            <CardDescription>
              {startup.founder} • {startup.university}
            </CardDescription>
          </div>
          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
            {startup.category}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {startup.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {startup.tags.slice(0, 2).map((tag: string) => (
            <span
              key={tag}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
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
        <Link href="/signup">
          <Button
            size="sm"
            className="text-sm bg-primary hover:bg-primary/90 text-white flex items-center"
          >
            Invest Now
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
