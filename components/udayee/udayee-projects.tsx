"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, ArrowUpRight, Target } from "lucide-react";
import Link from "next/link";
import { UdayeeCreateProjectDialog } from "@/components/udayee/udayee-create-project-dialog";
import { Milestone, useProjectStore } from "@/store/useProjectStore";
import useUserStore from "@/store/useUserStore";
import { Skeleton } from "@/components/ui/skeleton";

export function UdayeeProjects() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { loading } = useUserStore()
  const { projects } = useProjectStore();

  const activeProjects = !loading && projects
    ? projects.filter((project) => project.status === "active")
    : [];
  const draftProjects = !loading && projects
    ? projects.filter((project) => project.status === "draft")
    : [];
  const pendingProjects = !loading && projects
    ? projects.filter((project) => project.status === "pending")
    : [];
  const completedProjects = !loading && projects
    ? projects.filter((project) => project.status === "completed")
    : [];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-9 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />

          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            My Projects
          </h1>
          <p className="text-muted-foreground">Manage your startup projects</p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Create New Project
        </Button>
      </div>
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="pending">Pending Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed Projects</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        {/* Active Projects Tab */}
        <TabsContent value="active" className="space-y-6">
          {activeProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {activeProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <h3 className="text-lg font-medium">No Active Projects</h3>
                <p className="text-muted-foreground mt-2">
                  You don&apos;t have any active projects yet. Create a new project
                  to get started.
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Create New Project
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Pending Projects Tab */}
        <TabsContent value="pending" className="space-y-6">
          {pendingProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {pendingProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <h3 className="text-lg font-medium">No Pending Projects</h3>
                <p className="text-muted-foreground mt-2">
                  You don&apos;t have any pending projects yet. Create a new project
                  to get started.
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Create New Project
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {completedProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {completedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <h3 className="text-lg font-medium">No Completed Projects</h3>
                <p className="text-muted-foreground mt-2">
                  You don&apos;t have any completed projects yet. Create a new project
                  to get started.
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Create New Project
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        {/* Drafts Tab */}
        <TabsContent value="drafts" className="space-y-6">
          {draftProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {draftProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <h3 className="text-lg font-medium">No Draft Projects</h3>
                <p className="text-muted-foreground mt-2">
                  You don&apos;t have any draft projects. Create a new project and
                  save it as a draft.
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Create New Project
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      <UdayeeCreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />

        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>

        <Skeleton className="h-4 w-48" />
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardFooter>
    </Card>
  );
}

function ProjectCard({
  project,
}: {
  project: any;
}) {
  const { handlePublishProject } = useProjectStore();
  const fundingProgress =
    project.status === "active"
      ? ((project.raised_amount ? Number.parseInt(project.raised_amount.toString().replace(/[^0-9]/g, "") || "0") : 0) /
        (project.budget ? Number.parseInt(project.budget.toString().replace(/[^0-9]/g, "") || "0") : 1)) *
      100
      : 0;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-primary">
              {project.title}
            </CardTitle>
            <CardDescription>Created on {project.createdAt?.toString().split("T")[0] || "N/A"}</CardDescription>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${project.status === "active"
              ? "bg-muted text-primary"
              : project.status === "pending"
                ? "bg-amber-100 text-amber-700"
                : project.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-card text-muted-foreground"
              }`}
          >
            {project.status === "active"
              ? "Active"
              : project.status === "pending"
                ? "Pending"
                : project.status === "completed"
                  ? "Completed"
                  : "Draft"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description?.length > 50
            ? `${project.description.substring(0, 50)}...`
            : project.description || "No description"}
        </p>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Category:</span>
          <span className="font-medium text-secondary-foreground">
            {project.category.name || "Uncategorized"}
          </span>
        </div>

        {project.status === "active" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Funding Goal:</span>
                <span className="font-medium text-secondary-foreground">
                  {project.budget || "0"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Raised So Far:</span>
                <span className="font-medium text-secondary-foreground">
                  {project.raised_amount ? project.raised_amount : 0}
                </span>
              </div>
              <Progress
                value={fundingProgress}
                className="h-2 bg-secondary"
              />
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4 text-chart-4" />
                <span className="text-secondary-foreground">
                  {Array.isArray(project.milestones)
                    ? `${project.milestones.filter((milestone: Milestone) => milestone.status === "completed").length}/${project.milestones.length} milestones completed`
                    : "0/0 milestones completed"}
                </span>
              </div>
            </div>
          </>
        )}
        {project.status === "pending" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Funding Goal:</span>
                <span className="font-medium text-secondary-foreground">
                  {project.budget || "0"}
                </span>
              </div>

            </div>
          </>
        )}
        {project.status === "completed" && (
          <>
            <div className="space-y-2">

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Raised Amount:</span>
                <span className="font-medium text-secondary-foreground">
                  {project.raised_amount ? project.raised_amount : 0}
                </span>
              </div>
              <Progress
                value={fundingProgress}
                className="h-2 bg-secondary"
              />
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4 text-chart-4" />
                <span className="text-secondary-foreground">
                  {Array.isArray(project.milestones)
                    ? `${project.milestones.filter((milestone: Milestone) => milestone.status === "completed").length}/${project.milestones.length} milestones completed`
                    : "0/0 milestones completed"}
                </span>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex gap-2"></div>
        <div className="flex gap-2">
          {project.status === "active" || project.status === 'pending' ? (
            <>
              <Link href={`/udayee/projects/${project.id}/preview`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  Preview
                </Button>
              </Link>
              <Link href={`/udayee/projects/${project.id}/manage`}>
                <Button
                  size="sm"
                  className="h-8 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1"
                >
                  Manage
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </>
          ) : project.status === 'completed' ? (
            <>
              <Link href={`/udayee/projects/${project.id}/preview`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  View Details
                </Button>
              </Link>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => handlePublishProject(project.id)}
              className="h-8 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1"
            >
              Publish
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
