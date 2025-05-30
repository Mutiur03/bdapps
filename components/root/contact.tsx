"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

// Data Arrays and Objects
const HERO_DATA = {
  badge: "Get in Touch",
  title: "We'd Love to Hear from You",
  description:
    "Have questions about FundIt? Looking for support? Or just want to share your feedback? We're here to help.",
};

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "contact@FundIt.com",
    href: "mailto:contact@FundIt.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+880 1879 426869",
    href: "tel:+8801879426869",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "Khulna University of Engineering & Technology, Khulna, Bangladesh",
    href: "https://maps.google.com",
  },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const FAQ_DATA = [
  {
    question: "How do I sign up as a student entrepreneur?",
    answer:
      "Registration is simple! Click on the 'Sign Up' button, select 'Student', and follow the guided process to create your account and set up your startup profile.",
  },
  {
    question: "What type of startups can join FundIt?",
    answer:
      "We welcome student-led startups from all industries and sectors. Whether you're working on tech, sustainability, healthcare, or creative projects, our platform is designed to support you.",
  },
  {
    question: "How are investments structured?",
    answer:
      "FundIt uses a milestone-based investment approach. Funds are released as entrepreneurs complete predefined milestones, providing accountability for founders and security for investors.",
  },
  {
    question: "Can I invest in multiple startups?",
    answer:
      "Absolutely! As an investor, you can browse and invest in as many student startups as you wish, building a diverse portfolio of early-stage ventures.",
  },
];

const FORM_FIELDS = [
  {
    id: "name",
    name: "name",
    type: "text",
    label: "Your Name",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    id: "email",
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
  },
  {
    id: "subject",
    name: "subject",
    type: "text",
    label: "Subject",
    placeholder: "What is this regarding?",
    required: true,
  },
];

const CTA_DATA = {
  title: "Ready to Join the FundIt Community?",
  description:
    "Whether you're a student with a brilliant idea or an investor looking to support the next generation of innovators, we're here to connect you.",
  buttons: [
    {
      text: "Join as Student",
      variant: "primary",
      href: "/signup?role=student",
    },
    {
      text: "Join as Investor",
      variant: "outline",
      href: "/signup?role=investor",
    },
  ],
};

