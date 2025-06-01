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
import {
  Camera,
  Mail,
  Phone,
  BookOpen,
  Award,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/store/useUserStore";
import safeUrl from "@/lib/safeURL";

export function UdayeeProfileEditor() {
  const [saving, setSaving] = useState(false);
  const { user, updateUser, pushUser } = useUserStore();
  const [profilePicturePreview, setProfilePicturePreview] = useState<File | null>(null);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    await updateUser({ [name]: value });
  };

  const handleSelectChange = async (name: string, value: string) => {
    await updateUser({ [name]: value });
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicturePreview(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (profilePicturePreview) {
        await updateUser({ profile_picture: profilePicturePreview });
      }
      await pushUser();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
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
                        src={safeUrl(profilePicturePreview ? profilePicturePreview : user?.profile_picture)}
                        alt={user?.name || "User Avatar"}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-4xl">
                        {user?.name
                          ? user?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    {/* <Image src={safeUrl(user?.profile_picture)} alt="shdfdg" width={40} height={40}></Image> */}
                    <label
                      htmlFor="profile_picture"
                      className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer shadow-md hover:bg-primary/90 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Change profile picture</span>
                    </label>
                    <input
                      id="profile_picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                    />
                    {/* <Image width={880} height={880} src="/uploads/profile_pictures/1748043539356-Mutiur Rahman 2207097.jpg" alt="" /> */}
                  </div>
                  <h2 className="text-xl font-semibold">{user?.name}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={user?.name || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input
                      id="date_of_birth"
                      name="date_of_birth"
                      type="date"
                      value={user?.date_of_birth
                        ? new Date(user.date_of_birth).toLocaleDateString('en-CA')
                        : new Date().toLocaleDateString('en-CA')}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="university_email">Email Address</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <Mail className="h-4 w-4" />
                      </span>
                      <Input
                        id="university_email"
                        name="university_email"
                        type="university_email"
                        className="rounded-l-none"
                        value={user?.university_email || ""}
                        readOnly
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
                        value={user?.phone || ""}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={user?.address || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us a bit about yourself"
                    value={user?.bio || ""}
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
                  <Label htmlFor="university">Current Institution</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <Input
                      id="university"
                      name="university"
                      value={user?.university || ""}
                      onChange={handleChange}
                      className="rounded-l-none"
                      required
                      readOnly
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Program/Degree</Label>
                    <Input
                      id="department"
                      name="department"
                      value={user?.department || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year_of_study">Current Year</Label>
                    <Select
                      value={user?.year_of_study || ""}
                      onValueChange={(value) =>
                        handleSelectChange("year_of_study", value)
                      }
                    >
                      <SelectTrigger id="year_of_study">
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
                    <Label htmlFor="graduation_year">
                      Expected Graduation Year
                    </Label>
                    <Input
                      id="graduation_year"
                      name="graduation_year"
                      type="text"
                      value={user?.graduation_year || ""}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cgpa">CGPA</Label>
                    <Input
                      id="cgpa"
                      name="cgpa"
                      type="number"
                      value={user?.cgpa?.toString() || ""}
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
                    name="skills"
                    placeholder="Enter skills separated by commas (e.g., JavaScript, React, Python)"
                    value={user?.skills || ""}
                    onChange={handleChange}
                  />
                  <div>
                    {user?.skills
                      ? user.skills.split(",").map((skill, index) =>
                        skill.trim() ? (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-primary bg-primary/10 border border-primary rounded-full"
                          >
                            {skill.trim()}
                            <button
                              type="button"
                              className="ml-2 text-primary hover:text-primary/80"
                              onClick={() => {
                                const updatedSkills = user?.skills || ""
                                  .split(",")
                                  .filter((_, i) => i !== index)
                                  .join(",");
                                updateUser({ skills: updatedSkills });
                              }}
                            >
                              &times;
                            </button>
                          </span>
                        ) : null
                      ) : null}

                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Interests</Label>
                  <Input
                    id="interests"
                    name="interests"
                    placeholder="Enter interests separated by commas (e.g., Web Development, AI Research)"
                    value={user?.interests || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  {user?.interests
                    ? user?.interests.split(",").map((interest, index) =>
                      interest.trim() ? (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-primary bg-primary/10 border border-primary rounded-full"
                        >
                          {interest.trim()}
                          <button
                            type="button"
                            className="ml-2 text-primary hover:text-primary/80"
                            onClick={() => {
                              const updatedInterests = user?.interests || ""
                                .split(",")
                                .filter((_, i) => i !== index)
                                .join(",");
                              updateUser({ interests: updatedInterests });
                            }}
                          >
                            &times;
                          </button>
                        </span>
                      ) : null
                    ) : null}

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
                {Array.isArray(user?.social_links) && user.social_links.length > 0 ? (
                  user.social_links.map((link, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Input
                        type="text"
                        placeholder="Platform (e.g., LinkedIn, GitHub)"
                        value={link.platform || ""}
                        onChange={(e) => {
                          const updatedLinks = [...(user.social_links || [])];
                          updatedLinks[index] = { ...updatedLinks[index], platform: e.target.value };
                          updateUser({ social_links: updatedLinks });
                        }}
                      />
                      <Input
                        type="url"
                        placeholder="URL (e.g., https://linkedin.com/in/yourprofile)"
                        value={link.url || ""}
                        onChange={(e) => {
                          const updatedLinks = [...(user.social_links || [])];
                          updatedLinks[index] = { ...updatedLinks[index], url: e.target.value };
                          updateUser({ social_links: updatedLinks });
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          const updatedLinks = user.social_links ?
                            user.social_links.filter((_, i) => i !== index) :
                            [];
                          updateUser({ social_links: updatedLinks });
                        }}
                      >
                        &times;
                      </Button>

                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No social links added yet.</p>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const currentLinks = Array.isArray(user?.social_links) ? user.social_links : [];
                    updateUser({
                      social_links: [...currentLinks, { platform: '', url: '' }]
                    });
                  }}

                  className="mt-2"
                >
                  Add Social Link
                </Button>
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
                  <Label htmlFor="career_goals">Career Goals</Label>
                  <Textarea
                    id="career_goals"
                    name="career_goals"
                    placeholder="Describe your career goals and aspirations"
                    value={user?.career_goals || ""}
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
