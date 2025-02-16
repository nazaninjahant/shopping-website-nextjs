import { connectDB } from "@/app/configs/dbConfig";
import { validateJWT } from "@/app/helpers/validateJWT";
import productModel from "@/app/models/productModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    // Check if product exists
    const reqBody = await request.json();
    const productExists = await productModel.findOne({
      name: reqBody.name,
    });

    if (productExists) {
      throw new Error("Product already exists !");
    }

    reqBody.createdBy = userId;
    const product = new productModel(reqBody);
    await product.save();
    return NextResponse.json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await validateJWT(request);
    const products = await productModel
      .find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    return NextResponse.json({ data: products });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.messae,
      },
      { status: 500 }
    );
  }
}
