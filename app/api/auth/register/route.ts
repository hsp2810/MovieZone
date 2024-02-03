import prismadb from "@/prisma/setup";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter all the credentials to make an account",
        },
        { status: 401 }
      );
    }

    const userExists = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User with the same email already exists. Try a different one",
        },
        { status: 423 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const activity: string[] = [new Date(Date.now()).toString()];

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
        activity: activity,
      },

      select: {
        name: true,
        email: true,
        hashedPassword: false,
      },
    });

    return NextResponse.json(
      { success: true, message: "Account Created Successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: true, message: "Interval server error" },
      { status: 500 }
    );
  }
}
