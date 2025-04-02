"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Calendar, User } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Timeless Brand Design",
    excerpt: "Discover how to create brand identities that remain relevant and impactful for years to come.",
    category: "Brand Design",
    date: "April 2, 2025",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Leveraging AI in Modern Marketing Strategies",
    excerpt: "How artificial intelligence is transforming marketing and how businesses can harness its power.",
    category: "Digital Marketing",
    date: "March 8, 2025",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "The Psychology of Color in Web Design",
    excerpt: "Understanding how color choices influence user perception and behavior on your website.",
    category: "Web Design",
    date: "February 28, 2025",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "The Importance of Web Design",
    excerpt: "Why investing in professional web design is crucial for business success in the digital age.",
    category: "Web Design",
    date: "March 31, 2025",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "Effortlessly Automating Tasks with AI",
    excerpt: "Practical ways to implement AI automation to save time and increase productivity in your business.",
    category: "Artificial Intelligence",
    date: "February 15, 2025",
    image: "/placeholder.svg?height=400&width=600",
  },
]

// Create a duplicated array for infinite scrolling effect
const duplicatedPosts = [...blogPosts, ...blogPosts, ...blogPosts]

export default function BlogCarousel() {
  // Find the index of "The Importance of Web Design" post
  // const webDesignIndex = blogPosts.findIndex((post) => post.title === "The Importance of Web Design")
  // Set the initial index to position this post in the middle
  // const [currentIndex, setCurrentIndex] = useState(webDesignIndex + blogPosts.length)
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [hasWebDesignPost, setHasWebDesignPost] = useState(false)

  useEffect(() => {
    // Determine if "The Importance of Web Design" post exists
    let webDesignPostExists = false
    for (let i = 0; i < blogPosts.length; i++) {
      if (blogPosts[i].title === "The Importance of Web Design") {
        webDesignPostExists = true
        break
      }
    }
    setHasWebDesignPost(webDesignPostExists)
  }, [])

  // Calculate the width of a single blog post card plus margin
  useEffect(() => {
    const updateWidth = () => {
      if (carousel.current) {
        const cardWidth = 350 // Fixed width of blog cards
        const cardMargin = 32 // This should match the gap in your flex
        setWidth(cardWidth + cardMargin)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)

    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [])

  // Handle scroll position based on currentIndex
  useEffect(() => {
    if (carousel.current) {
      carousel.current.scrollTo({
        left: 0,
        behavior: "smooth",
      })
    }
  }, [width])

  // Handle seamless looping
  const handleScroll = () => {
    if (!carousel.current) return

    const scrollPosition = carousel.current.scrollLeft
    const totalWidth = carousel.current.scrollWidth
    const viewportWidth = carousel.current.clientWidth

    // When reaching the end (scrolling forward)
    if (scrollPosition + viewportWidth >= totalWidth - 20) {
      // Jump to the duplicate section (after the first set of posts)
      // setCurrentIndex(blogPosts.length)
      if (carousel.current) {
        carousel.current.scrollLeft = blogPosts.length * width
      }
    }

    // When reaching the beginning (scrolling backward)
    if (scrollPosition <= 20) {
      // Jump to the duplicate section (before the last set of posts)
      // setCurrentIndex(blogPosts.length * 2)
      if (carousel.current) {
        carousel.current.scrollLeft = blogPosts.length * 2 * width
      }
    }
  }

  // Mouse events for manual scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (carousel.current?.offsetLeft || 0))
    setScrollLeft(carousel.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (carousel.current?.offsetLeft || 0)
    const walk = (x - startX) * 2 // Scroll speed multiplier
    if (carousel.current) {
      carousel.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
    }
  }

  const nextSlide = () => {
    // setCurrentIndex((prev) => (prev + 1) % duplicatedPosts.length)
  }

  const prevSlide = () => {
    // setCurrentIndex((prev) => (prev - 1 + duplicatedPosts.length) % duplicatedPosts.length)
  }

  // Add this style to the component
  useEffect(() => {
    // Add CSS for smooth infinite carousel
    const style = document.createElement("style")
    style.textContent = `
.infinite-carousel {
  transition: transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
}
`
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Initialize carousel position to start at the first duplicate set
  useEffect(() => {
    // Ensure this runs after the component is fully mounted and width is calculated
    if (carousel.current && width > 0) {
      try {
        // Find the index of "The Importance of Web Design" post
        // const webDesignIndex = blogPosts.findIndex((post) => post.title === "The Importance of Web Design")

        // Default to the middle post if the target post isn't found
        // const targetIndex = webDesignIndex !== -1 ? webDesignIndex : Math.floor(blogPosts.length / 2)

        // Position the carousel with the target post in the center
        // const centerPosition = targetIndex * width
        // carousel.current.scrollLeft = centerPosition

        // Log success for debugging during deployment
        console.log("Blog carousel positioned successfully")
      } catch (error) {
        // Provide fallback behavior in case of errors
        console.error("Error positioning blog carousel:", error)
        if (carousel.current) {
          carousel.current.scrollLeft = 0
        }
      }
    }
  }, [blogPosts.length, width])

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <button
        // onClick={prevSlide}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md hover:bg-gold-50 transition-colors opacity-50"
        aria-label="Previous slide"
        disabled
      >
        <ArrowLeft className="h-5 w-5 text-gold-600" />
      </button>

      <button
        // onClick={nextSlide}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md hover:bg-gold-50 transition-colors opacity-50"
        aria-label="Next slide"
        disabled
      >
        <ArrowRight className="h-5 w-5 text-gold-600" />
      </button>

      {/* Container to limit visible articles to 3 */}
      <div className="mx-auto overflow-hidden" style={{ width: `${(350 + 32) * 3}px` }}>
        {/* Carousel container - now showing latest blogs */}
        <div ref={carousel} className="flex overflow-hidden scroll-smooth" style={{ cursor: "default" }}>
          <div className="flex gap-8 w-max">
            {/* Sort blog posts by date (newest first) and display them */}
            {[...blogPosts]
              .sort((a, b) => {
                // Parse dates and sort in descending order (newest first)
                const dateA = new Date(a.date)
                const dateB = new Date(b.date)
                return dateB - dateA
              })
              .map((post, index) => (
                <motion.div
                  key={`${post.id}-${index}`}
                  className="blog-card flex-shrink-0 w-[350px] bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index * 0.1) % 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-[16/9] overflow-hidden rounded-t-lg bg-gray-100">
                    {post.title === "The Importance of Web Design" ? (
                      <motion.div
                        className="w-full h-full bg-white p-4 flex flex-col"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="font-serif text-lg font-medium text-taupe-900 mb-2">
                          The Importance of Web Design
                        </h4>
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mr-2">
                            <User className="h-3 w-3 text-gold-600" />
                          </div>
                          <span className="text-xs text-taupe-600">Eva Salzman, Web Design Director</span>
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-xs text-taupe-700 line-clamp-4">
                            In today's digital-first economy, your website often serves as the primary touchpoint
                            between your brand and potential customers. This article examines the multifaceted impact of
                            professional web design on business outcomes, from establishing credibility and building
                            trust to enhancing user experience and driving conversions.
                          </p>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gold-100">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gold-600">March 31, 2025</span>
                            <span className="text-xs text-taupe-500">2 min read</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : post.title === "The Art of Timeless Brand Design" ? (
                      <motion.div
                        className="w-full h-full bg-white p-4 flex flex-col"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="font-serif text-lg font-medium text-taupe-900 mb-2">
                          The Art of Timeless Brand Design
                        </h4>
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mr-2">
                            <User className="h-3 w-3 text-gold-600" />
                          </div>
                          <span className="text-xs text-taupe-600">Eva Salzman, Brand Design Director</span>
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-xs text-taupe-700 line-clamp-4">
                            In the ever-evolving landscape of design trends, creating a brand identity that stands the
                            test of time requires a delicate balance between contemporary appeal and enduring
                            principles. This article explores the foundational elements of timeless brand design.
                          </p>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gold-100">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gold-600">April 2, 2025</span>
                            <span className="text-xs text-taupe-500">10 min read</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wqZU59TrsK3C7ulhbHRk7vRGPTGjyC.png"
                        alt={post.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7 }}
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-xs font-medium text-gold-600 mr-3">{post.category}</span>
                      <div className="flex items-center text-taupe-400 text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <h3 className="font-serif text-xl font-medium mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-taupe-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    {(post.title === "The Importance of Web Design" ||
                      post.title === "The Art of Timeless Brand Design") && (
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-gold-600 hover:text-gold-700 transition-colors"
                      >
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
      {/* View All Articles button */}
      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-block px-8 py-2 border border-gold-200 text-gold-600 hover:bg-gold-50 transition-all duration-300 rounded-md font-serif"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          View All Articles
        </Link>
      </div>
    </div>
  )
}

