import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    console.log("Fetching investments for user:", session.user.id);
    
    const investorId = session.user.id;
    const investments = await prisma.investment.findMany({
      where: {
        investorId: Number(investorId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(investments), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching investments:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const investorId = session.user.id;
    const { amount } = data;
    console.log(
      "Creating investment for investorId:",
      investorId,
      "with amount:",
      amount
    );

    if (!investorId || !amount) {
      return new Response("Missing required fields", { status: 400 });
    }

    const investment = await prisma.investment.create({
      data: {
        investorId: Number(investorId),
        amount: Number(amount),
      },
    });

    await prisma.fund.update({
      where: {
        id: 1,
      },
      data: {
        amount: {
          increment: Number(amount),
        },
      },
    });

    return new Response(JSON.stringify(investment), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating investment:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
