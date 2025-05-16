"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Camera,
  Mail,
  Phone,
  BookOpen,
  Award,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UdayeeProfileEditor() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Mock data - in a real app, this would come from an API
  const [studentData, setStudentData] = useState({
    name: "Ariful Islam",
    email: "ariful.islam@example.com",
    phone: "+880 1712345678",
    dateOfBirth: "1999-05-15",
    profilePicture: "/placeholder-avatar.jpg",
    bio: "Computer Science student passionate about web development and artificial intelligence.",
    institution: "Bangladesh University of Engineering and Technology",
    program: "Computer Science and Engineering",
    graduationYear: "2025",
    currentYear: "3rd year",
    cgpa: "3.85",
    skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning"],
    interests: [
      "Web Development",
      "AI Research",
      "Mobile App Development",
      "Competitive Programming",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/arifulislam",
      github: "https://github.com/arifulislam",
      portfolio: "https://arifulislam.dev",
    },
    careerGoals:
      "Aspiring to become a full-stack developer with expertise in AI integration. Looking for internship opportunities in tech companies.",
    address: "Dhaka, Bangladesh",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillsArray = e.target.value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    setStudentData((prev) => ({ ...prev, skills: skillsArray }));
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interestsArray = e.target.value
      .split(",")
      .map((interest) => interest.trim())
      .filter(Boolean);

    setStudentData((prev) => ({ ...prev, interests: interestsArray }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setStudentData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would upload the file to a server
      // and get back a URL to display
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setStudentData((prev) => ({
            ...prev,
            profilePicture: event.target!.result as string,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      setSaving(false);

      toast({
        title: "Profile Updated",
        description: "Your student profile has been successfully updated.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: "var(--sidebar-primary)" }}
        >
          Student Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your personal information and academic details
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills & Interests</TabsTrigger>
            <TabsTrigger value="additional">Additional Info</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your basic profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-2 border-primary">
                      <AvatarImage
                        src={studentData.profilePicture}
                        alt={studentData.name}
                      />
                      <AvatarFallback className="text-4xl">
                        {studentData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <label
                      htmlFor="profile-picture"
                      className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer shadow-md hover:bg-primary/90 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Change profile picture</span>
                    </label>
                    <input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                    />
                  </div>
                  <h2 className="text-xl font-semibold">{studentData.name}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={studentData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={studentData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <Mail className="h-4 w-4" />
                      </span>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="rounded-l-none"
                        value={studentData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <Phone className="h-4 w-4" />
                      </span>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="rounded-l-none"
                        value={studentData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={studentData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us a bit about yourself"
                    value={studentData.bio}
                    onChange={handleChange}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    A brief introduction about yourself (max 200 characters)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Educational Background</CardTitle>
                <CardDescription>
                  Information about your studies and academic achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Current Institution</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <Input
                      id="institution"
                      name="institution"
                      value={studentData.institution}
                      onChange={handleChange}
                      className="rounded-l-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="program">Program/Degree</Label>
                    <Input
                      id="program"
                      name="program"
                      value={studentData.program}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentYear">Current Year</Label>
                    <Select
                      value={studentData.currentYear}
                      onValueChange={(value) =>
                        handleSelectChange("currentYear", value)
                      }
                    >
                      <SelectTrigger id="currentYear">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st year">1st Year</SelectItem>
                        <SelectItem value="2nd year">2nd Year</SelectItem>
                        <SelectItem value="3rd year">3rd Year</SelectItem>
                        <SelectItem value="4th year">4th Year</SelectItem>
                        <SelectItem value="Masters">Masters</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">
                      Expected Graduation Year
                    </Label>
                    <Input
                      id="graduationYear"
                      name="graduationYear"
                      type="text"
                      value={studentData.graduationYear}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cgpa">CGPA</Label>
                    <Input
                      id="cgpa"
                      name="cgpa"
                      type="text"
                      value={studentData.cgpa}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Award className="h-4 w-4" />
                    Add Academic Achievement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills & Interests Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Interests</CardTitle>
                <CardDescription>
                  Showcase your abilities and areas of interest
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    placeholder="Enter skills separated by commas (e.g., JavaScript, React, Python)"
                    value={studentData.skills.join(", ")}
                    onChange={handleSkillChange}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {studentData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Interests</Label>
                  <Input
                    id="interests"
                    placeholder="Enter interests separated by commas (e.g., Web Development, AI Research)"
                    value={studentData.interests.join(", ")}
                    onChange={handleInterestChange}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {studentData.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional Info Tab */}
          <TabsContent value="additional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>
                  Connect your social and professional profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/username"
                    value={studentData.socialLinks.linkedin}
                    onChange={(e) =>
                      handleSocialLinkChange("linkedin", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Profile</Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/username"
                    value={studentData.socialLinks.github}
                    onChange={(e) =>
                      handleSocialLinkChange("github", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio Website</Label>
                  <Input
                    id="portfolio"
                    placeholder="https://yourwebsite.com"
                    value={studentData.socialLinks.portfolio}
                    onChange={(e) =>
                      handleSocialLinkChange("portfolio", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Career Information</CardTitle>
                <CardDescription>
                  Information about your career goals and aspirations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="careerGoals">Career Goals</Label>
                  <Textarea
                    id="careerGoals"
                    name="careerGoals"
                    placeholder="Describe your career goals and aspirations"
                    value={studentData.careerGoals}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end space-x-2 pt-6">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Tabs>
      </form>
    </div>
  );
}
