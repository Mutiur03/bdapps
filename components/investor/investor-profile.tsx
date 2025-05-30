"use client";

import { useEffect, useState } from "react";
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
import { safeUrl } from "@/app/udayee/projects/[id]/manage/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  X,
  Plus,
  Trash2,
  Link as LinkIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { InvestorPortfolio } from "./investor-portfolio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useInvestorStore from "@/store/useInvestorStore";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
// import { Skeleton } from "@/components/ui/skeleton";
// import Image from "next/image";

export function InvestorProfile() {
  // Use investor store
  const {
    investor,
    loading,
    error,
    updateInvestor,
    updateInvestorField,
    addItemToArray,
    removeItemFromArray,
    addSocialLink,
    removeSocialLink,
    fetchInvestor,
  } = useInvestorStore();

  // State for dialog
  const [socialDialogOpen, setSocialDialogOpen] = useState(false);
  const [newSocial, setNewSocial] = useState({ title: "", url: "" });

  interface Sector {
    id: number;
    name: string;
  }
  const [availableSectors, setAvailableSectors] = useState<Sector[]>([])
  const availableStages = [
    "Idea",
    "Prototype",
    "Seed",
    "Early-stage",
    "Growth",
    "Expansion",
    "Series A",
    "Series B+",
  ];

  // Handle social link submission
  const handleAddSocial = () => {
    if (newSocial.title.trim() && newSocial.url.trim()) {
      addSocialLink(newSocial.title, newSocial.url);
      setNewSocial({ title: "", url: "" });
      setSocialDialogOpen(false);
    }
  };
  useEffect(() => {

    const fetchSectors = async () => {
      try {
        const response = await axios.get("/api/categories");
        setAvailableSectors(response.data);
      } catch (error) {
        console.error("Error fetching sectors:", error);
      }
    };

    fetchSectors();
  }, []);
  const handleSubmit = async () => {
    try {
      await updateInvestor(investor!);
      toast({
        title: "Profile updated",
        description: "Your investor profile has been updated successfully.",
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

  // Handle case where investor data is not loaded
  // if (initialLoading) {
  //   return (
  //     <div className="space-y-8">
  //       <div>
  //         <Skeleton className="h-10 w-3/4" />
  //         <Skeleton className="h-4 w-1/2 mt-2" />
  //       </div>
  //       <div className="space-y-6">
  //         <Skeleton className="h-12 w-full" />
  //         <div className="space-y-4">
  //           <Skeleton className="h-[250px] w-full rounded-lg" />
  //           <Skeleton className="h-[350px] w-full rounded-lg" />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (!investor) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-4">
        <p className="text-muted-foreground">No investor profile found.</p>
        <Button onClick={() => fetchInvestor()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Investor Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your investor profile information and preferences
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="investments">Investment Preferences</TabsTrigger>
          {/* <TabsTrigger value="portfolio">My Portfolio</TabsTrigger> */}
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
                    src={safeUrl(
                      investor.profile_picture
                    )}
                    alt={investor.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {investor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {/* <Image src={if(type of investor.profile_picture === "string" return investor.profile_picture.toString())} alt="Bal"></Image> */}
                <div className="space-y-1">
                  <label htmlFor="profile_picture">
                    <Button variant="outline" size="sm" type="button" disabled className="flex gap-2">
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
                          updateInvestorField("profile_picture", e.target.files[0]);
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
                    value={investor.name}
                    onChange={(e) => updateInvestorField("name", e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={investor.email}
                    onChange={(e) => updateInvestorField("email", e.target.value)}
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
                    value={investor.phone}
                    onChange={(e) => updateInvestorField("phone", e.target.value)}
                    placeholder="Your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={investor.location}
                    onChange={(e) => updateInvestorField("location", e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  value={investor.bio}
                  onChange={(e) => updateInvestorField("bio", e.target.value)}
                  placeholder="Tell startups about yourself, your background, and your investment philosophy..."
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t p-4">
              <Button disabled={loading} onClick={handleSubmit}>
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
                    value={investor.company}
                    onChange={(e) => updateInvestorField("company", e.target.value)}
                    placeholder="Your company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={investor.role}
                    onChange={(e) => updateInvestorField("role", e.target.value)}
                    placeholder="Your professional role"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceYears">Years of Experience</Label>
                <Select
                  value={investor.experienceYears}
                  onValueChange={(value) =>
                    updateInvestorField("experienceYears", value)
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

              {investor.customSocials.length > 0 && (
                <div className="space-y-4">
                  <Separator />
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Social Links
                  </h4>

                  {investor.customSocials.map((social) => (
                    <div key={social.id} className="flex items-center  gap-3">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`social-${social.id}`}>{social.title}</Label>
                        <div className="flex items-center">
                          <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Input
                            id={`social-${social.id}`}
                            value={social.url}
                            onChange={(e) => {
                              const updatedSocials = investor.customSocials.map(s =>
                                s.id === social.id ? { ...s, url: e.target.value } : s
                              );
                              updateInvestorField("customSocials", updatedSocials);
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

        {/* Investment Preferences Tab */}
        <TabsContent value="investments">
          <Card>
            <CardHeader>
              <CardTitle>Investment Preferences</CardTitle>
              <CardDescription>
                Define your investment criteria to help match you with suitable
                startups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Investment Focus */}
              <div className="space-y-2">
                <Label>Investment Focus Areas/Sectors</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {investor.investmentFocus.map((sector) => (
                    <Badge
                      key={sector}
                      variant="secondary"
                      className="flex items-center gap-1 px-2 py-1 bg-muted"
                    >
                      {sector}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeItemFromArray("investmentFocus", sector)}
                      />
                    </Badge>
                  ))}
                </div>
                <Select
                  onValueChange={(value) => {
                    addItemToArray("investmentFocus", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Add sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSectors
                      .filter(
                        (sector) => !investor.investmentFocus.includes(sector.name)
                      )
                      .map((sector) => (
                        <SelectItem key={sector.id} value={sector.name}>
                          {sector.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Investment Range */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="minInvestment">Minimum Investment</Label>
                  <Input
                    id="minInvestment"
                    type="number"
                    value={investor.minInvestment}
                    onChange={(e) =>
                      updateInvestorField("minInvestment", Number(e.target.value))
                    }
                    placeholder="e.g. ৳5,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxInvestment">Maximum Investment</Label>
                  <Input
                    id="maxInvestment"
                    type="number"
                    value={investor.maxInvestment}
                    onChange={(e) =>
                      updateInvestorField("maxInvestment", Number(e.target.value))
                    }
                    placeholder="e.g. ৳50,000"
                  />
                </div>
              </div>

              {/* Preferred Stages */}
              <div className="space-y-2">
                <Label>Preferred Investment Stages</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {investor.preferredStages.map((stage) => (
                    <Badge
                      key={stage}
                      variant="secondary"
                      className="flex items-center gap-1 px-2 py-1 bg-muted"
                    >
                      {stage}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeItemFromArray("preferredStages", stage)}
                      />
                    </Badge>
                  ))}
                </div>
                <Select
                  onValueChange={(value) => {
                    addItemToArray("preferredStages", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Add stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStages
                      .filter(
                        (stage) => !investor.preferredStages.includes(stage)
                      )
                      .map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t p-4">
              <Button disabled={loading} onClick={handleSubmit}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio">
          <InvestorPortfolio />
        </TabsContent>
      </Tabs>

      {/* Show error if there is one */}
      {
        error && (
          <div className="bg-destructive/15 text-destructive p-3 rounded-md mt-4">
            <p>{error}</p>
          </div>
        )
      }
    </div >
  );
}

export default InvestorProfile;
