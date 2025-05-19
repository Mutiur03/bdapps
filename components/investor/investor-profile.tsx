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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Building2,
  Briefcase,
  Target,
  Upload,
  Globe,
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

interface SocialLink {
  id: string;
  title: string;
  url: string;
}

export function InvestorProfile() {
  // State for form data
  const [loading, setLoading] = useState(false);
  const [socialDialogOpen, setSocialDialogOpen] = useState(false);
  const [newSocial, setNewSocial] = useState({ title: "", url: "" });
  const [formData, setFormData] = useState({
    // Personal information
    name: "Ahmed Rahman",
    email: "investor@example.com",
    phone: "+880 1712 345678",
    location: "Dhaka, Bangladesh",
    avatar: "/placeholder-avatar.png",

    // Professional information
    company: "Green Ventures",
    role: "Angel Investor",
    experienceYears: "8",

    // Investment preferences
    investmentFocus: ["Technology", "Healthcare", "Education"],
    minInvestment: "৳5,000",
    maxInvestment: "৳50,000",
    preferredStages: ["Seed", "Early-stage"],

    // Biography
    bio: "Experienced angel investor with a focus on technology startups in Bangladesh. I've successfully backed over 15 startups in the past 8 years, with 3 successful exits.",

    // Social & Contact
    linkedin: "linkedin.com/in/ahmedrahman",
    website: "greenventures.com",
    twitter: "twitter.com/ahmedrahman",
    customSocials: [] as SocialLink[],
  });

  // Investment sectors and stages for selection
  const availableSectors = [
    "Technology",
    "Healthcare",
    "Education",
    "Finance",
    "Agriculture",
    "Retail",
    "Food & Beverage",
    "Transportation",
    "Real Estate",
    "Clean Energy",
    "Manufacturing",
    "E-commerce",
  ];

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

  // Function to handle input changes
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Function to add and remove array items (for string arrays only)
  const addItem = (
    field: "investmentFocus" | "preferredStages",
    value: string
  ) => {
    if (value && !formData[field].includes(value)) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      });
    }
  };

  const removeItem = (
    field: "investmentFocus" | "preferredStages",
    value: string
  ) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((item) => item !== value),
    });
  };

  // Handle social link submission
  const handleAddSocial = () => {
    if (newSocial.title.trim() && newSocial.url.trim()) {
      setFormData({
        ...formData,
        customSocials: [
          ...formData.customSocials,
          {
            id: Date.now().toString(),
            title: newSocial.title.trim(),
            url: newSocial.url.trim(),
          },
        ],
      });
      setNewSocial({ title: "", url: "" });
      setSocialDialogOpen(false);
    }
  };

  // Remove a custom social link
  const removeSocialLink = (id: string) => {
    setFormData({
      ...formData,
      customSocials: formData.customSocials.filter(
        (social) => social.id !== id
      ),
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Handle successful update
    setLoading(false);
    // Show success notification or feedback
  };

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
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
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
                  <AvatarImage src={formData.avatar} alt={formData.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {formData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <Button variant="outline" size="sm" className="flex gap-2">
                    <Upload className="h-4 w-4" />
                    Change Photo
                  </Button>
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
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Phone & Location */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="Your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  placeholder="Tell startups about yourself, your background, and your investment philosophy..."
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t p-4">
              <Button disabled={loading}>
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
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Your company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                    placeholder="Your professional role"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceYears">Years of Experience</Label>
                <Select
                  value={formData.experienceYears}
                  onValueChange={(value) =>
                    handleChange("experienceYears", value)
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

              {/* Default social links */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => handleChange("linkedin", e.target.value)}
                    placeholder="LinkedIn profile URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    placeholder="Your personal or company website"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter/X</Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => handleChange("twitter", e.target.value)}
                  placeholder="Twitter/X handle"
                />
              </div>

              {/* Custom social links */}
              {formData.customSocials.length > 0 && (
                <div className="space-y-4">
                  <Separator />
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Custom Social Links
                  </h4>

                  {formData.customSocials.map((social) => (
                    <div key={social.id} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{social.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {social.url}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeSocialLink(social.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end border-t p-4">
              <Button disabled={loading}>
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
                  {formData.investmentFocus.map((sector) => (
                    <Badge
                      key={sector}
                      variant="secondary"
                      className="flex items-center gap-1 px-2 py-1 bg-muted"
                    >
                      {sector}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeItem("investmentFocus", sector)}
                      />
                    </Badge>
                  ))}
                </div>
                <Select
                  onValueChange={(value) => {
                    addItem("investmentFocus", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Add sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSectors
                      .filter(
                        (sector) => !formData.investmentFocus.includes(sector)
                      )
                      .map((sector) => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
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
                    value={formData.minInvestment}
                    onChange={(e) =>
                      handleChange("minInvestment", e.target.value)
                    }
                    placeholder="e.g. ৳5,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxInvestment">Maximum Investment</Label>
                  <Input
                    id="maxInvestment"
                    value={formData.maxInvestment}
                    onChange={(e) =>
                      handleChange("maxInvestment", e.target.value)
                    }
                    placeholder="e.g. ৳50,000"
                  />
                </div>
              </div>

              {/* Preferred Stages */}
              <div className="space-y-2">
                <Label>Preferred Investment Stages</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.preferredStages.map((stage) => (
                    <Badge
                      key={stage}
                      variant="secondary"
                      className="flex items-center gap-1 px-2 py-1 bg-muted"
                    >
                      {stage}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeItem("preferredStages", stage)}
                      />
                    </Badge>
                  ))}
                </div>
                <Select
                  onValueChange={(value) => {
                    addItem("preferredStages", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Add stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStages
                      .filter(
                        (stage) => !formData.preferredStages.includes(stage)
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
              <Button disabled={loading}>
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
    </div>
  );
}

export default InvestorProfile;
