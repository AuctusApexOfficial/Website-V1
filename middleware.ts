import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { checkRateLimit } from "./utils/security"

// List of known bot user agents
const BOT_UA_KEYWORDS = [
  "bot",
  "crawler",
  "spider",
  "headless",
  "phantom",
  "selenium",
  "puppeteer",
  "chrome-lighthouse",
  "googlebot",
  "bingbot",
  "yandex",
  "baiduspider",
]

// Check if a user agent belongs to a known bot
function isBot(ua: string): boolean {
  return BOT_UA_KEYWORDS.some((keyword) => ua.toLowerCase().includes(keyword))
}

export function middleware(request: NextRequest) {
  // Get the client's IP address
  const ip = request.headers.get("x-forwarded-for") || "unknown"

  // Get the user agent
  const userAgent = request.headers.get("user-agent") || ""

  // Check if it's a suspicious bot (excluding legitimate crawlers)
  if (
    isBot(userAgent) &&
    !userAgent.toLowerCase().includes("googlebot") &&
    !userAgent.toLowerCase().includes("bingbot")
  ) {
    // Return a 403 Forbidden response for suspicious bots
    return new NextResponse(null, { status: 403 })
  }

  // Apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // More strict rate limiting for API routes
    if (checkRateLimit(ip, 20, 60000)) {
      return new NextResponse(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      })
    }
  }

  return NextResponse.next()
}

// Configure which paths should trigger this middleware
export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
}

