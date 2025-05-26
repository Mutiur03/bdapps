"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeFooter } from "@/components/home/home-footer";
import { signIn } from "next-auth/react";

export default function AdminSignin() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    signIn("credentials", {
      email: formData.email,
      password: formData.password,
      role: "admin",
      remember: formData.rememberMe,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          setError(
            "Invalid credentials. Please check your company-provided login details."
          );
        } else {
          router.push("/admin/dashboard");
        }
      })
      .catch((err) => {
        console.log("Error during sign-in:", err);
        setError("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HomeNavbar />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link
              href="/signin"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in options
            </Link>
          </div>

          <div className="bg-card rounded-lg shadow-lg border border-border p-8">
            <div className="text-center mb-8">
              <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Admin Portal
              </h1>
              <p className="text-muted-foreground mt-2">
                Sign in with your company-provided credentials
              </p>
            </div>

            {error && isClient && (
              <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm">
                {error}
              </div>
            )}

            <form
              onSubmit={isClient ? handleSubmit : (e) => e.preventDefault()}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Company Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your company email"
                  value={isClient ? formData.email : ""}
                  onChange={isClient ? handleChange : undefined}
                  autoComplete="username"
                  required
                  className="h-11"
                  disabled={!isClient}
                />
                <p className="text-xs text-muted-foreground">
                  Use the email address provided by your company
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/contact"
                    className="text-xs text-primary hover:underline"
                  >
                    Contact IT Support
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword && isClient ? "text" : "password"}
                    placeholder="Enter your password"
                    value={isClient ? formData.password : ""}
                    onChange={isClient ? handleChange : undefined}
                    autoComplete="current-password"
                    required
                    className="h-11 pr-10"
                    disabled={!isClient}
                  />
                  {isClient && (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Use the password provided by your company administrator
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={isClient && formData.rememberMe}
                  onCheckedChange={isClient ? handleCheckboxChange : undefined}
                  disabled={!isClient}
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm font-normal cursor-pointer"
                >
                  Keep me signed in on this device
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base font-medium border-2 text-foreground hover:bg-primary"
                disabled={isLoading || !isClient}
              >
                {isLoading ? "Signing in..." : "Access Admin Portal"}
              </Button>

              <div className="bg-muted/30 border border-muted rounded-md p-4 mt-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">
                      Admin Access Only
                    </p>
                    <p className="text-muted-foreground">
                      This portal is restricted to authorized company
                      administrators. If you don't have access credentials,
                      please contact your IT department.
                    </p>
                  </div>
                </div>
              </div>
            </form>

            {!isClient && (
              <div className="absolute inset-0 bg-card/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Need access or having issues?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact IT Support
              </Link>
            </p>
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}
