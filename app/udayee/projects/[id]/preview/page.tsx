"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardImage,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Calendar,
  Target,
  FileText,
  Users,
  ArrowRight,
  ThumbsUp,
  Share2,
  Star,
  Clock,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Milestone, useProjectStore } from "@/store/useProjectStore";
import { safeUrl } from "../manage/page";
import { format } from "date-fns";

export default function ProjectPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params to access id property
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const { projects, fetchProjects } = useProjectStore();
  const [isLoading, setIsLoading] = useState(!projects || projects.length === 0);
  const videoref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    // Fetch projects when the component mounts or when projects is empty
    if (!projects || projects.length === 0) {
      setIsLoading(true);
      fetchProjects()
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error("Error fetching projects:", error);
          setIsLoading(false);
        });
    }
  }, [fetchProjects, projects]);

  const project = projects.find((project) => String(project.id) === id);

  // Calculate funding progress
  const fundingProgress = project
    ? (Number.parseInt(project.raised_amount?.toString().replace(/[^0-9]/g, "") || "0") /
      Number.parseInt(project.budget?.toString().replace(/[^0-9]/g, "") || "1")) *
    100
    : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Project Not Found</h2>
          <p className="text-muted-foreground">
            The project you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
          </p>
          <Link href="/udayee/projects">
            <Button>Browse Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      {/* Hero Image Section */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="h-64 md:h-80">
          <CardImage
            src={safeUrl(project?.cover_image)}
            alt={`${project?.title} cover image`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white space-y-2 w-full">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden bg-white border-2 border-white">
                <CardImage
                  src={safeUrl(project?.profile_picture)}
                  alt={`${project?.title} logo`}
                  aspectRatio="square"
                  className="h-full w-full object-cover"
                  fallback={
                    <div className="bg-primary/20 text-primary h-full w-full flex items-center justify-center font-semibold text-2xl">
                      {project?.title.charAt(0)}
                    </div>
                  }
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {project?.title}
                </h1>
                <p className="text-white/80">
                  {project?.projectMembers?.[0]?.user?.name} • {project?.projectMembers?.[0]?.user?.university} •{" "}
                  {project?.projectMembers?.[0]?.user?.department}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3">
          <Badge className="bg-primary hover:bg-primary/90">
            {project?.category}
          </Badge>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            size="sm"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Link href={`/udayee/chat/${project?.id}`}>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              size="sm"
            >
              <MessageSquare className="h-4 w-4" />
              Contact Creator
            </Button>
          </Link>
          <Button
            className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
            size="sm"
          >
            <ThumbsUp className="h-4 w-4" />
            Support Project
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Project Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pitch Video Card */}
          <Card className="overflow-hidden">
            {project?.pitch_video && (
              <iframe
                className="w-full aspect-video"
                src={safeUrl(project?.pitch_video)}
                title="Project Pitch Video"
                ref={videoref}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              >
              </iframe>
            )}
          </Card>

          {/* Tabs for Details, Milestones, Updates */}
          <Tabs defaultValue="about" className="space-y-4">
            <TabsList className="grid grid-cols-3 p-0 bg-transparent">
              <TabsTrigger
                value="about"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 font-medium"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="milestones"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 font-medium"
              >
                Milestones
              </TabsTrigger>
              <TabsTrigger
                value="updates"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 font-medium"
              >
                Updates
              </TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">
                    About the Project
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {project?.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-amber-500" />
                        {format(
                          new Date(project?.createdAt || ""),
                          "MMMM dd, yyyy")}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Team Size</p>
                      <p className="font-medium flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-500" />
                        {project?.projectMembers?.length} members
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{project?.category}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Engagement
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {(project?.tags?.split(',') || []).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-primary/5 text-primary border-primary/20 flex items-center gap-1"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Milestones Tab */}
            <TabsContent value="milestones" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">
                    Project Milestones
                  </CardTitle>
                  <CardDescription>
                    The creator has broken down their project into these
                    milestones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {project.milestones && project.milestones.length > 0 ? (
                    project.milestones.map((milestone, index) => (
                      <div
                        key={typeof milestone === "object" ? milestone.id : `milestone-${index}`}
                        className="relative pl-8 pb-6 border-l border-gray-200 last:border-0 last:pb-0"
                      >
                        {/* Milestone Status Indicator */}
                        <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center">
                          {typeof milestone === "object" && milestone.status === "completed" ? (
                            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                              <Target className="h-3 w-3" />
                            </div>
                          ) : typeof milestone === "object" && milestone.status === "in-progress" ? (
                            <div className="bg-amber-500/20 text-amber-500 w-6 h-6 rounded-full flex items-center justify-center">
                              <Target className="h-3 w-3" />
                            </div>
                          ) : (
                            <div className="bg-gray-100 text-gray-500 w-6 h-6 rounded-full flex items-center justify-center">
                              <Target className="h-3 w-3" />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-base flex items-center gap-2">
                              {typeof milestone === "object"
                                ? milestone.title
                                : typeof milestone === "string"
                                  ? milestone
                                  : "Milestone"}

                              {typeof milestone === "object" && milestone.status === "completed" && (
                                <Badge
                                  variant="outline"
                                  className="bg-primary/10 text-primary border-primary/20"
                                >
                                  Completed
                                </Badge>
                              )}
                              {typeof milestone === "object" && milestone.status === "in-progress" && (
                                <Badge
                                  variant="outline"
                                  className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                                >
                                  In Progress
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {typeof milestone === "object" ? milestone.description : ""}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-medium">
                              {typeof milestone === "object" && milestone.amount
                                ? `$${milestone.amount}`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No milestones available for this project yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Updates Tab */}
            <TabsContent value="updates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Latest Updates</CardTitle>
                  <CardDescription>
                    Recent progress and announcements from the project team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">No updates available for this project yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Project Status & Actions */}
        <div className="space-y-6">
          {/* Project Status Card */}
          <Card className="border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-primary">Project Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Raised so far</span>
                  <span className="font-medium">{project?.raised_amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Funding goal</span>
                  <span className="font-medium">{project?.budget}</span>
                </div>
                <Progress
                  value={fundingProgress}
                  className="h-2 bg-primary/10"
                />
                <p className="text-xs text-right text-muted-foreground">
                  {fundingProgress.toFixed(0)}% of goal
                </p>
              </div>

              <div className="pt-2 space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Support This Project
                </Button>
                <Link href={`/udayee/chat/${project?.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Contact Creator
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Project Resources Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.documents && project.documents.length > 0 ? (
                project.documents.map((doc, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    onClick={() => window.open(safeUrl(doc), '_blank')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {doc.document.split('/').pop().split('-').pop()}
                  </Button>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No resources available for this project yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Project Timeline Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3">
                {/* Add Project Creation as first timeline event */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-primary" />
                    <span>Project Created</span>
                  </div>
                  <span className="text-muted-foreground">{project?.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>

                {/* Display milestone timeline events */}
                {project.milestones && project.milestones.length > 0 ? (
                  project.milestones.map((milestone, index) => {
                    const milestoneObj: Milestone = typeof milestone === 'object' ? milestone : { title: milestone, status: 'planned' };
                    let dateValue = '';
                    if (milestoneObj.status === 'completed' && milestoneObj.completedAt) {
                      dateValue = new Date(milestoneObj.completedAt).toLocaleDateString();
                    } else if (milestoneObj.status === 'in-progress') {
                      dateValue = 'Current phase';
                    } else if (milestoneObj.plannedAt) {
                      console.log(milestoneObj.plannedAt);
                      dateValue = new Date(milestoneObj.plannedAt).toLocaleDateString();
                    }

                    return (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          {milestoneObj.status === 'completed' ? (
                            <Target className="h-3 w-3 text-primary" />
                          ) : milestoneObj.status === 'in-progress' ? (
                            <Clock className="h-3 w-3 text-amber-500" />
                          ) : (
                            <Clock className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span>{milestoneObj.title || `Milestone ${index + 1}`}</span>
                        </div>
                        <span className="text-muted-foreground">{dateValue}</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-muted-foreground text-sm">No milestone data available</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Similar Projects Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Similar Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
              <div className="space-y-0">
                {[
                  {
                    name: "GreenTech",
                    description: "Renewable energy solutions",
                    image:
                      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
                    href: "/udayee/projects/preview/green-tech",
                  },
                  {
                    name: "RecyclePro",
                    description: "Plastic recycling technology",
                    image:
                      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
                    href: "/udayee/projects/preview/recycle-pro",
                  },
                  {
                    name: "CleanWater",
                    description: "Water purification systems",
                    image:
                      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
                    href: "/udayee/projects/preview/clean-water",
                  },
                ].map((similarProject, index) => (
                  <Link
                    key={index}
                    href={similarProject.href}
                    className="block"
                  >
                    <div className="flex items-center gap-3 p-4 hover:bg-slate-50 border-b last:border-b-0">
                      <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                        <CardImage
                          src={similarProject.image}
                          alt={similarProject.name}
                          aspectRatio="square"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">
                          {similarProject.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {similarProject.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/udayee/projects" className="w-full">
                <Button
                  variant="outline"
                  className="w-full text-sm hover:text-primary hover:border-primary"
                >
                  Browse All Projects
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
