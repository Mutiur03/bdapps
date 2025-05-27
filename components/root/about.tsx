"use client";
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
import { motion } from "motion/react";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 200, damping: 25, duration: 0.6 },
};

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
};

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
};

// Data Arrays and Objects
const HERO_DATA = {
  badge: "Our Story",
  title: "About Uday",
  description:
    "Uday bridges the gap between innovative student entrepreneurs and investors who believe in nurturing the next generation of changemakers.",
};

const MISSION_VISION = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Our mission is to empower student entrepreneurs by providing them with the resources, mentorship, and funding they need to turn their innovative ideas into successful ventures. We believe that students have the potential to create solutions that can address real-world problems, and we're here to help them realize that potential.",
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    description:
      "We envision a future where student entrepreneurship is celebrated and supported, where innovative ideas from university campuses can easily find the backing they need to grow and make an impact. Uday aims to be the bridge that connects promising student startups with investors who are looking to support the next generation of entrepreneurs.",
  },
];

const STATISTICS = [
  { icon: Users, value: "00+", label: "Student Entrepreneurs" },
  { icon: Building, value: "00+", label: "University Partners" },
  { icon: TrendingUp, value: "৳00+", label: "Funding Facilitated" },
  { icon: Lightbulb, value: "00+", label: "Successful Projects" },
];

const STUDENT_BENEFITS = [
  "Platform to showcase your startup ideas",
  "Access to potential investors",
  "Milestone-based funding structure",
  "Tools to track progress and manage projects",
  "Opportunity to invest in other student startups",
];

const INVESTOR_BENEFITS = [
  "Discover promising student-led startups",
  "Invest in innovative ideas at an early stage",
  "Track the progress of your investments",
  "Direct communication with founders",
  "Milestone-based investment to reduce risk",
];

const HOW_IT_WORKS_STEPS = [
  {
    title: "Student Registration",
    description:
      "Students register as Udayees and create profiles for their startup projects.",
  },
  {
    title: "Project Creation",
    description:
      "Udayees can create multiple projects, each with detailed information, funding goals, and milestones.",
  },
  {
    title: "Investor Discovery",
    description:
      "Investors browse through projects and can contact Udayees directly.",
  },
  {
    title: "Milestone-Based Funding",
    description:
      "Investments are tied to specific milestones, ensuring accountability and reducing risk.",
  },
  {
    title: "Progress Tracking",
    description:
      "Both parties can track progress through our platform, with clear communication channels.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Md. Fahim Hossen",
    title: "Co-Founder",
    bio: "Present student with a passion for creating opportunities for the next generation.",
  },
  {
    name: "Mutiur Rahman",
    title: "Co-Founder",
    bio: "Present student with a passion for creating opportunities for the next generation.",
  },
  {
    name: "Abu Sufian",
    title: "Co-Founder",
    bio: "Present student with a passion for creating opportunities for the next generation.",
  },
];

const TESTIMONIALS = [
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
];

const CTA_DATA = {
  title: "Ready to Join the Journey?",
  description:
    "Whether you're a student entrepreneur with an innovative idea or an investor looking to support the next generation of startups, Uday is the platform for you.",
};

