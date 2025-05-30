import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || (session.user as any).role !== "admin") {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    const id = (session.user as any).id;
    const admin = await prisma.admin.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Project: {
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            status: true,
            category: true,
            raised_amount: true,
          },
        },
      },
    });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "No admins found" },
        { status: 404 }
      );
    }
    const { password, ...adminWithoutPassword } = admin;
    return NextResponse.json(
      { success: true, data: adminWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
