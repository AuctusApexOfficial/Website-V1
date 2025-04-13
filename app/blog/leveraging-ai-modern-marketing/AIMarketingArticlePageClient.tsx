"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MarbleBackground from "@/components/marble-background"
import ViewTracker from "@/components/view-tracker"

export default function AIMarketingArticlePageClient() {
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
      <ViewTracker articleId={2} />

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
              <span className="rounded-full bg-gold-100 px-3 py-1 text-sm font-medium text-gold-700">
                Digital Marketing
              </span>
              <div className="flex items-center text-taupe-500 text-sm">
                <Calendar className="mr-1 h-4 w-4" />
                April 12, 2025
              </div>
              <div className="flex items-center text-taupe-500 text-sm">
                <Clock className="mr-1 h-4 w-4" />8 min read
              </div>
            </div>

            <h1 className="font-serif text-4xl font-bold text-taupe-900 md:text-5xl">
              Leveraging AI in Modern Marketing Strategies:
              <span className="block text-2xl font-medium mt-2 md:text-3xl">
                How Auctus Apex Is Shaping the Future of Scalable Growth
              </span>
            </h1>

            <div className="mt-6 flex items-center space-x-4">
              <div className="flex items-center">
                <div className="mr-2 h-10 w-10 rounded-full bg-gold-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gold-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-taupe-900">John Firestone</p>
                  <p className="text-xs text-taupe-500">Head of AI & Innovation</p>
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
                  {/* AI Marketing illustration */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden">
                      <div className="p-8 flex flex-col items-center">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          className="mb-6"
                        >
                          <div className="flex items-center justify-center space-x-4">
                            <div className="h-16 w-16 bg-gold-200 rounded-full flex items-center justify-center">
                              <div className="h-8 w-8 text-gold-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                                  <path d="M12 2a10 10 0 0 1 10 10h-10V2z" />
                                  <path d="M12 12l-8-8" />
                                  <path d="M12 12l8-8" />
                                  <path d="M12 12l8 8" />
                                  <path d="M12 12l-8 8" />
                                </svg>
                              </div>
                            </div>
                            <div className="h-12 w-48 bg-gold-100 rounded-md flex items-center justify-center">
                              <span className="font-serif text-gold-700">AI Marketing</span>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1 }}
                          className="w-full grid grid-cols-3 gap-4 mb-6"
                        >
                          <div className="h-8 bg-gold-50 rounded-md flex items-center justify-center">
                            <span className="text-xs text-gold-700">Content</span>
                          </div>
                          <div className="h-8 bg-gold-50 rounded-md flex items-center justify-center">
                            <span className="text-xs text-gold-700">Analytics</span>
                          </div>
                          <div className="h-8 bg-gold-50 rounded-md flex items-center justify-center">
                            <span className="text-xs text-gold-700">Automation</span>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.2 }}
                          className="w-full space-y-3"
                        >
                          <div className="h-4 w-full bg-gray-100 rounded-md"></div>
                          <div className="h-4 w-full bg-gray-100 rounded-md"></div>
                          <div className="h-4 w-2/3 bg-gray-100 rounded-md"></div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
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
            <p className="lead text-xl">
              In the landscape of modern marketing, speed and precision have become non-negotiable. With data exploding,
              attention spans shrinking, and competition tightening by the minute, the old ways of doing business simply
              don't cut it anymore. Traditional marketing marketing playbooks—manual lead qualification, gut-feel
              content creation, reactive campaign adjustments—are now liabilities in a digital environment defined by
              immediacy and intelligence.
            </p>

            <p className="font-serif text-xl font-medium text-gold-700">Enter Artificial Intelligence.</p>

            <p>
              At Auctus Apex, we believe the smartest marketing strategies are no longer designed by hand, but
              engineered with AI. The difference is not just one of scale, but one of mindset. We don't see AI as a
              productivity tool; we see it as the cornerstone of a marketing philosophy rooted in data, automation, and
              exponential iteration.
            </p>

            <p>
              This article explores how businesses can leverage AI to modernize their marketing operations, reduce
              costs, and unlock growth. We'll break down the latest AI integrations transforming the industry, and how
              Auctus helps clients adopt them strategically—not blindly.
            </p>

            <h2>The AI Shift in Marketing: From Tactic to Infrastructure</h2>
            <p>
              Artificial Intelligence in marketing has evolved from novelty to necessity. Once used primarily for
              chatbots or basic automations, AI is now embedded in every stage of the funnel: research, creation,
              distribution, analysis, and optimization.
            </p>

            <p>
              According to a 2024 report by McKinsey & Company, companies that adopted AI in their marketing processes
              saw a 15% to 30% improvement in campaign performance and up to 50% reduction in costs across core
              departments. These aren't minor efficiencies. They're category-defining changes.
            </p>

            <p>
              Where traditional marketing relied on human bandwidth and reactive adjustments, AI enables proactive,
              dynamic, and scalable strategies built for the pace of today's market.
            </p>

            <h2>1. Intelligent Content Creation: AI as Your Creative Partner</h2>
            <p>
              Marketing starts with content. It always has. But today, the demand for content has skyrocketed. Brands
              are expected to show up on five to ten channels daily with platform-specific creative, tone, and context.
            </p>

            <p>
              At Auctus, we use advanced language models like OpenAI's GPT-4 Turbo and Jasper to generate
              conversion-optimized landing pages, social media scripts, ad copy, and email sequences at scale. These
              aren't templates—they're tailored assets, informed by audience data and performance history.
            </p>

            <p>Using prompt engineering and brand-specific voice guidelines, our AI writing workflows help clients:</p>

            <ul>
              <li>Cut copywriting turnaround times by 80%</li>
              <li>Maintain brand tone across thousands of outputs</li>
              <li>A/B test headlines and hooks faster than ever before</li>
            </ul>

            <p>
              The result? Faster go-to-market speeds and higher conversion rates without the need to grow content teams
              linearly.
            </p>

            <p>
              When brands see how efficient and accurate this can be, it often shifts the way they think about scaling.
            </p>

            <h2>2. Hyper-Automated Lead Generation</h2>
            <p>
              Lead generation is no longer just about quantity. Precision matters. We use platforms like Apollo.io to
              mine thousands of potential leads, qualify them by firmographic and behavioral data, and generate dynamic
              email campaigns tailored to each segment.
            </p>

            <p>
              What used to be a 10-hour manual scraping and email-writing task is now a 20-minute workflow. But AI
              doesn't just save time—it makes your outreach smarter. With predictive engagement scoring and real-time
              enrichment, our clients are talking to the right people at the right time, with messaging designed to
              resonate.
            </p>

            <p>
              Bonus: We pair Apollo.io with AI writing assistants to craft hyper-personalized first-touch messages that
              dramatically increase open and reply rates.
            </p>

            <p>This kind of precision makes scaling outbound outreach feel almost effortless.</p>

            <h2>3. AI Chatbots That Sell, Not Just Support</h2>
            <p>
              Modern chatbots do more than answer FAQs. They qualify leads, schedule demos, handle objections, and even
              process transactions. Powered by APIs like ChatGPT and layered with custom data inputs, these bots offer
              near-human fluency in sales and service.
            </p>

            <p>
              At Auctus Apex, we design AI chatbot systems that plug directly into a client's website, CRM, and
              calendar. The result is a 24/7 sales assistant that:
            </p>

            <ul>
              <li>Books qualified meetings</li>
              <li>Answers detailed product questions</li>
              <li>Handles follow-up logic with intelligent workflows</li>
            </ul>

            <p>
              This doesn't just improve customer experience. It replaces the need for additional headcount while
              ensuring no lead goes unengaged.
            </p>

            <p>For many clients, this is their first real taste of scalable customer interaction.</p>

            <h2>4. Smarter Email Marketing with Predictive Segmentation</h2>
            <p>
              Email remains one of the most effective marketing channels, but only when personalized properly.
              AI-enhanced platforms like Mailchimp and Klaviyo now offer advanced predictive tools that automatically
              segment audiences by behavior, purchase likelihood, and engagement patterns.
            </p>

            <p>
              We build flows that evolve dynamically—so when a user clicks, ignores, or engages, the next message adapts
              accordingly. No more static newsletters. This dynamic sequencing boosts open rates by up to 50% and
              reduces churn by giving users exactly what they want, when they want it.
            </p>

            <p>
              This level of intelligent personalization often opens the door to new revenue streams our clients didn't
              know were there.
            </p>

            <h2>5. Predictive Analytics & Campaign Intelligence</h2>
            <p>Most marketing data is rear-facing. AI changes that.</p>

            <p>
              Using machine learning integrations from tools like Salesforce Einstein and Google Analytics 4, we help
              clients forecast which campaigns will perform best, which segments are likely to churn, and where ad spend
              should be reallocated in real-time.
            </p>

            <p>
              Instead of waiting for results, our clients act on probability and pattern recognition—shifting budgets,
              adjusting copy, and optimizing channels before performance dips.
            </p>

            <p>The ability to run predictive scenarios and simulate outcomes is, simply put, a game-changer.</p>

            <p>
              For leaders who value proactivity over guesswork, this becomes an indispensable part of decision-making.
            </p>

            <h2>6. AI-Driven Video & Visual Creation</h2>
            <p>
              Creating high-quality visual content at volume used to require designers, editors, and expensive software.
              Not anymore.
            </p>

            <p>
              Using platforms like Runway ML, Pika, and Canva's Magic Design, we help clients generate stunning branded
              visuals, animated explainers, and faceless social media videos in a fraction of the time.
            </p>

            <p>These tools allow:</p>

            <ul>
              <li>AI-generated B-roll and overlays</li>
              <li>Automated captioning and voiceovers</li>
              <li>Dynamic resizing for multiple platforms</li>
            </ul>

            <p>
              For clients aiming to publish 10+ pieces of content per day across social platforms, AI has turned
              production from a bottleneck into a superpower.
            </p>

            <p>Seeing this process in action tends to reframe what "high-output marketing" actually looks like.</p>

            <h2>7. AI-Optimized SEO & Search Intent Matching</h2>
            <p>
              Search engines are changing. With Google's Search Generative Experience (SGE) reshaping how results are
              displayed, traditional SEO strategies need an overhaul.
            </p>

            <p>
              We use tools like SurferSEO and Frase to optimize content not just for keywords, but for AI-inferred
              search intent. This allows our clients' content to appear in featured snippets, conversational search
              modules, and voice queries.
            </p>

            <p>
              AI also helps us map content clusters that boost topical authority—a critical ranking factor in today's
              SEO landscape.
            </p>

            <p>For many brands, this is the difference between being seen and being ignored.</p>

            <h2>Conclusion: The Auctus Apex Model for Scalable, AI-Driven Growth</h2>
            <p>
              At Auctus, we don't just recommend AI tools—we build entire marketing infrastructures around them. Our
              clients come to us not to keep pace, but to outpace. By embedding artificial intelligence into every level
              of their marketing stack, we help brands:
            </p>

            <ul>
              <li>Scale content production without bloating headcount</li>
              <li>Increase lead quality and velocity</li>
              <li>Automate outreach without losing personalization</li>
              <li>Make better decisions, faster</li>
            </ul>

            <p>
              AI isn't just another SaaS feature. It's a strategic layer. And when implemented right, it doesn't just
              make marketing more efficient—it makes it perform at a level that was previously impossible.
            </p>

            <p>
              If your team is exploring ways to modernize marketing operations, or simply wants to get more out of
              existing efforts without burning out bandwidth, consider what a tailored AI infrastructure might do for
              your growth.
            </p>

            <p>When you're ready to explore what that looks like, we're here.</p>

            <div className="mt-8 text-center">
              <Button asChild className="bg-gold-600 text-white hover:bg-gold-700">
                <Link href="/book">
                  Book a free consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
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
                title: "Effortlessly Automating Tasks with AI",
                excerpt:
                  "Practical ways to implement AI automation to save time and increase productivity in your business.",
                category: "Artificial Intelligence",
                date: "February 15, 2025",
                image: "/placeholder.svg?height=400&width=600",
                id: 5,
              },
              {
                title: "The Importance of Web Design",
                excerpt: "Why investing in professional web design is crucial for business success in the digital age.",
                category: "Web Design",
                date: "March 31, 2025",
                image: "/placeholder.svg?height=400&width=600",
                id: 4,
                url: "/blog/importance-of-web-design",
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
                title: "The Art of Timeless Brand Design",
                excerpt:
                  "Discover how to create brand identities that remain relevant and impactful for years to come.",
                category: "Brand Design",
                date: "April 2, 2025",
                image: "/placeholder.svg?height=400&width=600",
                id: 1,
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
                  <motion.img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7XOfbLOHPeYnHThcJWkfWwSF9Fmm0T.png"
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                  />
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-taupe-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <Link
                      href={post.url ? post.url : `/blog/timeless-brand-design`}
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
              Ready to Leverage <span className="font-medium">AI</span> for Your{" "}
              <span className="font-normal">Marketing</span>?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gold-50">
              Book a consultation today and discover how Auctus Apex can transform your marketing strategy with
              AI-powered solutions.
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
