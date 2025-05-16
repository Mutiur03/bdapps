"use client";

import { useState } from "react";
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
import { Plus, Edit, Trash2, Eye, ArrowUpRight, Target } from "lucide-react";
import Link from "next/link";
import { UdayeeCreateProjectDialog } from "@/components/udayee/udayee-create-project-dialog";
import { useToast } from "@/hooks/use-toast";

export function UdayeeProjects() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "EcoSolutions",
      description: "Sustainable waste management solutions for urban areas",
      category: "Environment",
      fundingGoal: "৳25,000",
      raisedSoFar: "৳18,000",
      status: "active",
      milestones: 4,
      completedMilestones: 2,
      createdAt: "January 15, 2023",
    },
    {
      id: "2",
      name: "StudyBuddy",
      description: "AI-powered study assistant for university students",
      category: "Education",
      fundingGoal: "৳15,000",
      raisedSoFar: "৳3,000",
      status: "active",
      milestones: 3,
      completedMilestones: 0,
      createdAt: "March 10, 2023",
    },
    {
      id: "3",
      name: "LocalFresh",
      description: "Connecting local farmers with urban consumers",
      category: "Agriculture",
      fundingGoal: "৳20,000",
      raisedSoFar: "৳0",
      status: "draft",
      milestones: 3,
      completedMilestones: 0,
      createdAt: "April 5, 2023",
    },
  ]);

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));

    toast({
      title: "Project Deleted",
      description: "Your project has been successfully deleted.",
    });
  };

  const activeProjects = projects.filter(
    (project) => project.status === "active"
  );
  const draftProjects = projects.filter(
    (project) => project.status === "draft"
  );

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
                  onDelete={() => handleDeleteProject(project.id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <h3 className="text-lg font-medium">No Active Projects</h3>
                <p className="text-muted-foreground mt-2">
                  You don't have any active projects yet. Create a new project
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
                  onDelete={() => handleDeleteProject(project.id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <h3 className="text-lg font-medium">No Draft Projects</h3>
                <p className="text-muted-foreground mt-2">
                  You don't have any draft projects. Create a new project and
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

function ProjectCard({
  project,
  onDelete,
}: {
  project: any;
  onDelete: () => void;
}) {
  const fundingProgress =
    project.status === "active"
      ? (Number.parseInt(project.raisedSoFar.replace(/[^0-9]/g, "")) /
          Number.parseInt(project.fundingGoal.replace(/[^0-9]/g, ""))) *
        100
      : 0;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-primary">
              {project.name}
            </CardTitle>
            <CardDescription>Created on {project.createdAt}</CardDescription>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              project.status === "active"
                ? "bg-muted text-primary"
                : "bg-card text-muted-foreground"
            }`}
          >
            {project.status === "active" ? "Active" : "Draft"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Category:</span>
          <span className="font-medium text-secondary-foreground">
            {project.category}
          </span>
        </div>

        {project.status === "active" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Funding Goal:</span>
                <span className="font-medium text-secondary-foreground">
                  {project.fundingGoal}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Raised So Far:</span>
                <span className="font-medium text-secondary-foreground">
                  {project.raisedSoFar}
                </span>
              </div>
              <Progress
                value={fundingProgress}
                className="h-2 bg-secondary"
                indicatorClassName="bg-primary"
              />
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4 text-chart-4" />
                <span className="text-secondary-foreground">
                  {project.completedMilestones}/{project.milestones} milestones
                  completed
                </span>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex gap-2"></div>
        <div className="flex gap-2">
          {project.status === "active" ? (
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
          ) : (
            <Button
              size="sm"
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
