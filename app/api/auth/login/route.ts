import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Printing the data of the user: ", body);
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    console.log("Token is: ", token);
    return Response.json({ message: "Login Successful" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
