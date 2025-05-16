"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeFooter } from "@/components/home/home-footer";
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

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
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
    setResult(null); // Ensure result is only updated on the client
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

  return (
    <>
      <HomeNavbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/30 via-primary/5 to-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary blur-3xl"></div>
        </div>

        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground animate-fade-in">
              We'd Love to <span className="text-primary">Hear from You</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animation-delay-200 animate-fade-in">
              Have questions about UdayeeConnect? Looking for support? Or just
              want to share your feedback? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Information Card */}
            <div className="space-y-8 lg:sticky lg:top-24">
              <Card className="overflow-hidden border-primary/20 bg-card shadow-md">
                <div className="h-48 relative">
                  <Image
                    src="/contact-map.jpg"
                    alt="Office location"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/10"></div>
                  <div className="absolute top-4 left-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    Our Location
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center">
                    <span className="bg-primary/10 p-2 rounded-full mr-3">
                      <Mail className="h-5 w-5 text-primary" />
                    </span>
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <ContactItem
                      icon={<Mail className="h-5 w-5 text-primary" />}
                      title="Email Us"
                      detail="contact@udayeeconnect.com"
                    />

                    <ContactItem
                      icon={<Phone className="h-5 w-5 text-primary" />}
                      title="Call Us"
                      detail="+880 1879 426869"
                    />

                    <ContactItem
                      icon={<MapPin className="h-5 w-5 text-primary" />}
                      title="Visit Us"
                      detail="Innovation Hub, BUET Campus, Dhaka-1000, Bangladesh"
                    />
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-foreground font-medium mb-3">
                      Connect With Us
                    </h4>
                    <div className="flex space-x-3">
                      <SocialButton icon={<Facebook className="h-4 w-4" />} />
                      <SocialButton icon={<Twitter className="h-4 w-4" />} />
                      <SocialButton icon={<Linkedin className="h-4 w-4" />} />
                      <SocialButton icon={<Instagram className="h-4 w-4" />} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">
                    Send Us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as
                    possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-foreground"
                      >
                        Your Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium text-foreground"
                      >
                        Subject <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="What is this regarding?"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground"
                      >
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                        required
                      ></textarea>
                    </div>

                    {result && (
                      <div
                        className={`p-3 rounded-md flex items-center space-x-2 ${
                          result.success
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {result.success ? (
                          <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        )}
                        <span className="text-sm">{result.message}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground inline-block relative">
                Frequently Asked Questions
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Find answers to common questions about UdayeeConnect
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FaqItem
                question="How do I sign up as a student entrepreneur?"
                answer="Registration is simple! Click on the 'Sign Up' button, select 'Student', and follow the guided process to create your account and set up your startup profile."
              />
              <FaqItem
                question="What type of startups can join UdayeeConnect?"
                answer="We welcome student-led startups from all industries and sectors. Whether you're working on tech, sustainability, healthcare, or creative projects, our platform is designed to support you."
              />
              <FaqItem
                question="How are investments structured?"
                answer="UdayeeConnect uses a milestone-based investment approach. Funds are released as entrepreneurs complete predefined milestones, providing accountability for founders and security for investors."
              />
              <FaqItem
                question="Can I invest in multiple startups?"
                answer="Absolutely! As an investor, you can browse and invest in as many student startups as you wish, building a diverse portfolio of early-stage ventures."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-1">
            <div className="bg-card rounded-2xl p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mt-20 -mr-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -mb-20 -ml-20"></div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Ready to Join the UdayeeConnect Community?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Whether you're a student with a brilliant idea or an investor
                  looking to support the next generation of innovators, we're
                  here to connect you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2.5">
                    Join as Student
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 px-8 py-2.5"
                  >
                    Join as Investor
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HomeFooter />
    </>
  );
}

// Helper component for contact items
function ContactItem({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex items-start space-x-3">
      <div className="bg-muted mt-0.5 p-2 rounded-full">{icon}</div>
      <div>
        <h4 className="text-base font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

// Helper component for social media buttons
function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="bg-muted hover:bg-primary/10 p-2.5 rounded-full text-muted-foreground hover:text-primary transition-colors">
      {icon}
    </button>
  );
}

// Helper component for FAQ items
function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-medium text-foreground mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  );
}
