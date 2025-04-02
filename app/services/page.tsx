"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Mail, Globe, BarChart3, Smartphone, PenTool, MessageSquare, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

import AnimatedCursor from "@/components/animated-cursor"
import ScrollProgress from "@/components/scroll-progress"
import ImageReveal from "@/components/image-reveal"
import ThreeDCard from "@/components/3d-card"
import TextReveal from "@/components/text-reveal"
import MagneticButton from "@/components/magnetic-button"
import StandardLoading from "@/components/standard-loading"

// Parallax image component
const ParallaxImage = ({ src, alt, className, speed = 0.5 }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed])

  return (
    <motion.div ref={ref} className={`relative overflow-hidden ${className}`} style={{ y }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
    </motion.div>
  )
}

// Service detail modal component
const ServiceDetailModal = ({ service, isOpen, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!service) return null

  const portfolioItems = [
    `/placeholder.svg?height=600&width=800`,
    `/placeholder.svg?height=600&width=800`,
    `/placeholder.svg?height=600&width=800`,
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-auto rounded-lg bg-stone-50 shadow-2xl"
            variants={modalVariants}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-amber-700 p-2 text-white transition-all hover:bg-amber-800"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-64 overflow-hidden md:h-80">
              <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 to-transparent z-10"></div>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(/placeholder.svg?height=1000&width=2000)` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                      {service.icon}
                    </div>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 font-serif text-3xl font-medium tracking-wide text-white"
                  >
                    {service.title}
                  </motion.h2>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="prose prose-stone mx-auto max-w-none">
                <p className="lead text-lg text-gray-700">{service.description}</p>

                <h3 className="font-serif text-xl font-medium mt-8 mb-4">Our Approach</h3>
                <p>
                  At Auctus Apex, we approach {service.title.toLowerCase()} with a blend of time-honored principles and
                  cutting-edge techniques. Our process is meticulously crafted to ensure exceptional results that stand
                  the test of time while embracing modern innovation.
                </p>

                <div className="my-8 grid gap-6 md:grid-cols-3">
                  {service.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="rounded-lg border border-amber-200 bg-amber-50 p-4"
                    >
                      <h4 className="font-serif text-lg font-medium text-amber-800">{feature}</h4>
                      <p className="mt-2 text-sm text-gray-600">
                        Our expert team delivers exceptional results through meticulous attention to detail and
                        strategic implementation.
                      </p>
                    </motion.div>
                  ))}
                </div>

                <h3 className="font-serif text-xl font-medium mt-8 mb-4">Portfolio Showcase</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {portfolioItems.map((src, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="group relative aspect-video overflow-hidden rounded-lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                      <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${src})` }}
                      ></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <h5 className="font-serif text-lg">Project {i + 1}</h5>
                        <p className="text-sm text-gray-200">Exceptional results for our valued client</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <Button asChild className="bg-amber-700 text-white hover:bg-amber-800">
                    <Link href="/book">
                      Book a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const services = [
  {
    icon: <Smartphone className="h-10 w-10" />,
    title: "Social Media Marketing",
    description:
      "Strategic campaigns across Instagram, Facebook, TikTok, Snapchat, and other platforms to elevate your brand's digital presence and engagement.",
    features: [
      "Platform-specific content strategies",
      "Audience targeting and growth",
      "Engagement campaigns",
      "Performance analytics",
      "Trend optimization",
    ],
    image: "/placeholder.svg?height=800&width=1200",
    color: "from-amber-700 to-amber-900",
  },
  {
    icon: <Mail className="h-10 w-10" />,
    title: "Email Marketing",
    description:
      "Sophisticated email campaigns and newsletters designed to nurture customer relationships and drive conversions with elegant, personalized content.",
    features: [
      "Custom newsletter design",
      "Automated sequences",
      "List segmentation",
      "A/B testing",
      "Performance reporting",
    ],
    image: "/placeholder.svg?height=800&width=1200",
    color: "from-stone-700 to-stone-900",
  },
  {
    icon: <BarChart3 className="h-10 w-10" />,
    title: "Google Ads Marketing",
    description:
      "Precision-targeted advertising campaigns that position your brand prominently in search results and across the web to capture high-intent audiences.",
    features: [
      "Keyword research & strategy",
      "Ad copywriting",
      "Landing page optimization",
      "Conversion tracking",
      "ROI maximization",
    ],
    image: "/placeholder.svg?height=800&width=1200",
    color: "from-amber-800 to-stone-900",
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Custom Website Development",
    description:
      "Bespoke website solutions with sophisticated user interfaces and powerful admin dashboards, crafted to embody your brand's unique essence.",
    features: [
      "Responsive design",
      "User & admin interfaces",
      "E-commerce integration",
      "Content management",
      "Analytics implementation",
    ],
    image: "/placeholder.svg?height=800&width=1200",
    color: "from-stone-800 to-black",
  },
  {
    icon: <PenTool className="h-10 w-10" />,
    title: "Brand Identity Design",
    description:
      "Comprehensive branding solutions that establish a distinctive and memorable presence, from logo design to complete visual identity systems.",
    features: [
      "Logo & visual identity",
      "Brand guidelines",
      "Marketing collateral",
      "Brand voice development",
      "Positioning strategy",
    ],
    image: "/placeholder.svg?height=800&width=1200",
    color: "from-amber-600 to-amber-800",
  },
  {
    icon: <MessageSquare className="h-10 w-10" />,
    title: "Content Marketing",
    description:
      "Strategic content creation and distribution that positions your brand as an authority while engaging your target audience with valuable insights.",
    features: [
      "Content strategy",
      "Blog & article writing",
      "SEO optimization",
      "Distribution planning",
      "Performance analysis",
    ],
    image: "/placeholder.svg?height=800&width=1200",
    color: "from-stone-600 to-stone-800",
  },
]

// Website showcase section
const websiteShowcase = [
  {
    title: "Seibert Plumbing",
    description:
      "Premium plumbing service website with elegant design for this established company from Easton, Pennsylvania.",
    image: "/images/seibert-plumbing.png",
    features: ["Modern responsive design", "Service request system", "Client testimonials"],
  },
  {
    title: "Luxury E-commerce",
    description: "Elegant online shopping experience with seamless checkout and inventory management.",
    image: "/images/luxury-ecommerce.png",
    features: ["Custom product filtering", "Integrated payment processing", "Admin dashboard"],
  },
]

export default function ServicesPage() {
  const { t } = useLanguage()
  const [selectedService, setSelectedService] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { scrollYProgress } = useScroll()
  const headerRef = useRef(null)

  // Add useEffect to handle loading state
  useEffect(() => {
    // Simulate loading time or wait for resources
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // Reduced from 1500ms to 800ms for faster loading

    return () => clearTimeout(timer)
  }, [])

  const openModal = (service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {isLoading && <StandardLoading />}

      <AnimatedCursor />
      <ScrollProgress />
      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <ParallaxImage
            src="https://res.cloudinary.com/djlfraoi2/image/upload/v1743310313/fsvgy6x1469zf5p8jkmj.png"
            alt="Luxury architectural background"
            className="h-full w-full opacity-60"
            speed={0.3}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/85 via-stone-800/75 to-stone-900/90"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <TextReveal delay={0.1} className="mx-auto mb-4 flex max-w-xs justify-center">
            <div className="h-[1px] w-16 self-center" style={{ backgroundColor: "#e6d19f" }}></div>
            <p
              className="mx-4 font-serif text-sm uppercase tracking-widest text-amber-300"
              style={{ color: "#e6d19f" }}
            >
              Servitium Excellentia
            </p>
            <div className="h-[1px] w-16 self-center" style={{ backgroundColor: "#e6d19f" }}></div>
          </TextReveal>

          <TextReveal
            delay={0.3}
            className="font-serif text-4xl font-light tracking-wide text-white md:text-5xl lg:text-6xl"
          >
            <span className="block" style={{ color: "#ffffff" }}>
              Crafting
            </span>
            <span className="text-amber-300 font-normal" style={{ color: "#dbb975" }}>
              Digital Excellence
            </span>
            <span className="block font-medium" style={{ color: "#ffffff" }}>
              Since MMXXV
            </span>
          </TextReveal>

          <div className="mx-auto mt-6 max-w-2xl font-serif italic font-light text-taupe-100 tracking-wider leading-relaxed md:text-xl">
            Elevate your brand with our comprehensive suite of marketing and design services, crafted with meticulous
            attention to detail and a commitment to excellence.
          </div>

          <TextReveal delay={0.7}>
            <Button asChild size="lg" className="mt-10 bg-amber-700 text-white hover:bg-amber-800">
              <Link href="/book">
                Book a Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </TextReveal>
        </div>

        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <button
            onClick={() => {
              const servicesSection = document.querySelector("#services-grid")
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="cursor-pointer rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
            aria-label="Scroll to services section"
          >
            <ChevronDown className="h-8 w-8 animate-bounce text-amber-300" />
          </button>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-amber-100 opacity-30"></div>
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-amber-100 opacity-30"></div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="mb-4 inline-flex">
                  <div className="h-[1px] w-12 self-center" style={{ backgroundColor: "#96703a" }}></div>
                  <p className="ml-4 font-serif text-sm uppercase tracking-widest" style={{ color: "#96703a" }}>
                    Our Philosophy
                  </p>
                </div>
                <h2 className="font-serif text-3xl font-light tracking-wide text-gray-900 md:text-4xl">
                  <span className="block" style={{ color: "#b88c3f" }}>
                    The Art of
                  </span>
                  <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                    Digital Craftsmanship
                  </span>
                </h2>
                <div className="mt-2 h-px w-24" style={{ backgroundColor: "#b88c3f", opacity: "0.3" }}></div>

                <p className="mt-6 text-gray-600">
                  At Auctus Apex, we approach digital marketing and web design as an art form—balancing aesthetic beauty
                  with technical precision. Our artisans craft digital experiences that captivate and drive measurable
                  results.
                </p>

                <p className="mt-4 text-gray-600">
                  Exceptional digital presence emerges from blending timeless design principles with cutting-edge
                  technology. Each project receives meticulous attention to detail and our unwavering commitment to
                  excellence.
                </p>

                <div className="mt-4 text-gray-600">
                  We leverage sophisticated AI algorithms and proprietary code frameworks to elevate our content,
                  ensuring each project stands out with precision and refinement in an increasingly competitive digital
                  landscape.
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WnqGIlD4YKeVp4I6yAWlUjI9B3Os91.png"
                  alt="Business professionals examining architectural blueprints in an elegant room"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <blockquote className="font-serif text-xl md:text-2xl font-light italic tracking-wide">
                    <span className="text-amber-300">"</span>Design is not just what it looks like and feels like.
                    Design is how it works.<span className="text-amber-300">"</span>
                  </blockquote>
                  <p className="mt-3 text-amber-300 font-serif">— Steve Jobs</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}

      {/* Services Grid Section */}
      <section id="services-grid" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="relative mx-auto mb-6 flex max-w-xs justify-center">
              <div className="h-[1px] w-16 self-center bg-amber-700 opacity-60"></div>
              <p className="mx-4 font-serif text-sm uppercase tracking-wider text-amber-700 font-light">
                <span className="font-medium">E</span>xpertise <span className="font-medium">E</span>t{" "}
                <span className="font-medium">E</span>xcellentia
              </p>
              <div className="h-[1px] w-16 self-center bg-amber-700 opacity-60"></div>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-wide text-gray-900 md:text-4xl lg:text-5xl">
              Our{" "}
              <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                Distinguished
              </span>{" "}
              <span className="font-medium text-black">Services</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-24 bg-amber-700 opacity-30"></div>
            <p className="mx-auto mt-8 max-w-3xl font-light leading-relaxed tracking-wide text-gray-600">
              We offer a comprehensive suite of marketing and design services tailored to elevate your brand,
              <span className="italic"> combining time-honored principles with cutting-edge innovation.</span>
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3" style={{ gridAutoRows: "1fr" }}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ThreeDCard className="h-full">
                  <div
                    className="group relative h-full cursor-pointer overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-lg flex flex-col"
                    onClick={() => openModal(service)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-90`}></div>
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${service.image})` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-amber-700 transition-transform duration-300 group-hover:scale-110">
                          {service.icon}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-serif text-2xl font-medium tracking-wide">{service.title}</h3>
                      <div className="mt-2 h-px w-16 bg-amber-200 transition-all duration-300 group-hover:w-24 group-hover:bg-amber-400"></div>
                      <p className="mt-4 text-gray-600 flex-grow">{service.description}</p>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 to-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>
                </ThreeDCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Website Showcase Section */}
      <section className="relative overflow-hidden bg-stone-900 py-20 text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/90 to-stone-900/95"></div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex max-w-xs justify-center">
              <div className="h-[1px] w-16 self-center bg-amber-300"></div>
              <p className="mx-4 font-serif text-sm uppercase tracking-widest text-amber-300">Website Portfolio</p>
              <div className="h-[1px] w-16 self-center bg-amber-300"></div>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-wide text-white md:text-4xl lg:text-5xl">
              Exceptional{" "}
              <span className="text-amber-300 font-normal" style={{ color: "#e6d19f" }}>
                Digital
              </span>{" "}
              <span className="font-medium" style={{ color: "#e6d19f" }}>
                Experiences
              </span>
            </h2>
            <div className="mx-auto mt-2 h-px w-24 bg-amber-300 opacity-30"></div>
            <p className="mx-auto mt-8 max-w-3xl font-light leading-relaxed tracking-wide text-gray-300">
              Explore our portfolio of bespoke websites, each crafted with meticulous attention to detail and designed
              to deliver exceptional user experiences.
            </p>
          </motion.div>

          <div className="mt-16">
            {websiteShowcase.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`mb-24 grid items-center gap-8 ${index % 2 === 0 ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-[2fr_3fr] md:grid-flow-dense"}`}
              >
                <div className={index % 2 === 0 ? "" : "md:col-start-2"}>
                  <h3 className="font-serif text-2xl font-medium tracking-wide text-amber-300">{project.title}</h3>
                  <div className="mt-2 h-px w-16 bg-amber-300 opacity-50"></div>

                  <p className="mt-4 text-gray-300">{project.description}</p>

                  <ul className="mt-6 space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-amber-300">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`relative ${index % 2 === 0 ? "" : "md:col-start-1"}`}>
                  <ImageReveal
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="relative aspect-[16/9] rounded-lg shadow-2xl"
                    revealDirection={index % 2 === 0 ? "left" : "right"}
                  />

                  <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-amber-300 opacity-20"></div>
                  <div className="absolute -left-6 -top-6 h-16 w-16 rounded-full bg-amber-300 opacity-10"></div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <MagneticButton>
              <Button asChild size="lg" className="bg-amber-700 text-white hover:bg-amber-800">
                <Link href="/book">
                  Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Interactive Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="relative mx-auto mb-6 flex max-w-xs justify-center">
              <div className="h-[1px] w-16 self-center" style={{ backgroundColor: "#96703a", opacity: "0.6" }}></div>
              <p className="mx-4 font-serif text-sm uppercase tracking-wider font-light" style={{ color: "#96703a" }}>
                <span className="font-medium">M</span>ethodology
              </p>
              <div className="h-[1px] w-16 self-center" style={{ backgroundColor: "#96703a", opacity: "0.6" }}></div>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-wide text-gray-900 md:text-4xl">
              Our{" "}
              <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                Refined
              </span>{" "}
              <span className="font-medium" style={{ color: "black" }}>
                Process
              </span>
            </h2>
            <div className="mx-auto mt-2 h-px w-24 bg-amber-700 opacity-30"></div>
          </motion.div>

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
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-4 rounded-lg bg-amber-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="font-serif text-6xl font-light text-amber-300 opacity-40 transition-all duration-300 group-hover:opacity-80">
                    {step.number}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl font-medium tracking-wide">{step.title}</h3>
                  <div className="mt-2 h-px w-12 bg-amber-200 transition-all duration-300 group-hover:w-20 group-hover:bg-amber-400"></div>
                  <p className="mt-4 text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="font-serif text-3xl font-light tracking-wide md:text-4xl">
              Ready to{" "}
              <span className="font-medium" style={{ color: "#e6d19f" }}>
                Elevate
              </span>{" "}
              Your{" "}
              <span className="font-normal" style={{ color: "#e6d19f" }}>
                Brand
              </span>
              ?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-amber-50">
              Book a consultation today and discover how Auctus Apex can transform your digital presence with our
              bespoke marketing and web design services.
            </p>

            <p className="mx-auto mt-2 font-serif text-sm italic text-amber-100">
              "Ad astra per aspera" — To the stars through difficulties
            </p>

            <MagneticButton>
              <Button asChild size="lg" className="mt-8 bg-white text-amber-700 hover:bg-gray-100">
                <Link href="/book">Book Your Consultation Now</Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceDetailModal service={selectedService} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

