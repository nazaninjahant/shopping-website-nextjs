import { connectDB } from "@/app/configs/dbConfig";
import { validateJWT } from "@/app/helpers/validateJWT";
import categoryModel from "@/app/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      categoryid: string;
    };
  }
) {
  try {
    await validateJWT(request);
    const reqBody = await request.json();
    await categoryModel.findByIdAndUpdate(params.categoryid, reqBody);
    return NextResponse.json({
      message: "Category Updated Successfully",
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

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { categoryid: string };
  }
) {
  try {
    await validateJWT(request);
    await categoryModel.findByIdAndDelete(params.categoryid);
    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Deleted Successfully",
      },
      { status: 500 }
    );
  }
}
