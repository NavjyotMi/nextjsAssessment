import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/library/supabaseClient";
export async function middleware(req: Request) {
  console.log("still not hitting");
  console.log(req.headers);
  const authHeader = req.headers.get("Authorization");
  console.log("Auth Header:", authHeader);

  if (!authHeader) {
    return new NextResponse("Authorization header missing", { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return new NextResponse("Token missing from Authorization header", {
      status: 401,
    });
  }

  try {
    // Verify the JWT and get the user associated with the token
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data || !data.user) {
      return new NextResponse("Invalid or expired token", { status: 401 });
    }

    // Attach user ID to the request headers if needed
    req.headers.set("user_id", data.user.id);

    return NextResponse.next();
  } catch (error) {
    return new NextResponse("Error verifying token", { status: 500 });
  }
}

// Middleware path pattern, can be adjusted as needed
export const config = {
  matcher: ["/api/:path*"], //  Corrected matcher pattern
};
