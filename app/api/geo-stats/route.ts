import { geolocation, ipAddress } from "@vercel/edge";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const ip = ipAddress(request) || headers().get("X-Forwarded-For");
  const { country } = geolocation(request);
  return new Response(JSON.stringify({ ip, country }));
}
