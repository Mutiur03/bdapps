import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    User: {
      id: string;
      role: string;
      name?: string;
      email?: string;
    };
  }

  interface User {
    id: string;
    role: string;
    email?: string;
    phone?: string;
    isactivated?: boolean;
  }
}

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "./db";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        phone: {
          label: "Phone",
          type: "number",
          placeholder: "Number dal MC ",
        },
        password: { label: "Password", type: "password" },
        role: {
          label: "Role",
          type: "text",
          placeholder: "admin or user or investor",
        },
      },
      async authorize(credentials) {
        if (credentials?.role === "user") {
          if (!credentials?.phone || !credentials?.password) {
            throw new Error("Please enter your phone and password");
          }
          const res = await pool.query("SELECT * FROM users WHERE phone = $1", [
            credentials.phone,
          ]);
          const user = res.rows[0] as {
            id: number;
            phone?: string;
            password?: string;
            role?: string;
            isactivated?: boolean;
          };

          if (!user) {
            throw new Error("Invalid phone or password");
          }
          if (!user.password) {
            throw new Error("User password is not set");
          }
          const hashedPassword = user.password;
          const isPasswordValid = await bcrypt.compare(
            credentials.password.trim(),
            hashedPassword
          );
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
          if (user && user.password) {
            delete user.password;
          }
          return {
            id: user.id.toString(),
            phone: user.phone,
            role: "user",
            isactivated: user.isactivated,
          };
        } else {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please enter your email and password");
          }
          const res = await pool.query(
            "SELECT * FROM admins WHERE email = $1",
            [credentials.email]
          );
          const user = res.rows[0];

          if (!user) {
            throw new Error("Invalid email or password");
          }
          if (!user.password) {
            throw new Error("User password is not set");
          }
          const hashedPassword = user.password;
          const isPasswordValid = await bcrypt.compare(
            credentials.password.trim(),
            hashedPassword
          );
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
          if (user && user.password) {
            delete user.password;
          }
          return {
            id: user.id,
            email: user.email,
            role: "admin",
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isactivated = user.isactivated;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.isactivated = token.isactivated as boolean;
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
