'use client'
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
import { useProjectStore } from "@/store/useProjectStore";
import { useEffect } from "react";

export function UdayeeDashboard() {
  const { projects, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const calculateStats = () => {
    const activeProjects = projects.filter((p) => p.status === "active").length;
    const totalRaised = projects.reduce(
      (sum, project) => sum + (project.raised_amount || 0),
      0
    );
    const totalBudget = projects.reduce(
      (sum, project) => sum + (project.budget || 0),
      0
    );

    return {
      totalRaised: `৳${totalRaised.toLocaleString()}`,
      fundingGoal: `৳${totalBudget.toLocaleString()}`,
      activeInvestors: 3,
      rating: 4.8,
      totalProjects: projects.length,
      activeProjects,
    };
  };

  const startupStats = calculateStats();

  const activeProjects = projects.filter((p) => p.status === "active");
  const recentProjects = projects.slice(0, 3);

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

            {/* <div className="grid grid-cols-3 gap-4 pt-2">
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
                  {startupStats.totalProjects}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total Projects
                </p>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-chart-3">
                  {startupStats.rating}
                </p>
                <p className="text-xs text-muted-foreground">Startup Rating</p>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-primary">Project Summaries</h2>
          <Link href="/udayee/projects">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-secondary"
            >
              View All Projects
            </Button>
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const fundingProgress = project.budget
                ? ((project.raised_amount || 0) / project.budget) * 100
                : 0;

              return (
                <Card key={project.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-secondary-foreground line-clamp-2">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description || "No description available"}
                        </CardDescription>
                      </div>
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-full border border-border ml-2",
                          project.status === "active"
                            ? "bg-ring text-foreground"
                            : project.status === "draft"
                              ? "bg-chart-4 text-foreground"
                              : "bg-muted text-muted-foreground"
                        )}
                      >
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {project.category && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium">
                          {typeof project.category === "object"
                            ? project.category.name
                            : project.category}
                        </span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Funding:</span>
                        <span className="font-medium">
                          ৳{(project.raised_amount || 0).toLocaleString()} / ৳
                          {(project.budget || 0).toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={fundingProgress}
                        className="h-2 bg-secondary"
                        indicatorClassName="bg-primary"
                      />
                      <p className="text-xs text-right text-muted-foreground">
                        {fundingProgress.toFixed(0)}% funded
                      </p>
                    </div>

                    {project.projectMembers && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Team Size:</span>
                        <span className="font-medium">
                          {project.projectMembers.length} members
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2">
                      <Link
                        href={`/udayee/projects/${project.id}/preview`}
                        className="text-sm font-medium flex items-center text-primary"
                      >
                        View Details
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Link>
                      {project.status === "draft" && (
                        <Link
                          href={`/udayee/projects/${project.id}/manage`}
                          className="text-sm font-medium flex items-center text-chart-3"
                        >
                          Edit
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <FolderKanban className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No Projects Yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your first project to start building your startup
                portfolio.
              </p>
              <Link href="/udayee/projects">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create First Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        {/* <TabsList>
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList> */}

        {/* <TabsContent value="projects" className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            Your Active Projects
          </h2>

          {activeProjects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeProjects.map((project) => {
                const fundingProgress = project.budget
                  ? ((project.raised_amount || 0) / project.budget) * 100
                  : 0;

                return (
                  <Card key={project.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-secondary-foreground">
                            {project.title}
                          </CardTitle>
                          <CardDescription>
                            {typeof project.category === "object"
                              ? project.category.name
                              : project.category}
                          </CardDescription>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-ring text-foreground border border-border">
                          Active
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-medium">
                          ৳{(project.budget || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Raised:</span>
                        <span className="font-medium">
                          ৳{(project.raised_amount || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Team:</span>
                        <span className="font-medium">
                          {project.projectMembers?.length || 1} members
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress:</span>
                          <span className="font-medium">
                            {fundingProgress.toFixed(0)}% funded
                          </span>
                        </div>
                        <Progress
                          value={fundingProgress}
                          className="h-2 bg-secondary"
                          indicatorClassName="bg-primary"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm text-primary">
                          Created: {new Date(project.createdAt || "").toLocaleDateString()}
                        </span>
                        <Link
                          href={`/udayee/projects/${project.id}`}
                          className="text-sm font-medium flex items-center text-chart-3"
                        >
                          View Details
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No Active Projects
                </h3>
                <p className="text-muted-foreground mb-4">
                  Publish your draft projects to make them active and start receiving funding.
                </p>
                <Link href="/udayee/projects">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Manage Projects
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-center">
            <Link href="/udayee/projects">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-secondary"
              >
                View All Projects
              </Button>
            </Link>
          </div>
        </TabsContent> */}

        {/* <TabsContent value="recent" className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            Recent Projects
          </h2>

          {recentProjects.length > 0 ? (
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 bg-muted">
                        <FolderKanban className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{project.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {typeof project.category === "object"
                                ? project.category.name
                                : project.category} •
                              Status: {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(project.updatedAt || project.createdAt || "").toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description || "No description available"}
                        </p>
                        <div className="pt-2 flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Budget: ৳{(project.budget || 0).toLocaleString()}
                          </span>
                          <Link
                            href={`/udayee/projects/${project.id}`}
                            className="text-sm font-medium flex items-center text-primary"
                          >
                            View Project
                            <ArrowUpRight className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No Projects Yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Create your first project to start tracking your startup journey.
                </p>
                <Link href="/udayee/projects">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Create Project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-center">
            <Link href="/udayee/projects">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-secondary"
              >
                View All Projects
              </Button>
            </Link>
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}

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
