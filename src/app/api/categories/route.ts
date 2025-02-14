import { connectDB } from "@/app/configs/dbConfig";
import { validateJWT } from "@/app/helpers/validateJWT";
import categoryModel from "@/app/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    // Check if categoty already exists
    const reqBody = await request.json();
    const categoryExists = await categoryModel.findOne({
      name: reqBody.name,
    });
    if (categoryExists) {
      throw new Error("Category already exists !");
    }
    reqBody.createdBy = userId;
    const category = new categoryModel(reqBody);
    await category.save();
    return NextResponse.json({
      message: "Category created succefully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await validateJWT(request);
    const categories = await categoryModel
      .find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    return NextResponse.json({ data: categories });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.messae,
      },
      { status: 500 }
    );
  }
}
