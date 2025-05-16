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
import Image from "next/image";
export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/30 via-primary/5 to-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary blur-3xl"></div>
        </div>
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                About <span className="text-primary">Uday</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                UdayeeConnect bridges the gap between innovative student
                entrepreneurs and investors who believe in nurturing the next
                generation of changemakers.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -z-10 bg-primary/5 blur-2xl rounded-full"></div>
              <div className="relative bg-background/70 backdrop-blur-sm shadow-lg rounded-2xl border border-border p-4">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src="/about-hero-image.jpg"
                    alt="Student entrepreneurs collaborating"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground inline-block relative">
                Our Mission & Vision
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mt-10 -mr-10 transition-transform group-hover:scale-110"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                    <Target className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Our mission is to empower student entrepreneurs by providing
                    them with the resources, mentorship, and funding they need
                    to turn their innovative ideas into successful ventures. We
                    believe that students have the potential to create solutions
                    that can address real-world problems, and we&#39;re here to help
                    them realize that potential.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mt-10 -mr-10 transition-transform group-hover:scale-110"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                    <Lightbulb className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    We envision a future where student entrepreneurship is
                    celebrated and supported, where innovative ideas from
                    university campuses can easily find the backing they need to
                    grow and make an impact. UdayeeConnect aims to be the bridge
                    that connects promising student startups with investors who
                    are looking to support the next generation of entrepreneurs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card rounded-xl p-6 text-center border border-border hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-bold text-foreground">500+</h3>
                <p className="text-muted-foreground">Student Entrepreneurs</p>
              </div>

              <div className="bg-card rounded-xl p-6 text-center border border-border hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Building className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-bold text-foreground">50+</h3>
                <p className="text-muted-foreground">University Partners</p>
              </div>

              <div className="bg-card rounded-xl p-6 text-center border border-border hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-bold text-foreground">৳15M+</h3>
                <p className="text-muted-foreground">Funding Facilitated</p>
              </div>

              <div className="bg-card rounded-xl p-6 text-center border border-border hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-bold text-foreground">200+</h3>
                <p className="text-muted-foreground">Successful Projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground inline-block relative">
                What We Offer
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our platform provides tailored solutions for both student
                entrepreneurs and investors.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-primary/20 to-background p-1 rounded-2xl">
                <div className="bg-background rounded-2xl p-8 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-foreground">
                    For Student Founders
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Platform to showcase your startup ideas",
                      "Access to potential investors",
                      "Milestone-based funding structure",
                      "Tools to track progress and manage projects",
                      "Opportunity to invest in other student startups",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href="/signup?role=student">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Join as Student <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/20 to-background p-1 rounded-2xl">
                <div className="bg-background rounded-2xl p-8 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-foreground">
                    For Investors
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Discover promising student-led startups",
                      "Invest in innovative ideas at an early stage",
                      "Track the progress of your investments",
                      "Direct communication with founders",
                      "Milestone-based investment to reduce risk",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href="/signup?role=investor">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Join as Investor <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground inline-block relative">
                How It Works
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                UdayeeConnect operates on a simple but effective model that
                benefits both student entrepreneurs and investors.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border hidden md:block"></div>

              {[
                {
                  title: "Student Registration",
                  description:
                    "Students register as Udayees and create profiles for their startup projects.",
                  icon: <Users className="h-6 w-6" />,
                },
                {
                  title: "Project Creation",
                  description:
                    "Udayees can create multiple projects, each with detailed information, funding goals, and milestones.",
                  icon: <Lightbulb className="h-6 w-6" />,
                },
                {
                  title: "Investor Discovery",
                  description:
                    "Investors browse through projects and can contact Udayees directly.",
                  icon: <Search className="h-6 w-6" />,
                },
                {
                  title: "Milestone-Based Funding",
                  description:
                    "Investments are tied to specific milestones, ensuring accountability and reducing risk.",
                  icon: <Target className="h-6 w-6" />,
                },
                {
                  title: "Progress Tracking",
                  description:
                    "Both parties can track progress through our platform, with clear communication channels.",
                  icon: <Chart className="h-6 w-6" />,
                },
              ].map((step, i) => (
                <div key={i} className="relative z-10 mb-12 last:mb-0 md:flex">
                  <div
                    className={`hidden md:block w-1/2 ${i % 2 === 0 ? "pr-12" : "pl-12 order-1"
                      }`}
                  >
                    <div
                      className={`bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow ${i % 2 === 0 ? "text-right" : "text-left"
                        }`}
                    >
                      <h3 className="text-xl font-bold mb-2 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground mb-4 md:mb-0 mx-auto">
                    {i + 1}
                  </div>

                  <div className="md:hidden bg-card rounded-xl p-6 border border-border shadow-sm mb-8">
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  <div
                    className={`hidden md:block w-1/2 ${i % 2 === 0 ? "pl-12 order-1" : "pr-12"
                      }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground inline-block relative">
                Meet Our Team
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The passionate individuals behind UdayeeConnect, dedicated to
                empowering student entrepreneurs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Arif Rahman",
                  title: "CEO & Co-Founder",
                  image: "https://randomuser.me/api/portraits/men/32.jpg",
                  bio: "Former student entrepreneur with a passion for creating opportunities for the next generation.",
                },
                {
                  name: "Nadia Islam",
                  title: "COO & Co-Founder",
                  image: "https://randomuser.me/api/portraits/women/44.jpg",
                  bio: "Expert in operations with experience in multiple successful startups across Bangladesh.",
                },
                {
                  name: "Tanvir Ahmed",
                  title: "CTO",
                  image: "https://randomuser.me/api/portraits/men/68.jpg",
                  bio: "Tech enthusiast who loves building platforms that connect people and create opportunities.",
                },
                {
                  name: "Fatima Begum",
                  title: "Head of Investor Relations",
                  image: "https://randomuser.me/api/portraits/women/65.jpg",
                  bio: "Former investment banker with a passion for nurturing early-stage startups.",
                },
                {
                  name: "Karim Chowdhury",
                  title: "Head of Student Success",
                  image: "https://randomuser.me/api/portraits/men/75.jpg",
                  bio: "Dedicated mentor who has guided over 50 student startups to success.",
                },
                {
                  name: "Sabina Akter",
                  title: "Marketing Director",
                  image: "https://randomuser.me/api/portraits/women/54.jpg",
                  bio: "Creative strategist with expertise in building communities and fostering engagement.",
                },
              ].map((member, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      fill
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-2">
                      {member.title}
                    </p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground inline-block relative">
                Success Stories
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Hear from students and investors who&#39;ve found success through
                UdayeeConnect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote:
                    "UdayeeConnect helped me turn my idea into a real business. The milestone-based funding approach gave me clear goals to work towards, and the investor I connected with has become an invaluable mentor.",
                  name: "Tahmid Hassan",
                  role: "Student Entrepreneur, BUET",
                  project: "EcoSolutions",
                  image: "https://randomuser.me/api/portraits/men/86.jpg",
                },
                {
                  quote:
                    "As an investor, I appreciate the structured approach UdayeeConnect brings to student startups. The platform makes it easy to track progress and maintain clear communication with founders.",
                  name: "Farzana Rahman",
                  role: "Angel Investor",
                  image: "https://randomuser.me/api/portraits/women/33.jpg",
                },
                {
                  quote:
                    "Finding investors was my biggest challenge until I discovered UdayeeConnect. Now my healthcare app has the funding it needs to reach communities across Bangladesh.",
                  name: "Mahir Ahmed",
                  role: "Student Entrepreneur, DMC",
                  project: "MediConnect",
                  image: "https://randomuser.me/api/portraits/men/36.jpg",
                },
                {
                  quote:
                    "UdayeeConnect gives me access to creative, ambitious student founders who bring fresh perspectives to old problems. It's been rewarding both financially and personally.",
                  name: "Nasreen Khan",
                  role: "Tech Investor",
                  image: "https://randomuser.me/api/portraits/women/72.jpg",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                      <Image
                        fill
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground">
                        {testimonial.role}
                      </p>
                      {testimonial.project && (
                        <p className="text-primary text-sm">
                          {testimonial.project}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-primary/20 text-5xl font-serif">
                      &quot;
                    </div>
                    <p className="text-foreground relative z-10 pl-4">
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-1">
            <div className="bg-card rounded-2xl p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mt-20 -mr-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -mb-20 -ml-20"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Ready to Join the Journey?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Whether you&#39;re a student entrepreneur with an innovative idea
                  or an investor looking to support the next generation of
                  startups, UdayeeConnect is the platform for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/signup?role=student">
                    <Button className="px-8 py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90">
                      Join as Student
                    </Button>
                  </Link>
                  <Link href="/signup?role=investor">
                    <Button
                      variant="outline"
                      className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary/5"
                    >
                      Join as Investor
                    </Button>
                  </Link>
                </div>
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
