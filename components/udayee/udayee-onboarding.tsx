"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Upload, Check } from "lucide-react";

export function UdayeeOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    department: "",
    studentId: "",
    nid: "",
    email: "",
    phone: "",
    // Additional fields would be added for other steps
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push("/udayee/dashboard");
    }, 2000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--muted)" }}
    >
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle
            className="text-2xl font-bold"
            style={{ color: "var(--sidebar-primary)" }}
          >
            {step === 1 && "Welcome to UdayeeConnect"}
            {step === 2 && "Verify Your Identity"}
            {step === 3 && "Create Your Account"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Let's get started with your Udayee journey"}
            {step === 2 && "Upload your documents for verification"}
            {step === 3 && "Set up your account credentials"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Select
                  value={formData.university}
                  onValueChange={(value) =>
                    handleSelectChange("university", value)
                  }
                >
                  <SelectTrigger id="university">
                    <SelectValue placeholder="Select your university" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buet">
                      Bangladesh University of Engineering and Technology (BUET)
                    </SelectItem>
                    <SelectItem value="du">Dhaka University</SelectItem>
                    <SelectItem value="nsu">North South University</SelectItem>
                    <SelectItem value="bau">
                      Bangladesh Agricultural University
                    </SelectItem>
                    <SelectItem value="cuet">
                      Chittagong University of Engineering and Technology
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    handleSelectChange("department", value)
                  }
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cse">
                      Computer Science & Engineering
                    </SelectItem>
                    <SelectItem value="eee">
                      Electrical & Electronic Engineering
                    </SelectItem>
                    <SelectItem value="me">Mechanical Engineering</SelectItem>
                    <SelectItem value="ce">Civil Engineering</SelectItem>
                    <SelectItem value="business">
                      Business Administration
                    </SelectItem>
                    <SelectItem value="economics">Economics</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  name="studentId"
                  placeholder="Enter your student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Document Verification */}
          {step === 2 && (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Please upload the following documents for verification. We need
                these to confirm you're a student.
              </p>

              <div className="space-y-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <Label>Student ID Card (Front & Back)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or PDF (Max 5MB)
                    </p>
                    <Button variant="outline" className="mt-4">
                      Select File
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <Label>National ID Card (NID)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or PDF (Max 5MB)
                    </p>
                    <Button variant="outline" className="mt-4">
                      Select File
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">University Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your university email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  We'll send a verification link to this email
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Account Setup */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  For bKash/Nagad transactions and verification
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Create Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="rounded text-emerald-600"
                    required
                  />
                  <Label htmlFor="terms" className="text-sm font-normal">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Cancel
            </Button>
          )}

          {step < 3 ? (
            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  Complete Registration
                  <Check className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </CardFooter>

        {/* Step Indicator */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: step >= 1 ? "var(--primary)" : "var(--muted)",
                  color:
                    step >= 1
                      ? "var(--primary-foreground)"
                      : "var(--muted-foreground)",
                }}
              >
                {step > 1 ? <Check className="h-4 w-4" /> : 1}
              </div>
              <div
                className="h-1 w-12"
                style={{
                  background: step > 1 ? "var(--primary)" : "var(--muted)",
                }}
              />
            </div>

            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: step >= 2 ? "var(--primary)" : "var(--muted)",
                  color:
                    step >= 2
                      ? "var(--primary-foreground)"
                      : "var(--muted-foreground)",
                }}
              >
                {step > 2 ? <Check className="h-4 w-4" /> : 2}
              </div>
              <div
                className="h-1 w-12"
                style={{
                  background: step > 2 ? "var(--primary)" : "var(--muted)",
                }}
              />
            </div>

            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: step >= 3 ? "var(--primary)" : "var(--muted)",
                  color:
                    step >= 3
                      ? "var(--primary-foreground)"
                      : "var(--muted-foreground)",
                }}
              >
                3
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
