/**
 * Security utilities for protecting against common web vulnerabilities
 */

// Sanitize user input to prevent XSS attacks
export function sanitizeInput(input: string): string {
  if (!input) return ""

  // Replace potentially dangerous characters
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
}

// More robust rate limiting with IP tracking and time windows
const ipRequestMap = new Map<string, { count: number; timestamp: number }>()

export function checkRateLimit(ip: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const requestData = ipRequestMap.get(ip)

  // Clean up old entries every 10 minutes
  if (now % 600000 < 1000) {
    for (const [key, data] of ipRequestMap.entries()) {
      if (now - data.timestamp > windowMs) {
        ipRequestMap.delete(key)
      }
    }
  }

  if (!requestData) {
    ipRequestMap.set(ip, { count: 1, timestamp: now })
    return false // Not rate limited
  }

  if (now - requestData.timestamp < windowMs) {
    requestData.count++
    ipRequestMap.set(ip, requestData)
    return requestData.count > maxRequests // Rate limited if too many requests
  } else {
    // Reset for a new time window
    ipRequestMap.set(ip, { count: 1, timestamp: now })
    return false
  }
}

// Generate a CSRF token
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Validate CSRF token
export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken
}
