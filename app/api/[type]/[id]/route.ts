import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  const { type, id } = await params;
  console.log(`Fetching ${type} with ID: ${id}`);
  
  if (!id || isNaN(Number(id))) {
    return new Response("Invalid or missing ID", { status: 400 });
  }

  const numericId = Number(id);
  let res;

  if (type === "user") {
    res = await prisma.user.findUnique({
      where: {
        id: numericId,
      },
      select: {
        name: true,
        profile_picture: true,
      },
    });
  } else if (type === "investor") {
    res = await prisma.investor.findUnique({
      where: {
        id: numericId,
      },
      select: {
        name: true,
        profile_picture: true,
      },
    });
  } else if (type === "admin") {
    res = await prisma.admin.findUnique({
      where: {
        id: numericId,
      },
      select: {
        name: true,
        profile_picture: true,
      },
    });
  } else {
    return new Response("Invalid type", { status: 400 });
  }
  if (!res) {
    return new Response("User not found", { status: 404 });
  }
  return new Response(JSON.stringify(res), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
