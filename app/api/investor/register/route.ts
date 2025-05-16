import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const existingUser = await prisma.investor.findUnique({
    where: { email: email.trim() },
  });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const res = await prisma.investor.create({
    data: {
      email: email.trim(),
      password: hashedPassword,
    },
  });
  const user = {
    ...res,
    password: undefined,
  };

  return NextResponse.json(user, {
    status: 201,
  });
}
