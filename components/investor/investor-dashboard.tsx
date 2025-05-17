import type React from "react";
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
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Investor Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your investments and recommended
          startups.
        </p>
      </div>

      {/* Stats Cards - 2 column grid layout for larger stats */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Investment Overview */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Investment Overview</CardTitle>
            <CardDescription>Summary of your portfolio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  {portfolioStats.totalInvested}
                </p>
                <p className="text-xs text-muted-foreground">Total Invested</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  {portfolioStats.activeInvestments}
                </p>
                <p className="text-xs text-muted-foreground">
                  Active Investments
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <Link href="/investor/portfolio">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-secondary"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Milestones Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Milestones Progress</CardTitle>
            <CardDescription>Track your investment returns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground">Return Rate</p>
                <p className="text-3xl font-bold text-secondary-foreground">
                  {portfolioStats.averageReturn}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Completed</p>
                <p className="text-xl font-medium text-secondary-foreground">
                  {portfolioStats.completedMilestones}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  {portfolioStats.activeInvestments}
                </p>
                <p className="text-xs text-muted-foreground">Active Startups</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  {portfolioStats.completedMilestones}
                </p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-chart-3">
                  {portfolioStats.pendingMilestones}
                </p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="investments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="investments">Active Investments</TabsTrigger>
          <TabsTrigger value="recommended">Recommended Startups</TabsTrigger>
        </TabsList>

        {/* Active Investments Tab */}
        <TabsContent value="investments" className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            Your Active Investments
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentInvestments.map((investment) => (
              <Card
                key={investment.id}
                className="overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-secondary-foreground">
                        {investment.startupName}
                      </CardTitle>
                      <CardDescription>
                        {investment.founder} • {investment.university}
                      </CardDescription>
                    </div>
                    {investment.completed ? (
                      <span className="bg-ring text-foreground text-xs px-2 py-1 rounded-full font-medium border border-border">
                        Completed
                      </span>
                    ) : (
                      <span className="bg-chart-4 text-foreground text-xs px-2 py-1 rounded-full font-medium border border-border">
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
                      className="h-2 bg-secondary"
                      indicatorClassName="bg-primary"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    {!investment.completed ? (
                      <span className="text-sm text-primary font-medium flex items-center">
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
                      className="text-sm font-medium text-chart-3 hover:text-chart-3/70 flex items-center"
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
                className="border-primary text-primary hover:bg-secondary"
              >
                View All Investments
              </Button>
            </Link>
          </div>
        </TabsContent>

        {/* Recommended Startups Tab */}
        <TabsContent value="recommended" className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            Recommended For You
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
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
                      <CardTitle className="text-secondary-foreground">
                        {startup.name}
                      </CardTitle>
                      <CardDescription>
                        {startup.founder} • {startup.university}
                      </CardDescription>
                    </div>
                    <span className="bg-ring text-foreground text-xs px-2 py-1 rounded-full border border-border">
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
                      className="h-2 bg-secondary"
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
                className="border-primary text-primary hover:bg-secondary"
              >
                Browse All Startups
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions - Added to match the udayee dashboard structure */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-primary">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/investor/startups">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-secondary">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg text-foreground">
                  Browse Startups
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Find new investment opportunities
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/investor/portfolio">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-secondary">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg text-foreground">
                  Portfolio Overview
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Track your investments and returns
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/investor/messages">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-secondary">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg text-foreground">
                  Message Startups
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Communicate with your portfolio companies
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Button component - updated to match udayee dashboard styling
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
          : "",
        variant === "outline"
          ? "bg-transparent border border-primary text-primary hover:bg-secondary"
          : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
