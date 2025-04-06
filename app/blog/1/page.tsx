"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, User, Share2, PenTool, Layout, Palette, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MarbleBackground from "@/components/marble-background"

// Import the ViewTracker component
import ViewTracker from "@/components/view-tracker"

export default function TimelessBrandDesignArticlePage() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = (currentScroll / totalScroll) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-taupe-50">
      {/* Add the ViewTracker component */}
      <ViewTracker articleId={1} />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 z-50 h-1 bg-gold-600" style={{ width: `${scrollProgress}%` }} />

      {/* Article content */}
      <div className="container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-20 left-8 z-50"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-[#e6d19f] bg-transparent hover:bg-gold-50/10 px-5 py-1.5 rounded-md shadow-sm border border-[#e6d19f] transition-all duration-300 hover:shadow-md font-serif scale-90"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Blog
          </Link>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 flex items-center space-x-4">
              <span className="rounded-full bg-gold-100 px-3 py-1 text-sm font-medium text-gold-700">Brand Design</span>
              <div className="flex items-center text-taupe-500 text-sm">
                <Calendar className="mr-1 h-4 w-4" />
                April 2, 2025
              </div>
              <div className="flex items-center text-taupe-500 text-sm">
                <Clock className="mr-1 h-4 w-4" />
                10 min read
              </div>
            </div>

            <h1 className="font-serif text-4xl font-bold text-taupe-900 md:text-5xl">
              The Art of Timeless Brand Design
            </h1>

            <div className="mt-6 flex items-center space-x-4">
              <div className="flex items-center">
                <div className="mr-2 h-10 w-10 rounded-full bg-gold-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gold-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-taupe-900">Eva Salzman</p>
                  <p className="text-xs text-taupe-500">Brand Design Director</p>
                </div>
              </div>

              <Button variant="outline" size="sm" className="ml-auto border-gold-200 text-gold-700 hover:bg-gold-50">
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-10 aspect-video overflow-hidden rounded-lg"
          >
            <div className="absolute -top-4 -left-4 h-20 w-20 border-t border-l border-gold-300 opacity-40"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-gold-50 to-gold-100 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative w-4/5 h-4/5"
                >
                  {/* Brand design illustration with animated elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden">
                      <div className="p-8 flex flex-col items-center">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          className="mb-6"
                        >
                          <div className="h-24 w-24 bg-gold-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <div className="h-16 w-16 bg-white rounded-full"></div>
                          </div>
                          <div className="h-6 w-48 bg-gold-200 rounded-md mx-auto"></div>
                        </motion.div>

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1 }}
                          className="w-full flex space-x-4 mb-6"
                        >
                          <div className="h-8 w-1/3 bg-gold-100 rounded-md"></div>
                          <div className="h-8 w-1/3 bg-gold-100 rounded-md"></div>
                          <div className="h-8 w-1/3 bg-gold-100 rounded-md"></div>
                        </motion.div>

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.2 }}
                          className="w-full space-y-3"
                        >
                          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                          <div className="h-4 w-2/3 bg-gray-200 rounded-md"></div>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      y: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                    }}
                    className="absolute -top-10 -right-10 w-20 h-20 text-gold-300 opacity-30"
                  >
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path
                        d="M45.2,-57.8C59.6,-46.3,73,-32.7,79.2,-15.9C85.4,0.9,84.4,20.8,75.6,36.5C66.8,52.2,50.2,63.7,32.5,70.3C14.8,76.9,-4,78.5,-22.2,73.2C-40.4,67.9,-58,55.7,-68.9,39.1C-79.8,22.5,-84,1.5,-79.4,-17.1C-74.8,-35.7,-61.4,-51.9,-45.8,-63.2C-30.2,-74.5,-12.4,-80.9,2.4,-83.9C17.2,-86.9,30.8,-69.3,45.2,-57.8Z"
                        transform="translate(100 100)"
                      />
                    </svg>
                  </motion.div>

                  <motion.div
                    animate={{
                      rotate: [0, -360],
                      x: [0, 5, 0],
                    }}
                    transition={{
                      rotate: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      x: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                    }}
                    className="absolute -bottom-5 -left-5 w-16 h-16 text-gold-400 opacity-20"
                  >
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path
                        d="M47.7,-51.2C59.5,-41.7,65.8,-24.3,68.9,-5.8C72,12.7,71.8,32.3,62.3,44.7C52.7,57.1,33.8,62.3,15.4,65.9C-3,69.5,-20.9,71.5,-35.6,64.5C-50.3,57.5,-61.8,41.5,-67.4,23.7C-73,5.9,-72.7,-13.7,-64.2,-28.5C-55.7,-43.3,-39,-53.3,-22.9,-61.2C-6.8,-69.1,9.7,-74.9,24.2,-70.4C38.7,-65.9,35.9,-60.7,47.7,-51.2Z"
                        transform="translate(100 100)"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="prose prose-lg mx-auto mt-10 max-w-none prose-headings:font-serif prose-headings:text-taupe-900 prose-headings:font-bold prose-p:text-taupe-700 prose-a:text-gold-600 prose-a:no-underline hover:prose-a:text-gold-700"
          >
            <div className="relative">
              {/* Decorative elements for the article */}
              <div className="absolute -left-16 top-10 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-gold-300 opacity-30"
                >
                  <PenTool className="h-10 w-10" />
                </motion.div>
              </div>

              <div className="absolute -right-16 top-40 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="text-gold-300 opacity-30"
                >
                  <Layout className="h-10 w-10" />
                </motion.div>
              </div>

              <div className="absolute -left-16 top-80 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="text-gold-300 opacity-30"
                >
                  <Palette className="h-10 w-10" />
                </motion.div>
              </div>
            </div>
            <p className="lead text-xl">
              In the ever-evolving landscape of design trends, creating a brand identity that stands the test of time
              requires a delicate balance between contemporary appeal and enduring principles. This article explores the
              foundational elements of timeless brand design, from typography selection to color psychology, and
              provides practical strategies for developing visual identities that remain relevant and impactful for
              years to come.
            </p>

            <h2>The Paradox of Timelessness</h2>
            <p>
              The concept of "timeless design" presents an inherent paradox: how can something remain relevant across
              changing eras, technologies, and cultural contexts? The answer lies not in avoiding change altogether, but
              in understanding which elements should evolve and which should remain constant. Truly timeless brand
              identities are built on foundational principles that transcend trends while allowing for thoughtful
              evolution.
            </p>
            <p>
              Consider iconic brands like Coca-Cola, whose logo has undergone subtle refinements over decades while
              maintaining its essential character, or Apple, whose minimalist approach has allowed its identity to feel
              contemporary across multiple technological eras. These brands demonstrate that timelessness isn't about
              rigidity—it's about establishing core visual principles with sufficient flexibility to adapt without
              losing recognition or relevance.
            </p>

            <h2>Foundational Elements of Timeless Brand Design</h2>
            <p>Creating a brand identity with staying power requires careful attention to several key elements:</p>

            <h3>1. Simplicity and Clarity</h3>
            <p>
              Perhaps the most fundamental principle of timeless design is simplicity. Complex designs with numerous
              elements tend to date quickly and become visually cluttered. In contrast, simple designs focus on
              essential elements, making them more adaptable across different media and contexts. This doesn't mean
              minimalism is the only approach—rather, it suggests that every element should serve a clear purpose.
            </p>
            <p>
              Consider the logos of Mercedes-Benz, Nike, or FedEx. Each achieves remarkable recognition through simple
              forms that communicate the brand's essence without unnecessary embellishment. Their clarity ensures they
              work effectively across applications from tiny mobile icons to massive billboards, a versatility that has
              contributed to their longevity.
            </p>

            <h3>2. Thoughtful Typography</h3>
            <p>
              Typography forms the backbone of brand communication, and choosing the right typefaces is crucial for
              creating a timeless identity. While display fonts with distinctive personalities can be tempting, they
              often become dated as typographic trends evolve. Instead, consider these approaches:
            </p>
            <ul>
              <li>Select classic typefaces with proven longevity (Helvetica, Garamond, Futura)</li>
              <li>Opt for custom typography that embodies your brand's unique character</li>
              <li>Create a typographic system with sufficient variety to handle different communication needs</li>
              <li>Ensure excellent readability across all applications and sizes</li>
            </ul>
            <p>
              The New York Times, for example, has maintained typographic consistency through decades of publishing,
              with its nameplate becoming an instantly recognizable symbol of journalistic authority. Even as the
              publication has evolved for digital platforms, its typographic foundation provides continuity and
              recognition.
            </p>

            <h3>3. Strategic Color Selection</h3>
            <p>
              Color trends come and go with remarkable speed, making color selection particularly challenging for
              timeless brand design. Rather than chasing trending palettes, consider these approaches:
            </p>
            <ul>
              <li>
                Build your primary palette around colors with psychological associations that align with your brand
                values
              </li>
              <li>Consider colors with historical significance or cultural meaning relevant to your industry</li>
              <li>Develop a flexible secondary palette that can evolve while maintaining core brand recognition</li>
              <li>Ensure your primary colors work in both digital and physical applications</li>
            </ul>
            <p>
              Tiffany & Co.'s signature blue has remained consistent since the 1840s, becoming so distinctive that the
              color itself evokes the brand. Similarly, Coca-Cola's red has maintained remarkable consistency while
              allowing for seasonal variations and special campaigns that extend the core palette.
            </p>

            <h3>4. Meaningful Symbolism</h3>
            <p>
              Symbols and iconography can transcend language barriers and communicate complex ideas instantly. The most
              enduring brand symbols connect to universal concepts or tell stories that remain relevant across
              generations. When developing symbolic elements:
            </p>
            <ul>
              <li>Draw inspiration from archetypal forms with enduring cultural significance</li>
              <li>Consider symbols that communicate your brand's core purpose or values</li>
              <li>Test symbols for cultural sensitivity across global markets</li>
              <li>Ensure symbols work at various scales and in monochrome applications</li>
            </ul>
            <p>
              The Apple logo, for instance, connects to biblical and scientific narratives about knowledge, while
              Shell's seashell has evolved from a realistic illustration to a simplified icon while maintaining its
              essential form and recognition.
            </p>

            <h2>Balancing Timelessness with Contemporary Relevance</h2>
            <p>
              While timelessness is desirable, brands must also feel current and connected to contemporary culture. This
              balance can be achieved through a strategic approach to brand architecture:
            </p>

            <h3>1. Create a Tiered System</h3>
            <p>Develop a hierarchy of brand elements with varying degrees of permanence:</p>
            <ul>
              <li>
                <strong>Core elements:</strong> Logo, primary colors, and key typography that remain highly consistent
              </li>
              <li>
                <strong>Flexible elements:</strong> Secondary palettes, supporting imagery, and graphic devices that can
                evolve more frequently
              </li>
              <li>
                <strong>Campaign elements:</strong> Temporary visual language that can follow trends while maintaining
                connection to core elements
              </li>
            </ul>

            <h3>2. Establish Clear Guidelines</h3>
            <p>
              Comprehensive brand guidelines should articulate not just how elements are used, but why they exist and
              what they communicate. This deeper understanding helps maintain consistency of meaning even as visual
              applications evolve. Guidelines should:
            </p>
            <ul>
              <li>Document the strategic intent behind each brand element</li>
              <li>Provide clear rules for consistent application</li>
              <li>Include flexibility parameters that define acceptable variations</li>
              <li>Establish governance processes for evaluating potential changes</li>
            </ul>

            <h3>3. Plan for Evolution</h3>
            <p>
              Even the most timeless brands undergo periodic refreshes. Rather than reactive redesigns when a brand
              feels dated, establish a proactive approach to evolution:
            </p>
            <ul>
              <li>Schedule regular brand audits to assess continued relevance</li>
              <li>Document the history of your brand's visual evolution</li>
              <li>Identify elements that should remain constant versus those that can evolve</li>
              <li>Consider how technological changes might impact your brand expression</li>
            </ul>

            <h2>Case Study: The Evolution of IBM</h2>
            <p>
              IBM provides an excellent example of balancing consistency with evolution. The company's logo has
              undergone just three major redesigns since 1924, with Paul Rand's 1972 striped version remaining
              essentially unchanged for over 50 years. This core stability has allowed the broader brand system to
              evolve dramatically—from mainframe computers to artificial intelligence—while maintaining recognition and
              trust.
            </p>
            <p>The company's approach demonstrates several key principles:</p>
            <ul>
              <li>
                <strong>Meaningful simplification:</strong> Each logo evolution reduced complexity while preserving
                recognition
              </li>
              <li>
                <strong>Strategic timing:</strong> Major identity shifts aligned with fundamental business
                transformations
              </li>
              <li>
                <strong>Flexible expression:</strong> The striped logo concept allowed for creative variations while
                maintaining core recognition
              </li>
              <li>
                <strong>Consistent values:</strong> Despite visual evolution, the brand has maintained consistent
                positioning around innovation and problem-solving
              </li>
            </ul>

            <h2>Practical Strategies for Designers</h2>
            <p>For designers tasked with creating timeless brand identities, consider these practical approaches:</p>

            <h3>1. Research Historical Context</h3>
            <p>Before beginning design work, thoroughly research:</p>
            <ul>
              <li>The history of your client's industry and visual conventions</li>
              <li>Previous iterations of the brand (if applicable)</li>
              <li>Competitive landscape across time, not just current competitors</li>
              <li>Design movements and their lasting influence</li>
            </ul>
            <p>This historical perspective helps identify truly enduring principles versus temporary trends.</p>

            <h3>2. Focus on Strategy Before Aesthetics</h3>
            <p>Timeless design emerges from deep strategic thinking:</p>
            <ul>
              <li>Clearly articulate brand positioning and values before exploring visual directions</li>
              <li>Identify the essential ideas the brand must communicate</li>
              <li>Consider how these ideas might be expressed across different eras and contexts</li>
              <li>Test concepts against various future scenarios</li>
            </ul>

            <h3>3. Embrace Constraints</h3>
            <p>Paradoxically, imposing constraints often leads to more timeless solutions:</p>
            <ul>
              <li>Test designs in monochrome before adding color</li>
              <li>Ensure concepts work at minimum viable sizes</li>
              <li>Validate designs across diverse applications and contexts</li>
              <li>Consider how designs perform under technical limitations</li>
            </ul>
            <p>
              These constraints force focus on fundamental forms and relationships rather than trendy effects or
              technologies.
            </p>

            <h3>4. Test Across Time</h3>
            <p>While you can't literally test designs in the future, you can:</p>
            <ul>
              <li>Apply artificial aging techniques to see how designs might weather over time</li>
              <li>Place concepts alongside historical designs from different eras</li>
              <li>Remove contemporary context to evaluate fundamental strength</li>
              <li>Gather feedback from diverse age groups to identify generational biases</li>
            </ul>

            <h2>Conclusion: The Paradoxical Nature of Timeless Design</h2>
            <p>Creating truly timeless brand identities requires embracing several paradoxes:</p>
            <ul>
              <li>Designs must be both distinctive enough to be memorable and simple enough to be adaptable</li>
              <li>Identities need both consistency for recognition and flexibility for evolution</li>
              <li>Brands must honor their heritage while remaining relevant to contemporary audiences</li>
              <li>Visual systems should feel both familiar and fresh simultaneously</li>
            </ul>
            <p>
              By understanding these tensions and approaching them strategically, designers can create brand identities
              that transcend trends and maintain their power and relevance for decades to come. In a world of constant
              change, this ability to create enduring visual expressions of brand meaning is perhaps the highest
              achievement in design.
            </p>
            <p>
              Remember that timelessness isn't achieved through a formula or style—it emerges from a deep understanding
              of brand purpose, human psychology, and visual communication principles. By focusing on these fundamentals
              rather than fleeting trends, designers can create brand identities that truly stand the test of time.
            </p>
          </motion.div>

          <div className="mt-16 border-t border-gold-200 pt-8">
            <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="border-gold-200 text-gold-700 hover:bg-gold-50">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share Article
                </Button>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center text-gold-600 hover:text-gold-700 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Articles
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related articles section */}
      <section className="bg-taupe-100 py-20 relative">
        <MarbleBackground variant="medium" opacity={0.08} />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-light tracking-wide text-taupe-900">
              Related <span className="text-gold-600 font-normal">Articles</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-24 bg-gold-600 opacity-30"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Leveraging AI in Modern Marketing Strategies",
                excerpt:
                  "How artificial intelligence is transforming marketing and how businesses can harness its power.",
                category: "Digital Marketing",
                date: "March 8, 2025",
                image: "/placeholder.svg?height=400&width=600",
                id: 2,
              },
              {
                title: "The Importance of Web Design",
                excerpt: "Why investing in professional web design is crucial for business success in the digital age.",
                category: "Web Design",
                date: "March 31, 2025",
                image: "/placeholder.svg?height=400&width=600",
                id: 4,
                content:
                  "In today's digital-first economy, your website often serves as the primary touchpoint between your brand and potential customers. This article examines the multifaceted impact of professional web design on business outcomes.",
                sections: ["First Impressions Matter", "Building Trust and Credibility", "Enhancing User Experience"],
              },
              {
                title: "Creating Effective Email Marketing Campaigns",
                excerpt: "Strategies and best practices for email marketing that drives engagement and conversions.",
                category: "Email Marketing",
                date: "February 5, 2025",
                image: "/placeholder.svg?height=400&width=600",
                id: 6,
              },
            ].map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-t-lg bg-gray-100">
                  {post.id === 4 ? (
                    <div
                      className="w-full h-full overflow-y-auto bg-white p-4 text-sm text-taupe-700 scrollbar-hide"
                      style={{ maxHeight: "300px" }}
                    >
                      <h3 className="font-serif text-lg font-medium text-taupe-900 mb-2">{post.title}</h3>
                      <p className="mb-3">{post.content}</p>
                      {post.sections &&
                        post.sections.map((section, idx) => (
                          <div key={idx}>
                            <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">{section}</h4>
                            <p className="mb-3">
                              {section === "First Impressions Matter" &&
                                "Research shows that it takes about 50 milliseconds (0.05 seconds) for users to form an opinion about your website. This snap judgment determines whether they'll stay or leave."}
                              {section === "Building Trust and Credibility" &&
                                "Trust is the foundation of any successful business relationship. Your website design plays a pivotal role in establishing this trust with potential customers."}
                              {section === "Enhancing User Experience" &&
                                "User experience (UX) encompasses all aspects of how people interact with your website. Good web design prioritizes the user journey, making it intuitive and efficient."}
                            </p>
                          </div>
                        ))}
                      <div className="mt-2 pt-2 border-t border-gold-100">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-taupe-500">2 min read</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <motion.img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xvmpp9wppYy7i0DMEfInI85ReHavuC.png"
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                    />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium text-gold-600 px-2 py-1 rounded-full bg-gold-50 border border-gold-100">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium mb-2 group-hover:text-gold-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-taupe-600 mb-4">{post.excerpt}</p>

                  {post.id === 4 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-taupe-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>2 min</span>
                      </div>
                      <Link
                        href="/blog/4"
                        className="inline-flex items-center text-gold-600 hover:text-gold-700 transition-colors"
                      >
                        <span className="mr-1">Read</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gold-700 to-gold-500 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-light tracking-wide md:text-4xl">
              Ready to Elevate Your <span className="font-medium">Brand Identity</span>?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gold-50">
              Our team of expert designers can help you create a timeless brand identity that resonates with your
              audience and stands the test of time.
            </p>

            <Button asChild size="lg" className="mt-8 bg-white text-gold-700 hover:bg-taupe-50">
              <Link href="/book">Book a Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

