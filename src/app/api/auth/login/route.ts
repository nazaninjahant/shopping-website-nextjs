import { connectDB } from "@/app/configs/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // check if user exists
    const user = await User.findOne({ email: reqBody.email });
    if (!user) {
      throw new Error("Uesr does not exist");
    }

    const passwordMatch = await bcrypt.compare(reqBody.password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid password !");
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      message: "Login successfull",
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
