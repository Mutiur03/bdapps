import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import pool from "@/lib/db";

export const GET = async () => {
  const session = await getServerSession(authOptions); // ⬅️ Correct server-side session access

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  let user;

  // Use type guard or optional chaining
  const role = (session.user as { role?: string })?.role;

  if (role !== "user") {
    user = await pool.query("SELECT * FROM investors WHERE id = $1", [
      session.user.id,
    ]);
  } else {
    user = await pool.query("SELECT * FROM users WHERE id = $1", [
      session.user.id,
    ]);
  }

  if (user.rows.length === 0) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new NextResponse(JSON.stringify(user.rows[0]), {
    status: 200,
  });
};
