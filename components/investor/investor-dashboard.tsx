"use client";
import type React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  DollarSign,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import axios from "axios";



// Skeleton Components
const SkeletonCard = () => (
  <Card>
    <CardHeader className="pb-2">
      <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mt-2"></div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-muted rounded-md">
          <div className="h-8 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-16 mx-auto mt-2 animate-pulse"></div>
        </div>
        <div className="text-center p-3 bg-muted rounded-md">
          <div className="h-8 bg-gray-200 rounded w-12 mx-auto animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-20 mx-auto mt-2 animate-pulse"></div>
        </div>
      </div>
      <div className="mt-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
              <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="text-right">
                <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse mt-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const QuickActionsSkeleton = () => (
  <div className="space-y-4">
    <div className="h-7 bg-gray-200 rounded w-32 animate-pulse"></div>
    <div className="grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="h-full">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-40 animate-pulse mt-2"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
import useInvestorStore from "@/store/useInvestorStore";
export function InvestorDashboard() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
  });
  const { submitInvestment, investments, isSubmitting } = useInvestorStore()
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount) {
      try {
        await submitInvestment(formData.amount);
        setFormData({ amount: "" });
        setIsPopupOpen(false);
      } catch (error) {
        console.error("Error submitting investment:", error);
      }
    }
  };

  // if (loading) {
  //   return (
  //     <div className="space-y-8">
  //       <div>
  //         <div className="h-9 bg-gray-200 rounded w-64 animate-pulse"></div>
  //         <div className="h-5 bg-gray-200 rounded w-96 animate-pulse mt-2"></div>
  //       </div>

  //       <div className="flex justify-end">
  //         <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
  //       </div>

  //       <div className="grid gap-6 md:grid-cols-1">
  //         <SkeletonCard />
  //       </div>

  //       <QuickActionsSkeleton />
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Investor Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your investments and recommended
          startups.
        </p>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setIsPopupOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Investment
        </Button>
      </div>

      {/* Stats Cards - 2 column grid layout for larger stats */}
      <div className="grid gap-6 md:grid-cols-1">
        {/* Investment Overview */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Investment Overview</CardTitle>
            <CardDescription>Summary of your portfolio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  ৳{investments?.reduce((acc, inv) => acc + Number(inv.amount), 0) || 0}
                </p>
                <p className="text-xs text-muted-foreground">Total Invested</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <p className="text-2xl font-bold text-secondary-foreground">
                  {investments?.length || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  Active Investments
                </p>
              </div>
            </div>

            {/* All Investments List */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">All Investments</h3>
              <div className="space-y-3">
                {investments && investments.length > 0 ? (
                  investments.map((investment) => (
                    <div
                      key={investment.id}
                      className="flex justify-between items-center p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">Investment #{investment.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">৳{investment.amount}</p>
                        <p className="text-sm text-muted-foreground">
                          {investment.createdAt.split("T")[0]}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-lg mb-2">No investments yet</p>
                    <p className="text-sm">Click "Add Investment" to get started with your first investment.</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Investment</h2>
              <button onClick={() => setIsPopupOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Amount (৳)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter investment amount"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Investment"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsPopupOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Actions - Added to match the udayee dashboard structure */}
      {/* <div className="space-y-4">
        <h2 className="text-xl font-semibold text-primary">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/investor/startups">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-secondary">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg text-foreground">
                  Browse Startups
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Find new investment opportunities
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/investor/portfolio">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-secondary">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg text-foreground">
                  Portfolio Overview
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Track your investments and returns
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/investor/messages">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 bg-secondary">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg text-foreground">
                  Message Startups
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Communicate with your portfolio companies
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div> */}
    </div>
  );
}

function Button({
  children,
  variant = "default",
  className,
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
  [key: string]: any;
}) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium flex items-center justify-center transition-colors",
        variant === "default"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "",
        variant === "outline"
          ? "bg-transparent border border-primary text-primary hover:bg-secondary"
          : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
