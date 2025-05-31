"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  Download,
  Calendar,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// Types
interface Stat {
  title: string;
  value: string;
  icon: string;
  changeType: "positive" | "negative";
  change: string;
}

interface Project {
  id: string;
  projectTitle: string;
  projectDescription: string;
  categoryName: string;
  projectLocation: string;
  university: string;
  studentName: string;
  department: string;
  yearOfStudy: string;
  cgpa: string;
  studentId: string;
  projectBudget: string;
  raisedAmount: string;
  categoryFund: number;
  status: string;
  progress: number;
  completedMilestones: number;
  totalMilestones: number;
  nextMilestone: string;
  nextMilestoneTitle: string;
  nextMilestoneAmount: string;
  milestone: string;
  startDate: string;
  tags: string;
  investorCount: number;
  totalInvestments: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  adminCompany: string;
  adminRole: string;
  adminLocation: string;
  adminExperience: string;
  remainingAmount?: string;
  milestoneProgress?: number;
}

interface ProjectData {
  stats: Stat[];
  projects: Project[];
  total: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasMore: boolean;
  };
}

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "completed":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "draft":
      return "bg-gray-100 text-gray-800 border-gray-300";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const AdminInvestments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]); // Store all projects
  const [projectData, setProjectData] = useState<ProjectData>({
    stats: [],
    projects: [],
    total: 0,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalCount: 0,
      hasMore: false,
    },
  });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter projects locally
  const getFilteredProjects = () => {
    let filtered = allProjects;

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.projectTitle.toLowerCase().includes(searchLower) ||
          project.projectDescription.toLowerCase().includes(searchLower) ||
          project.studentName.toLowerCase().includes(searchLower) ||
          project.university.toLowerCase().includes(searchLower) ||
          project.categoryName.toLowerCase().includes(searchLower) ||
          project.adminName.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  };

  // Fetch project data from API (only on initial load and load more)
  const fetchProjectData = async (page = 1, append = false) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const params = new URLSearchParams();
      // Don't send search and status filters to backend
      params.append("page", page.toString());
      params.append("limit", "20"); // Fetch more data at once

      const response = await fetch(
        `/api/admin/investments?${params.toString()}`
      );
      const result = await response.json();

      if (result.success) {
        if (append && page > 1) {
          // Append new data to existing projects
          const newProjects = [...allProjects, ...result.data.projects];
          setAllProjects(newProjects);
          setProjectData((prev) => ({
            ...result.data,
            projects: getFilteredProjects(),
          }));
        } else {
          // Replace data for first page
          setAllProjects(result.data.projects);
          setProjectData(result.data);
        }
        setError(null);
      } else {
        setError(result.error || "Failed to fetch data");
      }
    } catch (err) {
      setError("Network error occurred");
      console.error("Error fetching project data:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Update filtered projects when search or filter changes
  useEffect(() => {
    if (allProjects.length > 0) {
      const filtered = getFilteredProjects();
      setProjectData((prev) => ({
        ...prev,
        projects: filtered,
        total: filtered.length,
        pagination: {
          ...prev.pagination,
          totalCount: filtered.length,
          hasMore: false, // No pagination for filtered results
        },
      }));
    }
  }, [searchTerm, statusFilter, allProjects]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProjectData(nextPage, true);
  };

  // Only fetch on initial load
  useEffect(() => {
    fetchProjectData(1, false);
  }, []);

  const filteredProjects = projectData.projects;

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-destructive text-lg mb-4">Error: {error}</p>
            <Button onClick={() => fetchProjectData()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="flex justify-between items-start"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Project Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage all projects and their progress
          </p>
        </div>
        {/* <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Calendar className="h-4 w-4" />
            Schedule Review
          </Button>
        </div> */}
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {projectData.stats.map((stat, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-primary/10`}>
                    {stat.icon === "DollarSign" && (
                      <DollarSign className="h-6 w-6 text-primary" />
                    )}
                    {stat.icon === "TrendingUp" && (
                      <TrendingUp className="h-6 w-6 text-primary" />
                    )}
                    {stat.icon === "Users" && (
                      <Users className="h-6 w-6 text-primary" />
                    )}
                    {stat.icon === "Clock" && (
                      <Clock className="h-6 w-6 text-primary" />
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span
                    className={`text-sm font-medium ${stat.changeType === "positive"
                      ? "text-primary"
                      : "text-destructive"
                      }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    vs last month
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters and Search */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects, students, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Projects Table */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>
              Detailed view of all projects with their current status and
              progress ({projectData.pagination.totalCount} total projects)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project ID</TableHead>
                    <TableHead>Project Details</TableHead>
                    <TableHead>Student Information</TableHead>
                    <TableHead>Admin Assignment</TableHead>
                    <TableHead>Financial Status</TableHead>
                    <TableHead>Progress & Status</TableHead>
                    {/* <TableHead>Milestones</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.length === 0 && !loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <p className="text-muted-foreground">
                          No projects found matching your criteria.
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProjects.map((project) => (
                      <TableRow key={project.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div className="space-y-1">
                            <p className="font-bold">{project.id}</p>
                            {/* <p className="text-xs text-muted-foreground">
                              {project.startDate}
                            </p> */}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 max-w-xs">
                            <p className="font-medium text-sm truncate">{project.projectTitle}</p>
                            {/* <p className="text-xs text-muted-foreground truncate">
                              {project.projectDescription}
                            </p> */}
                            <div className="flex gap-1">
                              <Badge variant="secondary" className="text-xs">
                                {project.categoryName}
                              </Badge>
                              {/* {project.tags !== "N/A" && (
                                <Badge variant="outline" className="text-xs">
                                  {project.tags}
                                </Badge>
                              )} */}
                            </div>
                            {project.projectLocation !== "N/A" && (
                              <p className="text-xs text-muted-foreground">
                                📍 {project.projectLocation}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-sm">{project.studentName}</p>
                            <p className="text-xs text-muted-foreground">
                              🎓 {project.university}
                            </p>
                            {/* {project.department !== "Unknown" && (
                              <p className="text-xs text-muted-foreground">
                                📚 {project.department}
                              </p>
                            )}
                            <div className="flex gap-2 text-xs">
                              {project.yearOfStudy !== "N/A" && (
                                <span className="text-muted-foreground">
                                  Year: {project.yearOfStudy}
                                </span>
                              )}
                              {project.cgpa !== "N/A" && (
                                <span className="text-muted-foreground">
                                  CGPA: {project.cgpa}
                                </span>
                              )}
                            </div>
                            {project.studentId !== "N/A" && (
                              <p className="text-xs text-muted-foreground">
                                ID: {project.studentId}
                              </p>
                            )} */}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-sm">Assigned Admin</p>
                            <p className="text-sm font-medium text-blue-600">
                              {project.adminName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              📧 {project.adminEmail}
                            </p>
                            {/* {project.adminPhone !== "N/A" && (
                              <p className="text-xs text-muted-foreground">
                                📞 {project.adminPhone}
                              </p>
                            )}
                            {project.adminCompany !== "N/A" && (
                              <p className="text-xs text-muted-foreground">
                                🏢 {project.adminCompany}
                              </p>
                            )}
                            {project.adminRole !== "N/A" && (
                              <p className="text-xs text-muted-foreground">
                                💼 {project.adminRole}
                              </p>
                            )}
                            {project.adminLocation !== "N/A" && (
                              <p className="text-xs text-muted-foreground">
                                📍 {project.adminLocation}
                              </p>
                            )}
                            {project.investorCount > 0 && (
                              <p className="text-xs text-green-600">
                                💰 {project.investorCount} Investor{project.investorCount !== 1 ? 's' : ''}
                              </p>
                            )} */}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-bold text-blue-600">{project.projectBudget}</p>
                            <p className="text-xs text-green-600">
                              Raised: {project.raisedAmount}
                            </p>
                            {/* {project.categoryFund > 0 && (
                              <p className="text-xs text-muted-foreground">
                                Fund: ৳{project.categoryFund.toLocaleString()}
                              </p>
                            )} */}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <Badge
                              variant="outline"
                              className={getStatusColor(project.status)}
                            >
                              {project.status.replace("_", " ").toUpperCase()}
                            </Badge>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Funding:</span>
                                <span className="font-medium">
                                  {project.progress}%
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: `${project.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              {/* <div className="text-xs text-muted-foreground">
                                {project.raisedAmount} / {project.projectBudget}
                              </div> */}
                              {/* {project.remainingAmount !== "৳0" && (
                                <div className="text-xs text-orange-600">
                                  Remaining: {project.remainingAmount}
                                </div>
                              )} */}
                            </div>
                            {project.milestoneProgress !== undefined && (
                              <div className="pt-1 border-t border-muted">
                                <span className="text-muted-foreground">Milestones:</span>
                                {/* <div className="flex justify-between text-xs">
                                  <span className="font-medium">
                                    {project.milestoneProgress}%
                                  </span>
                                </div> */}
                                <div className="text-xs text-muted-foreground">
                                  {project.completedMilestones}/{project.totalMilestones} completed
                                </div>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        {/* <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{project.nextMilestoneTitle}</p>
                            <p className="text-xs text-muted-foreground">
                              📅 {project.nextMilestone}
                            </p>
                            {project.nextMilestoneAmount !== "N/A" && (
                              <p className="text-xs text-green-600">
                                💰 {project.nextMilestoneAmount}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {project.milestone}
                            </p>
                          </div>
                        </TableCell> */}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Load More Button - only show when no filters are applied */}
            {projectData.pagination.hasMore && !searchTerm && statusFilter === "all" && (
              <div className="flex justify-center mt-6">
                <Button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  variant="outline"
                  className="min-w-32"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </Button>
              </div>
            )}

            {/* Pagination Info */}
            <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
              <span>
                Showing {filteredProjects.length} of {
                  searchTerm || statusFilter !== "all"
                    ? filteredProjects.length
                    : projectData.pagination.totalCount
                } projects
                {(searchTerm || statusFilter !== "all") && (
                  <span className="text-primary ml-1">(filtered)</span>
                )}
              </span>
              {(!searchTerm && statusFilter === "all") && (
                <span>
                  Page {projectData.pagination.currentPage} of {projectData.pagination.totalPages}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      {/* <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks for project management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <AlertTriangle className="h-6 w-6" />
                Review Project Status
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <CheckCircle className="h-6 w-6" />
                Approve Pending Milestones
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <TrendingUp className="h-6 w-6" />
                Generate Project Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div> */}
    </div>
  );
};

export default AdminInvestments;
