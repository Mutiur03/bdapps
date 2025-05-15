import pool from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  // Check if the user already exists
  const existingUser = await pool.query(
    "SELECT * FROM investors WHERE email = $1",
    [email.trim()]
  );

  if (existingUser.rows.length > 0) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const res = await pool.query(
    "INSERT INTO investors (email, password) VALUES ($1, $2) RETURNING *",
    [email, hashedPassword]
  );
  const user = res.rows[0];
  if (user) {
    delete user.password;
  }

  return NextResponse.json(user, {
    status: 201,
  });
}
