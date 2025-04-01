"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  ChevronDown,
  Globe,
  Palette,
  PenTool,
  Award,
  Shield,
  Clock,
  Mail,
  BarChart3,
  Smartphone,
  Star,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroAnimation from "@/components/hero-animation"
import ServiceCard from "@/components/service-card"
import { useLanguage } from "@/contexts/language-context"
import MarbleBackground from "@/components/marble-background"
import GoldDivider from "@/components/gold-divider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import BlogCarousel from "@/components/blog-carousel"
import { motion } from "framer-motion"

export default function Home() {
  const { t, language } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [videoHeight, setVideoHeight] = useState<number>(0)
  const [expandedService, setExpandedService] = useState<number | null>(null)

  // Set initial video height based on aspect ratio
  useEffect(() => {
    const updateVideoHeight = () => {
      // Video aspect ratio is 16:9
      const aspectRatio = 16 / 9
      const windowWidth = window.innerWidth
      const calculatedHeight = windowWidth / aspectRatio

      // Use the calculated height or viewport height, whichever is larger
      const minHeight = window.innerHeight
      const finalHeight = Math.max(calculatedHeight, minHeight)

      setVideoHeight(finalHeight)
    }

    // Initial calculation
    updateVideoHeight()

    // Recalculate on window resize
    window.addEventListener("resize", updateVideoHeight)

    return () => {
      window.removeEventListener("resize", updateVideoHeight)
    }
  }, [])

  useEffect(() => {
    // Handle parallax scrolling effect
    const handleScroll = () => {
      if (heroRef.current && contentRef.current) {
        // Parallax factor - lower number = slower scroll
        const parallaxFactor = 0.3
        const scrollY = window.scrollY

        // Apply transform to hero section - move it at a slower rate
        heroRef.current.style.transform = `translateY(${scrollY * parallaxFactor}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [videoHeight])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expandedService !== null) {
        const target = event.target as HTMLElement
        if (!target.closest(".service-card-expanded")) {
          setExpandedService(null)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [expandedService])

  return (
    <div className="flex min-h-screen flex-col relative">
      {/* Hero Section - Parallax */}
      <section
        ref={heroRef}
        className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-taupe-950 text-white will-change-transform"
        style={{ height: `${videoHeight}px` }}
      >
        <div ref={videoContainerRef} className="absolute inset-0 z-0 opacity-30">
          <HeroAnimation />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto mb-4 flex max-w-xs justify-center">
            <div className="h-[2px] w-16 self-center bg-gold-300"></div>
            <p className="mx-4 font-serif text-sm uppercase tracking-widest text-gold-300">Est. MMXXV</p>
            <div className="h-[2px] w-16 self-center bg-gold-300"></div>
          </div>
          <h1 className="font-serif text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-gold-400">Auctus</span> Apex
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-taupe-100 md:text-xl font-light tracking-wide leading-relaxed">
            <span className="font-serif italic font-light tracking-wider">
              {language === "it"
                ? "Eleva il tuo marchio con strategie di marketing sofisticate e soluzioni di web design su misura."
                : t("hero.subtitle")}
            </span>
          </p>
          <p className="mx-auto mt-3 font-serif italic text-gold-300">
            <span className="text-sm">"{t("hero.latin")}"</span>
            <span className="mx-2 text-taupe-400">•</span>
            <span className="text-sm text-taupe-100">{t("hero.latinTranslation")}</span>
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-transparent border border-gold-300 text-gold-100 hover:bg-gold-900/10 hover:border-gold-200 transition-all duration-300 font-serif tracking-wider px-8 py-6 rounded-none shadow-sm hover:shadow-gold-900/5"
            >
              <a
                href="https://calendly.com/auctusapex/15-minute-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <span className="mr-2">{t("nav.book")}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <button
            onClick={() => {
              window.scrollTo({
                top: videoHeight,
                behavior: "smooth",
              })
            }}
            className="cursor-pointer rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-gold-300"
            aria-label="Scroll to content"
          >
            <ChevronDown className="h-8 w-8 animate-bounce text-gold-300" />
          </button>
        </div>
      </section>

      {/* Content that directly follows the hero */}
      <div ref={contentRef} className="relative z-20">
        {/* Heritage Section - Now directly attached to the hero */}
        <section className="relative bg-taupe-50 py-20 overflow-hidden">
          <MarbleBackground variant="light" opacity={0.1} />
          <div className="container mx-auto px-4 relative">
            <div className="absolute top-0 right-0 w-40 h-40 border-r-2 border-t-2 border-gold-200 opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 border-l-2 border-b-2 border-gold-200 opacity-30"></div>

            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-2 flex justify-center">
                <div className="h-px w-8 self-center bg-gold-600 opacity-70"></div>
                <div className="mx-2 h-px w-16 self-center bg-gold-600"></div>
                <div className="h-px w-8 self-center bg-gold-600 opacity-70"></div>
              </div>
              <h2 className="font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl lg:text-5xl">
                A <span className="font-normal text-gold-600">Legacy</span> of{" "}
                <span className="font-medium">Excellence</span>
              </h2>
              <div className="mx-auto mt-2 h-px w-24 bg-gold-600 opacity-30"></div>
              <p className="mx-auto mt-8 max-w-2xl font-light leading-relaxed tracking-wide text-taupe-700">
                Auctus Apex is founded on timeless principles of quality, craftsmanship, and exceptional service. We
                blend classical values with modern innovation to create marketing and design solutions that stand the
                test of time. Our approach honors tradition while embracing the future.
              </p>

              <div className="mt-16 grid gap-8 md:grid-cols-3">
                <div className="group flex flex-col items-center relative">
                  <div className="absolute inset-0 bg-gold-50 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"></div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-200 shadow-sm group-hover:shadow-gold-200/30 transition-all duration-300">
                    <Clock className="h-8 w-8 text-gold-700" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-medium tracking-wide">Established Tradition</h3>
                  <div className="mx-auto mt-2 h-px w-12 bg-gold-200"></div>
                  <p className="mt-4 font-light leading-relaxed text-taupe-700">
                    Founded with a commitment to timeless quality and service excellence.
                  </p>
                </div>

                <div className="group flex flex-col items-center relative">
                  <div className="absolute inset-0 bg-gold-50 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"></div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-200 shadow-sm group-hover:shadow-gold-200/30 transition-all duration-300">
                    <Award className="h-8 w-8 text-gold-700" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-medium tracking-wide">Proven Expertise</h3>
                  <div className="mx-auto mt-2 h-px w-12 bg-gold-200"></div>
                  <p className="mt-4 font-light leading-relaxed text-taupe-700">
                    Expert team crafting distinguished brands and marketing strategies.
                  </p>
                </div>

                <div className="group flex flex-col items-center relative">
                  <div className="absolute inset-0 bg-gold-50 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"></div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-200 shadow-sm group-hover:shadow-gold-200/30 transition-all duration-300">
                    <Shield className="h-8 w-8 text-gold-700" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-medium tracking-wide">Enduring Relationships</h3>
                  <div className="mx-auto mt-2 h-px w-12 bg-gold-200"></div>
                  <p className="mt-4 font-light leading-relaxed text-taupe-700">
                    Building lasting partnerships with clients who value heritage and quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative bg-taupe-100 py-20 overflow-hidden">
          <MarbleBackground variant="medium" opacity={0.08} />
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-taupe-50 to-transparent"></div>

          <div className="container mx-auto px-4 relative">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-gold-300 opacity-10"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border border-gold-300 opacity-10"></div>

            <div className="relative mx-auto mb-6 flex max-w-xs justify-center">
              <div className="h-[1px] w-16 self-center bg-gold-600 opacity-60"></div>
              <p className="mx-4 font-serif text-sm uppercase tracking-wider text-gold-700 font-light letter-spacing-[0.2em]">
                <span className="font-medium">S</span>ervitium <span className="font-medium">E</span>xcellentia
              </p>
              <div className="h-[1px] w-16 self-center bg-gold-600 opacity-60"></div>
            </div>
            <h2 className="text-center font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl lg:text-5xl">
              Our <span className="text-gold-600 font-normal">Premium</span>{" "}
              <span className="font-medium">Services</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-24 bg-gold-600 opacity-30"></div>
            <p className="mx-auto mt-8 max-w-3xl text-center font-light leading-relaxed tracking-wide text-taupe-700">
              We offer a comprehensive suite of marketing and design services tailored to elevate your brand,
              <span className="italic"> combining time-honored principles with cutting-edge innovation.</span>
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Add a wrapper div with fixed height around each service card to ensure consistent sizing */}
              <style jsx global>{`
                .service-card-wrapper {
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                }
                .service-card-wrapper > div {
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                }
                /* Ensure the card content takes full height */
                .service-card-wrapper .group {
                  height: 100%;
                }
              `}</style>
              {[
                {
                  icon: <Smartphone className="h-10 w-10" />,
                  title: "Social Media Marketing",
                  description:
                    "Strategic campaigns across Instagram, Facebook, TikTok, Snapchat, and other platforms to elevate your brand's digital presence.",
                  details:
                    "Our social media marketing services include content creation, community management, paid advertising, influencer partnerships, and detailed analytics reporting. We create tailored strategies that align with your brand voice and business objectives.",
                },
                {
                  icon: <Mail className="h-10 w-10" />,
                  title: "Email Marketing",
                  description:
                    "Sophisticated email campaigns and newsletters designed to nurture customer relationships and drive conversions.",
                  details:
                    "Our email marketing services include campaign strategy, template design, list segmentation, A/B testing, automation sequences, and performance analytics. We help you build meaningful connections with your audience through personalized communication.",
                },
                {
                  icon: <BarChart3 className="h-10 w-10" />,
                  title: "Google Ads Marketing",
                  description:
                    "Precision-targeted advertising campaigns that position your brand prominently in search results to capture high-intent audiences.",
                  details:
                    "Our Google Ads services include keyword research, ad copywriting, landing page optimization, bid management, conversion tracking, and ROI analysis. We create campaigns that maximize your visibility and drive qualified traffic to your website.",
                },
                {
                  icon: <Globe className="h-10 w-10" />,
                  title: "Custom Website Development",
                  description:
                    "Bespoke website solutions with sophisticated user interfaces and powerful admin dashboards tailored to your needs.",
                  details:
                    "Our website development services include UX/UI design, responsive development, content management systems, e-commerce functionality, performance optimization, and ongoing maintenance. We create websites that are both visually stunning and functionally powerful.",
                },
                {
                  icon: <PenTool className="h-10 w-10" />,
                  title: "Brand Identity",
                  description:
                    "Comprehensive branding solutions that establish a distinctive and memorable presence for your business.",
                  details:
                    "Our brand identity services include logo design, visual identity systems, brand guidelines, messaging frameworks, brand positioning, and marketing collateral. We help you create a cohesive brand that resonates with your target audience.",
                },
                {
                  icon: <Palette className="h-10 w-10" />,
                  title: "Content Marketing",
                  description:
                    "Strategic content creation that positions your brand as an authority while engaging your target audience.",
                  details:
                    "Our content marketing services include content strategy, blog writing, social media content, email newsletters, video production, and distribution planning. We create valuable content that attracts, engages, and converts your target audience.",
                },
              ].map((service, index) => (
                <div key={index} className="service-card-wrapper">
                  <div
                    className={`relative group ${expandedService === index ? "service-card-expanded z-50" : ""}`}
                    style={{
                      transition: "all 0.3s ease",
                      transform: expandedService === index ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <div className="absolute -top-4 -left-4 h-20 w-20 border-t border-l border-gold-300 opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                    <div className={`relative ${expandedService === index ? "bg-white shadow-xl rounded-lg" : ""}`}>
                      <ServiceCard
                        icon={service.icon}
                        title={service.title}
                        description={
                          expandedService === index ? `${service.description} ${service.details}` : service.description
                        }
                      />
                      {expandedService !== index && (
                        <div
                          className="absolute bottom-4 right-4 cursor-pointer flex items-center"
                          onClick={(e) => {
                            e.stopPropagation()
                            setExpandedService(index)
                          }}
                        >
                          <span className="text-gold-600 font-serif" style={{ fontFamily: "Times New Roman, serif" }}>
                            Learn more
                          </span>
                          <ArrowRight className="ml-1 h-4 w-4 text-gold-600" />
                        </div>
                      )}
                      {expandedService === index && (
                        <div
                          className="absolute top-2 right-2 cursor-pointer p-1 rounded-full bg-gold-100 hover:bg-gold-200"
                          onClick={(e) => {
                            e.stopPropagation()
                            setExpandedService(null)
                          }}
                        >
                          <X className="h-4 w-4 text-gold-600" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <GoldDivider variant="ornate" className="mt-16" />
          </div>
        </section>

        {/* Our Refined Process Section */}
        <section className="relative bg-stone-100 py-24 overflow-hidden">
          <MarbleBackground variant="light" opacity={0.05} />
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>

          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="relative mx-auto mb-6 flex max-w-xs justify-center">
                <div className="h-[1px] w-16 self-center bg-gold-600 opacity-60"></div>
                <p className="mx-4 font-serif text-sm uppercase tracking-wider text-gold-700 font-light letter-spacing-[0.2em]">
                  <span className="font-medium">M</span>ethodology
                </p>
                <div className="h-[1px] w-16 self-center bg-gold-600 opacity-60"></div>
              </div>
              <h2 className="font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl">
                Our <span className="text-gold-600 font-normal">Refined</span>{" "}
                <span className="font-medium">Process</span>
              </h2>
              <div className="mx-auto mt-2 h-px w-24 bg-gold-600 opacity-30"></div>
            </motion.div>

            {/* Process Steps */}
            <div className="mt-16 grid gap-8 md:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Discovery",
                  description:
                    "We begin with a thorough exploration of your brand, objectives, and target audience to establish a solid foundation.",
                },
                {
                  number: "02",
                  title: "Strategy",
                  description:
                    "Our team develops a comprehensive strategy tailored to your specific needs and aligned with your business goals.",
                },
                {
                  number: "03",
                  title: "Creation",
                  description:
                    "Our artisans craft your digital assets with meticulous attention to detail and a focus on both aesthetics and functionality.",
                },
                {
                  number: "04",
                  title: "Refinement",
                  description:
                    "We continuously optimize and refine our work to ensure exceptional performance and results that exceed expectations.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative p-6 rounded-lg border border-gold-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                    <div className="font-serif text-6xl font-light text-gold-300 opacity-40 mb-4">{step.number}</div>
                    <h3 className="font-serif text-2xl font-medium tracking-wide">{step.title}</h3>
                    <div className="mt-2 h-px w-12 bg-gold-200 transition-all duration-300 group-hover:w-20 group-hover:bg-gold-400"></div>
                    <p className="mt-4 text-gray-600 flex-grow">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-gold-300/30 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="relative bg-white py-20 overflow-hidden">
          <MarbleBackground variant="light" opacity={0.05} />
          <div className="absolute top-0 left-1/4 w-1 h-20 bg-gradient-to-b from-transparent via-gold-300/30 to-transparent"></div>
          <div className="absolute bottom-0 right-1/4 w-1 h-20 bg-gradient-to-b from-transparent via-gold-300/30 to-transparent"></div>

          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-12 h-12 border-t border-l border-gold-400/30"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b border-r border-gold-400/30"></div>

                <div className="mb-4 inline-flex">
                  <div className="h-[1px] w-12 self-center bg-gold-600"></div>
                  <p className="ml-4 font-serif text-sm uppercase tracking-widest text-gold-700">Cur Nos Eligere</p>
                </div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-taupe-900 md:text-4xl">
                  Why Choose <span className="text-gold-600">Auctus Apex</span>
                </h2>
                <p className="mt-4 text-taupe-700">
                  We combine timeless elegance with cutting-edge innovation to deliver results that exceed expectations.
                  Our approach is rooted in classical principles of quality, integrity, and meticulous attention to
                  detail.
                </p>

                <GoldDivider variant="double" className="my-6" />

                <ul className="mt-8 space-y-4">
                  {[
                    "Bespoke strategies tailored to your unique needs",
                    "Dedicated team of industry experts with decades of combined experience",
                    "Proven track record of success since our founding",
                    "Commitment to excellence and innovation in everything we do",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start group">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold-100 group-hover:bg-gold-200 transition-colors duration-300">
                        <Star className="h-3 w-3 text-gold-600" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-8 bg-gold-600 text-white hover:bg-gold-700">
                  <Link href="/book">Schedule Your Consultation</Link>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-32 h-32 border-t border-l border-gold-200/40"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b border-r border-gold-200/40"></div>

                <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                  <div className="absolute inset-0 border border-gold-200"></div>
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cyRSuiTVjVu7WucJejoLFHGfxhKsE4.png"
                    alt="Artisan craftsman carving stone with precision and care"
                    className="h-full w-full object-cover object-center"
                    style={{ filter: "sepia(15%) brightness(105%)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gold-900/40 via-taupe-200/10 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <div className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-sm">
                      <p className="font-serif text-sm text-gold-800 tracking-wider">EXCELLENCE IN EVERY DETAIL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section className="relative bg-taupe-50 py-20 overflow-hidden">
          <MarbleBackground variant="light" opacity={0.08} />
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>

          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="mx-auto mb-4 flex max-w-xs justify-center">
                <div className="h-[1px] w-16 self-center bg-gold-600"></div>
                <p className="mx-4 font-serif text-sm uppercase tracking-widest text-gold-700">Insights</p>
                <div className="h-[1px] w-16 self-center bg-gold-600"></div>
              </div>
              <h2 className="font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl lg:text-5xl">
                Latest from Our <span className="text-gold-600 font-normal">Blog</span>
              </h2>
              <div className="mx-auto mt-2 h-px w-24 bg-gold-600 opacity-30"></div>
              <p className="mx-auto mt-8 max-w-3xl font-light leading-relaxed tracking-wide text-taupe-700">
                Explore our latest articles and insights on marketing, design, and business growth.
              </p>
            </div>

            <div className="mt-12 mb-16">
              <BlogCarousel />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative bg-taupe-50 py-20 overflow-hidden">
          <MarbleBackground variant="light" opacity={0.08} />
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>

          <div className="container mx-auto px-4 relative">
            <div className="absolute top-10 right-10 w-40 h-40 rounded-full border border-gold-300 opacity-10"></div>
            <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full border border-gold-300 opacity-10"></div>

            <div className="text-center mb-12">
              <div className="mx-auto mb-4 flex max-w-xs justify-center">
                <div className="h-[1px] w-16 self-center bg-gold-300"></div>
                <p className="mx-4 font-serif text-sm uppercase tracking-widest text-gold-700">FAQ</p>
                <div className="h-[1px] w-16 self-center bg-gold-300"></div>
              </div>
              <h2 className="font-serif text-3xl font-light tracking-wide text-gold-600 md:text-4xl lg:text-5xl">
                Frequently Asked Questions
              </h2>
              <div className="mx-auto mt-2 h-px w-24 bg-gold-600 opacity-30"></div>
              <p className="mx-auto mt-8 max-w-3xl font-light leading-relaxed tracking-wide text-taupe-700">
                Find answers to common questions about our services and processes.
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              <div className="mt-12">
                <Accordion type="single" collapsible className="w-full">
                  {[
                    {
                      question: "What services does Auctus Apex offer?",
                      answer:
                        "Auctus Apex offers a comprehensive suite of marketing and design services, including social media marketing, email marketing, Google Ads marketing, custom website development, brand identity design, and content marketing. Each service is tailored to meet the unique needs of our clients.",
                    },
                    {
                      question: "How long does a typical project take to complete?",
                      answer:
                        "Project timelines vary depending on the scope and complexity of the work. A website design project typically takes 1-2 weeks, while a comprehensive marketing campaign might take 2-4 weeks to develop and implement. During our initial consultation, we'll provide you with a detailed timeline specific to your project.",
                    },
                    {
                      question: "Do you work with clients internationally?",
                      answer:
                        "Yes, we work with clients globally. With team members in the United States, Italy, and Spain, we have the capability to serve clients across different time zones and cultural contexts. Our international team brings diverse perspectives and insights to every project.",
                    },
                    {
                      question: "What is your pricing structure?",
                      answer:
                        "Our pricing is customized based on the specific requirements of each project. We offer both project-based pricing and retainer options for ongoing services. During our consultation, we'll discuss your needs and provide a detailed proposal that outlines all costs and deliverables.",
                    },
                    {
                      question: "How do you measure the success of your marketing campaigns?",
                      answer:
                        "We establish clear KPIs at the beginning of each campaign and use advanced analytics tools to track performance. Regular reporting keeps you informed of progress, and we continuously optimize campaigns based on data insights to ensure maximum ROI.",
                    },
                  ].map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-gold-200">
                      <AccordionTrigger className="font-serif text-lg font-medium text-taupe-900 hover:text-gold-700">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-taupe-700">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-taupe-700">Still have questions? We're here to help.</p>
              <Button asChild className="mt-6 bg-gold-600 text-white hover:bg-gold-700">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-gradient-to-r from-gold-700 to-gold-500 py-16 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/marble-texture-dark.png')] opacity-5 bg-repeat bg-[length:400px_400px]"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gold-300/30"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gold-300/30"></div>

          <div className="container mx-auto px-4 text-center relative">
            <div className="absolute top-0 left-1/4 w-0.5 h-12 bg-gradient-to-b from-gold-300/0 via-gold-300/20 to-gold-300/0"></div>
            <div className="absolute top-0 right-1/4 w-0.5 h-12 bg-gradient-to-b from-gold-300/0 via-gold-300/20 to-gold-300/0"></div>

            <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">Ready to Elevate Your Brand?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gold-50">
              Book a consultation today and discover how Auctus Apex can transform your digital presence.
            </p>
            <p className="mx-auto mt-2 font-serif text-sm italic text-gold-100">
              "Ad astra per aspera" — To the stars through difficulties
            </p>

            <div className="mt-8 inline-block relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-200/30 via-white/80 to-gold-200/30 rounded-lg blur-sm"></div>
              <Button asChild size="lg" className="relative bg-white text-gold-700 hover:bg-taupe-50">
                <a href="https://calendly.com/auctusapex/15-minute-meeting" target="_blank" rel="noopener noreferrer">
                  Book Your Consultation Now
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

