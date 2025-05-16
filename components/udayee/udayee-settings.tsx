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
import { Bell, Shield, CreditCard, LogOut, Sliders } from "lucide-react";

export function UdayeeSettings() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Mock data - in a real app, this would come from an API
  const [userData, setUserData] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      investorMessages: true,
      milestoneUpdates: true,
      newInvestors: true,
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
        type: "Nagad",
        number: "01712345678",
        isDefault: false,
      },
    ],
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
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: "var(--sidebar-primary)" }}
        >
          Settings
        </h1>
        <p className="text-muted-foreground">
          Configure your application preferences and account security
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
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Payment Methods</span>
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
                Choose how you want to be notified
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
                      htmlFor="investor-messages"
                      className="flex-1 cursor-pointer"
                    >
                      Investor Messages
                      <p className="text-xs text-muted-foreground">
                        Get notified when an investor sends you a message
                      </p>
                    </Label>
                    <Switch
                      id="investor-messages"
                      checked={userData.notifications.investorMessages}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("investorMessages", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="milestone-updates"
                      className="flex-1 cursor-pointer"
                    >
                      Milestone Updates
                      <p className="text-xs text-muted-foreground">
                        Get notified about milestone approvals and rejections
                      </p>
                    </Label>
                    <Switch
                      id="milestone-updates"
                      checked={userData.notifications.milestoneUpdates}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("milestoneUpdates", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="new-investors"
                      className="flex-1 cursor-pointer"
                    >
                      New Investors
                      <p className="text-xs text-muted-foreground">
                        Get notified when a new investor shows interest in your
                        startup
                      </p>
                    </Label>
                    <Switch
                      id="new-investors"
                      checked={userData.notifications.newInvestors}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("newInvestors", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={handleSaveNotifications}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods for receiving funds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userData.paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 flex justify-between items-center ${
                    method.isDefault ? "border-emerald-600 bg-emerald-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        method.type === "bKash"
                          ? "bg-pink-100 text-pink-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {method.type === "bKash" ? "b" : "N"}
                    </div>
                    <div>
                      <p className="font-medium">{method.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {method.number}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.isDefault ? (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                        Default
                      </span>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefaultPayment(method.id)}
                        className="text-xs h-8"
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-xs h-8">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-2">
                Add New Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
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
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
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
              <CardDescription>Customize your app experience</CardDescription>
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
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
