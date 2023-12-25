import prismadb from "@/prisma/setup";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return Response.json(
        {
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
      return Response.json(
        {
          message:
            "User with the same email already exists. Try a different one",
        },
        { status: 423 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const activity: Date[] = [new Date(Date.now())];

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

    return Response.json(
      { message: "Account Created Successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
