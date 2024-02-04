import { jwtVerify } from "jose";
import prismadb from "@/prisma/setup";
import { IUser } from "@/types";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const Authenticate = async (authCookies: string) => {
  try {
    const verified = await jwtVerify(
      authCookies,
      new TextEncoder().encode(process.env.JWT_TOKEN)
    );
    const userId = verified.payload.jti;
    const user = await prismadb.user.findUnique({
      where: { id: userId },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const AuthByRequest = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("authToken");
    if (!token) return null;

    const user = await Authenticate(token.value);
    if (!user) return null;

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const AdminAuthenticate = async (request: NextRequest) => {
  try {
    const user = await AuthByRequest(request);
    if (user && !user.isAdmin) return null;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
