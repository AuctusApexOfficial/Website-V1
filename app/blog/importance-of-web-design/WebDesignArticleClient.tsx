"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, User, Share2, PenTool, Layout, Palette, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MarbleBackground from "@/components/marble-background"

// Import the ViewTracker component at the top of the file
import ViewTracker from "@/components/view-tracker"

export default function WebDesignArticleClient() {
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
      <ViewTracker articleId={4} />

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
              <span className="rounded-full bg-gold-100 px-3 py-1 text-sm font-medium text-gold-700">Web Design</span>
              <div className="flex items-center text-taupe-500 text-sm">
                <Calendar className="mr-1 h-4 w-4" />
                March 31, 2025
              </div>
              <div className="flex items-center text-taupe-500 text-sm">
                <Clock className="mr-1 h-4 w-4" />2 min read
              </div>
            </div>

            <h1 className="font-serif text-4xl font-bold text-taupe-900 md:text-5xl">The Importance of Web Design</h1>

            <div className="mt-6 flex items-center space-x-4">
              <div className="flex items-center">
                <div className="mr-2 h-10 w-10 rounded-full bg-gold-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gold-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-taupe-900">Eva Salzman</p>
                  <p className="text-xs text-taupe-500">Web Design Director</p>
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
                  {/* Web design illustration with animated elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Browser window frame */}
                    <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden">
                      {/* Browser header */}
                      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="mx-auto bg-white rounded-md w-2/3 h-6 flex items-center justify-center text-xs text-gray-400">
                          www.auctusapex.it
                        </div>
                      </div>

                      {/* Website content */}
                      <div className="p-4">
                        {/* Header section */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          className="mb-4"
                        >
                          <div className="h-8 w-32 bg-gold-300 rounded-md mb-2"></div>
                          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                          <div className="h-4 w-2/3 bg-gray-200 rounded-md mt-2"></div>
                        </motion.div>

                        {/* Content grid */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1 }}
                          className="grid grid-cols-3 gap-4 mb-4"
                        >
                          <div className="aspect-video bg-gold-100 rounded-md"></div>
                          <div className="aspect-video bg-gold-100 rounded-md"></div>
                          <div className="aspect-video bg-gold-100 rounded-md"></div>
                        </motion.div>

                        {/* Text content */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.2 }}
                        >
                          <div className="h-4 w-full bg-gray-200 rounded-md mb-2"></div>
                          <div className="h-4 w-full bg-gray-200 rounded-md mb-2"></div>
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
              In today's digital-first economy, your website often serves as the primary touchpoint between your brand
              and potential customers. This article examines the multifaceted impact of professional web design on
              business outcomes, from establishing credibility and building trust to enhancing user experience and
              driving conversions.
            </p>

            <h2>First Impressions Matter</h2>
            <p>
              Research shows that it takes about 50 milliseconds (0.05 seconds) for users to form an opinion about your
              website. This snap judgment determines whether they'll stay or leave. Professional web design ensures that
              this crucial first impression is positive, compelling visitors to explore further rather than clicking
              away.
            </p>
            <p>
              A well-designed website communicates professionalism, attention to detail, and a commitment to quality—all
              of which reflect positively on your brand and offerings. Conversely, an outdated or poorly designed site
              can immediately undermine trust and credibility, regardless of the actual quality of your products or
              services.
            </p>

            <h2>Building Trust and Credibility</h2>
            <p>
              Trust is the foundation of any successful business relationship. Your website design plays a pivotal role
              in establishing this trust with potential customers who have never interacted with your brand before.
              Elements such as professional imagery, consistent branding, clear navigation, and up-to-date content all
              contribute to a perception of reliability and competence.
            </p>
            <p>
              Studies have shown that 75% of consumers admit to making judgments about a company's credibility based on
              their website design. This means that investing in quality web design isn't just about aesthetics—it's
              about building the foundation for customer relationships.
            </p>

            <h2>Enhancing User Experience</h2>
            <p>
              User experience (UX) encompasses all aspects of how people interact with your website. Good web design
              prioritizes the user journey, making it intuitive, efficient, and enjoyable. This includes considerations
              such as:
            </p>
            <ul>
              <li>Intuitive navigation that helps users find what they're looking for quickly</li>
              <li>Responsive design that ensures your site works flawlessly across all devices</li>
              <li>Fast loading times that respect users' time and patience</li>
              <li>
                Accessibility features that make your content available to all users, including those with disabilities
              </li>
              <li>Clear calls-to-action that guide users toward conversion</li>
            </ul>
            <p>
              When users have a positive experience on your website, they're more likely to stay longer, explore more
              pages, and ultimately take the actions you want them to take, whether that's making a purchase, signing up
              for a newsletter, or contacting your business.
            </p>

            <h2>Supporting SEO Efforts</h2>
            <p>
              Web design and search engine optimization (SEO) are deeply interconnected. Many design elements directly
              impact how well your site performs in search engine rankings:
            </p>
            <ul>
              <li>Mobile responsiveness is now a ranking factor for Google</li>
              <li>Page speed affects both user experience and search rankings</li>
              <li>Clean code and proper HTML structure help search engines understand and index your content</li>
              <li>
                User engagement metrics like time on site and bounce rate (which are influenced by design) can impact
                rankings
              </li>
            </ul>
            <p>
              A well-designed website provides the technical foundation that allows your SEO efforts to succeed, helping
              potential customers find you in the first place.
            </p>

            <h2>Driving Conversions</h2>
            <p>
              Ultimately, most business websites exist to drive some form of conversion—whether that's generating leads,
              making sales, or encouraging sign-ups. Effective web design strategically guides visitors toward these
              conversion points through:
            </p>
            <ul>
              <li>Strategic placement of calls-to-action</li>
              <li>Thoughtful use of color and contrast to draw attention to important elements</li>
              <li>Removal of distractions and friction points in the conversion process</li>
              <li>Clear value propositions that address customer needs and pain points</li>
              <li>Trust signals (testimonials, security badges, etc.) positioned at decision points</li>
            </ul>
            <p>
              Even small design changes can have significant impacts on conversion rates. A/B testing different design
              elements often reveals that seemingly minor details—like button color, form length, or image choice—can
              dramatically affect user behavior.
            </p>

            <h2>Staying Competitive</h2>
            <p>
              In virtually every industry, your competitors are continually updating and improving their online
              presence. A modern, professional website is no longer a differentiator—it's a baseline expectation.
              Falling behind in web design means falling behind in the marketplace.
            </p>
            <p>
              Moreover, web design standards and user expectations evolve rapidly. What was considered cutting-edge just
              a few years ago may now appear dated. Regular updates and redesigns are necessary to keep pace with
              changing technologies, design trends, and user expectations.
            </p>

            <h2>The Return on Investment</h2>
            <p>
              Quality web design requires an investment, but it's one that typically delivers substantial returns.
              Consider these potential benefits:
            </p>
            <ul>
              <li>Increased conversion rates leading directly to higher revenue</li>
              <li>Improved brand perception leading to greater customer loyalty</li>
              <li>Enhanced user experience leading to more referrals and positive reviews</li>
              <li>Better search engine rankings leading to more organic traffic</li>
              <li>Reduced bounce rates leading to more opportunities to engage potential customers</li>
            </ul>
            <p>
              When viewed through this lens, professional web design isn't an expense—it's a strategic investment in
              your business's growth and success.
            </p>

            <h2>Conclusion</h2>
            <p>
              In the digital age, your website is often the first—and sometimes only—chance to make an impression on
              potential customers. Professional web design ensures that this impression is positive and compelling,
              building trust, enhancing user experience, supporting SEO efforts, driving conversions, and helping you
              stay competitive in your industry.
            </p>
            <p>
              As we've seen, the importance of web design extends far beyond aesthetics. It directly impacts virtually
              every aspect of your online presence and, by extension, your business's success. In a world where digital
              interactions increasingly shape consumer perceptions and decisions, investing in quality web design isn't
              optional—it's essential.
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
                title: "The Psychology of Color in Web Design",
                excerpt: "Understanding how color choices influence user perception and behavior on your website.",
                category: "Web Design",
                date: "February 28, 2025",
                image: "/placeholder.svg?height=400&width=600",
                id: 3,
              },
              {
                title: "Creating Effective Email Marketing Campaigns",
                excerpt: "Strategies and best practices for email marketing that drives engagement and conversions.",
                category: "Email Marketing",
                date: "February 5, 2025",
                image: "/placeholder.svg?height=400&width=600",
                id: 6,
              },
              {
                title: "The Future of E-Commerce Design",
                excerpt: "Emerging trends and innovations shaping the next generation of online shopping experiences.",
                category: "E-Commerce",
                date: "January 28, 2025",
                image: "/placeholder.svg?height=400&width=600",
                id: 7,
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
                  <div
                    className="w-full h-full overflow-y-auto bg-white p-4 text-sm text-taupe-700 scrollbar-hide"
                    style={{ maxHeight: "300px" }}
                  >
                    <h3 className="font-serif text-lg font-medium text-taupe-900 mb-2">
                      The Art of Timeless Brand Design
                    </h3>
                    <p className="mb-3">
                      In the ever-evolving landscape of design trends, creating a brand identity that stands the test of
                      time requires a delicate balance between contemporary appeal and enduring principles.
                    </p>
                    <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">The Paradox of Timelessness</h4>
                    <p className="mb-3">
                      The concept of "timeless design" presents an inherent paradox: how can something remain relevant
                      across changing eras, technologies, and cultural contexts?
                    </p>
                    <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">Foundational Elements</h4>
                    <p className="mb-3">
                      Creating a brand identity with staying power requires careful attention to simplicity, typography,
                      color selection, and meaningful symbolism that transcends trends.
                    </p>
                    <h4 className="font-serif text-md font-medium text-taupe-800 mb-1">Strategic Balance</h4>
                    <p className="mb-3">
                      While timelessness is desirable, brands must also feel current and connected to contemporary
                      culture. This balance can be achieved through a strategic approach to brand architecture.
                    </p>
                    <div className="mt-2 pt-2 border-t border-gold-100">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-taupe-500">10 min read</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gold-600 px-2 py-1 rounded-full bg-gold-50 border border-gold-100">
                      Brand Design
                    </span>
                    <div className="flex items-center text-taupe-400 text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      April 2, 2025
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-medium mb-2 group-hover:text-gold-600 transition-colors">
                    The Art of Timeless Brand Design
                  </h3>

                  <p className="text-taupe-600 mb-4">
                    Discover how to create brand identities that remain relevant and impactful for years to come.
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-taupe-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>10 min</span>
                    </div>
                    <Link
                      href="/blog/timeless-brand-design"
                      className="inline-flex items-center text-gold-600 hover:text-gold-700 transition-colors"
                    >
                      <span className="mr-1">Read</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
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
              Ready to Elevate Your <span className="font-medium">Web Presence</span>?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gold-50">
              Our team of expert designers can help you create a website that not only looks beautiful but drives real
              business results.
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
