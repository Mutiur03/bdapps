import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  MessageSquare,
  Target,
  FolderKanban,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function UdayeeDashboard() {
  // Mock data - in a real app, this would come from an API
  const startupStats = {
    totalRaised: "৳18,000",
    fundingGoal: "৳25,000",
    activeInvestors: 3,
    completedMilestones: 2,
    pendingMilestones: 2,
    rating: 4.8,
    totalProjects: 3,
    activeProjects: 2,
  };

  const activeInvestments = [
    {
      id: "1",
      investorName: "Ayesha Khan",
      company: "Green Ventures",
      amount: "৳8,000",
      milestone: "Prototype Development",
      status: "completed",
      completedDate: "July 15, 2023",
      project: "EcoSolutions",
    },
    {
      id: "2",
      investorName: "Karim Rahman",
      company: "Tech Angels",
      amount: "৳7,000",
      milestone: "Pilot Testing",
      status: "in_progress",
      progress: 85,
      deadline: "May 15, 2025",
      project: "EcoSolutions",
    },
    {
      id: "3",
      investorName: "Sadia Ahmed",
      company: "Impact Investors",
      amount: "৳3,000",
      milestone: "Market Research & Validation",
      status: "completed",
      completedDate: "March 10, 2023",
      project: "StudyBuddy",
    },
  ];

  const recentMessages = [
    {
      id: "1",
      investorName: "Ayesha Khan",
      company: "Green Ventures",
      message:
        "I'm impressed with your progress on the pilot testing. Looking forward to seeing the results!",
      time: "2 hours ago",
      project: "EcoSolutions",
    },
    {
      id: "2",
      investorName: "Karim Rahman",
      company: "Tech Angels",
      message:
        "Can you share more details about your technology? I'd like to understand how the IoT sensors work.",
      time: "Yesterday",
      project: "EcoSolutions",
    },
    {
      id: "3",
      investorName: "Sadia Ahmed",
      company: "Impact Investors",
      message:
        "I'm considering investing in your next milestone. Let's discuss the details.",
      time: "3 days ago",
      project: "StudyBuddy",
    },
  ];

  // Calculate funding progress
  const fundingProgress =
    (Number.parseInt(startupStats.totalRaised.replace(/[^0-9]/g, "")) /
      Number.parseInt(startupStats.fundingGoal.replace(/[^0-9]/g, ""))) *
    100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Student Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your startup's progress.
        </p>
      </div>

      {/* Projects Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>My Projects</CardTitle>
            <CardDescription>Overview of your startup projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  {startupStats.totalProjects}
                </p>
                <p className="text-xs text-muted-foreground">Total Projects</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  {startupStats.activeProjects}
                </p>
                <p className="text-xs text-muted-foreground">Active Projects</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <Link href="/udayee/projects">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-secondary"
                >
                  View All Projects
                </Button>
              </Link>
              <Link href="/udayee/projects">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Project
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Funding Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Funding Progress</CardTitle>
            <CardDescription>
              Track your progress towards your funding goal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground">Raised so far</p>
                <p className="text-3xl font-bold text-secondary-foreground">
                  {startupStats.totalRaised}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Funding goal</p>
                <p className="text-xl font-medium text-secondary-foreground">
                  {startupStats.fundingGoal}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <Progress
                value={fundingProgress}
                className="h-2 bg-secondary"
                indicatorClassName="bg-primary"
              />
              <p className="text-sm text-right text-muted-foreground">
                {fundingProgress.toFixed(0)}% of goal
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  {startupStats.activeInvestors}
                </p>
                <p className="text-xs text-muted-foreground">
                  Active Investors
                </p>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  {startupStats.completedMilestones}
                </p>
                <p className="text-xs text-muted-foreground">
                  Completed Milestones
                </p>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-chart-3">
                  {startupStats.rating}
                </p>
                <p className="text-xs text-muted-foreground">Startup Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="investments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="investments">Active Investments</TabsTrigger>
          <TabsTrigger value="messages">Recent Messages</TabsTrigger>
        </TabsList>

        {/* Active Investments Tab */}
        <TabsContent value="investments" className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            Your Active Investments
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeInvestments.map((investment) => (
              <Card key={investment.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-secondary-foreground">
                        {investment.investorName}
                      </CardTitle>
                      <CardDescription>{investment.company}</CardDescription>
                    </div>
                    {investment.status === "completed" && (
                      <span className="text-xs px-2 py-1 rounded-full bg-ring text-foreground border border-border ">
                        Completed
                      </span>
                    )}
                    {investment.status === "in_progress" && (
                      <span className="text-xs px-2 py-1 rounded-full bg-chart-4 text-foreground border border-border">
                        In Progress
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Project:</span>
                    <span className="font-medium">{investment.project}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Investment:</span>
                    <span className="font-medium">{investment.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Milestone:</span>
                    <span className="font-medium">{investment.milestone}</span>
                  </div>

                  {investment.status === "in_progress" &&
                    investment.progress && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress:
                          </span>
                          <span className="font-medium">
                            {investment.progress}%
                          </span>
                        </div>
                        <Progress
                          value={investment.progress}
                          className="h-2 bg-secondary"
                          indicatorClassName="bg-primary"
                        />
                      </div>
                    )}

                  <div className="flex justify-between items-center pt-2">
                    {investment.status === "completed" ? (
                      <span className="text-sm text-primary">
                        Completed: {investment.completedDate}
                      </span>
                    ) : (
                      <span className="text-sm text-primary">
                        Deadline: {investment.deadline}
                      </span>
                    )}
                    <Link
                      href={`/udayee/chat/${investment.id}`}
                      className="text-sm font-medium flex items-center text-chart-3"
                    >
                      Contact
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/udayee/milestones">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-secondary"
              >
                View All Milestones
              </Button>
            </Link>
          </div>
        </TabsContent>

        {/* Recent Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            Recent Messages
          </h2>

          <div className="space-y-4">
            {recentMessages.map((message) => (
              <Card key={message.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 bg-muted">
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{message.investorName}</p>
                          <p className="text-xs text-muted-foreground">
                            {message.company} • Re: {message.project}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {message.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {message.message}
                      </p>
                      <div className="pt-2 flex justify-end">
                        <Link
                          href={`/udayee/chat/${message.id}`}
                          className="text-sm font-medium flex items-center text-primary"
                        >
                          Reply
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/udayee/messages">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-secondary"
              >
                View All Messages
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      {/* <div className="space-y-4">
        <h2 className="text-xl font-semibold text-primary">Quick Actions</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/udayee/projects">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-secondary">
                  <FolderKanban className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg text-foreground">
                  Manage Projects
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Create and manage your startup projects
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/udayee/milestones">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-secondary">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg text-foreground">
                  Manage Milestones
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Track progress and submit milestone deliverables
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/udayee/messages">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-secondary">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg text-foreground">
                  Message Investors
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Communicate with your investors and answer their questions
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div> */}
    </div>
  );
}

// Button component with updated styles for better visibility
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
