import pool from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;
  let { phone } = body;
  phone = "0" + phone.trim().slice(-10);
  console.log(phone);
  // Check if the user already exists
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE phone = $1",
    [phone]
  );

  if (existingUser.rows.length > 0) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  const res = await pool.query(
    "INSERT INTO users (phone, password) VALUES ($1, $2) RETURNING *",
    [phone, hashedPassword]
  );

  // Remove password from the returned user object
  const user = res.rows[0];
  if (user) {
    delete user.password;
  }

  return NextResponse.json(user, {
    status: 201,
  });
}
