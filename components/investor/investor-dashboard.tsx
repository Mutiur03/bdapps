import type React from "react";
import { HomeFooter } from "../home/home-footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardImage,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  BarChart2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function InvestorDashboard() {
  // Mock data - in a real app, this would come from an API
  const portfolioStats = {
    totalInvested: "৳45,000",
    activeInvestments: 5,
    completedMilestones: 12,
    pendingMilestones: 3,
    averageReturn: "+18%",
  };

  const recentInvestments = [
    {
      id: "1",
      startupName: "EcoSolutions",
      founder: "Rahul Ahmed",
      university: "BUET",
      amount: "৳8,000",
      milestone: "MVP Development",
      progress: 75,
      daysLeft: 4,
    },
    {
      id: "2",
      startupName: "HealthTech",
      founder: "Nusrat Khan",
      university: "Dhaka University",
      amount: "৳5,000",
      milestone: "Market Research",
      progress: 100,
      daysLeft: 0,
      completed: true,
    },
    {
      id: "3",
      startupName: "EduConnect",
      founder: "Tanvir Rahman",
      university: "NSU",
      amount: "৳12,000",
      milestone: "Beta Launch",
      progress: 40,
      daysLeft: 8,
    },
  ];

  const recommendedStartups = [
    {
      id: "4",
      name: "AgriTech Solutions",
      founder: "Fahmida Akter",
      university: "BAU",
      description: "Smart farming solutions for small-scale farmers",
      fundingGoal: "৳20,000",
      raisedSoFar: "৳8,000",
      category: "Agriculture",
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
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Investor Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your investments and recommended
          startups.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Invested"
          value={portfolioStats.totalInvested}
          description={`Across ${portfolioStats.activeInvestments} startups`}
          icon={<DollarSign className="h-4 w-4 text-primary" />}
        />
        <StatsCard
          title="Active Investments"
          value={portfolioStats.activeInvestments.toString()}
          description={`${portfolioStats.pendingMilestones} pending milestones`}
          icon={<Users className="h-4 w-4 text-primary" />}
        />
        <StatsCard
          title="Completed Milestones"
          value={portfolioStats.completedMilestones.toString()}
          description={`From ${portfolioStats.activeInvestments} startups`}
          icon={<Calendar className="h-4 w-4 text-primary" />}
        />
        <StatsCard
          title="Average Return"
          value={portfolioStats.averageReturn}
          description="Based on completed investments"
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
          valueClassName="text-primary"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="investments" className="space-y-6">
        <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
          <TabsTrigger
            value="investments"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Active Investments
          </TabsTrigger>
          <TabsTrigger
            value="recommended"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Recommended Startups
          </TabsTrigger>
        </TabsList>

        {/* Active Investments Tab */}
        <TabsContent value="investments" className="space-y-5">
          <h2 className="text-xl font-semibold text-foreground">
            Your Active Investments
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {recentInvestments.map((investment) => (
              <Card
                key={investment.id}
                className="overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-foreground">
                        {investment.startupName}
                      </CardTitle>
                      <CardDescription>
                        {investment.founder} • {investment.university}
                      </CardDescription>
                    </div>
                    {investment.completed ? (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                        Completed
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-medium">
                        In Progress
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 rounded-md bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">
                        Investment
                      </p>
                      <p className="font-medium">{investment.amount}</p>
                    </div>
                    <div className="p-2 rounded-md bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">
                        Milestone
                      </p>
                      <p
                        className="font-medium truncate"
                        title={investment.milestone}
                      >
                        {investment.milestone}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="font-medium text-foreground">
                        {investment.progress}%
                      </span>
                    </div>
                    <Progress
                      value={investment.progress}
                      className="h-2"
                      aria-label="Progress"
                      indicatorClassName="bg-primary"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    {!investment.completed ? (
                      <span className="text-sm text-amber-600 font-medium flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {investment.daysLeft} days left
                      </span>
                    ) : (
                      <span className="text-sm text-primary font-medium flex items-center">
                        <BarChart2 className="h-3.5 w-3.5 mr-1" />
                        Return: +12%
                      </span>
                    )}
                    <Link
                      href={`/investor/startups/${investment.id}`}
                      className="text-sm font-medium text-primary hover:text-primary/70 flex items-center"
                    >
                      View Details
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Link href="/investor/portfolio">
              <Button
                variant="outline"
                className="text-primary border-primary hover:bg-primary/5"
              >
                View All Investments
              </Button>
            </Link>
          </div>
        </TabsContent>

        {/* Recommended Startups Tab */}
        <TabsContent value="recommended" className="space-y-5">
          <h2 className="text-xl font-semibold text-foreground">
            Recommended For You
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {recommendedStartups.map((startup) => (
              <Card
                key={startup.id}
                className="overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <CardImage
                  src={`https://source.unsplash.com/random/800x600?${startup.category.toLowerCase()}`}
                  alt={startup.name}
                  aspectRatio="wide"
                  className="border-b border-border"
                />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-foreground">
                        {startup.name}
                      </CardTitle>
                      <CardDescription>
                        {startup.founder} • {startup.university}
                      </CardDescription>
                    </div>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {startup.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {startup.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Funding Goal:
                      </span>
                      <span className="font-medium text-foreground">
                        {startup.fundingGoal}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Raised So Far:
                      </span>
                      <span className="font-medium text-foreground">
                        {startup.raisedSoFar}
                      </span>
                    </div>
                    <Progress
                      value={
                        (Number.parseInt(
                          startup.raisedSoFar.replace(/[^0-9]/g, "")
                        ) /
                          Number.parseInt(
                            startup.fundingGoal.replace(/[^0-9]/g, "")
                          )) *
                        100
                      }
                      className="h-2"
                      indicatorClassName="bg-primary"
                    />
                  </div>

                  <div className="flex justify-end pt-2 border-t border-border">
                    <Link
                      href={`/investor/startups/${startup.id}`}
                      className="text-sm font-medium text-primary hover:text-primary/70 flex items-center"
                    >
                      View Startup
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Link href="/investor/startups">
              <Button
                variant="outline"
                className="text-primary border-primary hover:bg-primary/5"
              >
                Browse All Startups
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Stats Card Component
function StatsCard({
  title,
  value,
  description,
  icon,
  valueClassName,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground">
          {title}
        </CardTitle>
        <div className="rounded-full p-1 bg-primary/10">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", valueClassName)}>{value}</div>
        <p className="text-xs text-muted-foreground pt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

// Button component
function Button({
  children,
  variant = "default",
  className,
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
  [key: string]: any;
}) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium flex items-center justify-center transition-colors",
        variant === "default"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-transparent border border-input hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
