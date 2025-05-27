"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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
  transition: { type: "spring", stiffness: 300, damping: 30 },
};

export function HomeHero() {
  const startupsRef = useRef<HTMLDivElement | null>(null);

  const scrollToStartups = () => {
    startupsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-[calc(100vh-64px)] overflow-hidden flex flex-col">
      {/* Background Elements with Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/30 via-cyan-500/10 to-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Floating Background Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* Hero Content */}
      <div className="container relative z-10 px-4 mx-auto flex flex-col lg:flex-row items-center justify-between flex-1">
        {/* Text Content - Left Side */}
        <motion.div
          className="max-w-xl space-y-6 text-center lg:text-left z-10 py-12 lg:py-0"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div className="space-y-2" variants={fadeInLeft}>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
              variants={fadeInUp}
            >
              Connecting{" "}
              <motion.span
                className="text-primary inline-block"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Student Founders
              </motion.span>{" "}
              with{" "}
              <motion.span
                className="text-primary inline-block"
                whileHover={{ scale: 1.05, rotate: -1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Investors
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-lg text-muted-foreground"
            variants={fadeInLeft}
          >
            Uday empowers student entrepreneurs to showcase their ideas and
            connect with investors who believe in their vision.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            variants={fadeInLeft}
          >
            <Link href="/signup">
              <motion.div {...scaleOnHover}>
                <Button className="px-6 py-5 text-lg gap-2 bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group">
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full"
                    transition={{ duration: 0.6 }}
                  />
                  Join Udayee Now
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
            <motion.div {...scaleOnHover}>
              <Button
                onClick={scrollToStartups}
                variant="outline"
                className="gap-2 px-6 py-5 text-lg border-primary text-primary hover:bg-primary/10 relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 origin-left"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="relative z-10">Explore Startups</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Image - Right Side - UNCHANGED */}
        <div className="hidden lg:flex">
          <div className="relative h-full flex items-end">
            <img
              src="/hero.png"
              alt="Student entrepreneur with laptop"
              className="h-auto max-h-[calc(100vh-64px)] object-contain object-bottom z-10 origin-bottom"
              style={{
                filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))",
                scale: "1.8",
                transform: "translateY(250px) translateX(-120px)",
              }}
            />

            {/* Highlight effect behind the person */}
            <div className="absolute bottom-0 w-72 h-40 bg-primary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="cursor-pointer"
          onClick={scrollToStartups}
        >
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-primary/60 rounded-full mt-2"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Reference for Smooth Scroll - kept for functionality but arrow removed */}
      <div ref={startupsRef} className="absolute bottom-0" />
    </div>
  );
}
