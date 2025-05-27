"use client";

import { useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  MoreHorizontal,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  AlertTriangle,
  Download,
  Calendar,
} from "lucide-react";

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

// Mock Data
const INVESTMENT_STATS = [
  {
    icon: DollarSign,
    title: "Total Investments",
    value: "৳24,50,000",
    change: "+12.5%",
    changeType: "positive",
  },
  {
    icon: TrendingUp,
    title: "Active Investments",
    value: "48",
    change: "+8",
    changeType: "positive",
  },
  {
    icon: Users,
    title: "Total Investors",
    value: "156",
    change: "+23",
    changeType: "positive",
  },
  {
    icon: Clock,
    title: "Pending Reviews",
    value: "12",
    change: "-3",
    changeType: "negative",
  },
];

const INVESTMENTS_DATA = [
  {
    id: "INV-001",
    projectTitle: "EcoSolutions App",
    studentName: "Tahmid Hassan",
    university: "BUET",
    investorName: "Farzana Rahman",
    amount: "৳2,50,000",
    milestone: "Phase 2",
    status: "active",
    progress: 65,
    startDate: "2024-01-15",
    nextMilestone: "2024-03-15",
    riskLevel: "Low",
  },
  {
    id: "INV-002",
    projectTitle: "HealthTech Solution",
    studentName: "Mahir Ahmed",
    university: "DMC",
    investorName: "Nasreen Khan",
    amount: "৳3,75,000",
    milestone: "Phase 1",
    status: "pending",
    progress: 25,
    startDate: "2024-02-01",
    nextMilestone: "2024-04-01",
    riskLevel: "Medium",
  },
  {
    id: "INV-003",
    projectTitle: "EdTech Platform",
    studentName: "Sadia Islam",
    university: "NSU",
    investorName: "Rahman Group",
    amount: "৳5,00,000",
    milestone: "Phase 3",
    status: "completed",
    progress: 100,
    startDate: "2023-11-10",
    nextMilestone: "Completed",
    riskLevel: "Low",
  },
  {
    id: "INV-004",
    projectTitle: "AgriTech Innovation",
    studentName: "Karim Abdullah",
    university: "BAU",
    investorName: "Green Ventures",
    amount: "৳1,80,000",
    milestone: "Phase 1",
    status: "at_risk",
    progress: 15,
    startDate: "2024-02-20",
    nextMilestone: "2024-04-20",
    riskLevel: "High",
  },
  {
    id: "INV-005",
    projectTitle: "Fintech Startup",
    studentName: "Riya Chowdhury",
    university: "DU",
    investorName: "Tech Angels BD",
    amount: "৳4,20,000",
    milestone: "Phase 2",
    status: "active",
    progress: 45,
    startDate: "2024-01-08",
    nextMilestone: "2024-03-08",
    riskLevel: "Medium",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-accent text-accent-foreground border-accent";
    case "pending":
      return "bg-secondary text-secondary-foreground border-secondary";
    case "completed":
      return "bg-primary/10 text-primary border-primary/20";
    case "at_risk":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Low":
      return "bg-accent text-accent-foreground";
    case "Medium":
      return "bg-secondary text-secondary-foreground";
    case "High":
      return "bg-destructive/10 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const AdminInvestments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const filteredInvestments = INVESTMENTS_DATA.filter((investment) => {
    const matchesSearch =
      investment.projectTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      investment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investment.investorName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || investment.status === statusFilter;
    const matchesRisk =
      riskFilter === "all" || investment.riskLevel === riskFilter;

    return matchesSearch && matchesStatus && matchesRisk;
  });

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
            Investment Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage all ongoing investments and their progress
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2  bg-primary text-primary-foreground hover:bg-primary/90">
            <Calendar className="h-4 w-4" />
            Schedule Review
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {INVESTMENT_STATS.map((stat, index) => (
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
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
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
              Filter Investments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search investments, students, or investors..."
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
                  <SelectItem value="at_risk">At Risk</SelectItem>
                </SelectContent>
              </Select>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="Low">Low Risk</SelectItem>
                  <SelectItem value="Medium">Medium Risk</SelectItem>
                  <SelectItem value="High">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Investments Table */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card>
          <CardHeader>
            <CardTitle>Investment Overview</CardTitle>
            <CardDescription>
              Detailed view of all investments with their current status and
              progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Investment ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Investor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Next Milestone</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvestments.map((investment) => (
                    <TableRow key={investment.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {investment.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {investment.projectTitle}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {investment.university}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{investment.studentName}</TableCell>
                      <TableCell>{investment.investorName}</TableCell>
                      <TableCell className="font-medium">
                        {investment.amount}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(investment.status)}
                        >
                          {investment.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${investment.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {investment.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getRiskColor(investment.riskLevel)}
                        >
                          {investment.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {investment.nextMilestone}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Investment
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve Milestone
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-destructive">
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend Investment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks for investment management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <AlertTriangle className="h-6 w-6" />
                Review Risk Assessments
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <CheckCircle className="h-6 w-6" />
                Approve Pending Milestones
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <TrendingUp className="h-6 w-6" />
                Generate Performance Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminInvestments;
