"use client";
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
  Settings,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useAdminStore from "@/store/useAdminStore";
export function AdminDashboard() {
  const { startups, investments, admin } = useAdminStore();
  const platformStats = {
    totalInvested: "৳245,000",
    activeInvestments: 15,
    completedMilestones: 42,
    pendingMilestones: 8,
    averageReturn: "+22%",
  };

  const managedInvestments = [
    {
      id: "1",
      startupName: "EcoSolutions",
      founder: "Rahul Ahmed",
      university: "BUET",
      amount: "৳18,000",
      milestone: "MVP Development",
      progress: 75,
      daysLeft: 4,
    },
    {
      id: "2",
      startupName: "HealthTech",
      founder: "Nusrat Khan",
      university: "Dhaka University",
      amount: "৳15,000",
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
      amount: "৳22,000",
      milestone: "Beta Launch",
      progress: 40,
      daysLeft: 8,
    },
  ];

  const pendingStartups = [
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
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Manage platform investments and connect with udayees.
        </p>
      </div>

      {/* Stats Cards - 2 column grid layout for larger stats */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Platform Investment Overview */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Your Investment Overview</CardTitle>
            <CardDescription>Summary of managed investments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  ৳{admin?.released_amount || "0"}
                </p>
                <p className="text-xs text-muted-foreground">Total Managed</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  {admin?.Project?.length || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  Active Investments
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <Link href="/admin/investments">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-secondary"
                >
                  Manage Investments
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Milestones Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>Track overall platform returns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground">Return Rate</p>
                <p className="text-3xl font-bold text-secondary-foreground">
                  22%
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Completed</p>
                <p className="text-xl font-medium text-secondary-foreground">
                  {
                    startups?.filter(
                      (startup) => startup.status === "completed"
                    ).length
                  }{" "}
                  Startups
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  {
                    startups?.filter((startup) => startup.status === "active")
                      .length
                  }
                </p>
                <p className="text-xs text-muted-foreground">Active Startups</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  {
                    startups?.filter(
                      (startup) => startup.status === "completed"
                    ).length
                  }
                </p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-chart-3">
                  {
                    startups?.filter((startup) => startup.status === "pending")
                      .length
                  }
                </p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="investments" className="space-y-4">
        {/* <TabsList>
          <TabsTrigger value="investments">Managed Investments</TabsTrigger>
          <TabsTrigger value="pending">Pending Applications</TabsTrigger>
        </TabsList> */}

        {/* Managed Investments Tab */}
        <TabsContent value="investments" className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            Platform Managed Investments
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {startups
              ?.filter((startup) => startup.status === "active")
              .map((investment) => (
                <Card
                  key={investment.id}
                  className="overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-secondary-foreground">
                          {investment.title}
                        </CardTitle>
                        <CardDescription>
                          {investment.user.name} • {investment.user.university}
                        </CardDescription>
                      </div>

                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium border border-green-200">
                        Active
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2 rounded-md bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">
                          Budget
                        </p>
                        <p className="font-medium">{investment.budget}</p>
                      </div>
                      <div className="p-2 rounded-md bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">
                          Milestone
                        </p>
                        <p className="font-medium truncate">
                          {investment.milestones?.[
                            investment.milestones.length - 1
                          ]?.title || "No milestone"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress:</span>
                        <span className="font-medium text-foreground">
                          {Math.round(
                            (Number(investment.raised_amount) /
                              parseInt(
                                investment.budget
                                  .toString()
                                  .replace(/[^0-9]/g, "")
                              )) *
                              100
                          ) || 0}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          Math.round(
                            (Number(investment.raised_amount) /
                              parseInt(
                                investment.budget
                                  .toString()
                                  .replace(/[^0-9]/g, "")
                              )) *
                              100
                          ) || 0
                        }
                        className="h-2 bg-secondary"
                      />
                    </div>
                    {/* 
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    {!investment.completed ? (
                      <span className="text-sm text-primary font-medium flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {investment.daysLeft} days left
                      </span>
                    ) : (
                      <span className="text-sm text-primary font-medium flex items-center">
                        <BarChart2 className="h-3.5 w-3.5 mr-1" />
                        Return: +15%
                      </span>
                    )}
                    <Link
                      href={`/admin/startups/${investment.id}`}
                      className="text-sm font-medium text-chart-3 hover:text-chart-3/70 flex items-center"
                    >
                      Manage
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div> */}
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="flex justify-center pt-2">
            <Link href="/admin/investments">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-secondary"
              >
                View All Investments
              </Button>
            </Link>
          </div>
        </TabsContent>

        {/* Pending Applications Tab */}
        <TabsContent value="pending" className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            Pending Startup Applications
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {pendingStartups.map((startup) => (
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
                        Current Progress:
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
                    />
                  </div>

                  <div className="flex justify-end pt-2 border-t border-border">
                    <Link
                      href={`/admin/applications/${startup.id}`}
                      className="text-sm font-medium text-primary hover:text-primary/70 flex items-center"
                    >
                      Review Application
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Link href="/admin/applications">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-secondary"
              >
                View All Applications
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions - Admin specific actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-primary">Admin Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/admin/applications">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-secondary">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg text-foreground">
                  Review Applications
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Approve or reject startup applications
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/investments">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-secondary">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg text-foreground">
                  Manage Investments
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Oversee platform investment portfolio
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/users">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-secondary">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg text-foreground">
                  User Management
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Manage udayees and platform users
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Button component - same as investor dashboard
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
