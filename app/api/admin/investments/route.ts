import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    // Get project statistics
    const totalProjects = await prisma.project.count();

    const activeProjects = await prisma.project.count({
      where: { status: "active" },
    });

    const completedProjects = await prisma.project.count({
      where: { status: "completed" },
    });

    const pendingProjects = await prisma.project.count({
      where: { status: "pending" },
    });

    // Build where clause for projects based on filters
    const projectWhereClause: any = {};

    if (status && status !== "all") {
      projectWhereClause.status = status;
    }

    if (search) {
      projectWhereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { university: { contains: search, mode: "insensitive" } } },
        { category: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    // Get total count for pagination
    const totalCount = await prisma.project.count({
      where: projectWhereClause,
    });

    // Fetch projects with pagination
    const projects = await prisma.project.findMany({
      where: projectWhereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            university: true,
            department: true,
            year_of_study: true,
            graduation_year: true,
            cgpa: true,
            student_id: true,
            university_email: true,
            phone: true,
            bio: true,
            skills: true,
            interests: true,
          },
        },
        milestones: {
          orderBy: { createdAt: "asc" },
        },
        // category: {
        //   select: {
        //     id: true,
        //     name: true,
        //     fund: true,
        //   },
        // },
        projectInvestors: {
          include: {
            project: true,
          },
        },
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    });

    // Get investments for projects that have investors
    const projectIds = projects.map((p) => p.id);
    const projectInvestorData = await prisma.projectInvestor.findMany({
      where: {
        projectId: { in: projectIds },
      },
      include: {
        project: true,
      },
    });

    const investorIds = projectInvestorData.map((pi) => pi.investorId);
    const investments = await prisma.investment.findMany({
      where: {
        investorId: { in: investorIds },
      },
      include: {
        investor: {
          select: {
            id: true,
            name: true,
            company_name: true,
            email: true,
          },
        },
      },
    });

    // Transform data to show project information
    const transformedProjects = projects.map((project) => {
      // Calculate progress based on raised amount vs budget ratio
      const progress =
        project.budget > 0
          ? Math.round(((project.raised_amount || 0) / project.budget) * 100)
          : 0;

      // Determine current milestone (exclude declined milestones)
      const currentMilestone =
        project.milestones.find((m) => m.status === "in_progress") ||
        project.milestones.find((m) => m.status === "planned");

      // Calculate milestone completion for additional info (exclude declined milestones)
      const validMilestones = project.milestones.filter(
        (m) => m.status !== "declined"
      );
      const completedMilestones = validMilestones.filter(
        (m) => m.status === "completed"
      ).length;
      const totalMilestones = validMilestones.length;
      const milestoneProgress =
        totalMilestones > 0
          ? Math.round((completedMilestones / totalMilestones) * 100)
          : 0;

      // Get project investors and their investment details
      const projectInvestors = projectInvestorData.filter(
        (pi) => pi.projectId === project.id
      );
      const projectInvestments = investments.filter((inv) =>
        projectInvestors.some((pi) => pi.investorId === inv.investorId)
      );

      const totalInvestmentAmount = projectInvestments.reduce(
        (sum, inv) => sum + inv.amount,
        0
      );

      return {
        id: `PRJ-${project.id.toString().padStart(3, "0")}`,
        projectTitle: project.title,
        projectDescription: project.description,
        projectBudget: `৳${project.budget.toLocaleString()}`,
        raisedAmount: project.raised_amount
          ? `৳${project.raised_amount.toLocaleString()}`
          : "৳0",
        totalInvestments: `৳${totalInvestmentAmount.toLocaleString()}`,
        projectLocation: project.location || "N/A",
        projectStartDate: project.start_date || "N/A",
        studentName: project.user.name || "Unknown",
        university: project.user.university || "Unknown",
        department: project.user.department || "Unknown",
        yearOfStudy: project.user.year_of_study || "N/A",
        graduationYear: project.user.graduation_year || "N/A",
        cgpa: project.user.cgpa ? project.user.cgpa.toString() : "N/A",
        studentId: project.user.student_id || "N/A",
        studentEmail: project.user.university_email || "N/A",
        studentPhone: project.user.phone || "N/A",
        studentBio: project.user.bio || "N/A",
        studentSkills: project.user.skills || "N/A",
        adminName: project.admin?.name || "Unassigned",
        adminEmail: project.admin?.email || "N/A",

        investorCount: projectInvestments.length,
        milestone: currentMilestone
          ? `${currentMilestone.title} (Phase ${
              project.milestones.indexOf(currentMilestone) + 1
            })`
          : "Planning",
        status: project.status,
        progress,
        milestoneProgress,
        fundingProgress: progress,
        startDate: project.createdAt.toISOString().split("T")[0],
        nextMilestone: currentMilestone?.deadlineAt || "TBD",
        nextMilestoneTitle: currentMilestone?.title || "N/A",
        nextMilestoneAmount: currentMilestone
          ? `৳${currentMilestone.amount.toLocaleString()}`
          : "N/A",
        projectId: project.id,
        userId: project.userId,
        // categoryName: project.category?.name || "General",
        // categoryFund: project.category?.fund || 0,
        totalMilestones,
        completedMilestones,
        tags: project.tags || "N/A",
        remainingAmount: `৳${Math.max(
          0,
          project.budget - (project.raised_amount || 0)
        ).toLocaleString()}`,
        fundingPercentage: progress,
        milestonesData: validMilestones.map((m) => ({
          id: m.id,
          title: m.title,
          description: m.description,
          amount: m.amount,
          status: m.status,
          deadlineAt: m.deadlineAt,
          progress: m.progress || 0,
        })),
      };
    });

    // Calculate statistics
    const stats = [
      {
        icon: "DollarSign",
        title: "Total Budget",
        value: `৳${projects
          .reduce((sum, p) => sum + p.budget, 0)
          .toLocaleString()}`,
        change: "+12.5%",
        changeType: "positive",
      },
      {
        icon: "TrendingUp",
        title: "Active Projects",
        value: activeProjects.toString(),
        change: "+8",
        changeType: "positive",
      },
      {
        icon: "Users",
        title: "Total Projects",
        value: totalProjects.toString(),
        change: "+23",
        changeType: "positive",
      },
      {
        icon: "Clock",
        title: "Pending Projects",
        value: pendingProjects.toString(),
        change: "-3",
        changeType: "negative",
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        stats,
        projects: transformedProjects,
        total: transformedProjects.length,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
          hasMore: page * limit < totalCount,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching project data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project data" },
      { status: 500 }
    );
  }
}