// Animation Variants with slower ease-in
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    ease: [0.16, 1, 0.3, 1],
  },
};

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactComponent() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    setResult(null);
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult({ success: true, message: "Sending..." });

    const body = {
      ...formData,
      access_key: process.env.NEXT_PUBLIC_ACCESS_KEY,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        setResult({ success: true, message: "Form Submitted Successfully" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setResult({ success: false, message: data.message });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult({
        success: false,
        message: "An error occurred. Please try again.",
      });
    }
  };

  // Prevent hydration mismatch by not rendering animations until mounted
  if (!mounted) {
    return (
      <div>
        {/* Hero Section - Static version for SSR */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/30 via-primary/5 to-background">
          {/* ...existing static hero content... */}
        </section>

        {/* ...existing static sections... */}
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-accent/20">
        <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-28">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.span
              className="inline-block px-3 py-1 text-xs md:text-sm font-medium rounded-full bg-primary/10 text-primary"
              variants={fadeInUp}
            >
              {HERO_DATA.badge}
            </motion.span>
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
              variants={fadeInUp}
            >
              {HERO_DATA.title.split("Hear from You")[0]}
              <span className="text-primary">Hear from You</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
              variants={fadeInUp}
            >
              {HERO_DATA.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Information Card */}
            <motion.div
              className="space-y-6 lg:space-y-8 lg:sticky lg:top-24"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="overflow-hidden border-primary/20 bg-card shadow-md">
                  <div className="h-40 md:h-48 relative">
                    <Image
                      src="/contact-map.jpg"
                      alt="Office location"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/10"></div>
                    <motion.div
                      className="absolute top-4 left-4 md:left-6 bg-primary text-primary-foreground px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.8,
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      Our Location
                    </motion.div>
                  </div>

                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-foreground flex items-center">
                      <motion.span
                        className="bg-primary/10 p-2 rounded-full mr-3"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Mail className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                      </motion.span>
                      Contact Information
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Reach out to us through any of these channels
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-4 md:p-6 pt-0 space-y-6">
                    <motion.div
                      className="space-y-4"
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                    >
                      {CONTACT_INFO.map((item, i) => (
                        <motion.div key={i} variants={fadeInUp}>
                          <ContactItem
                            icon={
                              <item.icon className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                            }
                            title={item.title}
                            detail={item.detail}
                            href={item.href}
                          />
                        </motion.div>
                      ))}
                    </motion.div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="text-foreground font-medium mb-3 text-sm md:text-base">
                        Connect With Us
                      </h4>
                      <motion.div
                        className="flex space-x-3"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                      >
                        {SOCIAL_LINKS.map((social, i) => (
                          <motion.div key={i} variants={fadeInUp}>
                            <SocialButton
                              icon={
                                <social.icon className="h-3 md:h-4 w-3 md:w-4" />
                              }
                              href={social.href}
                              label={social.label}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={slideInRight}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="border-primary/20">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-foreground">
                      Send Us a Message
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Fill out the form below and we'll get back to you as soon
                      as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 md:space-y-6"
                    >
                      <motion.div
                        className="space-y-4 md:space-y-6"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                      >
                        {FORM_FIELDS.map((field, i) => (
                          <motion.div
                            key={field.id}
                            className="space-y-2"
                            variants={fadeInUp}
                          >
                            <label
                              htmlFor={field.id}
                              className="text-sm font-medium text-foreground"
                            >
                              {field.label}{" "}
                              {field.required && (
                                <span className="text-primary">*</span>
                              )}
                            </label>
                            <motion.input
                              type={field.type}
                              id={field.id}
                              name={field.name}
                              placeholder={field.placeholder}
                              value={formData[field.name as keyof FormData]}
                              onChange={handleChange}
                              className="w-full p-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm md:text-base"
                              required={field.required}
                              whileFocus={{ scale: 1.01 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            />
                          </motion.div>
                        ))}

                        <motion.div className="space-y-2" variants={fadeInUp}>
                          <label
                            htmlFor="message"
                            className="text-sm font-medium text-foreground"
                          >
                            Message <span className="text-primary">*</span>
                          </label>
                          <motion.textarea
                            id="message"
                            name="message"
                            rows={4}
                            placeholder="How can we help you?"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none text-sm md:text-base"
                            required
                            whileFocus={{ scale: 1.01 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />
                        </motion.div>
                      </motion.div>

                      {result && (
                        <motion.div
                          className={`p-3 rounded-md flex items-center space-x-2 ${
                            result.success
                              ? "bg-primary/10 text-primary"
                              : "bg-destructive/10 text-destructive"
                          }`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          {result.success ? (
                            <CheckCircle className="h-4 w-4 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          )}
                          <span className="text-sm">{result.message}</span>
                        </motion.div>
                      )}

                      <motion.div {...scaleOnHover}>
                        <Button
                          type="submit"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full md:w-auto"
                        >
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-8 md:mb-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground inline-block relative">
                Frequently Asked Questions
                <motion.span
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 md:w-24 h-1 bg-primary rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "6rem" }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.4,
                    duration: 1.0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                Find answers to common questions about FundIt
              </p>
            </motion.div>

            <motion.div
              className="grid gap-4 md:gap-6 md:grid-cols-2"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {FAQ_DATA.map((faq, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <FaqItem question={faq.question} answer={faq.answer} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-1"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.div
              className="bg-card rounded-2xl p-6 md:p-12 text-center relative overflow-hidden"
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-primary/5 rounded-full -mt-10 md:-mt-20 -mr-10 md:-mr-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-primary/5 rounded-full -mb-10 md:-mb-20 -ml-10 md:-ml-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative z-10">
                <motion.h2
                  className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {CTA_DATA.title}
                </motion.h2>
                <motion.p
                  className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {CTA_DATA.description}
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.4,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {CTA_DATA.buttons.map((button, i) => (
                    <motion.div key={i} {...scaleOnHover}>
                      <Button
                        className={`px-6 md:px-8 py-2.5 text-sm md:text-base w-full sm:w-auto ${
                          button.variant === "primary"
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "border-primary text-primary hover:bg-primary/10"
                        }`}
                        variant={
                          button.variant === "outline" ? "outline" : "default"
                        }
                      >
                        {button.text}
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Helper component for contact items
function ContactItem({
  icon,
  title,
  detail,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
  href?: string;
}) {
  const animatedContent = (
    <motion.div
      className="flex items-start space-x-3"
      whileHover={{ x: 6 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="bg-muted mt-0.5 p-2 rounded-full"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {icon}
      </motion.div>
      <div>
        <h4 className="text-sm md:text-base font-medium text-foreground">
          {title}
        </h4>
        <p className="text-xs md:text-sm text-muted-foreground break-words">
          {detail}
        </p>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:text-primary transition-colors">
        {animatedContent}
      </a>
    );
  }

  return animatedContent;
}

// Helper component for social media buttons
function SocialButton({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      className="bg-muted hover:bg-primary/10 p-2 md:p-2.5 rounded-full text-muted-foreground hover:text-primary transition-colors"
      whileHover={{ scale: 1.06, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {icon}
    </motion.a>
  );
}

// Helper component for FAQ items
function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <motion.div
      className="bg-card border border-border rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow"
      whileHover={{ y: -6, scale: 1.005 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <h3 className="text-base md:text-lg font-medium text-foreground mb-2">
        {question}
      </h3>
      <p className="text-sm md:text-base text-muted-foreground">{answer}</p>
    </motion.div>
  );
}
