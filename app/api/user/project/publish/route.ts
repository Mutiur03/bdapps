import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const formData = await request.json();
    const { projectId } = formData;

    const res = await prisma.project.update({
      where: {
        id: Number(projectId),
      },
      data: {
        status: "active",
      },
    });
    console.log("Project published successfully:", res);

    return new Response(
      JSON.stringify({ ...res, message: "Project published successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error publishing project:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
