import { api } from "@/app/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");

  const registerResponse = await api.post("/register", {
    code,
  });

  const { token } = registerResponse.data;

  const cookiesExpiresInSeconds = 60 * 60 * 24 * 30;

  const redirectURL = new URL("/", request.url);

  return NextResponse.redirect(redirectURL, {
    headers: {
      "Set-Cookie": `token=${token}; Path=/; Max-Age=${cookiesExpiresInSeconds}`,
    },
  });
}
