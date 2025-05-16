import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    email?: string;

    phone?: string;
    isActivated?: boolean;
  }
}

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
      },
      async authorize(credentials) {
        // Validate credentials exist
        if (!credentials) {
          throw new Error("No credentials provided");
        }

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
          };
        } else {
          throw new Error("Invalid role specified");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isActivated = user.isActivated;
      }
      return token;
    },
    async session({ session, token }: { session; token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.isActivated = token.isActivated as boolean;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/user/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
