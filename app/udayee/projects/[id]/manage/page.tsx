"use client";
import safeUrl from "@/lib/safeURL";
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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Info,
  Target,
  FileImage,
  Users,
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


const placeholders = {
  cover: "data:image/svg+xml,%3csvg width='1200' height='630' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='%23f3f4f6'/%3e%3ctext x='50%25' y='50%25' text-anchor='middle' fill='%239ca3af' font-size='24'%3eCover Image%3c/text%3e%3c/svg%3e",
  logo: "data:image/svg+xml,%3csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='%23f3f4f6'/%3e%3ctext x='50%25' y='50%25' text-anchor='middle' fill='%239ca3af' font-size='18'%3eLogo%3c/text%3e%3c/svg%3e",
  avatar: (initial: string) => `data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='%236366f1'/%3e%3ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='40'%3e${initial}%3c/text%3e%3c/svg%3e`,
  video: "data:image/svg+xml,%3csvg width='800' height='450' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='%23f3f4f6'/%3e%3ctext x='50%25' y='50%25' text-anchor='middle' fill='%239ca3af' font-size='18'%3eVideo Placeholder%3c/text%3e%3c/svg%3e",
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
    categories,
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
    setCurrentProjectId,
    initializeFormState,
    setRaisedAmount,
  } = useProjectStore();
  const [documentsToUpload, setDocumentsToUpload] = useState<File[]>([]);
  const [documentsToDelete, setDocumentsToDelete] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentProjectId(projectId);

    console.log("Fetching projects on page load");
    setIsLoading(true);
    fetchProjects().finally(() => {
      // Add a small delay to ensure data is properly processed
      setTimeout(() => setIsLoading(false), 500);
    });

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
      documents: [],
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

    // Validate image format
    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

    if (!allowedFormats.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      alert('Please upload only international image formats: JPG, JPEG, PNG, GIF, WebP, or SVG');
      // Reset the input
      e.target.value = '';
      return;
    }

    // Additional file size validation (optional - 10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('Image file size must be less than 10MB');
      e.target.value = '';
      return;
    }

    console.log(`Uploading ${type}:`, file);
    console.log('File object URL:', URL.createObjectURL(file));

    // Force a state update by creating a new object
    const newMediaState = { ...mediaFormState, [type]: file };
    setMediaFormState(newMediaState);
    setMediaChanged(true);

    // Force component re-render by triggering state update
    setTimeout(() => {
      console.log('Current media form state:', mediaFormState);
    }, 100);
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
    if (name === "category") {
      setFormState({ [name]: value });
    } else {
      setFormState({ [name]: value });
    }

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
    try {
      const updatedProject: Partial<Project> = {
        id: projectId,
        title: formState.title,
        description: formState.description,
        category: { id: formState.category, name: formState.category },
        budget: formState.budget,
        tags: formState.tags,
        status: currentProject.status,
        raised_amount: Number(formState.raised_amount),
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

  // Show skeleton loading while data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-80" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Project overview skeleton */}
        <Card className="border-l-4 border-l-primary">
          <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center py-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-14 w-14 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <div className="flex flex-col md:items-end space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-2 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs skeleton */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 border border-border rounded-md p-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24" />
            ))}
          </div>
          
          {/* Content skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-32 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <Button variant="outline" className="flex items-center gap-2" >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </Link>
          <Button
            onClick={onSubmit}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          >

            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>

          </Button>
        </div>
      </div>

      <Card className="border-l-4 border-l-primary">
        <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center py-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-lg overflow-hidden">
              {safeUrl(currentProject.profile_picture) && currentProject.profile_picture !== placeholders.logo ? (
                <Image
                  src={safeUrl(currentProject.profile_picture)}
                  alt={currentProject.title || "Project"}
                  width={56}
                  height={56}
                  className="object-cover"
                  onError={(e) => {
                    console.log('Project logo load error');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <FileImage className="h-6 w-6 text-muted-foreground/40" />
                </div>
              )}
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
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
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
                          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary text-primary-foreground font-medium">
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
                          <Button variant="ghost" className="h-8 px-2" disabled>
                            <Badge
                              variant={milestone.status === "completed"
                                ? "default"
                                : "outline"}
                              className={`${milestone.status === "completed"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : milestone.status === "in-progress"
                                  ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                  : milestone.status === "declined"
                                    ? "bg-destructive/10 text-destructive border-destructive/20"
                                    : "bg-muted text-muted-foreground"
                                }`}
                            >
                              {milestone.status === "completed"
                                ? "Completed"
                                : milestone.status === "in-progress"
                                  ? "In Progress"
                                  : milestone.status === "declined"
                                    ? "Declined"
                                    : "Planned"}
                            </Badge>
                          </Button>
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

                            {/* {milestone.status === "declined" && (
                              <div className="space-y-2">
                                <p className="text-sm font-medium">
                                  Declined Date
                                </p>
                                <Input
                                  value={milestone.declinedAt}
                                  readOnly
                                  onChange={(e) => updateItem('milestone', milestone.id!, 'declinedAt', e.target.value)}
                                  placeholder="Month Year"
                                />
                              </div>
                            )} */}
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
                    {(() => {
                      const coverUrl = safeUrl(mediaFormState.coverImage);
                      const projectUrl = safeUrl(currentProject.cover_image);
                      const finalUrl = coverUrl || projectUrl;

                      console.log('Cover image URLs:', { coverUrl, projectUrl, finalUrl });

                      return finalUrl ? (
                        <Image
                          key={finalUrl} // Force re-render when URL changes
                          src={finalUrl}
                          alt="Cover image"
                          fill
                          className="object-cover"
                          unoptimized={finalUrl.startsWith('blob:')} // Disable optimization for blob URLs
                          onError={(e) => {
                            console.log('Cover image load error:', e);
                            e.currentTarget.style.display = 'none';
                          }}
                          onLoad={() => {
                            console.log('Cover image loaded successfully:', finalUrl);
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <FileImage className="h-12 w-12 mx-auto text-muted-foreground/40 mb-2" />
                            <p className="text-sm text-muted-foreground">No cover image</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  <div className="p-4 bg-muted/10 flex justify-end">
                    <label htmlFor="cover-image-upload">
                      <input
                        id="cover-image-upload"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml,.jpg,.jpeg,.png,.gif,.webp,.svg"
                        className="hidden"
                        onChange={(e) => handleFileChange('coverImage', e)}
                      />
                      <Button variant="outline" className="cursor-pointer" asChild>
                        <span>
                          <FileImage className="h-4 w-4 mr-2" />
                          {mediaFormState.coverImage ? 'Change Image' : 'Upload Image'}
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
                    {(() => {
                      const logoUrl = safeUrl(mediaFormState.logoImage);
                      const projectUrl = safeUrl(currentProject.profile_picture);
                      const finalUrl = logoUrl || projectUrl;

                      console.log('Logo image URLs:', { logoUrl, projectUrl, finalUrl });

                      return finalUrl ? (
                        <Image
                          key={finalUrl} // Force re-render when URL changes
                          src={finalUrl}
                          alt="Logo image"
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                          unoptimized={finalUrl.startsWith('blob:')} // Disable optimization for blob URLs
                          onError={(e) => {
                            console.log('Logo image load error:', e);
                            e.currentTarget.style.display = 'none';
                          }}
                          onLoad={() => {
                            console.log('Logo image loaded successfully:', finalUrl);
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <FileImage className="h-8 w-8 text-muted-foreground/40" />
                        </div>
                      );
                    })()}
                  </div>
                  <label htmlFor="logo-image-upload">
                    <input
                      id="logo-image-upload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml,.jpg,.jpeg,.png,.gif,.webp,.svg"
                      className="hidden"
                      onChange={(e) => handleFileChange('logoImage', e)}
                    />
                    <Button variant="outline" className="cursor-pointer" asChild>
                      <span>
                        <FileImage className="h-4 w-4 mr-2" />
                        {mediaFormState.logoImage ? 'Change Logo' : 'Upload Logo'}
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
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    {mediaFormState.pitch_video ? (
                      <iframe
                        src={safeUrl(mediaFormState.pitch_video)}
                        className="w-full h-full"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="text-center">
                        <FileImage className="h-12 w-12 mx-auto text-muted-foreground/40 mb-2" />
                        <p className="text-sm text-muted-foreground">No video added yet</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-muted/10">
                    <div className="flex flex-col gap-2">
                      <Input
                        placeholder="Enter YouTube or Vimeo URL"
                        value={mediaFormState.pitch_video || ''}
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
                            <div className="w-full h-full flex items-center justify-center bg-muted text-primary font-medium">
                              {member.name ? member.name.charAt(0).toUpperCase() : member.initial || 'T'}
                            </div>
                          </div>

                          <div>
                            <Input
                              value={member.name}
                              onChange={(e) => {
                                updateItem('teamMember', member.id, 'name', e.target.value);
                                // Update initial when name changes
                                updateItem('teamMember', member.id, 'initial', e.target.value.charAt(0).toUpperCase());
                              }}
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
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              deleteItem('teamMember', member.id);
                            }}
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
                              <h3 className="font-medium">
                                {doc.document ?
                                  doc.document.split('/').pop()?.split('-').slice(1).join('-') || 'Unknown Document' :
                                  'Unknown Document'
                                }
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                Added on {formatDate(doc.createdAt)} • {formatFileSize(doc.size)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {doc.document && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(safeUrl(doc.document), '_blank')}

                              >
                                <FileCheck className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            )}
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
            <Button variant="outline" >Cancel</Button>
          </Link>
        </div>
        <div className="flex gap-2">
          <Link href={`/udayee/projects/${projectId}/preview`}>
            <Button variant="outline" className="flex items-center gap-2" >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </Link>
          <Button
            onClick={onSubmit}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"

          >

            <Save className="h-4 w-4" />
            Save Changes


          </Button>
        </div>
      </div>

    </div>
  );
}
