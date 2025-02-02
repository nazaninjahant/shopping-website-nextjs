import { connectDB } from "@/app/configs/dbConfig";
import { NextResponse } from "next/server";

connectDB();
export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: 1,
        name: "John Doe",
      },
    ],
  });
}
