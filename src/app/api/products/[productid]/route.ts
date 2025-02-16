import { connectDB } from "@/app/configs/dbConfig";
import { validateJWT } from "@/app/helpers/validateJWT";
import productModel from "@/app/models/productModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      productid: string;
    };
  }
) {
  try {
    const product = await productModel.findById(params.productid);
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      productid: string;
    };
  }
) {
  try {
    await validateJWT(request);
    const reqBody = await request.json();
    await productModel.findByIdAndUpdate(params.productid, reqBody);
    return NextResponse.json({
      message: "Product updated Successfully",
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
    params: { productid: string };
  }
) {
  try {
    await validateJWT(request);
    await productModel.findByIdAndDelete(params.productid);
    return NextResponse.json({ message: "Product deleted Successfully" });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Deleted Successfully",
      },
      { status: 500 }
    );
  }
}
