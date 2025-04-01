"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, ArrowRight, Calendar, Search, ChevronDown, Clock, Eye, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MarbleBackground from "@/components/marble-background"
import { getAllViewCounts } from "@/app/actions/view-counter"

// Blog post data
const blogPosts = [
  {
    id: 4,
    title: "The Importance of Web Design",
    excerpt: "Why investing in professional web design is crucial for business success in the digital age.",
    content:
      "In today's digital-first economy, your website often serves as the primary touchpoint between your brand and potential customers. This article examines the multifaceted impact of professional web design on business outcomes, from establishing credibility and building trust to enhancing user experience and driving conversions. Discover why thoughtful design investments yield significant returns across all aspects of your digital presence.",
    category: "Web Design",
    date: "March 31, 2025",
    image: "/placeholder.svg?height=600&width=900",
    author: "Alessandro Santacroce",
    readTime: "2 min",
  },
  {
    id: 1,
    title: "The Art of Timeless Brand Design",
    excerpt: "Discover how to create brand identities that remain relevant and impactful for years to come.",
    content:
      "In the ever-evolving landscape of design trends, creating a brand identity that stands the test of time requires a delicate balance between contemporary appeal and enduring principles. This article explores the foundational elements of timeless brand design, from typography selection to color psychology, and provides practical strategies for developing visual identities that remain relevant and impactful for years to come.",
    category: "Brand Design",
    date: "March 15, 2025",
    image: "/placeholder.svg?height=600&width=900",
    author: "Alexandra Reynolds",
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "Leveraging AI in Modern Marketing Strategies",
    excerpt: "How artificial intelligence is transforming marketing and how businesses can harness its power.",
    content:
      "Artificial intelligence has revolutionized the marketing landscape, offering unprecedented opportunities for personalization, automation, and data analysis. This comprehensive guide examines how forward-thinking brands are implementing AI-driven solutions to enhance customer experiences, optimize campaign performance, and gain competitive advantages in increasingly crowded marketplaces.",
    category: "Digital Marketing",
    date: "March 8, 2025",
    image: "/placeholder.svg?height=600&width=900",
    author: "Marcus Chen",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "The Psychology of Color in Web Design",
    excerpt: "Understanding how color choices influence user perception and behavior on your website.",
    content:
      "Color is one of the most powerful tools in a web designer's arsenal, capable of influencing emotions, perceptions, and behaviors. This in-depth exploration examines the psychological impact of different color palettes, cultural considerations in color selection, and strategic approaches to creating color schemes that align with brand messaging while optimizing user engagement and conversion rates.",
    category: "Web Design",
    date: "February 28, 2025",
    image: "/placeholder.svg?height=600&width=900",
    author: "Sophia Williams",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Effortlessly Automating Tasks with AI",
    excerpt: "Practical ways to implement AI automation to save time and increase productivity in your business.",
    content:
      "Automation represents one of the most transformative applications of artificial intelligence for businesses of all sizes. This practical guide explores accessible AI-powered automation solutions that can streamline workflows, reduce manual tasks, and free up valuable human resources for more strategic initiatives. From customer service chatbots to content generation tools, discover how to implement AI automation effectively in your organization.",
    category: "Artificial Intelligence",
    date: "February 15, 2025",
    image: "/placeholder.svg?height=600&width=900",
    author: "Elena Rodriguez",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "Creating Effective Email Marketing Campaigns",
    excerpt: "Strategies and best practices for email marketing that drives engagement and conversions.",
    content:
      "Despite the proliferation of new marketing channels, email remains one of the most effective tools for nurturing customer relationships and driving conversions. This comprehensive guide covers everything from crafting compelling subject lines and designing visually appealing templates to segmentation strategies and performance analytics, providing a roadmap for creating email campaigns that resonate with modern audiences.",
    category: "Email Marketing",
    date: "February 5, 2025",
    image: "/placeholder.svg?height=600&width=900",
    author: "Michael Thompson",
    readTime: "6 min read",
  },
  {
    id: 7,
    title: "The Future of E-Commerce Design",
    excerpt: "Emerging trends and innovations shaping the next generation of online shopping experiences.",
    content:
      "The e-commerce landscape is evolving rapidly, driven by technological advancements and shifting consumer expectations. This forward-looking analysis examines emerging design trends that are redefining online shopping experiences, from immersive 3D product visualizations and augmented reality try-ons to voice commerce interfaces and hyper-personalized shopping journeys powered by artificial intelligence.",
    category: "E-Commerce",
    date: "January 28, 2025",
    image: "/placeholder.svg?height=600&width=900",
    author: "Olivia Chang",
    readTime: "7 min read",
  },
  {
    id: 8,
    title: "Mastering Social Media Content Strategy",
    excerpt: "How to develop a cohesive and effective content strategy across multiple social platforms.",
    content:
      "Creating a successful social media presence requires more than sporadic posting—it demands a thoughtful, strategic approach to content development and distribution. This article provides a framework for crafting a comprehensive social media content strategy that aligns with business objectives, resonates with target audiences, and maintains consistency while adapting to the unique requirements of different platforms.",
    category: "Social Media",
    date: "January 20, 2025",
    image: "/placeholder.svg?height=600&width=900",
    author: "David Wilson",
    readTime: "8 min read",
  },
]

