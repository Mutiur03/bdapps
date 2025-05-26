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
import { Bell, Shield, Users, LogOut, Sliders } from "lucide-react";

export function AdminSettings() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Mock data - in a real app, this would come from an API
  const [userData, setUserData] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      applicationUpdates: true,
      userRegistrations: true,
      systemAlerts: true,
    },
  });

  const handleNotificationChange = (key: string, checked: boolean) => {
    setUserData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: checked,
      },
    }));
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Admin Settings
        </h1>
        <p className="text-muted-foreground">
          Configure your platform administration preferences and account
          security
        </p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="platform" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Platform Management</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            <span>Preferences</span>
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about platform activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email-notifications"
                      className="flex-1 cursor-pointer"
                    >
                      Email Notifications
                    </Label>
                    <Switch
                      id="email-notifications"
                      checked={userData.notifications.email}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("email", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="push-notifications"
                      className="flex-1 cursor-pointer"
                    >
                      Push Notifications
                    </Label>
                    <Switch
                      id="push-notifications"
                      checked={userData.notifications.push}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("push", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="sms-notifications"
                      className="flex-1 cursor-pointer"
                    >
                      SMS Notifications
                    </Label>
                    <Switch
                      id="sms-notifications"
                      checked={userData.notifications.sms}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("sms", checked)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="application-updates"
                      className="flex-1 cursor-pointer"
                    >
                      Application Updates
                      <p className="text-xs text-muted-foreground">
                        Get notified when new startup applications are submitted
                      </p>
                    </Label>
                    <Switch
                      id="application-updates"
                      checked={userData.notifications.applicationUpdates}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("applicationUpdates", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="user-registrations"
                      className="flex-1 cursor-pointer"
                    >
                      User Registrations
                      <p className="text-xs text-muted-foreground">
                        Get notified when new users register on the platform
                      </p>
                    </Label>
                    <Switch
                      id="user-registrations"
                      checked={userData.notifications.userRegistrations}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("userRegistrations", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="system-alerts"
                      className="flex-1 cursor-pointer"
                    >
                      System Alerts
                      <p className="text-xs text-muted-foreground">
                        Get notified about system issues and maintenance
                      </p>
                    </Label>
                    <Switch
                      id="system-alerts"
                      checked={userData.notifications.systemAlerts}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("systemAlerts", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
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

        {/* Platform Management Tab */}
        <TabsContent value="platform" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Management</CardTitle>
              <CardDescription>
                Configure platform-wide settings and policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Platform Controls</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced platform management tools will be available here
                </p>
                <Button variant="outline" disabled>
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your admin account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive"
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

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Preferences</CardTitle>
              <CardDescription>Customize your admin experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="flex-1 cursor-pointer">
                    Dark Mode
                    <p className="text-xs text-muted-foreground">
                      Enable dark mode for the application
                    </p>
                  </Label>
                  <Switch id="dark-mode" defaultChecked={false} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="language" className="flex-1">
                    Language
                  </Label>
                  <div className="w-40">
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                      <option value="en">English</option>
                      <option value="bn">Bengali</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save" className="flex-1 cursor-pointer">
                    Auto-save Drafts
                    <p className="text-xs text-muted-foreground">
                      Automatically save draft changes
                    </p>
                  </Label>
                  <Switch id="auto-save" defaultChecked={true} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
