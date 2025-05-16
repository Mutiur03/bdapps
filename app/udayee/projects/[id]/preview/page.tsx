"use client";

import React from "react";
import { useState } from "react";
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
  Play,
  Image as ImageIcon,
  ThumbsUp,
  Share2,
  Star,
  BookOpen,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ProjectPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params to access id property
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;

  // Mock data - in a real app, this would come from an API based on the ID
  const project = {
    id: id,
    name: "EcoSolutions",
    creator: "Rahul Ahmed",
    university: "BUET",
    department: "Environmental Engineering",
    coverImage:
      "https://images.unsplash.com/photo-1553787434-dd9eb4ea4d1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    profileImage:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    description:
      "EcoSolutions is developing sustainable waste management solutions for urban areas in Bangladesh. Our innovative approach combines IoT sensors with community engagement to reduce waste and promote recycling.",
    longDescription:
      "Bangladesh faces significant challenges in waste management, especially in urban areas. EcoSolutions aims to address this problem through a combination of technology and community engagement. Our solution uses IoT sensors to monitor waste levels in bins and optimize collection routes, while our mobile app encourages citizens to participate in recycling initiatives through gamification and rewards. We've already conducted successful pilots in two neighborhoods in Dhaka, showing a 30% reduction in waste sent to landfills.",
    pitchVideoUrl: "https://example.com/pitch-video",
    goal: "৳25,000",
    raised: "৳18,000",
    category: "Environment",
    tags: ["sustainability", "waste management", "urban", "IoT", "community"],
    rating: 4.8,
    reviewCount: 12,
    createdDate: "January 2023",
    teamSize: 3,
    likes: 120,
    views: 1450,
    milestones: [
      {
        id: "m1",
        title: "Market Research & Validation",
        description:
          "Conduct surveys and interviews with potential users to validate the problem and solution.",
        amount: "৳3,000",
        status: "completed",
        completedDate: "March 2023",
      },
      {
        id: "m2",
        title: "Prototype Development",
        description:
          "Build a working prototype of the IoT sensor and mobile app.",
        amount: "৳8,000",
        status: "completed",
        completedDate: "July 2023",
      },
      {
        id: "m3",
        title: "Pilot Testing",
        description:
          "Deploy the prototype in two neighborhoods in Dhaka for initial testing.",
        amount: "৳7,000",
        status: "in_progress",
        progress: 85,
        deadline: "May 15, 2025",
      },
      {
        id: "m4",
        title: "MVP Launch",
        description: "Launch the minimum viable product to the public.",
        amount: "৳7,000",
        status: "planned",
        deadline: "August 2025",
      },
    ],
    updates: [
      {
        id: "u1",
        title: "Pilot Testing Progress",
        content:
          "We've successfully deployed our sensors in 15 waste bins across two neighborhoods. Initial data shows a 30% improvement in collection efficiency.",
        date: "April 28, 2025",
      },
      {
        id: "u2",
        title: "New Team Member",
        content:
          "We're excited to welcome Farah Khan, a mobile developer, to our team. She'll be leading the development of our community engagement app.",
        date: "April 15, 2025",
      },
      {
        id: "u3",
        title: "Partnership with Local NGO",
        content:
          "We've partnered with GreenBangladesh to help with community outreach and education about recycling practices.",
        date: "March 30, 2025",
      },
    ],
  };

  // Calculate funding progress
  const fundingProgress =
    (Number.parseInt(project.raised.replace(/[^0-9]/g, "")) /
      Number.parseInt(project.goal.replace(/[^0-9]/g, ""))) *
    100;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      {/* Hero Image Section */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="h-64 md:h-80">
          <CardImage
            src={project.coverImage}
            alt={`${project.name} cover image`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white space-y-2 w-full">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden bg-white border-2 border-white">
                <CardImage
                  src={project.profileImage}
                  alt={`${project.name} logo`}
                  aspectRatio="square"
                  className="h-full w-full object-cover"
                  fallback={
                    <div className="bg-primary/20 text-primary h-full w-full flex items-center justify-center font-semibold text-2xl">
                      {project.name.charAt(0)}
                    </div>
                  }
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {project.name}
                </h1>
                <p className="text-white/80">
                  {project.creator} • {project.university} •{" "}
                  {project.department}
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
            {project.category}
          </Badge>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-medium">{project.rating}</span>
            <span className="text-muted-foreground text-sm">
              ({project.reviewCount})
            </span>
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
          <Link href={`/udayee/chat/${project.id}`}>
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
            <CardImage
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Video thumbnail"
              aspectRatio="video"
              fallback={
                <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-8">
                  <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-muted-foreground">
                    Video preview not available
                  </p>
                </div>
              }
            />
            <CardContent className="flex justify-center py-4">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-primary"
              >
                <Play className="h-4 w-4 text-primary fill-current" />
                Play Project Video
              </Button>
            </CardContent>
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
                    {project.longDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-amber-500" />
                        {project.createdDate}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Team Size</p>
                      <p className="font-medium flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-500" />
                        {project.teamSize} members
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{project.category}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Engagement
                      </p>
                      <p className="font-medium flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-amber-500" />
                        {project.views} views • {project.likes} likes
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                      >
                        #{tag}
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
                  {project.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="relative pl-8 pb-6 border-l border-gray-200 last:border-0 last:pb-0"
                    >
                      {/* Milestone Status Indicator */}
                      <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center">
                        {milestone.status === "completed" ? (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                            <Target className="h-3 w-3" />
                          </div>
                        ) : milestone.status === "in_progress" ? (
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
                            {milestone.title}
                            {milestone.status === "completed" && (
                              <Badge
                                variant="outline"
                                className="bg-primary/10 text-primary border-primary/20"
                              >
                                Completed
                              </Badge>
                            )}
                            {milestone.status === "in_progress" && (
                              <Badge
                                variant="outline"
                                className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                              >
                                In Progress
                              </Badge>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {milestone.description}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-medium">{milestone.amount}</p>
                          {milestone.status === "completed" &&
                            milestone.completedDate && (
                              <p className="text-xs text-muted-foreground">
                                Completed: {milestone.completedDate}
                              </p>
                            )}
                          {milestone.status === "in_progress" &&
                            milestone.deadline && (
                              <p className="text-xs text-muted-foreground">
                                Deadline: {milestone.deadline}
                              </p>
                            )}
                          {milestone.status === "planned" &&
                            milestone.deadline && (
                              <p className="text-xs text-muted-foreground">
                                Planned: {milestone.deadline}
                              </p>
                            )}
                        </div>
                      </div>

                      {milestone.status === "in_progress" &&
                        milestone.progress && (
                          <div className="mt-3 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">
                                Progress:
                              </span>
                              <span>{milestone.progress}%</span>
                            </div>
                            <Progress
                              value={milestone.progress}
                              className="h-1.5 bg-primary/10"
                            />
                          </div>
                        )}
                    </div>
                  ))}
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
                  {project.updates.map((update) => (
                    <div
                      key={update.id}
                      className="space-y-2 pb-4 border-b last:border-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{update.title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {update.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {update.content}
                      </p>
                    </div>
                  ))}
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
                  <span className="font-medium">{project.raised}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Funding goal</span>
                  <span className="font-medium">{project.goal}</span>
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
                <Link href={`/udayee/chat/${project.id}`} className="w-full">
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
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:bg-primary/5 hover:text-primary"
              >
                <FileText className="h-4 w-4 mr-2" />
                Project Proposal.pdf
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:bg-primary/5 hover:text-primary"
              >
                <FileText className="h-4 w-4 mr-2" />
                Research Summary.pdf
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:bg-primary/5 hover:text-primary"
              >
                <FileText className="h-4 w-4 mr-2" />
                Project Roadmap.pdf
              </Button>
            </CardContent>
          </Card>

          {/* Project Timeline Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3">
                {[
                  { event: "Project Created", date: "January 15, 2023" },
                  {
                    event: "First Milestone Completed",
                    date: "March 22, 2023",
                  },
                  {
                    event: "Second Milestone Completed",
                    date: "July 10, 2023",
                  },
                  { event: "Current Phase", date: "In progress" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-primary" />
                      <span>{item.event}</span>
                    </div>
                    <span className="text-muted-foreground">{item.date}</span>
                  </div>
                ))}
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
