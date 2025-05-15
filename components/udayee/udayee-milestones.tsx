import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Upload, Check, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

export function UdayeeMilestones() {
  // Mock data - in a real app, this would come from an API
  const milestones = [
    {
      id: "m1",
      title: "Market Research & Validation",
      description:
        "Conduct surveys and interviews with potential users to validate the problem and solution.",
      amount: "৳3,000",
      status: "completed",
      completedDate: "March 10, 2023",
      investor: {
        name: "Sadia Ahmed",
        company: "Impact Investors",
      },
    },
    {
      id: "m2",
      title: "Prototype Development",
      description:
        "Build a working prototype of the IoT sensor and mobile app.",
      amount: "৳8,000",
      status: "completed",
      completedDate: "July 15, 2023",
      investor: {
        name: "Ayesha Khan",
        company: "Green Ventures",
      },
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
      investor: {
        name: "Karim Rahman",
        company: "Tech Angels",
      },
    },
    {
      id: "m4",
      title: "MVP Launch",
      description: "Launch the minimum viable product to the public.",
      amount: "৳7,000",
      status: "planned",
      deadline: "August 15, 2025",
      investor: null,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: "var(--sidebar-primary)" }}
        >
          Milestones
        </h1>
        <p className="text-muted-foreground">
          Track and manage your startup's funding milestones
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Milestones</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="planned">Planned</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {milestones.map((milestone) => (
            <MilestoneCard key={milestone.id} milestone={milestone} />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          {milestones
            .filter((milestone) => milestone.status === "in_progress")
            .map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {milestones
            .filter((milestone) => milestone.status === "completed")
            .map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
        </TabsContent>

        <TabsContent value="planned" className="space-y-6">
          {milestones
            .filter((milestone) => milestone.status === "planned")
            .map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MilestoneCard({ milestone }: { milestone: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background:
                  milestone.status === "completed"
                    ? "var(--accent)"
                    : milestone.status === "in_progress"
                    ? "var(--muted)"
                    : "var(--card)",
                color:
                  milestone.status === "completed"
                    ? "var(--accent-foreground)"
                    : milestone.status === "in_progress"
                    ? "var(--primary)"
                    : "var(--muted-foreground)",
              }}
            >
              <Target className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-lg">{milestone.title}</CardTitle>
              <CardDescription>
                {milestone.status === "completed"
                  ? `Completed on ${milestone.completedDate}`
                  : milestone.status === "in_progress"
                  ? `Deadline: ${milestone.deadline}`
                  : `Planned for ${milestone.deadline}`}
              </CardDescription>
            </div>
          </div>
          <div>
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{
                background:
                  milestone.status === "completed"
                    ? "var(--accent)"
                    : milestone.status === "in_progress"
                    ? "var(--muted)"
                    : "var(--card)",
                color:
                  milestone.status === "completed"
                    ? "var(--accent-foreground)"
                    : milestone.status === "in_progress"
                    ? "var(--primary)"
                    : "var(--muted-foreground)",
              }}
            >
              {milestone.status === "completed"
                ? "Completed"
                : milestone.status === "in_progress"
                ? "In Progress"
                : "Planned"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{milestone.description}</p>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Funding Amount:</span>
          <span className="font-medium">{milestone.amount}</span>
        </div>

        {milestone.investor && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Investor:</span>
            <span className="font-medium">
              {milestone.investor.name} ({milestone.investor.company})
            </span>
          </div>
        )}

        {milestone.status === "in_progress" && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress:</span>
              <span className="font-medium">{milestone.progress}%</span>
            </div>
            <Progress
              value={milestone.progress}
              className="h-2"
              style={{ background: "var(--chart-1)" }}
            />
          </div>
        )}

        <div className="pt-2">
          {milestone.status === "in_progress" && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Submit Deliverables
              </Button>
              <Link
                href={`/udayee/chat/${milestone.investor?.name
                  .toLowerCase()
                  .replace(" ", "-")}`}
                className="flex-1"
              >
                <Button variant="outline" className="w-full">
                  Contact Investor
                </Button>
              </Link>
            </div>
          )}

          {milestone.status === "completed" && (
            <div className="flex items-center gap-2 text-emerald-600">
              <Check className="h-5 w-5" />
              <span className="font-medium">
                Milestone completed and funds released
              </span>
            </div>
          )}

          {milestone.status === "planned" && !milestone.investor && (
            <div className="flex items-center gap-2 text-amber-600">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Waiting for investor funding</span>
            </div>
          )}

          {milestone.status === "planned" && milestone.investor && (
            <div className="flex items-center gap-2 text-emerald-600">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">
                Ready to start - update status when you begin work
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
