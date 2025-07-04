import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardImage,
} from "@/components/ui/card";
import { ArrowRight, Lightbulb, TrendingUp } from "lucide-react";
import Link from "next/link";
import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeFooter } from "@/components/home/home-footer";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary blur-3xl"></div>
        </div>

        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
              Join FundMyIdea
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground animate-fade-in">
              Choose Your <span className="text-primary">Path</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animation-delay-200 animate-fade-in">
              Select how you&apos;d like to participate in the FundMyIdea
              ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* Investor Card */}
            <RoleCard
              title="Join as an Investor"
              description="Support promising student startups and help bring innovative ideas to life while potentially earning returns."
              icon={<TrendingUp className="h-7 w-7" />}
              benefits={[
                "Discover promising student-led startups",
                "Track investment progress with milestone-based funding",
                "Direct communication with founders",
                "Early access to innovative ideas",
              ]}
              image="/investor-illustration.svg"
              color="primary"
              href="/investor/onboarding"
              buttonText="Continue as Investor"
            />

            {/* Udayee Card */}
            <RoleCard
              title="Join as a Student Founder"
              description="Showcase your startup idea, connect with investors, and get the resources you need to grow."
              icon={<Lightbulb className="h-7 w-7" />}
              benefits={[
                "Create a compelling profile for your startup",
                "Connect with potential investors",
                "Structured milestone-based funding",
                "Network with other student entrepreneurs",
              ]}
              image="/student-illustration.svg"
              color="accent"
              href="/udayee/onboarding"
              buttonText="Continue as Student"
            />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-muted/30 py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              How FundMyIdea  Works
            </h2>
            <p className="text-muted-foreground">
              Our platform connects student entrepreneurs with investors through
              a transparent, milestone-based approach that benefits both
              parties.
            </p>

            <div className="flex justify-center space-x-4 mt-6">
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Learn More
                </Button>
              </Link>
              <Link href="/signin">
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Already have an account? Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}

// Role selection card component
function RoleCard({
  title,
  description,
  icon,
  benefits,
  image,
  color = "primary",
  href,
  buttonText,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  image: string;
  color?: "primary" | "accent";
  href: string;
  buttonText: string;
}) {
  const colorClasses = {
    primary: "from-primary/30 to-primary/5 hover:border-primary/30",
    accent: "from-accent/30 to-accent/5 hover:border-accent/30",
  };

  return (
    <Card
      className={`relative overflow-hidden border hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${colorClasses[color]} animate-fade-in-up h-full flex flex-col`}
    >
      <div className="absolute top-0 right-0 mt-4 mr-4 p-2 rounded-full bg-background/80 backdrop-blur-sm z-10">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>

      <div className="p-6 pt-16 lg:pt-6 flex-1">
        <div className="hidden lg:block relative h-48 mb-6 rounded-lg overflow-hidden bg-muted/50">
          {/* Replace Next.js Image with CardImage component that supports fallback */}
          <CardImage
            src={image}
            alt={title}
            aspectRatio="wide"

            className="h-full w-full"
            fallback={
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <span className="text-lg font-medium">{title}</span>
              </div>
            }
          />
        </div>

        <CardHeader className="p-0">
          <CardTitle className="text-2xl font-bold text-foreground">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 text-base">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 mt-6">
          <h4 className="text-sm font-medium text-foreground mb-3">
            What you'll get:
          </h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>

      <CardFooter className="pt-6 pb-6 px-6 mt-auto border-t border-border">
        <Link href={href} className="w-full">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group">
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
