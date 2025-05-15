import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;
  let { phone } = body;
  phone = "0" + phone.trim().slice(-10);
  console.log(phone);
  const existingUser = await prisma.user.findUnique({
    where: { phone },
  });
  console.log(existingUser);

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const res = await prisma.user.create({
    data: {
      phone,
      password: hashedPassword,
    },
  });

  const userWithoutPassword = {
    ...res,
    password: undefined,
  };

  return NextResponse.json(userWithoutPassword, {
    status: 201,
  });
}
