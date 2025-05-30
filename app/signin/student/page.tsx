"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft, Lightbulb } from "lucide-react";
import Link from "next/link";
import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeFooter } from "@/components/home/home-footer";
import { signIn } from "next-auth/react";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";

function StudentSigninContent() {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const { getUser } = useUserStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);
  const callbackUrl = searchParams.get('callbackUrl') || '/udayee/dashboard'; // fallback if not present
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

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        role: "user",
        remember: formData.rememberMe,
        redirect: true,
        callbackUrl: callbackUrl,
      });
      if (res?.error) {
        setError(res.error);
      }
      else {
        getUser();
        router.push(callbackUrl);
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

          <div className="bg-card rounded-lg shadow-lg border border-border p-8 relative">
            <div className="text-center mb-8">
              <div className="mx-auto bg-accent/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Lightbulb className="h-6 w-6 text-accent" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Student Sign In
              </h1>
              <p className="text-muted-foreground mt-2">
                Access your account to manage your startup journey
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
                <Label htmlFor="email">Student Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="yourname@college.edu"
                  value={isClient ? formData.email : ""}
                  onChange={isClient ? handleChange : undefined}
                  autoComplete="email"
                  required
                  className="h-11"
                  disabled={!isClient}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-accent hover:underline"
                  >
                    Forgot password?
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
                  Remember me for 30 days
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base font-medium border-2 text-foreground hover:bg-primary"
                disabled={isLoading || !isClient}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/udayee/onboarding"
                  className="text-primary hover:underline"
                >
                  Create an account
                </Link>
              </div>
            </form>

            {!isClient && (
              <div className="absolute inset-0 bg-card/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Having trouble signing in?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}

export default function StudentSignin() {
  return (
    <Suspense>
      <StudentSigninContent />
    </Suspense>
  );
}
