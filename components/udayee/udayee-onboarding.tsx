"use client";
import { useEffect, useState } from "react";
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
import Image from "next/image";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import toast from "react-hot-toast";

export function UdayeeOnboarding() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formWarning, setFormWarning] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    university: string;
    department: string;
    student_id: string;
    nid_front: File | null;
    nid_back: File | null;
    student_id_front: File | null;
    student_id_back: File | null;
    university_email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }>({
    name: "",
    university: "",
    department: "",
    student_id: "",
    nid_front: null,
    nid_back: null,
    student_id_front: null,
    student_id_back: null,
    university_email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (stepNumber: number): boolean => {
    setFormWarning(null);

    if (stepNumber === 1) {
      if (!formData.name.trim()) {
        setFormWarning("Please enter your full name");
        return false;
      }
      if (!formData.university) {
        setFormWarning("Please select your university");
        return false;
      }
      if (!formData.department) {
        setFormWarning("Please select your department");
        return false;
      }
      if (!formData.student_id.trim()) {
        setFormWarning("Please enter your student ID");
        return false;
      }
    }

    if (stepNumber === 2) {
      if (!formData.student_id_front) {
        setFormWarning("Please upload the front of your student ID");
        return false;
      }
      if (!formData.student_id_back) {
        setFormWarning("Please upload the back of your student ID");
        return false;
      }
      if (!formData.nid_front) {
        setFormWarning("Please upload the front of your national ID");
        return false;
      }
      if (!formData.nid_back) {
        setFormWarning("Please upload the back of your national ID");
        return false;
      }
      if (!formData.university_email.trim()) {
        setFormWarning("Please enter your university email");
        return false;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.university_email)) {
        setFormWarning("Please enter a valid email address");
        return false;
      }

      if (
        !formData.university_email.includes(".edu") &&
        !formData.university_email.includes(".ac") &&
        !formData.university_email.includes("university") &&
        !formData.university_email.includes("college") &&
        formData.university !== "other"
      ) {
        setFormWarning("Please use your university email address");
        return false;
      }
    }

    if (stepNumber === 3) {
      if (!formData.phone.trim()) {
        setFormWarning("Please enter your phone number");
        return false;
      }
      if (formData.phone.length < 10 || formData.phone.length > 11) {
        setFormWarning("Phone number must be 10 or 11 digits");
        return false;
      }
      if (!formData.password) {
        setFormWarning("Please create a password");
        return false;
      }
      if (!formData.confirmPassword) {
        setFormWarning("Please confirm your password");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setFormWarning("Passwords do not match");
        return false;
      }
      if (formData.password.length < 6) {
        setFormWarning("Password must be at least 6 characters");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo(0, 0);

      setFormWarning(null);
    }
  };

  const handleBack = () => {
    setFormWarning(null);
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) {
      return;
    }

    setLoading(true);

    try {
      console.log(formData);
      // Create a new FormData object manually instead of from the form element
      const formDataToSend = new FormData();

      // Add all form fields manually to ensure all data is included regardless of DOM state
      formDataToSend.append("name", formData.name);
      formDataToSend.append("university", formData.university);
      formDataToSend.append("department", formData.department);
      formDataToSend.append("student_id", formData.student_id);
      formDataToSend.append("university_email", formData.university_email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("password", formData.password);

      // Add file uploads if they exist
      if (formData.nid_front)
        formDataToSend.append("nid_front", formData.nid_front);
      if (formData.nid_back) formDataToSend.append("nid_back", formData.nid_back);
      if (formData.student_id_front)
        formDataToSend.append("student_id_front", formData.student_id_front);
      if (formData.student_id_back)
        formDataToSend.append("student_id_back", formData.student_id_back);

      await axios.post("/api/user/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await axios.post('/api/send-mail',
        JSON.stringify({
          email: formData.university_email,
          subject: 'UdayeeConnect Registration',
          text: `<h2>This is your final notice. Your recent actions have been noted and are entirely unacceptable. If this behavior continues or is not immediately corrected, I will have no choice but to escalate the matter further—through all available channels.
          Let this serve as a formal warning: I am prepared to take decisive action if this is not resolved at once.
          You've been given more than enough time and opportunity to correct your course. This is your last chance to do so.</h2>`,
        }),
      );
      setFormWarning(null);
      const res = await signIn("credentials", {
        email: formData.university_email,
        password: formData.password,
        role: "user",
        redirect: false,
        callbackUrl: "/",
      });
      toast.success("Registration successful! Please check your email for verification.");
      if (res?.error) {
        setLoading(false);
        setFormWarning(res.error);
        return;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setFormWarning(error.response?.data?.error || "An error occurred");
    }
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
          {formWarning && (
            <div className="mt-2 text-sm font-medium text-red-600 bg-red-50 p-2 rounded-md">
              {formWarning}
            </div>
          )}
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                  <Label htmlFor="student_id">Student ID</Label>
                  <Input
                    id="student_id"
                    name="student_id"
                    placeholder="Enter your student ID"
                    value={formData.student_id}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Please upload the following documents for verification. We need
                  these to confirm you&#39;re a student.
                </p>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4 space-y-3">
                    <Label htmlFor="student_id_front" className="space-y-2">
                      <h2>Student ID Card (Front)</h2>
                      {!formData.student_id_front ? (
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">
                            Drag & drop or click to upload
                          </p>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG or PDF (Max 5MB)
                          </p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            type="button"
                            disabled
                          >
                            Select File
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                          <Image
                            src={URL.createObjectURL(formData.student_id_front)}
                            alt="Student ID Front"
                            width={200}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                    </Label>
                    <input
                      type="file"
                      accept="image/*"
                      id="student_id_front"
                      className="hidden"
                      name="student_id_front"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          student_id_front:
                            e.target.files && e.target.files[0]
                              ? e.target.files[0]
                              : null,
                        })
                      }
                    />
                  </div>
                  <div className="border rounded-lg p-4 space-y-3">
                    <Label htmlFor="student_id_back" className="space-y-2">
                      <h2>Student ID Card (Back)</h2>
                      {!formData.student_id_back ? (
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">
                            Drag & drop or click to upload
                          </p>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG or PDF (Max 5MB)
                          </p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            type="button"
                            disabled
                          >
                            Select File
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                          <Image
                            src={URL.createObjectURL(formData.student_id_back)}
                            alt="Student ID Back"
                            width={200}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                    </Label>
                    <input
                      type="file"
                      accept="image/*"
                      id="student_id_back"
                      className="hidden"
                      name="student_id_back"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          student_id_back:
                            e.target.files && e.target.files[0]
                              ? e.target.files[0]
                              : null,
                        })
                      }
                    />
                  </div>

                  <div className="border rounded-lg p-4 space-y-3">
                    <Label htmlFor="nid_front" className="space-y-2">
                      <h2>National ID Card -- NID (Front)</h2>
                      {!formData.nid_front ? (
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">
                            Drag & drop or click to upload
                          </p>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG or PDF (Max 5MB)
                          </p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            type="button"
                            disabled
                          >
                            Select File
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                          <Image
                            src={URL.createObjectURL(formData.nid_front)}
                            alt="NID Back"
                            width={200}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                    </Label>
                    <input
                      type="file"
                      accept="image/*"
                      id="nid_front"
                      className="hidden"
                      name="nid_front"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nid_front:
                            e.target.files && e.target.files[0]
                              ? e.target.files[0]
                              : null,
                        })
                      }
                    />
                  </div>
                  <div className="border rounded-lg p-4 space-y-3">
                    <Label htmlFor="nid_back" className="space-y-2">
                      <h2>National ID Card -- NID (Back)</h2>
                      {!formData.nid_back ? (
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">
                            Drag & drop or click to upload
                          </p>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG or PDF (Max 5MB)
                          </p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            type="button"
                            disabled
                          >
                            Select File
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                          <Image
                            src={URL.createObjectURL(formData.nid_back)}
                            alt="NID Front"
                            width={200}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                    </Label>
                    <input
                      type="file"
                      accept="image/*"
                      id="nid_back"
                      className="hidden"
                      name="nid_back"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nid_back:
                            e.target.files && e.target.files[0]
                              ? e.target.files[0]
                              : null,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university_email">University Email</Label>
                  <Input
                    id="university_email"
                    name="university_email"
                    type="email"
                    placeholder="Enter your university email"
                    value={formData.university_email}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    We&#39;ll send a verification link to this email
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="number"
                    maxLength={11}
                    minLength={10}
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
                    value={formData.password}
                    onChange={handleChange}
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
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                type="button"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <Button
                variant="outline"
                type="button"
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
                type="button"
                className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
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
        </form>
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
