import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/prisma/setup";
import {
  AdminAuthenticate,
  AuthByRequest,
  Authenticate,
} from "@/lib/server/Authenticate";
// import { MovieCategory } from "@prisma/client";
import { ICategory } from "@/types";
import { MovieLicense } from "@prisma/client";

// Get all the movies
export async function GET(request: NextRequest) {
  try {
    const user = await AuthByRequest(request);
    if (!user)
      NextResponse.json(
        {
          success: false,
          message: "User/Token not found. Failed to Authenticate",
        },
        { status: 401 }
      );

    const movies = await prismadb.movie.findMany({});
    if (!movies)
      return NextResponse.json(
        {
          success: false,
          message: "No movies found",
        },
        { status: 402 }
      );

    return NextResponse.json(
      { success: true, message: "Get all movies", movies },
      {
        status: 200,
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

// Insert a new movie
export async function POST(request: NextRequest) {
  try {
    const user = await AdminAuthenticate(request);
    if (!user)
      return NextResponse.json(
        {
          success: false,
          message: "Only Admins can insert a movie. Request Failed",
        },
        { status: 401 }
      );

    const data = await request.formData();
    // console.log(data);
    const moviename = data.get("moviename");
    const writer = data.get("writer");
    const director = data.get("director");
    const producer = data.get("producer");
    const description = data.get("description");
    // const cast = data.get("cast");
    const cast = ["Hritik Roshan", "Deepika Padukone", "Anil Kapoor"];
    const duration = data.get("duration");
    const country = data.get("country");
    const language = data.get("language");
    // const categories = data.get("categories");
    const categories = ["Action-Thriller", "Army", "Patriotic"];
    // const likes = data.get("likes");
    const license = data.get("license");
    const thumbnail: File | null = data.get("thumbnail") as unknown as File;
    const video: File | null = data.get("video") as unknown as File;

    if (!thumbnail || !video) {
      return NextResponse.json(
        {
          success: false,
          message: "File not found",
        },
        { status: 402 }
      );
    }

    const thumbnailBytes = await thumbnail.arrayBuffer();
    const thumbnailBuffer = Buffer.from(thumbnailBytes);

    const videoBytes = await thumbnail.arrayBuffer();
    const videoBuffer = Buffer.from(videoBytes);

    let licenseObj = await prismadb.movieLicense.findUnique({
      where: { licensetag: license as string },
    });

    if (!licenseObj) {
      licenseObj = await prismadb.movieLicense.create({
        data: {
          licensetag: license as string,
        },
      });
    }

    const returnedCategories = await checkCategory(categories);

    const newMovie = await prismadb.movie.create({
      data: {
        moviename: moviename as string,
        thumbnail: "",
        video: "",
        writer: writer as string,
        director: director as string,
        producer: producer as string,
        description: description as string,
        duration: parseFloat(duration as string),
        cast: cast,
        categories: returnedCategories.map((component) => {
          return { ...component };
        }),
        country: country as string,
        language: language as string,
        // license: licenseObj as MovieLicense,
      },
    });
    if (!newMovie)
      return NextResponse.json(
        { success: false, message: "Failed to insert the movie" },
        { status: 403 }
      );

    return NextResponse.json(
      { success: true, message: "Login Successful", movie: "" },
      {
        status: 200,
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

const checkCategory = async (categories: string[]) => {
  let newCategoryArr: any[] = [];
  for (const category of categories) {
    let categoryExist = await prismadb.movieCategory.findUnique({
      where: { categoryname: category },
    });

    if (!categoryExist) {
      categoryExist = await prismadb.movieCategory.create({
        data: {
          categoryname: category,
        },
      });
    }
    newCategoryArr.push(categoryExist);
  }

  return newCategoryArr;
};
