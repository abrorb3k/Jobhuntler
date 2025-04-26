import { NextResponse } from "next/server";
import { users } from "@/lib/users";

export async function POST(req: Request) {
  const body = await req.json();
  const { fullName, email, password } = body;

  if (!fullName || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  users.push({ fullName, email, password });

  return NextResponse.json(
    { message: "Registration successful" },
    { status: 200 }
  );
}
