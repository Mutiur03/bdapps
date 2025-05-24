"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Project, useProjectStore } from "@/store/useProjectStore";

// Helper function to safely validate and format URLs
export const safeUrl = (url: string | File | undefined | null): string => {
  if (!url) return "";

  if (url instanceof File) {
    return URL.createObjectURL(url);
  }

  // Ensure url is a string before using string methods
  if (typeof url !== 'string') {
    return "";
  }

  const youtubeMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
  const shortYoutubeMatch = url.match(/(?:https?:\/\/)?youtu\.be\/([^?]+)/);
  const shortsMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^?&]+)/);
  const vimeoMatch = url.match(/(?:https?:\/\/)?vimeo\.com\/(\d+)/);

  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  if (shortYoutubeMatch) {
    return `https://www.youtube.com/embed/${shortYoutubeMatch[1]}`;
  }

  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }

  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  if (!url.startsWith('/')) {
    return `/${url}`;
  }

  return url;
};

const placeholders = {
  cover: "https://source.unsplash.com/random/1200x630/?project",
  logo: "https://source.unsplash.com/random/400x400/?logo",
  avatar: (initial: string) => `https://source.unsplash.com/random/100x100/?portrait,${initial}`,
  video: "https://source.unsplash.com/random/800x450/?video",
};

