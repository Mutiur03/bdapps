import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  console.log("Fetching user with ID:", id);
  
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  if (user.rows.length === 0) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new NextResponse(JSON.stringify(user.rows[0]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
