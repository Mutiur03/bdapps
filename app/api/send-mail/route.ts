import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, subject, text } = await request.json();

  
  const transporter = nodemailer.createTransport({
    service: process.env.HOST,
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  
  const info = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email, 
    subject, 
    text, 
  });

  console.log("Message sent: %s", info.messageId);

  return NextResponse.json({ message: "Email sent successfully" });
}
