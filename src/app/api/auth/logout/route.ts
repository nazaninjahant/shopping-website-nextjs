import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    message: "Logout successfully !",
  });
  // remove the token
  response.cookies.delete("token");
  return response;
}