export default function ManageProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = React.use(params);
  const projectId = unwrappedParams.id;
  const {
    projects,
    fetchProjects,
    saveProject,
    milestones,
    teamMembers,
    updates,
    formatProjectData,
    addItem,
    updateItem,
    deleteItem,
    formState,
    setFormState,
    mediaFormState,
    setMediaFormState,
    mediaChanged,
    setMediaChanged,
    formErrors,
    setFormErrors,
    isLoading,
    setIsLoading,
    setCurrentProjectId,
    initializeFormState,
    setRaisedAmount,
  } = useProjectStore();

  const [documentsToUpload, setDocumentsToUpload] = useState<File[]>([]);
  const [documentsToDelete, setDocumentsToDelete] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentProjectId(projectId);

    console.log("Fetching projects on page load");
    fetchProjects();

  }, [projectId, fetchProjects, setCurrentProjectId]);

  useEffect(() => {
    const currentProject = projects.find((p) => String(p.id) === projectId);
    if (currentProject) {
      formatProjectData(currentProject);
      initializeFormState(currentProject);
    }
  }, [projects, projectId, formatProjectData, initializeFormState, fetchProjects]);

  const currentProject = useMemo(() => {
    return projects.find((p) => String(p.id) === projectId) || {
      id: projectId,
      title: "",
      description: "",
      category: "",
      budget: 0,
      raised_amount: 0,
      tags: "",
      status: "draft" as const,
      cover_image: placeholders.cover,
      profile_picture: placeholders.logo,
      createdAt: new Date().toDateString(),
    };
  }, [projects, projectId]);
  useEffect(() => {
    // Calculate total raised amount when milestones change
    const totalRaised = milestones.reduce(
      (acc, milestone) => acc + (Number(milestone.raised_amount) || 0),
      0
    );
    if (currentProject && totalRaised !== currentProject.raised_amount) {
      setFormState({ raised_amount: totalRaised });
    }
  }, [milestones, currentProject, setFormState]);

  const fundingProgress = useMemo(() => {
    const raised = Number(currentProject.raised_amount) || 0;
    const budget = Number(currentProject.budget) || 1; // Avoid division by zero
    return (raised / budget) * 100;
  }, [currentProject.raised_amount, currentProject.budget]);


  const handleFileChange = (type: 'coverImage' | 'logoImage' | 'video' | 'additionalImage', e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setMediaFormState({ [type]: file });
  };

  const handlepitch_videoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaFormState({ pitch_video: e.target.value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({ [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState({ [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formState.title || formState.title.length < 3) {
      errors.title = "Project name must be at least 3 characters";
    }

    if (!formState.description || formState.description.length < 50) {
      errors.description = "Description must be at least 50 characters";
    }

    if (!formState.category) {
      errors.category = "Please select a category";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const updatedProject: Partial<Project> = {
        id: projectId, // Ensure ID is included in the update
        title: formState.title,
        description: formState.description,
        category: formState.category,
        budget: formState.budget,
        tags: formState.tags,
        status: currentProject.status,
        raised_amount: Number(formState.raised_amount), // Ensure it's a number
      };

      if (mediaChanged) {
        updatedProject.cover_image = mediaFormState.coverImage;
        updatedProject.profile_picture = mediaFormState.logoImage;
        updatedProject.pitch_video = mediaFormState.pitch_video;
      }

      updatedProject.milestones = milestones.map(milestone => ({
        ...milestone,
        amount: Number(milestone.amount),
        raised_amount: Number(milestone.raised_amount),
        progress: Number(milestone.progress)
      }));

      // Add documents to upload
      if (documentsToUpload.length > 0) {
        updatedProject.documents = documentsToUpload;
      }

      // Add document IDs to delete
      if (documentsToDelete.length > 0) {
        updatedProject.documentsToDelete = JSON.stringify(documentsToDelete);
      }

      console.log("Saving project data:", updatedProject);
      await saveProject(projectId, updatedProject);

      // Reset document states after successful save
      console.log("Refetching projects after save");
      await fetchProjects();
      setDocumentsToUpload([]);
      setDocumentsToDelete([]);

      // Force a refetch after saving to ensure we have the latest data

      setMediaChanged(false);
      alert("Project saved successfully!");
    } catch (error) {
      console.error("Failed to save project:", error);
      alert("Failed to save project. See console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const newFiles = Array.from(e.target.files);
    setDocumentsToUpload([...documentsToUpload, ...newFiles]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDocumentDelete = (id: number) => {
    setDocumentsToDelete([...documentsToDelete, id]);
  };

  const removeUploadedDocument = (index: number) => {
    setDocumentsToUpload(documentsToUpload.filter((_, i) => i !== index));
  };

  // Helper to get file extension
  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  // Helper to format file size
  const formatFileSize = (bytes: number | undefined | null) => {
    if (bytes === undefined || bytes === null) return 'Unknown size';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
          <Link href={`/udayee/projects/${projectId}/preview`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </Link>
          <Button
            onClick={onSubmit}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            disabled={isLoading}
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Card className="border-l-4 border-l-primary">
        <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center py-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-lg overflow-hidden">
              <Image
                src={safeUrl(currentProject.profile_picture)}
                alt={currentProject.title || "Project"}
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{currentProject.title}</h2>
              <div className="flex items-center gap-2">
                <Badge
                  className={`${currentProject.status === "active"
                    ? "bg-muted text-primary"
                    : currentProject.status === "pending"
                      ? "bg-amber-100 text-amber-700"
                      : currentProject.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-card text-muted-foreground"
                    }`}
                >
                  {currentProject.status === "active" ? "Active" :
                    currentProject.status === "pending" ? "Pending" :
                      currentProject.status === "completed" ? "Completed" : "Draft"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Created on{" "}
                  {currentProject.createdAt
                    ? new Date(currentProject.createdAt).toLocaleDateString()
                    : "N/A"}
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
              <div className="text-xs text-muted-foreground mt-1">
                ৳{currentProject.raised_amount || 0} of ৳{currentProject.budget || 0}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
          {/* <TabsTrigger
            value="updates"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 font-medium"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Updates
          </TabsTrigger> */}
          <TabsTrigger
            value="documents"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 font-medium"
          >
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Edit your project&apos;s core information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Project Name
                    </label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter project name"
                      value={formState.title}
                      onChange={handleInputChange}
                      className={formErrors.title ? "border-destructive" : ""}
                    />
                    {formErrors.title && (
                      <p className="text-sm text-destructive">{formErrors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select
                      onValueChange={(value) => handleSelectChange("category", value)}
                      value={formState.category}
                    >
                      <SelectTrigger className={formErrors.category ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Environment">Environment</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Agriculture">Agriculture</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.category && (
                      <p className="text-sm text-destructive">{formErrors.category}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Full Description
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Detailed information about your project"
                      className={`min-h-[200px] ${formErrors.longDescription ? "border-destructive" : ""}`}
                      value={formState.description}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      Provide comprehensive details about your project, goals, and vision
                    </p>
                    {formErrors.description && (
                      <p className="text-sm text-destructive">{formErrors.description}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label htmlFor="tags" className="text-sm font-medium">
                      Tags
                    </label>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="sustainability, waste management, urban"
                      value={formState.tags}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      Separate tags with commas
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-sm font-medium">
                      Funding Goal
                    </label>
                    <Input
                      id="budget"
                      name="budget"
                      placeholder="৳25,000"
                      value={formState.budget}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="teamSize" className="text-sm font-medium">
                      Team Size
                    </label>
                    <Select
                      onValueChange={(value) => handleSelectChange("teamSize", value)}
                      value={formState.teamSize}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Solo (1 person)</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3">3 people</SelectItem>
                        <SelectItem value="4">4 people</SelectItem>
                        <SelectItem value="5+">5+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="university" className="text-sm font-medium">
                      University
                    </label>
                    <Input
                      id="university"
                      name="university"
                      placeholder="BUET"
                      value={formState.university}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="department" className="text-sm font-medium">
                      Department
                    </label>
                    <Input
                      id="department"
                      name="department"
                      placeholder="Environmental Engineering"
                      value={formState.department}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Funding Milestones</CardTitle>
                {/* <CardDescription>
                  Define clear milestones for your project funding
                </CardDescription> */}
              </div>
              {/* <Button
                onClick={() => addItem('milestone')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Milestone
              </Button> */}
            </CardHeader>
            <CardContent className="space-y-6">
                {[...milestones]
                .sort((a, b) => {
                  const statusOrder = { "completed": 0, "in-progress": 1, "planned": 2 };
                  return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
                })
                .map((milestone, index) => (
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
                          readOnly={milestone.status !== "planned"}
                          value={milestone.title}
                          onChange={(e) => updateItem('milestone', milestone.id!, 'title', e.target.value)}
                          className="border-0 bg-transparent px-2 text-base font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <DropdownMenu> */}
                        {/* <DropdownMenuTrigger asChild> */}
                        <Button variant="ghost" className="h-8 px-2">
                          <Badge
                            variant={milestone.status === "completed"
                              ? "default"
                              : "outline"}
                            className={`${milestone.status === "completed"
                              ? "bg-primary/10 text-primary border-primary/20"
                              : milestone.status === "in-progress"
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                : "bg-muted text-muted-foreground"
                              }`}
                          >
                            {milestone.status === "completed"
                              ? "Completed"
                              : milestone.status === "in-progress"
                                ? "In Progress"
                                : "Planned"}
                          </Badge>
                          {/* <ChevronDown className="h-4 w-4 ml-1" /> */}
                        </Button>
                        {/* </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" >
                            <DropdownMenuItem
                              onClick={() => {
                              updateItem('milestone', milestone.id!, 'status', 'planned'); updateItem('milestone', milestone.id!, 'plannedAt', new Date().toLocaleDateString());
                              }}
                              disabled={true}
                            ></DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                updateItem('milestone', milestone.id!, 'status', 'planned'); updateItem('milestone', milestone.id!, 'plannedAt', new Date().toLocaleDateString());

                              }}
                            >
                              Planned
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                updateItem('milestone', milestone.id!, 'status', 'in-progress');
                                updateItem('milestone', milestone.id!, 'progress', 0);
                                updateItem('milestone', milestone.id!, 'raised_amount', 0);
                                updateItem('milestone', milestone.id!, 'deadlineAt', new Date().toLocaleDateString());
                                setRaisedAmount();

                              }}
                            >
                              In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                updateItem('milestone', milestone.id!, 'status', 'completed');
                                updateItem('milestone', milestone.id!, 'completedAt', new Date().toLocaleDateString());
                                updateItem('milestone', milestone.id!, 'raised_amount', milestone.amount);
                                setRaisedAmount();
                              }}
                            >
                              Completed
                            </DropdownMenuItem>
                          </DropdownMenuContent> */}
                        {/* </DropdownMenu> */}
                        <Button
                          variant="destructive"
                          size="icon"
                          hidden={milestone.status !== "planned"}
                          className="h-8 w-8"
                          onClick={() => deleteItem('milestone', milestone.id!)}
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
                          readOnly={milestone.status !== "planned"}
                          onChange={(e) => updateItem('milestone', milestone.id!, 'description', e.target.value)}
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
                              readOnly={milestone.status !== "planned"}
                              onChange={(e) => {
                                const newAmount = e.target.value;
                                updateItem('milestone', milestone.id!, 'amount', newAmount);
                                // If milestone is completed, also update the raised_amount to match
                                if (milestone.status === "completed") {
                                  updateItem('milestone', milestone.id!, 'raised_amount', newAmount);
                                  setRaisedAmount();
                                }

                                // If milestone is in progress, recalculate progress percentage
                                if (milestone.status === "in-progress" && milestone.raised_amount) {
                                  const raised = Number(milestone.raised_amount) || 0;
                                  const amount = Number(newAmount) || 1;
                                  const newProgress = Math.min(Math.round((raised / amount) * 100), 100);
                                  updateItem('milestone', milestone.id!, 'progress', newProgress);
                                }
                              }}
                              placeholder="৳0"
                            />
                          </div>

                          {milestone.status === "planned" && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Planned</p>
                              <Input
                                value={milestone.plannedAt}
                                readOnly
                                onChange={(e) => updateItem('milestone', milestone.id!, 'plannedAt', e.target.value)}
                                placeholder="Month Year"
                              />
                            </div>
                          )}

                          {milestone.status === "in-progress" && (
                            <>
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Deadline</p>
                                <Input
                                  value={milestone.deadlineAt}
                                  readOnly
                                  onChange={(e) => updateItem('milestone', milestone.id!, 'deadlineAt', e.target.value)}
                                  placeholder="Month Year"
                                />
                              </div>
                              {/* <div className="space-y-2">
                                <p className="text-sm font-medium">Raised Amount</p>
                                <Input
                                  value={milestone.raised_amount}
                                  onChange={(e) => {
                                    const raised_amount = Number(e.target.value);
                                    const amount = milestone.amount || 1;
                                    const newProgress = Math.min(Math.round((raised_amount / amount) * 100), 100);
                                    updateItem('milestone', milestone.id!, 'raised_amount', e.target.value);
                                    updateItem('milestone', milestone.id!, 'progress', newProgress);
                                    setRaisedAmount();

                                  }}
                                  placeholder="৳0"
                                />
                              </div>
                              <div className="space-y-2 col-span-2">
                                <div className="flex justify-between">
                                  <p className="text-sm font-medium">Progress</p>
                                  <span className="text-sm">
                                    {milestone.progress}% of ৳{milestone.amount || 0}
                                  </span>
                                </div>
                              </div> */}
                            </>
                          )}

                          {milestone.status === "completed" && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium">
                                Completed Date
                              </p>
                              <Input
                                value={milestone.completedAt}
                                readOnly
                                onChange={(e) => updateItem('milestone', milestone.id!, 'completedAt', e.target.value)}
                                placeholder="Month Year"
                              />
                            </div>
                          )}
                        </div>

                        {/* {milestone.status === "in-progress" &&
                          milestone.progress !== undefined && (
                            <div>
                              <Progress
                                value={milestone.progress}
                                className="h-2 bg-primary/10"
                              />
                            </div>
                          )} */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Project Media</CardTitle>
              <CardDescription>
                Upload images and video for your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                      src={safeUrl(mediaFormState.coverImage)}
                      alt="Cover image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 bg-muted/10 flex justify-end">
                    <label htmlFor="cover-image-upload">
                      <input
                        id="cover-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange('coverImage', e)}
                      />
                      <Button variant="outline" className="cursor-pointer" asChild>
                        <span>
                          <FileImage className="h-4 w-4 mr-2" />
                          Change Image
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>

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
                      src={safeUrl(mediaFormState.logoImage)}
                      alt="Logo image"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <label htmlFor="logo-image-upload">
                    <input
                      id="logo-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange('logoImage', e)}
                    />
                    <Button variant="outline" className="cursor-pointer" asChild>
                      <span>
                        <FileImage className="h-4 w-4 mr-2" />
                        Change Logo
                      </span>
                    </Button>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Pitch Video</h3>
                  <p className="text-sm text-muted-foreground">
                    Add a YouTube or Vimeo video URL showcasing your project
                  </p>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted">
                    {mediaFormState.pitch_video ? (
                      <iframe
                        src={safeUrl(mediaFormState.pitch_video)}
                        className="w-full h-full"
                        title="YouTube video player"
                      ></iframe>
                    ) : (
                      <Image
                        src={mediaFormState.pitch_video || placeholders.video}
                        alt="Video placeholder"
                        width={800}
                        height={450}
                        className="w-full h-auto"
                      />
                    )}
                  </div>
                  <div className="p-4 bg-muted/10">
                    <div className="flex flex-col gap-2">
                      <Input
                        placeholder="Enter YouTube or Vimeo URL"
                        value={safeUrl(mediaFormState.pitch_video)}
                        onChange={handlepitch_videoChange}
                      />
                      <p className="text-xs text-muted-foreground">For example: https://www.youtube.com/embed/VIDEO_ID</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
                onClick={() => addItem('teamMember')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teamMembers.map((member) => (
                  <Card
                    key={member.id}
                    className="border-l-4 border-l-primary/40 overflow-hidden"
                  >
                    <CardHeader className="bg-muted/40 py-3 px-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full overflow-hidden border">
                            <Image
                              src={safeUrl(placeholders.avatar(member.initial))}
                              alt={member.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <Input
                              value={member.name}
                              onChange={(e) =>
                                updateItem('teamMember', member.id, 'name', e.target.value)
                              }
                              className="font-medium border-0 bg-transparent px-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                              placeholder="Team member name"
                            />
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Select
                                value={member.role}
                                onValueChange={(value) =>
                                  updateItem('teamMember', member.id, 'role', value)
                                }
                              >
                                <SelectTrigger className="h-7 w-[150px] border-0 bg-transparent p-0 text-sm focus:ring-0">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Team Lead">Team Lead</SelectItem>
                                  <SelectItem value="Project Manager">Project Manager</SelectItem>
                                  <SelectItem value="Developer">Developer</SelectItem>
                                  <SelectItem value="Designer">Designer</SelectItem>
                                  <SelectItem value="Researcher">Researcher</SelectItem>
                                  <SelectItem value="Marketing">Marketing</SelectItem>
                                  <SelectItem value="Finance">Finance</SelectItem>
                                  <SelectItem value="Member">Member</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteItem('teamMember', member.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <Input
                              value={member.email || ""}
                              onChange={(e) =>
                                updateItem('teamMember', member.id, 'email', e.target.value)
                              }
                              placeholder="member@university.edu"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">University/Institution</label>
                            <Input
                              value={member.university || ""}
                              onChange={(e) =>
                                updateItem('teamMember', member.id, 'university', e.target.value)
                              }
                              placeholder="University or Institution name"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Department</label>
                            <Input
                              value={member.department || ""}
                              onChange={(e) =>
                                updateItem('teamMember', member.id, 'department', e.target.value)
                              }
                              placeholder="e.g., Computer Science, Engineering"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Skills/Expertise</label>
                            <Input
                              value={member.skills || ""}
                              onChange={(e) =>
                                updateItem('teamMember', member.id, 'skills', e.target.value)
                              }
                              placeholder="e.g., Python, Research, Design"
                            />
                            <p className="text-xs text-muted-foreground">Separate skills with commas</p>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Bio</label>
                            <Textarea
                              value={member.bio || ""}
                              onChange={(e) =>
                                updateItem('teamMember', member.id, 'bio', e.target.value)
                              }
                              placeholder="Brief introduction about the team member"
                              className="min-h-[120px] resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {teamMembers.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                    <h3 className="text-lg font-medium text-muted-foreground">No Team Members Yet</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      Add team members to showcase who&apos;s working on this project
                    </p>
                    <Button
                      onClick={() => addItem('teamMember')}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
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
                onClick={() => addItem('update')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Update
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {updates.map((update) => (
                <Card key={update.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/40 py-3 px-4">
                    <div className="flex justify-between items-center">
                      <Input
                        value={update.title}
                        onChange={(e) => updateItem('update', update.id, 'title', e.target.value)}
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
                          onClick={() => deleteItem('update', update.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Textarea
                      value={update.content}
                      onChange={(e) => updateItem('update', update.id, 'content', e.target.value)}
                      placeholder="Share your progress or announcements with your audience"
                      className="resize-none min-h-[100px] border-0 focus-visible:ring-0 p-0"
                    />
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Project Documents</CardTitle>
                <CardDescription>
                  Upload important documents for your project
                </CardDescription>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Document
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  onChange={handleDocumentUpload}
                />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentProject.documents && currentProject.documents.length > 0 && (
                  <>
                    {currentProject.documents
                      .filter(doc => !documentsToDelete.includes(doc.id))
                      .map((doc) => (
                        <div key={doc.id} className="border rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-primary/70" />
                            <div>
                              <h3 className="font-medium">{doc.document.split('/').pop().split('-').pop()}</h3>
                              <p className="text-xs text-muted-foreground">
                                Added on {formatDate(doc.createdAt)} • {formatFileSize(doc.size)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={`/${doc.document}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button variant="ghost" size="sm">
                                <FileCheck className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </a>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDocumentDelete(doc.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </>
                )}

                {/* Documents to be uploaded */}
                {documentsToUpload.length > 0 && (
                  <>
                    {documentsToUpload.map((file, index) => (
                      <div key={index} className="border rounded-lg p-4 flex items-center justify-between bg-muted/30">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary/70" />
                          <div>
                            <h3 className="font-medium">{file.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              New upload • {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeUploadedDocument(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Empty state */}
                {(!currentProject.documents || currentProject.documents.length === 0) &&
                  documentsToUpload.length === 0 && (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                      <h3 className="text-lg font-medium text-muted-foreground">No Documents Yet</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">
                        Upload important documents related to your project
                      </p>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
        <div className="flex gap-2">
          <Link href={`/udayee/projects`}>
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
        <div className="flex gap-2">
          <Link href={`/udayee/projects/${projectId}/preview`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </Link>
          <Button
            onClick={onSubmit}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

    </div>
  );
}
