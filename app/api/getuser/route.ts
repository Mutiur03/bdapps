import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

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

    if (role === "user") {
      user = await prisma.user.findUnique({
        where: { id: Number(session.user.id) },
        include: {
          Project: {
            select: {
              id: true,
              title: true,
              description: true,
              createdAt: true,
              updatedAt: true,
              status: true,
            },
          },
        },
      });
    }

    if (user === null) {
      // Clear session if user not found in database
      const response = new NextResponse(
        JSON.stringify({ error: "User not found" }),
        {
          status: 404,
        }
      );

      response.cookies.delete("next-auth.callback-url");
      response.cookies.delete("next-auth.csrf-token");
      response.cookies.delete("next-auth.session-token");

      return response;
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
