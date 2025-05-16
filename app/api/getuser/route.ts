import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions); // ⬅️ Correct server-side session access

    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    let user;

    const role = (session.user as { role?: string })?.role;

    if (role !== "user") {
      user = await prisma.investor.findUnique({
        where: { id: Number(session.user.id) },
      });
    } else {
      user = await prisma.user.findUnique({
        where: { id: Number(session.user.id) },
      });
    }

    if (user === null) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    const userWithoutPassword = {
      ...user,
      password: undefined,
    };
    return new NextResponse(JSON.stringify(userWithoutPassword), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
};
