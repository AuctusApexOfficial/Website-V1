"use server"

// In a real implementation, this would be stored in a database
// For this example, we'll use a server-side in-memory store
const articleViews: Record<number, number> = {
  1: 342,
  2: 518,
  3: 276,
  4: 0, // The web design article starts with 0 views
  5: 489,
  6: 203,
  7: 315,
  8: 178,
}

/**
 * Increment the view count for a specific article
 */
export async function incrementViewCount(articleId: number): Promise<number> {
  // Ensure the article exists in our store
  if (!articleViews[articleId]) {
    articleViews[articleId] = 0
  }

  // Increment the view count
  articleViews[articleId]++

  // Return the new count
  return articleViews[articleId]
}

/**
 * Get the current view count for a specific article
 */
export async function getViewCount(articleId: number): Promise<number> {
  return articleViews[articleId] || 0
}

/**
 * Get view counts for all articles
 */
export async function getAllViewCounts(): Promise<Record<number, number>> {
  return { ...articleViews }
}

