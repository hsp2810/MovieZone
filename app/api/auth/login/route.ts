import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import prismadb from "@/prisma/setup";
import jwt from "jsonwebtoken";

// console.log("Email and password of the login user is: ", email, password);

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { email, password } = await request.json();
    if (!email || !password)
      return NextResponse.json(
        { success: false, message: "Please enter all the credentials" },
        { status: 401 }
      );

    const userExists = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (!userExists)
      return NextResponse.json(
        { success: false, message: "Please enter the correct credentials" },
        { status: 402 }
      );

    const isCorrectPassword = await bcrypt.compare(
      password,
      userExists.hashedPassword as string
    );
    if (!isCorrectPassword)
      return NextResponse.json(
        { success: false, message: "Please enter the correct credentials" },
        { status: 402 }
      );

    const token = jwt.sign(userExists.id, process.env.JWT_TOKEN as string);
    cookies().set("moviezoneauthcookies", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 10,
    });

    return NextResponse.json(
      { success: true, message: "Login Successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
