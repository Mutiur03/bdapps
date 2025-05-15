"use client";

import type React from "react";

import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  LogOut,
  Briefcase,
  AtSign,
  Phone,
  Mail, // Added missing Mail icon import
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function InvestorSettings() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Mock data - in a real app, this would come from an API
  const [userData, setUserData] = useState({
    name: "Ayesha Khan",
    email: "ayesha.khan@greenventures.com",
    phone: "+880 1712 345678",
    company: "Green Ventures",
    position: "Investment Manager",
    investmentPreferences: ["Environment", "Technology", "Healthcare"],
    notifications: {
      email: true,
      push: true,
      sms: false,
      startupUpdates: true,
      milestoneCompletions: true,
      newStartups: true,
    },
    paymentMethods: [
      {
        id: "pm1",
        type: "bKash",
        number: "01712345678",
        isDefault: true,
      },
      {
        id: "pm2",
        type: "Credit Card",
        number: "•••• •••• •••• 4567",
        isDefault: false,
      },
    ],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: string, checked: boolean) => {
    setUserData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: checked,
      },
    }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }, 1000);
  };

  const handleSaveNotifications = async () => {
    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Notification Settings Updated",
        description: "Your notification preferences have been saved.",
      });
    }, 1000);
  };

  const handleSetDefaultPayment = (id: string) => {
    setUserData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    }));

    toast({
      title: "Default Payment Method Updated",
      description: "Your default payment method has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted text-muted-foreground p-1 rounded-md">
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <CreditCard className="h-4 w-4" />
            <span>Payment Methods</span>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="overflow-hidden hover:shadow-sm transition-shadow">
            <CardHeader className="pb-2 border-b border-border">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-border">
                  <AvatarImage
                    src="/placeholder-avatar.jpg"
                    alt={userData.name}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{userData.name}</CardTitle>
                  <CardDescription>
                    {userData.position} at {userData.company}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-foreground">
                    Company
                  </Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      name="company"
                      value={userData.company}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-foreground">
                  Position
                </Label>
                <Input
                  id="position"
                  name="position"
                  value={userData.position}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-foreground">
                  Investment Preferences
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userData.investmentPreferences.map((pref) => (
                    <Badge
                      key={pref}
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                    >
                      {pref}
                    </Badge>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-sm border-primary text-primary hover:bg-primary/10"
                  >
                    Edit Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-border pt-4">
              <Button
                onClick={handleSaveProfile}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="hover:shadow-sm transition-shadow">
            <CardHeader className="border-b border-border">
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">
                  Notification Channels
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md bg-muted/30 hover:bg-muted/50">
                    <Label
                      htmlFor="email-notifications"
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                    >
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Email Notifications</span>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Receive updates via email
                        </p>
                      </div>
                    </Label>
                    <Switch
                      id="email-notifications"
                      checked={userData.notifications.email}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("email", checked)
                      }
                    />
                  </div>

                  {/* Similar updates for other notification channels... */}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">
                  Notification Types
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md bg-muted/30 hover:bg-muted/50">
                    <Label
                      htmlFor="startup-updates"
                      className="flex-1 cursor-pointer"
                    >
                      <span className="font-medium">Startup Updates</span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Get notified when startups you've invested in post
                        updates
                      </p>
                    </Label>
                    <Switch
                      id="startup-updates"
                      checked={userData.notifications.startupUpdates}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("startupUpdates", checked)
                      }
                    />
                  </div>

                  {/* Similar updates for other notification types... */}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-border pt-4">
              <Button
                onClick={handleSaveNotifications}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment" className="space-y-6">
          <Card className="hover:shadow-sm transition-shadow">
            <CardHeader className="border-b border-border">
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods for investments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {userData.paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 flex justify-between items-center hover:bg-muted/20 transition-colors ${
                    method.isDefault ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        method.type === "bKash"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/20 text-accent-foreground"
                      }`}
                    >
                      {method.type === "bKash" ? "b" : "C"}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {method.type}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {method.number}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.isDefault ? (
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        Default
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefaultPayment(method.id)}
                        className="text-xs h-8 text-primary border-primary hover:bg-primary/10"
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8 hover:bg-muted"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full mt-4 text-primary border-primary hover:bg-primary/10"
              >
                Add New Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="hover:shadow-sm transition-shadow">
            <CardHeader className="border-b border-border">
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-foreground">
                  Current Password
                </Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-foreground">
                  New Password
                </Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-foreground">
                  Confirm New Password
                </Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border pt-4">
              <Button
                variant="outline"
                className="text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Change Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
