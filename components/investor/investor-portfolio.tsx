import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Calendar,
  Target,
  Star,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function InvestorPortfolio() {
  // Mock data - in a real app, this would come from an API
  const portfolioStats = {
    totalInvested: "৳45,000",
    activeInvestments: 5,
    completedMilestones: 12,
    pendingMilestones: 3,
    averageReturn: "+18%",
  };

  const activeInvestments = [
    {
      id: "1",
      startupName: "EcoSolutions",
      founder: "Rahul Ahmed",
      university: "BUET",
      amount: "৳18,000",
      totalMilestones: 4,
      completedMilestones: 2,
      inProgressMilestones: 1,
      plannedMilestones: 1,
      progress: 65,
      rating: 4.8,
      category: "Environment",
      investmentDate: "January 15, 2023",
      milestones: [
        {
          id: "m1",
          title: "Market Research & Validation",
          amount: "৳3,000",
          status: "completed",
          completedDate: "March 10, 2023",
        },
        {
          id: "m2",
          title: "Prototype Development",
          amount: "৳8,000",
          status: "completed",
          completedDate: "July 15, 2023",
        },
        {
          id: "m3",
          title: "Pilot Testing",
          amount: "৳7,000",
          status: "in_progress",
          progress: 85,
          deadline: "May 15, 2025",
        },
      ],
    },
    {
      id: "2",
      startupName: "HealthTech",
      founder: "Nusrat Khan",
      university: "Dhaka University",
      amount: "৳12,000",
      totalMilestones: 3,
      completedMilestones: 2,
      inProgressMilestones: 1,
      plannedMilestones: 0,
      progress: 80,
      rating: 4.5,
      category: "Healthcare",
      investmentDate: "March 5, 2023",
      milestones: [
        {
          id: "m1",
          title: "Market Research",
          amount: "৳5,000",
          status: "completed",
          completedDate: "April 20, 2023",
        },
        {
          id: "m2",
          title: "Prototype Development",
          amount: "৳7,000",
          status: "in_progress",
          progress: 60,
          deadline: "June 30, 2025",
        },
      ],
    },
    {
      id: "3",
      startupName: "EduConnect",
      founder: "Tanvir Rahman",
      university: "NSU",
      amount: "৳15,000",
      totalMilestones: 3,
      completedMilestones: 3,
      inProgressMilestones: 0,
      plannedMilestones: 0,
      progress: 100,
      rating: 5.0,
      category: "Education",
      investmentDate: "February 10, 2023",
      milestones: [
        {
          id: "m1",
          title: "Market Research",
          amount: "৳3,000",
          status: "completed",
          completedDate: "March 15, 2023",
        },
        {
          id: "m2",
          title: "MVP Development",
          amount: "৳7,000",
          status: "completed",
          completedDate: "June 20, 2023",
        },
        {
          id: "m3",
          title: "Beta Launch",
          amount: "৳5,000",
          status: "completed",
          completedDate: "September 5, 2023",
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Investment Portfolio
        </h1>
        <p className="text-muted-foreground">
          Track and manage your startup investments
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
          title="Completed Milestones"
          value={portfolioStats.completedMilestones.toString()}
          description={`${portfolioStats.pendingMilestones} pending milestones`}
          icon={<Target className="h-4 w-4 text-primary" />}
        />
        <StatsCard
          title="Investment Period"
          value="8 months"
          description="Average investment duration"
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

      {/* Main Content */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-muted text-muted-foreground p-1 rounded-md">
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            Active Investments
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            Performance
          </TabsTrigger>
        </TabsList>

        {/* Active Investments Tab */}
        <TabsContent value="active" className="space-y-6">
          {activeInvestments.map((investment) => (
            <Card
              key={investment.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                      {investment.startupName.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-foreground">
                        {investment.startupName}
                      </CardTitle>
                      <CardDescription>
                        {investment.founder} • {investment.university} •{" "}
                        {investment.category}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm flex items-center gap-1 px-2 py-1 rounded-full bg-muted">
                      <Star className="h-4 w-4 text-primary fill-current" />
                      <span className="font-medium">{investment.rating}</span>
                    </span>
                    <Link href={`/investor/startups/${investment.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-primary border-primary hover:bg-primary/10"
                      >
                        View Startup
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 rounded-md bg-muted/30 p-3">
                    <p className="text-sm text-muted-foreground">
                      Total Investment
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {investment.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Invested on {investment.investmentDate}
                    </p>
                  </div>
                  <div className="space-y-2 rounded-md bg-muted/30 p-3">
                    <p className="text-sm text-muted-foreground">Milestones</p>
                    <div className="flex gap-2 flex-wrap">
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        {investment.completedMilestones} Completed
                      </div>
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium opacity-80">
                        {investment.inProgressMilestones} In Progress
                      </div>
                      <div className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs font-medium">
                        {investment.plannedMilestones} Planned
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 rounded-md bg-muted/30 p-3">
                    <p className="text-sm text-muted-foreground">
                      Overall Progress
                    </p>
                    <Progress
                      value={investment.progress}
                      className="h-2"
                    />
                    <div className="flex justify-between items-center text-xs">
                      <p className="text-muted-foreground">Progress</p>
                      <p className="font-medium">
                        {investment.progress}% complete
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center border-b border-border pb-2">
                    <h3 className="text-sm font-medium text-foreground">
                      Recent Milestones
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-primary hover:text-primary p-0"
                    >
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {investment.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="border rounded-lg p-3 flex justify-between items-center hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              milestone.status === "completed"
                                ? "bg-primary/10 text-primary"
                                : milestone.status === "in_progress"
                                ? "bg-amber-100 text-primary opacity-80"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            <Target className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {milestone.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {milestone.amount}
                            </p>
                          </div>
                        </div>
                        <div>
                          {milestone.status === "completed" ? (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              Completed on {milestone.completedDate}
                            </span>
                          ) : milestone.status === "in_progress" ? (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                              Due {milestone.deadline}
                            </span>
                          ) : (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                              Planned
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <Link href={`/investor/chat/${investment.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-foreground hover:bg-muted"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Contact Founder
                    </Button>
                  </Link>
                  <Link href={`/investor/startups/${investment.id}`}>
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                      size="sm"
                    >
                      View Details
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Completed Investments Tab */}
        <TabsContent value="completed">
          <Card>
            <CardContent className="py-16 text-center">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                No Completed Investments Yet
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                When your investments are fully completed, they will appear
                here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <Card>
            <CardContent className="py-16 text-center">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                Investment Performance Analytics
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Detailed performance analytics will be available here soon.
              </p>
            </CardContent>
          </Card>
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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground">
          {title}
        </CardTitle>
        <div className="rounded-full p-1.5 bg-primary/10">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", valueClassName)}>{value}</div>
        <p className="text-xs text-muted-foreground pt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