// Categories for filtering
const categories = [
  "All Categories",
  "Brand Design",
  "Digital Marketing",
  "Web Design",
  "Artificial Intelligence",
  "Email Marketing",
  "E-Commerce",
  "Social Media",
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  const [viewCounts, setViewCounts] = useState<Record<number, number>>({})
  const postsPerPage = 6
  const headerRef = useRef<HTMLDivElement>(null)

  // Parallax scrolling effect
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.2])
  const headerScale = useTransform(scrollY, [0, 300], [1, 0.95])
  const headerY = useTransform(scrollY, [0, 300], [0, 50])

  // Filter posts based on category and search query
  useEffect(() => {
    let result = blogPosts

    // Filter by category
    if (selectedCategory !== "All Categories") {
      result = result.filter((post) => post.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query),
      )
    }

    setFilteredPosts(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [selectedCategory, searchQuery])

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  useEffect(() => {
    const fetchViewCounts = async () => {
      try {
        const counts = await getAllViewCounts()
        setViewCounts(counts)
      } catch (error) {
        console.error("Failed to fetch view counts:", error)
      }
    }

    fetchViewCounts()
  }, [])

  // Add this script to handle the scrolling behavior
  useEffect(() => {
    // Only run this effect if we're on the client side
    if (typeof window === "undefined") return

    const previewElement = document.getElementById("web-design-preview")
    if (!previewElement) return

    let scrollInterval: NodeJS.Timeout | null = null
    let isPaused = false
    let startY = 0
    let scrollStartPosition = 0

    // Auto-scroll animation
    const startScrolling = () => {
      if (scrollInterval) clearInterval(scrollInterval)

      scrollInterval = setInterval(() => {
        if (!previewElement || isPaused) return

        // Very slow scroll speed
        previewElement.scrollTop += 0.5

        // Reset to top when reaching bottom
        if (previewElement.scrollTop >= previewElement.scrollHeight - previewElement.clientHeight - 5) {
          // Smooth reset to top
          const resetAnimation = setInterval(() => {
            previewElement.scrollTop -= 5
            if (previewElement.scrollTop <= 0) {
              clearInterval(resetAnimation)
              previewElement.scrollTop = 0
            }
          }, 10)
        }
      }, 30)
    }

    // Start scrolling initially
    startScrolling()

    // Handle mouse/touch interactions
    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      isPaused = true

      if (e instanceof MouseEvent) {
        startY = e.clientY
      } else {
        startY = e.touches[0].clientY
      }

      scrollStartPosition = previewElement.scrollTop

      if (scrollInterval) {
        clearInterval(scrollInterval)
        scrollInterval = null
      }
    }

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isPaused) return

      let currentY
      if (e instanceof MouseEvent) {
        currentY = e.clientY
      } else {
        currentY = e.touches[0].clientY
        // Prevent page scrolling while interacting with the preview
        e.preventDefault()
      }

      const deltaY = currentY - startY
      const newScrollPosition = scrollStartPosition - deltaY * 1.5

      previewElement.scrollTop = Math.max(
        0,
        Math.min(newScrollPosition, previewElement.scrollHeight - previewElement.clientHeight),
      )
    }

    const handleMouseUp = () => {
      isPaused = false

      // Resume auto-scroll after 1 second
      setTimeout(() => {
        if (!isPaused) {
          startScrolling()
        }
      }, 1000)
    }

    // Add event listeners to the preview element
    previewElement.addEventListener("mousedown", handleMouseDown as EventListener)
    document.addEventListener("mousemove", handleMouseMove as EventListener)
    document.addEventListener("mouseup", handleMouseUp)

    // Touch events for mobile
    previewElement.addEventListener("touchstart", handleMouseDown as EventListener)
    document.addEventListener("touchmove", handleMouseMove as EventListener, { passive: false })
    document.addEventListener("touchend", handleMouseUp)

    // Clean up
    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval)
      }

      previewElement.removeEventListener("mousedown", handleMouseDown as EventListener)
      document.removeEventListener("mousemove", handleMouseMove as EventListener)
      document.removeEventListener("mouseup", handleMouseUp)

      previewElement.removeEventListener("touchstart", handleMouseDown as EventListener)
      document.removeEventListener("touchmove", handleMouseMove as EventListener)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [])

  return (
    <div className="min-h-screen bg-taupe-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="fixed -top-40 -right-40 w-80 h-80 rounded-full bg-gold-200 opacity-10 blur-3xl"></div>
      <div className="fixed -bottom-40 -left-40 w-80 h-80 rounded-full bg-gold-200 opacity-10 blur-3xl"></div>

      {/* Hero Section */}
      <motion.section
        ref={headerRef}
        className="relative py-32 overflow-hidden"
        style={{
          opacity: headerOpacity,
          scale: headerScale,
          y: headerY,
        }}
      >
        <MarbleBackground variant="light" opacity={0.1} />
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full border-2 border-gold-200 opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full border-2 border-gold-200 opacity-20"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-20 left-8 z-50"
        >
          <Link
            href="/"
            className="inline-flex items-center text-[#e6d19f] bg-transparent hover:bg-gold-50/10 px-5 py-1.5 rounded-md shadow-sm border border-[#e6d19f] transition-all duration-300 hover:shadow-md font-serif scale-90"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Return to Home
          </Link>
        </motion.div>

        <div className="container mx-auto px-4 relative pt-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mx-auto mb-4 flex max-w-xs justify-center">
              <div className="h-[1px] w-16 self-center bg-gold-600"></div>
              <p className="mx-4 font-serif text-sm uppercase tracking-widest text-gold-700">Our Insights</p>
              <div className="h-[1px] w-16 self-center bg-gold-600"></div>
            </div>

            <motion.h1
              className="font-serif text-4xl font-light tracking-wide text-taupe-900 md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              The <span className="text-gold-600 font-normal">Auctus Apex</span> Journal
            </motion.h1>

            <div className="mx-auto mt-2 h-px w-24 bg-gold-600 opacity-30"></div>

            <motion.p
              className="mx-auto mt-8 max-w-3xl font-light leading-relaxed tracking-wide text-taupe-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Explore our collection of articles and insights on marketing, design, and business growth.
              <span className="italic"> Curated by our team of experts to help elevate your brand.</span>
            </motion.p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            className="mt-12 mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 border-gold-200 focus:border-gold-400 focus:ring-gold-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex w-full items-center justify-between rounded-md border border-gold-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 md:w-[200px]"
                >
                  {selectedCategory}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 mt-1 w-full rounded-md border border-gold-200 bg-white shadow-lg"
                    >
                      <ul className="max-h-60 overflow-auto py-1">
                        {categories.map((category) => (
                          <motion.li
                            key={category}
                            whileHover={{ backgroundColor: "rgba(230, 209, 159, 0.2)" }}
                            className={`cursor-pointer px-4 py-2 transition-colors ${
                              category === selectedCategory ? "bg-gold-100 text-gold-700" : ""
                            }`}
                            onClick={() => {
                              setSelectedCategory(category)
                              setIsFilterOpen(false)
                            }}
                          >
                            {category}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Posts Grid */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-[url('/marble-texture-light.png')] bg-repeat opacity-5 bg-[length:600px]"></div>
        <div className="container mx-auto px-4 relative">
          {filteredPosts.length > 0 ? (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {currentPosts.map((post, index) => {
                  const viewCount = viewCounts[post.id] || 0
                  const isWebDesignArticle = post.id === 4

                  return (
                    <motion.div
                      key={post.id}
                      variants={itemVariants}
                      whileHover={isWebDesignArticle ? { y: -10, transition: { duration: 0.3 } } : {}}
                      className={`group bg-white rounded-lg shadow-sm ${isWebDesignArticle ? "hover:shadow-xl" : ""} transition-all duration-500 relative overflow-hidden`}
                      onHoverStart={() => (isWebDesignArticle ? setHoveredPost(post.id) : null)}
                      onHoverEnd={() => (isWebDesignArticle ? setHoveredPost(null) : null)}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-gold-200/0 to-gold-300/10 opacity-0 ${isWebDesignArticle ? "group-hover:opacity-100" : ""} transition-opacity duration-500`}
                      ></div>
                      <div
                        className={`absolute -top-4 -left-4 h-20 w-20 border-t border-l border-gold-300 opacity-0 ${isWebDesignArticle ? "group-hover:opacity-40" : ""} transition-opacity duration-300`}
                      ></div>

                      <div className="aspect-[16/9] overflow-hidden rounded-t-lg bg-gray-100">
                        {isWebDesignArticle ? (
                          <div
                            id="web-design-preview"
                            className="w-full h-full overflow-y-auto bg-white p-4 text-sm text-taupe-700 scrollbar-hide"
                            style={{ maxHeight: "300px" }}
                          >
                            <h3 className="font-serif text-lg font-medium text-taupe-900 mb-2">
                              The Importance of Web Design
                            </h3>
                            <p className="mb-3">
                              In today's digital-first economy, your website often serves as the primary touchpoint
                              between your brand and potential customers. This article examines the multifaceted impact
                              of professional web design on business outcomes.
                            </p>
                            <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">
                              First Impressions Matter
                            </h4>
                            <p className="mb-3">
                              Research shows that it takes about 50 milliseconds (0.05 seconds) for users to form an
                              opinion about your website. This snap judgment determines whether they'll stay or leave.
                              Professional web design ensures that this crucial first impression is positive.
                            </p>
                            <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">
                              Building Trust and Credibility
                            </h4>
                            <p className="mb-3">
                              Trust is the foundation of any successful business relationship. Your website design plays
                              a pivotal role in establishing this trust with potential customers who have never
                              interacted with your brand before.
                            </p>
                            <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">
                              Enhancing User Experience
                            </h4>
                            <p className="mb-3">
                              User experience (UX) encompasses all aspects of how people interact with your website.
                              Good web design prioritizes the user journey, making it intuitive, efficient, and
                              enjoyable.
                            </p>
                            <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">
                              Supporting SEO Efforts
                            </h4>
                            <p className="mb-3">
                              Web design and search engine optimization (SEO) are deeply interconnected. Many design
                              elements directly impact how well your site performs in search engine rankings.
                            </p>
                            <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">Driving Conversions</h4>
                            <p>
                              Ultimately, most business websites exist to drive some form of conversion—whether that's
                              generating leads, making sales, or encouraging sign-ups. Effective web design
                              strategically guides visitors toward these conversion points.
                            </p>
                          </div>
                        ) : (
                          <motion.img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7XOfbLOHPeYnHThcJWkfWwSF9Fmm0T.png"
                            alt="Coming Soon"
                            className="w-full h-full object-cover"
                            transition={{ duration: 0.7 }}
                          />
                        )}
                      </div>

                      <div className="p-6 relative">
                        <div className="flex items-center justify-between mb-3">
                          <motion.span
                            className="text-xs font-medium text-gold-600 px-2 py-1 rounded-full bg-gold-50 border border-gold-100"
                            whileHover={isWebDesignArticle ? { scale: 1.05 } : {}}
                          >
                            {post.category}
                          </motion.span>
                          {isWebDesignArticle ? (
                            <div className="flex items-center text-taupe-400 text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              March 31, 2025
                            </div>
                          ) : null}
                        </div>

                        <h3
                          className={`font-serif text-xl font-medium mb-2 ${isWebDesignArticle ? "group-hover:text-gold-600" : ""} transition-colors`}
                        >
                          {post.title}
                        </h3>

                        <p className="text-taupe-600 mb-4">{post.excerpt}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-taupe-500">
                            {isWebDesignArticle ? (
                              <>
                                <Clock className="h-3 w-3 mr-1" />
                                <span className="mr-3">2 min</span>
                                <Eye className="h-3 w-3 mr-1" />
                                <span>{viewCount.toLocaleString()}</span>
                              </>
                            ) : null}
                          </div>

                          {isWebDesignArticle && (
                            <Link
                              href={`/blog/${post.id}`}
                              className="inline-flex items-center text-gold-600 hover:text-gold-700 transition-colors"
                            >
                              <span className="mr-1">Read</span>
                              <motion.div
                                animate={{ x: hoveredPost === post.id ? 5 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ArrowRight className="h-4 w-4" />
                              </motion.div>
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  className="mt-16 flex justify-center"
                  variants={fadeInVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <nav className="flex items-center space-x-2">
                    <motion.button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="rounded-md border border-gold-200 bg-white p-2 text-taupe-700 disabled:opacity-50"
                      whileHover={{ backgroundColor: "rgba(230, 209, 159, 0.2)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </motion.button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <motion.button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`rounded-md px-4 py-2 ${
                          currentPage === number
                            ? "bg-gold-600 text-white"
                            : "border border-gold-200 bg-white text-taupe-700 hover:bg-gold-50"
                        }`}
                        whileHover={currentPage !== number ? { backgroundColor: "rgba(230, 209, 159, 0.2)" } : {}}
                        whileTap={{ scale: 0.95 }}
                      >
                        {number}
                      </motion.button>
                    ))}

                    <motion.button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-md border border-gold-200 bg-white p-2 text-taupe-700 disabled:opacity-50"
                      whileHover={{ backgroundColor: "rgba(230, 209, 159, 0.2)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </nav>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <p className="text-xl text-taupe-700">No articles found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All Categories")
                }}
                className="mt-4 bg-gold-600 text-white hover:bg-gold-700"
              >
                Reset Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="py-20 bg-taupe-100 relative overflow-hidden">
        <MarbleBackground variant="medium" opacity={0.08} />
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-taupe-50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-taupe-50 to-transparent"></div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="mx-auto mb-4 flex max-w-xs justify-center">
              <div className="h-[1px] w-16 self-center bg-gold-600"></div>
              <p className="mx-4 font-serif text-sm uppercase tracking-widest text-gold-700">Featured Article</p>
              <div className="h-[1px] w-16 self-center bg-gold-600"></div>
            </div>

            <h2 className="font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl">
              Editor's <span className="text-gold-600 font-normal">Selection</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="relative overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -top-4 -left-4 h-20 w-20 border-t border-l border-gold-300 opacity-40"></div>
              <div
                id="web-design-preview"
                className="w-full h-full overflow-y-auto bg-white p-4 text-sm text-taupe-700 scrollbar-hide"
                style={{ maxHeight: "300px" }}
              >
                <h3 className="font-serif text-lg font-medium text-taupe-900 mb-2">The Importance of Web Design</h3>
                <p className="mb-3">
                  In today's digital-first economy, your website often serves as the primary touchpoint between your
                  brand and potential customers. This article examines the multifaceted impact of professional web
                  design on business outcomes.
                </p>
                <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">First Impressions Matter</h4>
                <p className="mb-3">
                  Research shows that it takes about 50 milliseconds (0.05 seconds) for users to form an opinion about
                  your website. This snap judgment determines whether they'll stay or leave. Professional web design
                  ensures that this crucial first impression is positive.
                </p>
                <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">Building Trust and Credibility</h4>
                <p className="mb-3">
                  Trust is the foundation of any successful business relationship. Your website design plays a pivotal
                  role in establishing this trust with potential customers who have never interacted with your brand
                  before.
                </p>
                <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">Enhancing User Experience</h4>
                <p className="mb-3">
                  User experience (UX) encompasses all aspects of how people interact with your website. Good web design
                  prioritizes the user journey, making it intuitive, efficient, and enjoyable.
                </p>
                <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">Supporting SEO Efforts</h4>
                <p className="mb-3">
                  Web design and search engine optimization (SEO) are deeply interconnected. Many design elements
                  directly impact how well your site performs in search engine rankings.
                </p>
                <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">Driving Conversions</h4>
                <p>
                  Ultimately, most business websites exist to drive some form of conversion—whether that's generating
                  leads, making sales, or encouraging sign-ups. Effective web design strategically guides visitors
                  toward these conversion points.
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none"></div>
              <div
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
                style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.8)" }}
              >
                <div className="flex items-center mb-2">
                  <span className="text-xs font-medium text-gold-300 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                    Web Design
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-medium mb-2">The Importance of Web Design</h3>
                <p className="text-gray-200 mb-4 line-clamp-2">
                  Why investing in professional web design is crucial for business success in the digital age. Discover
                  how thoughtful design investments yield significant returns across all aspects of your digital
                  presence.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-300">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="mr-3">2 min read</span>
                    <Eye className="h-3 w-3 mr-1" />
                    <span>342</span>
                  </div>
                  <Link
                    href="/blog/4"
                    className="inline-flex items-center text-gold-300 hover:text-gold-200 transition-colors"
                  >
                    <span className="mr-1">Read Article</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="font-serif text-2xl font-medium mb-2 text-taupe-900">Why We Selected This</h3>
                <p className="text-taupe-700">
                  This comprehensive exploration of luxury branding exemplifies our commitment to timeless design
                  principles while embracing digital innovation. The article offers valuable insights for brands seeking
                  to maintain their heritage while evolving in the digital landscape.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center space-x-4 mt-6"
              >
                <div className="h-12 w-12 rounded-full bg-gold-100 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-gold-600" />
                </div>
                <div>
                  <p className="font-serif text-lg font-medium text-taupe-900">Key Takeaways</p>
                  <p className="text-taupe-700 text-sm">Balancing tradition with innovation in luxury branding</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Button asChild className="mt-4 bg-gold-600 text-white hover:bg-gold-700">
                  <Link href="/blog/featured">Read Full Article</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/marble-texture-light.png')] bg-repeat opacity-5 bg-[length:600px]"></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex max-w-xs justify-center">
              <div className="h-[1px] w-16 self-center bg-gold-600"></div>
              <p className="mx-4 font-serif text-sm uppercase tracking-widest text-gold-700">Stay Updated</p>
              <div className="h-[1px] w-16 self-center bg-gold-600"></div>
            </div>

            <h2 className="font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl">
              Subscribe to Our <span className="text-gold-600 font-normal">Newsletter</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-taupe-700">
              Receive our latest articles, insights, and exclusive content directly in your inbox.
            </p>

            <motion.div
              className="mx-auto mt-8 flex max-w-md flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Input
                type="email"
                placeholder="Your email address"
                className="w-full border-gold-200 focus:border-gold-400 focus:ring-gold-400"
              />
              <Button
                className="w-full sm:w-auto bg-gold-600 text-white hover:bg-gold-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="bg-gradient-to-r from-gold-700 to-gold-500 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/marble-texture-dark.png')] opacity-10 bg-repeat bg-[length:400px]"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gold-300/30"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gold-300/30"></div>

        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-light tracking-wide md:text-4xl">
              Return to Our <span className="font-medium">Homepage</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gold-50">
              Explore more of our services and discover how we can help elevate your brand.
            </p>

            <p className="mx-auto mt-2 font-serif text-sm italic text-gold-100">
              "Ad astra per aspera" — To the stars through difficulties
            </p>

            <motion.div className="mt-8 inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-200/30 via-white/80 to-gold-200/30 rounded-lg blur-sm"></div>
                <Button asChild size="lg" className="relative bg-white text-gold-700 hover:bg-taupe-50">
                  <Link href="/">Return to Homepage</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

