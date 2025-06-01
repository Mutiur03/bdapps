"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import safeUrl from "@/lib/safeURL";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, Plus, Trash2, Link as LinkIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAdminStore from "@/store/useAdminStore";
import { toast } from "@/components/ui/use-toast";

export function AdminProfile() {

  const {
    admin,
    loading,
    error,
    updateAdmin,
    updateAdminField,
    addSocialLink,
    removeSocialLink,
    isSubmitting,
    fetchAdmin,
  } = useAdminStore();

  const [socialDialogOpen, setSocialDialogOpen] = useState(false);
  const [newSocial, setNewSocial] = useState({ title: "", url: "" });

  const handleAddSocial = () => {
    if (newSocial.title.trim() && newSocial.url.trim()) {
      addSocialLink(newSocial.title, newSocial.url);
      setNewSocial({ title: "", url: "" });
      setSocialDialogOpen(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await updateAdmin(admin!);
      toast({
        title: "Profile updated",
        description: "Your admin profile has been updated successfully.",
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!admin) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-4">
        <p className="text-muted-foreground">No admin profile found.</p>
        <Button onClick={() => fetchAdmin()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Admin Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your admin profile information and platform settings
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="platform">Platform Management</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal information and profile photo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-24 w-24 border">
                  <AvatarImage
                    src={safeUrl(admin.profile_picture)}
                    alt={admin.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {admin.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <label htmlFor="profile_picture">
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      disabled
                      className="flex gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Change Photo
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      id="profile_picture"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          updateAdminField(
                            "profile_picture",
                            e.target.files[0]
                          );
                        }
                      }}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG. Max size 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Name & Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={admin.name}
                    onChange={(e) => updateAdminField("name", e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={admin.email}
                    onChange={(e) => updateAdminField("email", e.target.value)}
                    placeholder="your.email@example.com"
                    readOnly
                  />
                </div>
              </div>

              {/* Phone & Location */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={admin.phone}
                    onChange={(e) => updateAdminField("phone", e.target.value)}
                    placeholder="Your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={admin.location}
                    onChange={(e) =>
                      updateAdminField("location", e.target.value)
                    }
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  value={admin.bio}
                  onChange={(e) => updateAdminField("bio", e.target.value)}
                  placeholder="Tell users about yourself, your background, and your role as platform administrator..."
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t p-4">
              <Button disabled={isSubmitting} onClick={handleSubmit}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Professional Tab */}
        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>
                Share your professional background and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Company & Role */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    value={admin.company}
                    onChange={(e) =>
                      updateAdminField("company", e.target.value)
                    }
                    placeholder="Your company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyRole">Role in Company</Label>
                  <Input
                    id="companyRole"
                    value={admin.companyRole}
                    onChange={(e) => updateAdminField("companyRole", e.target.value)}
                    placeholder="e.g. CEO, CTO, Product Manager"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceYears">Years of Experience</Label>
                <Select
                  value={admin.experienceYears}
                  onValueChange={(value) =>
                    updateAdminField("experienceYears", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+", "15+", "20+"].map(
                      (year) => (
                        <SelectItem
                          key={year.toString()}
                          value={year.toString()}
                        >
                          {year}{" "}
                          {typeof year === "number" && year !== 1
                            ? "years"
                            : "year"}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Social Links */}
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h3 className="text-lg font-medium">Social & Contact</h3>
                <Dialog
                  open={socialDialogOpen}
                  onOpenChange={setSocialDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex gap-2">
                      <Plus className="h-4 w-4" />
                      Add Social
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90vw] max-w-[425px] p-4 sm:p-6 overflow-hidden">
                    <DialogHeader className="mb-4">
                      <DialogTitle>Add Social Media</DialogTitle>
                      <DialogDescription>
                        Enter the details for your social media profile
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-2">
                      <div className="space-y-2">
                        <Label htmlFor="social-title">
                          Social Media Platform
                        </Label>
                        <Input
                          id="social-title"
                          placeholder="e.g. Facebook, Instagram, YouTube"
                          value={newSocial.title}
                          onChange={(e) =>
                            setNewSocial({
                              ...newSocial,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="social-url">Profile URL</Label>
                        <Input
                          id="social-url"
                          placeholder="e.g. www.facebook.com/yourprofile"
                          value={newSocial.url}
                          onChange={(e) =>
                            setNewSocial({ ...newSocial, url: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <DialogFooter className="mt-6 sm:mt-4 gap-2 flex-col sm:flex-row sm:justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setSocialDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        className="w-full sm:w-auto text-foreground bg-primary hover:bg-primary/90"
                        onClick={handleAddSocial}
                      >
                        Add Link
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {(admin.customSocials?.length ?? 0) > 0 && (
                <div className="space-y-4">
                  <Separator />
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Social Links
                  </h4>

                  {(admin.customSocials || []).map((social) => (
                    <div key={social.id} className="flex items-center  gap-3">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`social-${social.id}`}>
                          {social.title}
                        </Label>
                        <div className="flex items-center">
                          <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Input
                            id={`social-${social.id}`}
                            value={social.url}
                            onChange={(e) => {
                              const updatedSocials = (admin.customSocials || []).map(
                                (s) =>
                                  s.id === social.id
                                    ? { ...s, url: e.target.value }
                                    : s
                              );
                              updateAdminField("customSocials", updatedSocials);
                            }}
                            placeholder="URL"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 ml-2 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeSocialLink(social.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end border-t p-4">
              <Button disabled={loading} onClick={handleSubmit}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Platform Management Tab */}
        <TabsContent value="platform">
          <Card>
            <CardHeader>
              <CardTitle>Platform Management</CardTitle>
              <CardDescription>
                Configure platform settings and management preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Platform Settings</h3>
                <p className="text-muted-foreground mb-4">
                  Platform management tools will be available here
                </p>
                <Button variant="outline" disabled>
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Show error if there is one */}
      {error && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md mt-4">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
