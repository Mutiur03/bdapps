"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeFooter } from "@/components/home/home-footer";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      // Handle authentication logic here
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <HomeNavbar />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="container max-w-screen-xl mx-auto px-4 py-10 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left side - Illustration/Branding */}
            <div className="hidden lg:flex flex-col w-1/2 pr-12 space-y-8">
              <div className="relative">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-70"></div>
                <div className="relative z-10 space-y-6">
                  <h1 className="text-4xl font-bold">
                    Welcome back to <span className="text-primary">Udayee</span>
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-md">
                    Sign in to your account to connect with student
                    entrepreneurs and investments that matter.
                  </p>
                  <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
                    <blockquote className="text-muted-foreground italic">
                      &quot;UdayeeConnect helped me find the perfect investors for my
                      startup. The platform is intuitive and supportive.&quot;
                    </blockquote>
                    <div className="mt-4 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold">TS</span>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-foreground">
                          Tahmid Sarker
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Student Entrepreneur, BUET
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Sign In Form */}
            <div className="w-full lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
              <Card className="w-full max-w-md mx-auto shadow-md border-border bg-card">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Sign In
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="bg-background border-input text-foreground"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-foreground">
                          Password
                        </Label>
                        <Link
                          href="/forgot-password"
                          className="text-xs text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="bg-background border-input text-foreground pr-10"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {/* <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-card px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div> */}

                    {/* <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-border bg-background text-foreground hover:bg-muted"
                      >
                        <Image
                          src="/google.svg"
                          alt="Google"
                          width={18}
                          height={18}
                          className="mr-2"
                        />
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-border bg-background text-foreground hover:bg-muted"
                      >
                        <Image
                          src="/linkedin.svg"
                          alt="LinkedIn"
                          width={18}
                          height={18}
                          className="mr-2"
                        />
                        LinkedIn
                      </Button>
                    </div> */}
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 border-t border-border pt-6">
                  <div className="text-center text-sm">
                    Don&#39;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-primary hover:text-primary/90 font-medium"
                    >
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <HomeFooter />
    </div >
  );
}