export function AboutComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 bg-accent/20 overflow-hidden">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
              variants={fadeInUp}
            >
              {HERO_DATA.badge}
            </motion.span>
            <motion.h1
              className="text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              {HERO_DATA.title.split(" ").slice(0, -1).join(" ")}{" "}
              <motion.span
                className="text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 1.2 }}
              >
                {HERO_DATA.title.split(" ").slice(-1)}
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl text-foreground/70 leading-relaxed"
              variants={fadeInUp}
            >
              {HERO_DATA.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 relative inline-block">
                Our Mission & Vision
                <motion.span
                  className="absolute bottom-0 left-0 h-1 bg-primary/30 -mb-2"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1.5 }}
                />
              </h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {MISSION_VISION.map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-card p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  variants={i === 0 ? slideInLeft : slideInRight}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  >
                    <item.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {STATISTICS.map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-card p-6 rounded-lg shadow-md"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03, rotateY: 3 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  <motion.div
                    className="w-12 h-12 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1.0, ease: "easeInOut" }}
                  >
                    <stat.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <motion.h3
                    className="text-3xl font-bold text-primary mb-1"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.2 + 0.5,
                      type: "spring",
                      stiffness: 150,
                    }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-foreground/70 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 relative inline-block">
                What We Offer
                <motion.span
                  className="absolute bottom-0 left-0 h-1 bg-primary/30 -mb-2"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1.5 }}
                />
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Our platform provides tailored solutions for both student
                entrepreneurs and investors.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                className="bg-card border border-border p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                variants={slideInLeft}
                whileHover={{ y: -12, scale: 1.01 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                  <GraduationCap className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-6">
                  For Student Founders
                </h3>
                <motion.ul
                  className="space-y-4 mb-8"
                  variants={staggerContainer}
                >
                  {STUDENT_BENEFITS.map((benefit, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start"
                      variants={fadeInUp}
                    >
                      <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{benefit}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="mt-8">
                  <Link href="/signup?role=student">
                    <motion.div {...scaleOnHover}>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto px-6 py-5 text-base">
                        Join as Student <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className="bg-card border border-border p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                variants={slideInRight}
                whileHover={{ y: -12, scale: 1.01 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                  <Users className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-6">For Investors</h3>
                <motion.ul
                  className="space-y-4 mb-8"
                  variants={staggerContainer}
                >
                  {INVESTOR_BENEFITS.map((benefit, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start"
                      variants={fadeInUp}
                    >
                      <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{benefit}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="mt-8">
                  <Link href="/signup?role=investor">
                    <motion.div {...scaleOnHover}>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto px-6 py-5 text-base">
                        Join as Investor <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-accent/10">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 relative inline-block">
                How It Works
                <motion.span
                  className="absolute bottom-0 left-0 h-1 bg-primary/30 -mb-2"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1.5 }}
                />
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Uday operates on a simple but effective model that benefits both
                student entrepreneurs and investors.
              </p>
            </motion.div>

            <div className="relative">
              <motion.div
                className="hidden md:block absolute top-24 left-1/2 w-1 bg-primary/20 -translate-x-1/2"
                initial={{ height: 0 }}
                whileInView={{ height: "70%" }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />

              {HOW_IT_WORKS_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  className={`flex flex-col md:flex-row items-center mb-12 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={{
                    initial: { opacity: 0, y: 50 },
                    animate: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: i * 0.3, duration: 1.0 },
                    },
                  }}
                >
                  <div className="md:w-1/2">
                    <motion.div
                      className={`bg-card p-6 rounded-lg shadow-md border border-border/40 ${
                        i % 2 === 0
                          ? "md:mr-12 text-left"
                          : "md:ml-12 text-left"
                      }`}
                      whileHover={{ y: -8, scale: 1.01 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <h3 className="text-xl font-bold mb-2 text-primary">
                        {step.title}
                      </h3>
                      <p className="text-foreground/70">{step.description}</p>
                    </motion.div>
                  </div>

                  <div className="my-6 md:my-0 z-10 flex items-center justify-center">
                    <motion.div
                      className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-lg"
                      initial={{ scale: 0, rotate: 180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.3 + 0.5,
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                      }}
                      whileHover={{ scale: 1.08, rotate: 360 }}
                    >
                      {i + 1}
                    </motion.div>
                  </div>

                  <div className="md:w-1/2 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 relative inline-block">
                Meet Our Team
                <motion.span
                  className="absolute bottom-0 left-0 h-1 bg-primary/30 -mb-2"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1.5 }}
                />
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                The passionate individuals behind Uday, dedicated to empowering
                student entrepreneurs.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {TEAM_MEMBERS.map((member, i) => (
                <motion.div
                  key={i}
                  className="bg-card rounded-lg shadow-md overflow-hidden border border-border/40 hover:shadow-lg transition-all duration-300 group"
                  variants={fadeInUp}
                  whileHover={{ y: -15, rotateY: 3 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  <div className="h-56 overflow-hidden bg-muted flex items-center justify-center">
                    <motion.svg
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
                      whileHover={{ scale: 1.15, rotate: 15 }}
                      transition={{ duration: 0.8 }}
                    >
                      <circle cx="12" cy="8" r="5" />
                      <path d="M20 21a8 8 0 1 0-16 0" />
                    </motion.svg>
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
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-accent/10">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 relative inline-block">
                Success Stories
                <motion.span
                  className="absolute bottom-0 left-0 h-1 bg-primary/30 -mb-2"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1.5 }}
                />
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Hear from students and investors who've found success through
                Uday.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {TESTIMONIALS.map((testimonial, i) => (
                <motion.div
                  key={i}
                  className="bg-card rounded-lg shadow-md p-6 border border-border/40 hover:shadow-lg transition-all duration-300"
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <motion.div
                        className="w-16 h-16 rounded-full border-2 border-primary bg-muted flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      >
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
                      </motion.div>
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
                    <motion.div
                      className="text-4xl text-primary/20 absolute top-0 left-0"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                    >
                      "
                    </motion.div>
                    <p className="pl-6 text-foreground/80 italic">
                      {testimonial.quote}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center bg-card p-10 md:p-14 rounded-2xl shadow-xl border border-primary/20"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2
                className="text-3xl lg:text-4xl font-bold mb-6 text-foreground"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1.0 }}
              >
                {CTA_DATA.title}
              </motion.h2>
              <motion.p
                className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.0 }}
              >
                {CTA_DATA.description}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 1.0 }}
              >
                <Link href="/signup?role=student">
                  <motion.div {...scaleOnHover}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base w-full sm:w-auto">
                      Join as Student
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/signup?role=investor">
                  <motion.div {...scaleOnHover}>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base w-full sm:w-auto">
                      Join as Investor
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
