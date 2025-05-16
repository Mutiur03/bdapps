"use client";
import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeFooter } from "@/components/home/home-footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Users,
  Lightbulb,
  Target,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Building,
} from "lucide-react";

// Placeholder profile image
const PLACEHOLDER_PROFILE = "/placeholders.json";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="py-20 bg-accent/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Our Story
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-primary">Uday</span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Uday bridges the gap between innovative student entrepreneurs and
              investors who believe in nurturing the next generation of
              changemakers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 relative inline-block">
                Our Mission & Vision
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/30 -mb-2"></span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-card p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Our mission is to empower student entrepreneurs by providing
                  them with the resources, mentorship, and funding they need to
                  turn their innovative ideas into successful ventures. We
                  believe that students have the potential to create solutions
                  that can address real-world problems, and we're here to help
                  them realize that potential.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up animation-delay-200">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Lightbulb className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-foreground/70 leading-relaxed">
                  We envision a future where student entrepreneurship is
                  celebrated and supported, where innovative ideas from
                  university campuses can easily find the backing they need to
                  grow and make an impact. Uday aims to be the bridge that
                  connects promising student startups with investors who are
                  looking to support the next generation of entrepreneurs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-card p-6 rounded-lg shadow-md animate-fade-in-up">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-1">500+</h3>
                <p className="text-foreground/70 font-medium">
                  Student Entrepreneurs
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-md animate-fade-in-up animation-delay-200">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-1">50+</h3>
                <p className="text-foreground/70 font-medium">
                  University Partners
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-md animate-fade-in-up animation-delay-400">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-1">৳15M+</h3>
                <p className="text-foreground/70 font-medium">
                  Funding Facilitated
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-md animate-fade-in-up animation-delay-400">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-1">200+</h3>
                <p className="text-foreground/70 font-medium">
                  Successful Projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 relative inline-block">
                What We Offer
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/30 -mb-2"></span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Our platform provides tailored solutions for both student
                entrepreneurs and investors.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-card border border-border p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <GraduationCap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-6">
                  For Student Founders
                </h3>
                <ul className="space-y-4 mb-8">
                  {[
                    "Platform to showcase your startup ideas",
                    "Access to potential investors",
                    "Milestone-based funding structure",
                    "Tools to track progress and manage projects",
                    "Opportunity to invest in other student startups",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/signup?role=student">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto px-6 py-5 text-base">
                      Join as Student <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-card border border-border p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-6">For Investors</h3>
                <ul className="space-y-4 mb-8">
                  {[
                    "Discover promising student-led startups",
                    "Invest in innovative ideas at an early stage",
                    "Track the progress of your investments",
                    "Direct communication with founders",
                    "Milestone-based investment to reduce risk",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/signup?role=investor">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto px-6 py-5 text-base">
                      Join as Investor <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-accent/10">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 relative inline-block">
                How It Works
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/30 -mb-2"></span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Uday operates on a simple but effective model that benefits both
                student entrepreneurs and investors.
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute top-24 left-1/2 h-[70%] w-1 bg-primary/20 -translate-x-1/2"></div>

              {[
                {
                  title: "Student Registration",
                  description:
                    "Students register as Udayees and create profiles for their startup projects.",
                  icon: <Users className="w-6 h-6" />,
                },
                {
                  title: "Project Creation",
                  description:
                    "Udayees can create multiple projects, each with detailed information, funding goals, and milestones.",
                  icon: <Lightbulb className="w-6 h-6" />,
                },
                {
                  title: "Investor Discovery",
                  description:
                    "Investors browse through projects and can contact Udayees directly.",
                  icon: <Search className="w-6 h-6" />,
                },
                {
                  title: "Milestone-Based Funding",
                  description:
                    "Investments are tied to specific milestones, ensuring accountability and reducing risk.",
                  icon: <Target className="w-6 h-6" />,
                },
                {
                  title: "Progress Tracking",
                  description:
                    "Both parties can track progress through our platform, with clear communication channels.",
                  icon: <Chart className="w-6 h-6" />,
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className={`flex flex-col md:flex-row items-center mb-12 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content side */}
                  <div className="md:w-1/2">
                    <div
                      className={`bg-card p-6 rounded-lg shadow-md animate-fade-in-up border border-border/40 ${
                        i % 2 === 0
                          ? "md:mr-12 text-left"
                          : "md:ml-12 text-left"
                      }`}
                    >
                      <h3 className="text-xl font-bold mb-2 text-primary">
                        {step.title}
                      </h3>
                      <p className="text-foreground/70">{step.description}</p>
                    </div>
                  </div>

                  {/* Circle with number */}
                  <div className="my-6 md:my-0 z-10 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-lg">
                      {i + 1}
                    </div>
                  </div>

                  {/* Empty space for layout */}
                  <div className="md:w-1/2 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 relative inline-block">
                Meet Our Team
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/30 -mb-2"></span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                The passionate individuals behind Uday, dedicated to empowering
                student entrepreneurs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Arif Rahman",
                  title: "CEO & Co-Founder",
                  bio: "Former student entrepreneur with a passion for creating opportunities for the next generation.",
                },
                {
                  name: "Nadia Islam",
                  title: "COO & Co-Founder",
                  bio: "Expert in operations with experience in multiple successful startups across Bangladesh.",
                },
                {
                  name: "Tanvir Ahmed",
                  title: "CTO",
                  bio: "Tech enthusiast who loves building platforms that connect people and create opportunities.",
                },
                {
                  name: "Fatima Begum",
                  title: "Head of Investor Relations",
                  bio: "Former investment banker with a passion for nurturing early-stage startups.",
                },
                {
                  name: "Karim Chowdhury",
                  title: "Head of Student Success",
                  bio: "Dedicated mentor who has guided over 50 student startups to success.",
                },
                {
                  name: "Sabina Akter",
                  title: "Marketing Director",
                  bio: "Creative strategist with expertise in building communities and fostering engagement.",
                },
              ].map((member, i) => (
                <div
                  key={i}
                  className="bg-card rounded-lg shadow-md overflow-hidden border border-border/40 hover:shadow-lg transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="h-56 overflow-hidden bg-muted flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground/40"
                    >
                      <circle cx="12" cy="8" r="5" />
                      <path d="M20 21a8 8 0 1 0-16 0" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-4">
                      {member.title}
                    </p>
                    <p className="text-foreground/70">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-accent/10">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 relative inline-block">
                Success Stories
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/30 -mb-2"></span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Hear from students and investors who've found success through
                Uday.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote:
                    "Uday helped me turn my idea into a real business. The milestone-based funding approach gave me clear goals to work towards, and the investor I connected with has become an invaluable mentor.",
                  name: "Tahmid Hassan",
                  role: "Student Entrepreneur, BUET",
                  project: "EcoSolutions",
                },
                {
                  quote:
                    "As an investor, I appreciate the structured approach Uday brings to student startups. The platform makes it easy to track progress and maintain clear communication with founders.",
                  name: "Farzana Rahman",
                  role: "Angel Investor",
                },
                {
                  quote:
                    "Finding investors was my biggest challenge until I discovered Uday. Now my healthcare app has the funding it needs to reach communities across Bangladesh.",
                  name: "Mahir Ahmed",
                  role: "Student Entrepreneur, DMC",
                  project: "MediConnect",
                },
                {
                  quote:
                    "Uday gives me access to creative, ambitious student founders who bring fresh perspectives to old problems. It's been rewarding both financially and personally.",
                  name: "Nasreen Khan",
                  role: "Tech Investor",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-card rounded-lg shadow-md p-6 border border-border/40 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <div className="w-16 h-16 rounded-full border-2 border-primary bg-muted flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground/40"
                        >
                          <circle cx="12" cy="8" r="5" />
                          <path d="M20 21a8 8 0 1 0-16 0" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{testimonial.name}</h4>
                      <p className="text-primary/90 text-sm">
                        {testimonial.role}
                      </p>
                      {testimonial.project && (
                        <p className="text-foreground/60 text-sm">
                          {testimonial.project}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="text-4xl text-primary/20 absolute top-0 left-0">
                      "
                    </div>
                    <p className="pl-6 text-foreground/80 italic">
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center bg-card p-10 md:p-14 rounded-2xl shadow-xl border border-primary/20 animate-pulse-slow">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                Ready to Join the Journey?
              </h2>
              <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                Whether you're a student entrepreneur with an innovative idea or
                an investor looking to support the next generation of startups,
                Uday is the platform for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup?role=student">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base w-full sm:w-auto">
                    Join as Student
                  </Button>
                </Link>
                <Link href="/signup?role=investor">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base w-full sm:w-auto">
                    Join as Investor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}

function Search(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function Chart(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}
