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
  title: "About FundIt",
  description:
    "FundIt bridges the gap between innovative student entrepreneurs and investors who believe in nurturing the next generation of changemakers.",
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
      "We envision a future where student entrepreneurship is celebrated and supported, where innovative ideas from university campuses can easily find the backing they need to grow and make an impact. FundIt aims to be the bridge that connects promising student startups with investors who are looking to support the next generation of entrepreneurs.",
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
      "Students register on FundIt and create profiles for their startup projects.",
  },
  {
    title: "Project Creation",
    description:
      "Students can create multiple projects, each with detailed information, funding goals, and milestones.",
  },
  {
    title: "Investor Discovery",
    description:
      "Investors browse through projects and can contact students directly.",
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
    name: "Md. Abu Sufian",
    title: "Co-Founder, COO",
    role: "Product Designer",
    department: "CSE, KUET",
    image: "/images/team/sufian.jpg",
    tailwindClasses: "object-cover w-full h-full",
  },
  {
    name: "Mutiur Rahman",
    title: "Co-Founder. CTO",
    role: "Backend developer",
    department: "CSE, KUET",
    image: "/mutiur.jpg",
    tailwindClasses: "object-cover w-full h-full",
  },
  {
    name: "Md. Fahim Hossen",
    title: "Co-Founder, CTO",
    role: "Frontend developer",
    department: "CSE, KUET",
    image: "/fahim.jpg",
    tailwindClasses: "object-cover w-full h-full",
  },
  {
    name: "Partheeb Mostafiz",
    title: "Co-Founder, CMO",
    role: "Brand architect",
    department: "IEM, KUET",
    image: "/partheeb.jpg",
    tailwindClasses: "object-cover w-full h-full",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "FundIt helped me turn my idea into a real business. The milestone-based funding approach gave me clear goals to work towards, and the investor I connected with has become an invaluable mentor.",
    name: "Tahmid Hassan",
    role: "Student Entrepreneur, BUET",
    project: "EcoSolutions",
  },
  {
    quote:
      "As an investor, I appreciate the structured approach FundIt brings to student startups. The platform makes it easy to track progress and maintain clear communication with founders.",
    name: "Farzana Rahman",
    role: "Angel Investor",
  },
  {
    quote:
      "Finding investors was my biggest challenge until I discovered FundIt. Now my healthcare app has the funding it needs to reach communities across Bangladesh.",
    name: "Mahir Ahmed",
    role: "Student Entrepreneur, DMC",
    project: "MediConnect",
  },
  {
    quote:
      "FundIt gives me access to creative, ambitious student founders who bring fresh perspectives to old problems. It's been rewarding both financially and personally.",
    name: "Nasreen Khan",
    role: "Tech Investor",
  },
];

const CTA_DATA = {
  title: "Ready to Join the Journey?",
  description:
    "Whether you're a student entrepreneur with an innovative idea or an investor looking to support the next generation of startups, FundIt is the platform for you.",
};

export {
  fadeInUp,
  staggerContainer,
  scaleOnHover,
  slideInLeft,
  slideInRight,
  HERO_DATA,
  MISSION_VISION,
  STATISTICS,
  STUDENT_BENEFITS,
  INVESTOR_BENEFITS,
  HOW_IT_WORKS_STEPS,
  TEAM_MEMBERS,
  TESTIMONIALS,
  CTA_DATA,
};
