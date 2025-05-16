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
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  Target,
  FileImage,
  Users,
  MessageSquare,
  ChevronDown,
  Plus,
  Trash2,
  Save,
  FileCheck,
  FileText,
  Eye,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Placeholder image utility
const placeholders = {
  cover:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23f1f5f9'/%3E%3Ctext x='400' y='200' font-family='sans-serif' font-size='32' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle'%3EProject Cover Image%3C/text%3E%3C/svg%3E",
  logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f1f5f9'/%3E%3Ctext x='100' y='100' font-family='sans-serif' font-size='80' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle'%3EE%3C/text%3E%3C/svg%3E",
  avatar: (initial: string) =>
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23f1f5f9'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='40' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle'%3E${initial}%3C/text%3E%3C/svg%3E`,
  video:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23f1f5f9'/%3E%3Ccircle cx='400' cy='225' r='80' fill='%23ffffff' opacity='0.8'/%3E%3Cpath d='M440 225 L380 265 L380 185 Z' fill='%2394a3b8'/%3E%3Ctext x='400' y='350' font-family='sans-serif' font-size='24' fill='%2394a3b8' text-anchor='middle'%3EVideo Placeholder%3C/text%3E%3C/svg%3E",
};

export default function ManageProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params Promise to access the id
  const unwrappedParams = React.use(params);
  const projectId = unwrappedParams.id;

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    {
      id: "t1",
      name: "Rahul Ahmed",
      role: "Project Lead",
      initial: "R",
    },
    {
      id: "t2",
      name: "Shahin Khan",
      role: "Developer",
      initial: "S",
    },
    {
      id: "t3",
      name: "Nusrat Jahan",
      role: "Marketing",
      initial: "N",
    },
  ]);
  const [milestones, setMilestones] = useState([
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
      description: "Build a working prototype of the main feature.",
      amount: "৳8,000",
      status: "completed",
      completedDate: "July 2023",
    },
    {
      id: "m3",
      title: "Pilot Testing",
      description: "Deploy the prototype for initial testing with beta users.",
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
  ]);

  const [updates, setUpdates] = useState([
    {
      id: "u1",
      title: "Pilot Testing Progress",
      content:
        "We've successfully deployed our initial version to 15 beta testers. Initial feedback shows positive results with a few areas to improve.",
      date: "April 28, 2025",
    },
    {
      id: "u2",
      title: "New Team Member",
      content:
        "We're excited to welcome Farah Khan, a developer, to our team. She'll be leading the development of our main features.",
      date: "April 15, 2025",
    },
  ]);

  // Load project data
  const project = {
    id: projectId,
    name: "EcoSolutions",
    description: "Sustainable waste management solutions for urban areas",
    longDescription:
      "EcoSolutions aims to address waste management challenges through a combination of technology and community engagement. Our solution uses IoT sensors to monitor waste levels in bins and optimize collection routes, while our mobile app encourages citizens to participate in recycling initiatives through gamification and rewards.",
    category: "Environment",
    fundingGoal: "৳25,000",
    raisedSoFar: "৳18,000",
    tags: ["sustainability", "waste management", "urban", "IoT", "community"],
    university: "BUET",
    department: "Environmental Engineering",
    teamSize: 3,
    coverImage: placeholders.cover,
    logoImage: placeholders.logo,
    status: "active",
    createdAt: "January 15, 2023",
  };

  // Calculate funding progress
  const fundingProgress =
    (Number.parseInt(project.raisedSoFar.replace(/[^0-9]/g, "")) /
      Number.parseInt(project.fundingGoal.replace(/[^0-9]/g, ""))) *
    100;

  // Form validation schema
  const formSchema = z.object({
    name: z.string().min(3, {
      message: "Project name must be at least 3 characters.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    longDescription: z.string().min(50, {
      message: "Detailed description must be at least 50 characters.",
    }),
    category: z.string({
      required_error: "Please select a category.",
    }),
    fundingGoal: z.string(),
    tags: z.string(),
    university: z.string(),
    department: z.string(),
    teamSize: z.string(),
  });

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      longDescription: project.longDescription,
      category: project.category,
      fundingGoal: project.fundingGoal,
      tags: project.tags.join(", "),
      university: project.university,
      department: project.department,
      teamSize: project.teamSize.toString(),
    },
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      toast({
        title: "Project Updated",
        description: "Your project has been successfully updated.",
      });
    }, 1000);
  };

  // Add new milestone
  const addMilestone = () => {
    const newMilestone = {
      id: `m${milestones.length + 1}`,
      title: "New Milestone",
      description: "Describe what you will achieve in this milestone",
      amount: "৳0",
      status: "planned",
      deadline: "Future date",
    };

    setMilestones([...milestones, newMilestone]);
  };

  // Delete milestone
  const deleteMilestone = (id: string) => {
    setMilestones(milestones.filter((milestone) => milestone.id !== id));
  };

  // Add new update - Use static strings for dates to avoid hydration issues
  const addUpdate = () => {
    const newUpdate = {
      id: `u${updates.length + 1}`,
      title: "New Update",
      content: "Share your progress or announcements with your audience",
      date: "Today", // Static string instead of dynamic date formatting
    };

    setUpdates([...updates, newUpdate]);
  };

  // Delete update
  const deleteUpdate = (id: string) => {
    setUpdates(updates.filter((update) => update.id !== id));
  };

  // Team member update functions
  const updateTeamMemberName = (id: string, name: string) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id ? { ...member, name, initial: name.charAt(0) } : member
      )
    );
  };

  const updateTeamMemberRole = (id: string, role: string) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id ? { ...member, role } : member
      )
    );
  };

  const addTeamMember = () => {
    const newMember = {
      id: `t${teamMembers.length + 1}`,
      name: "New Team Member",
      role: "Role",
      initial: "N",
    };

    setTeamMembers([...teamMembers, newMember]);
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Manage Project
          </h1>
          <p className="text-muted-foreground">
            Edit and update your project information, milestones, and media
          </p>
        </div>

        <div className="flex gap-2">
          {/* Fix URL structure to match app's routing */}
          <Link href={`/udayee/projects/preview/${projectId}`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </Link>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            disabled={isLoading}
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Project Status Card */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center py-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-lg overflow-hidden">
              <Image
                src={project.logoImage}
                alt={project.name}
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <div className="flex items-center gap-2">
                <Badge
                  variant={project.status === "active" ? "default" : "outline"}
                  className={
                    project.status === "active"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  {project.status === "active" ? "Active" : "Draft"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Created on {project.createdAt}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto mt-4 md:mt-0">
            <div className="flex flex-col md:items-end">
              <div className="flex gap-2 items-center">
                <span className="text-muted-foreground">Funding Progress:</span>
                <span className="font-medium">
                  {fundingProgress.toFixed(0)}%
                </span>
              </div>
              <div className="w-full md:w-40 mt-1">
                <Progress
                  value={fundingProgress}
                  className="h-2 bg-primary/10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Editor */}
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-background border border-border rounded-md p-1 w-full flex flex-wrap">
          <TabsTrigger
            value="info"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 font-medium"
          >
            <Info className="h-4 w-4 mr-2" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger
            value="milestones"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 font-medium"
          >
            <Target className="h-4 w-4 mr-2" />
            Milestones
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 font-medium"
          >
            <FileImage className="h-4 w-4 mr-2" />
            Media
          </TabsTrigger>
          <TabsTrigger
            value="team"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 font-medium"
          >
            <Users className="h-4 w-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger
            value="updates"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 font-medium"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Updates
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 font-medium"
          >
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Edit your project's core information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter project name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Environment">
                                Environment
                              </SelectItem>
                              <SelectItem value="Technology">
                                Technology
                              </SelectItem>
                              <SelectItem value="Education">
                                Education
                              </SelectItem>
                              <SelectItem value="Healthcare">
                                Healthcare
                              </SelectItem>
                              <SelectItem value="Agriculture">
                                Agriculture
                              </SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="E-commerce">
                                E-commerce
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Short Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="A brief description of your project"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This will be displayed in project cards and search
                            results (100-150 characters)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="longDescription"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Full Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Detailed information about your project"
                              className="min-h-[200px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide comprehensive details about your project,
                            goals, and vision
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Tags</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="sustainability, waste management, urban"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Separate tags with commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fundingGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Funding Goal</FormLabel>
                          <FormControl>
                            <Input placeholder="৳25,000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Size</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select team size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">Solo (1 person)</SelectItem>
                              <SelectItem value="2">2 people</SelectItem>
                              <SelectItem value="3">3 people</SelectItem>
                              <SelectItem value="4">4 people</SelectItem>
                              <SelectItem value="5+">5+ people</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="university"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>University</FormLabel>
                          <FormControl>
                            <Input placeholder="BUET" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Environmental Engineering"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Milestones Tab */}
        <TabsContent value="milestones">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Funding Milestones</CardTitle>
                <CardDescription>
                  Define clear milestones for your project funding
                </CardDescription>
              </div>
              <Button
                onClick={addMilestone}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {milestones.map((milestone, index) => (
                <Card
                  key={milestone.id}
                  className="overflow-hidden border-l-4 border-l-primary/40"
                >
                  <CardHeader className="bg-muted/40 py-3 px-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary text-primary-foreground font-medium text-sm">
                          {index + 1}
                        </div>
                        <Input
                          value={milestone.title}
                          onChange={(e) => {
                            const updatedMilestones = [...milestones];
                            updatedMilestones[index].title = e.target.value;
                            setMilestones(updatedMilestones);
                          }}
                          className="border-0 bg-transparent px-2 text-base font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 px-2">
                              <Badge
                                variant="outline"
                                className={`${
                                  milestone.status === "completed"
                                    ? "bg-primary/10 text-primary border-primary/20"
                                    : milestone.status === "in_progress"
                                    ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {milestone.status === "completed"
                                  ? "Completed"
                                  : milestone.status === "in_progress"
                                  ? "In Progress"
                                  : "Planned"}
                              </Badge>
                              <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                const updatedMilestones = [...milestones];
                                updatedMilestones[index].status = "planned";
                                setMilestones(updatedMilestones);
                              }}
                            >
                              Planned
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                const updatedMilestones = [...milestones];
                                updatedMilestones[index].status = "in_progress";
                                updatedMilestones[index].progress = 0;
                                setMilestones(updatedMilestones);
                              }}
                            >
                              In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                const updatedMilestones = [...milestones];
                                updatedMilestones[index].status = "completed";
                                updatedMilestones[index].completedDate =
                                  new Date().toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                  });
                                setMilestones(updatedMilestones);
                              }}
                            >
                              Completed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteMilestone(milestone.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Description</p>
                        <Textarea
                          value={milestone.description}
                          onChange={(e) => {
                            const updatedMilestones = [...milestones];
                            updatedMilestones[index].description =
                              e.target.value;
                            setMilestones(updatedMilestones);
                          }}
                          placeholder="Describe what you'll achieve in this milestone"
                          className="resize-none h-24"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">
                              Funding Amount
                            </p>
                            <Input
                              value={milestone.amount}
                              onChange={(e) => {
                                const updatedMilestones = [...milestones];
                                updatedMilestones[index].amount =
                                  e.target.value;
                                setMilestones(updatedMilestones);
                              }}
                              placeholder="৳0"
                            />
                          </div>

                          {milestone.status === "planned" && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Deadline</p>
                              <Input
                                value={milestone.deadline}
                                onChange={(e) => {
                                  const updatedMilestones = [...milestones];
                                  updatedMilestones[index].deadline =
                                    e.target.value;
                                  setMilestones(updatedMilestones);
                                }}
                                placeholder="Month Year"
                              />
                            </div>
                          )}

                          {milestone.status === "in_progress" && (
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium">Progress</p>
                                <span className="text-sm">
                                  {milestone.progress}%
                                </span>
                              </div>
                              <Input
                                type="range"
                                min="0"
                                max="100"
                                value={milestone.progress}
                                onChange={(e) => {
                                  const updatedMilestones = [...milestones];
                                  updatedMilestones[index].progress = parseInt(
                                    e.target.value
                                  );
                                  setMilestones(updatedMilestones);
                                }}
                              />
                            </div>
                          )}

                          {milestone.status === "completed" && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium">
                                Completed Date
                              </p>
                              <Input
                                value={milestone.completedDate}
                                onChange={(e) => {
                                  const updatedMilestones = [...milestones];
                                  updatedMilestones[index].completedDate =
                                    e.target.value;
                                  setMilestones(updatedMilestones);
                                }}
                                placeholder="Month Year"
                              />
                            </div>
                          )}
                        </div>

                        {milestone.status === "in_progress" &&
                          milestone.progress && (
                            <div className="pt-2">
                              <Progress
                                value={milestone.progress}
                                className="h-2 bg-primary/10"
                              />
                            </div>
                          )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {milestones.length === 0 && (
                <div className="text-center py-8 bg-muted/20 border border-dashed rounded-lg">
                  <h3 className="text-lg font-medium text-muted-foreground">
                    No Milestones Added
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add milestones to break down your project funding into
                    achievable steps
                  </p>
                  <Button
                    onClick={addMilestone}
                    className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Milestone
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Project Media</CardTitle>
              <CardDescription>
                Upload images and video for your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cover Image */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Cover Image</h3>
                  <p className="text-sm text-muted-foreground">
                    This image appears at the top of your project page
                    (Recommended size: 1200x630)
                  </p>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-[2/1] relative bg-muted">
                    <Image
                      src={project.coverImage}
                      alt="Cover image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 bg-muted/10 flex justify-end">
                    <Button variant="outline">
                      <FileImage className="h-4 w-4 mr-2" />
                      Change Image
                    </Button>
                  </div>
                </div>
              </div>

              {/* Logo Image */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Logo Image</h3>
                  <p className="text-sm text-muted-foreground">
                    A square image that represents your project (Recommended
                    size: 400x400)
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 rounded-lg overflow-hidden border">
                    <Image
                      src={project.logoImage}
                      alt="Logo image"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <Button variant="outline">
                    <FileImage className="h-4 w-4 mr-2" />
                    Change Logo
                  </Button>
                </div>
              </div>

              {/* Pitch Video */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Pitch Video</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a video presenting your project and goals
                  </p>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <Image
                      src={placeholders.video}
                      alt="Video placeholder"
                      width={800}
                      height={450}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="p-4 bg-muted/10 flex justify-end">
                    <Button variant="outline">
                      <FileImage className="h-4 w-4 mr-2" />
                      Upload Video
                    </Button>
                  </div>
                </div>
              </div>

              {/* Additional Images */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Additional Images</h3>
                  <p className="text-sm text-muted-foreground">
                    Add more images showcasing your project
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="aspect-square bg-muted rounded-md border-2 border-dashed flex items-center justify-center">
                    <Button variant="ghost" className="h-auto py-8">
                      <div>
                        <Plus className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Add Image
                        </p>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Add your team members and their roles
                </CardDescription>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={addTeamMember}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="p-4 bg-muted/10">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden border">
                          <Image
                            src={placeholders.avatar(member.initial)}
                            alt={member.name}
                            width={48}
                            height={48}
                            className="w-full h-full"
                          />
                        </div>

                        <div className="flex-grow space-y-1">
                          <Input
                            value={member.name}
                            onChange={(e) =>
                              updateTeamMemberName(member.id, e.target.value)
                            }
                            className="font-medium"
                            placeholder="Team member name"
                          />
                          <div className="flex gap-2">
                            <Input
                              value={member.role}
                              onChange={(e) =>
                                updateTeamMemberRole(member.id, e.target.value)
                              }
                              placeholder="Role"
                              className="text-sm"
                            />
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTeamMember(member.id)}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {teamMembers.length === 0 && (
                  <div className="text-center py-8 bg-muted/20 border border-dashed rounded-lg">
                    <h3 className="text-lg font-medium text-muted-foreground">
                      No Team Members Added
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add team members to showcase your project team
                    </p>
                    <Button
                      onClick={addTeamMember}
                      className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Team Member
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Updates Tab */}
        <TabsContent value="updates">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Project Updates</CardTitle>
                <CardDescription>
                  Share progress and announcements with your audience
                </CardDescription>
              </div>
              <Button
                onClick={addUpdate}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Update
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {updates.map((update, index) => (
                <Card key={update.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/40 py-3 px-4">
                    <div className="flex justify-between items-center">
                      <Input
                        value={update.title}
                        onChange={(e) => {
                          const updatedUpdates = [...updates];
                          updatedUpdates[index].title = e.target.value;
                          setUpdates(updatedUpdates);
                        }}
                        className="border-0 bg-transparent px-0 text-base font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Update title"
                      />

                      <div className="flex items-center gap-2">
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {update.date}
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteUpdate(update.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Textarea
                      value={update.content}
                      onChange={(e) => {
                        const updatedUpdates = [...updates];
                        updatedUpdates[index].content = e.target.value;
                        setUpdates(updatedUpdates);
                      }}
                      placeholder="Share your progress or announcements with your audience"
                      className="resize-none min-h-[100px] border-0 focus-visible:ring-0 p-0"
                    />
                  </CardContent>
                </Card>
              ))}

              {updates.length === 0 && (
                <div className="text-center py-8 bg-muted/20 border border-dashed rounded-lg">
                  <h3 className="text-lg font-medium text-muted-foreground">
                    No Updates Posted
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Keep your audience informed by posting regular updates
                  </p>
                  <Button
                    onClick={addUpdate}
                    className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post First Update
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Project Documents</CardTitle>
                <CardDescription>
                  Upload important documents for your project
                </CardDescription>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary/70" />
                    <div>
                      <h3 className="font-medium">Business Plan.pdf</h3>
                      <p className="text-xs text-muted-foreground">
                        Added on April 12, 2023 • 2.4 MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <FileCheck className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary/70" />
                    <div>
                      <h3 className="font-medium">Market Research.pdf</h3>
                      <p className="text-xs text-muted-foreground">
                        Added on April 15, 2023 • 1.8 MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <FileCheck className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary/70" />
                    <div>
                      <h3 className="font-medium">
                        Financial Projections.xlsx
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Added on April 20, 2023 • 1.2 MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <FileCheck className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Action Bar - Fix URL structure here too */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
        <div className="flex gap-2">
          <Link href={`/udayee/projects`}>
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
        <div className="flex gap-2">
          <Link href={`/udayee/projects/preview/${projectId}`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </Link>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            disabled={isLoading}
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
