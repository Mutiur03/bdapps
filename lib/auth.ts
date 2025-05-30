import { NextAuthOptions } from "next-auth";
import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//     } & DefaultSession["user"] & {
//       role: string;
//       isActivated?: boolean;
//       remember?: boolean;
//     };
//   }

//   interface User {
//     id: string;
//     role: string;
//     email?: string;
//     phone?: string;
//     isActivated?: boolean;
//     remember?: boolean;
//   }
// }

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
        role: {
          label: "Role",
          type: "text",
          placeholder: "admin or user or investor",
        },
        remember: { label: "Remember Me", type: "boolean" }, // Add remember field
      },
      async authorize(credentials) {
        // Validate credentials exist
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        console.log("Credentials:", credentials);

        // Handle user role
        if (credentials.role === "user") {
          if (!credentials.email || !credentials.password) {
            throw new Error("Please enter your email and password");
          }
          const res = await prisma.user.findUnique({
            where: { university_email: credentials.email.trim() },
          });
          if (!res) {
            throw new Error("Invalid email or password");
          }
          const user = res as {
            id: number;
            university_email?: string | null;
            password?: string;
            role?: string;
            isActivated?: boolean;
          };

          if (!user.password) {
            throw new Error("User password is not set");
          }
          const isPasswordValid = await bcrypt.compare(
            credentials.password.trim(),
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
          console.log("User found:", user);

          return {
            id: String(user.id),
            email: user.university_email ?? undefined,
            role: user.role ?? "user",
            isActivated: user.isActivated,
            remember: credentials.remember === "true", // Convert string to boolean
          };
        } else if (credentials.role === "investor") {
          if (!credentials.email || !credentials.password) {
            throw new Error("Please enter your email and password");
          }
          const res = await prisma.investor.findUnique({
            where: { email: credentials.email.trim() },
          });
          if (!res) {
            throw new Error("Invalid email or password");
          }
          const user = res as {
            id: number;
            email?: string | null;
            password?: string;
            role?: string;
          };

          if (!user.password) {
            throw new Error("User password is not set");
          }
          const isPasswordValid = await bcrypt.compare(
            credentials.password.trim(),
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            id: String(user.id),
            email: user.email ?? undefined,
            role: user.role ?? "investor",
            remember: credentials.remember === "true", // Convert string to boolean
          };
        } else if (credentials.role === "admin") {
          if (!credentials.email || !credentials.password) {
            throw new Error("Please enter your email and password");
          }
          const res = await prisma.admin.findUnique({
            where: { email: credentials.email.trim() },
          });
          if (!res) {
            throw new Error("Invalid email or password");
          }
          const user = res as {
            id: number;
            email?: string | null;
            password?: string;
            role?: string;
          };
          if (!user.password) {
            throw new Error("User password is not set");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password.trim(),
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
          return {
            id: String(user.id),
            email: user.email ?? undefined,
            role: user.role ?? "admin",
            remember: credentials.remember === "true", // Convert string to boolean
          };
        }
        throw new Error("Invalid role specified");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Only assign custom fields if they exist on user
        if ("role" in user) {
          token.role = user.role;
        }
        if ("isActivated" in user) {
          token.isActivated = user.isActivated;
        }
        if ("remember" in user) {
          token.remember = user.remember;
        }
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.isActivated = token.isActivated as boolean;
        // Set the session expiry time based on remember preference
        const isRemembered = token.remember as boolean | undefined;
        session.maxAge = isRemembered ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 1 day
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Default max age (will be overridden by session callback)    strategy: "jwt",    signIn: "/signin",
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
