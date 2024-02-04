import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismadb from "@/prisma/setup";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import cookie from "cookie";

// console.log("Email and password of the login user is: ", email, password);

export async function POST(request: NextRequest) {
  try {
    console.log("Hi");
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

    const token = await new SignJWT({ id: userExists.id })
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("10h")
      .sign(new TextEncoder().encode(process.env.JWT_TOKEN));

    console.log(token);

    return NextResponse.json(
      { success: true, message: "Login Successful" },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie.serialize("authToken", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
          }),
        },
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
