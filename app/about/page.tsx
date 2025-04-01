"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, Users, Award, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedCursor from "@/components/animated-cursor"
import ScrollProgress from "@/components/scroll-progress"
import ImageReveal from "@/components/image-reveal"
import TextReveal from "@/components/text-reveal"
import MagneticButton from "@/components/magnetic-button"
import ThreeDCard from "@/components/3d-card"

// Replace the dynamic import at the top of the file with a regular import
// Find this line:
// const MapComponent = dynamic(() => import("@/components/map-component"), {
//   ssr: false,
//   loading: () => (
//     <div className="flex h-full w-full items-center justify-center bg-amber-50/50">
//       <p className="font-serif text-lg italic text-amber-700/70">Loading map...</p>
//     </div>
//   ),
// })

// And replace it with:
import MapComponent from "@/components/map-component"

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

// Animated counter component
const AnimatedCounter = ({ value, suffix = "", prefix = "", duration = 2 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [count, setCount] = useState(0)

  const counterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (inView && count !== value) {
    setTimeout(() => {
      if (count < value) {
        setCount((prev) => Math.min(prev + Math.ceil(value / (duration * 10)), value))
      }
    }, 100)
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={counterVariants}
      className="font-serif text-5xl font-bold text-amber-700 md:text-6xl"
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </motion.div>
  )
}

// Timeline item component
const TimelineItem = ({ title, description, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
      x: index % 2 === 0 ? -20 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.2,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={`flex w-full ${index % 2 === 0 ? "md:justify-end" : ""}`}
    >
      <div className={`relative w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right" : ""}`}>
        <div className={`rounded-lg bg-white p-6 shadow-md ${index % 2 === 0 ? "md:mr-10" : "md:ml-10"}`}>
          <h3 className="font-serif text-xl font-medium">{title}</h3>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
        <div
          className={`absolute top-5 hidden h-0.5 w-10 bg-amber-300 md:block ${index % 2 === 0 ? "right-0" : "left-0"}`}
        ></div>
      </div>
    </motion.div>
  )
}

// Team member card component
const TeamMemberCard = ({ name, role, country, image, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      },
    },
  }

  const flagEmoji = {
    Italy: "🇮🇹",
    Spain: "🇪🇸",
    "United States": "🇺🇸",
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants}>
      <ThreeDCard className="h-full">
        <div className="group relative h-full overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="relative h-64 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-medium">{name}</h3>
              <span className="text-2xl" aria-hidden="true">
                {flagEmoji[country]}
              </span>
            </div>
            <p className="text-gray-500">{role}</p>
            <p className="mt-1 text-sm text-gray-400">{country}</p>
          </div>
        </div>
      </ThreeDCard>
    </motion.div>
  )
}

// Global presence map component
const GlobalPresenceMap = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="relative mt-12 h-[400px] w-full overflow-hidden rounded-lg bg-stone-100 border border-amber-200 shadow-md md:h-[500px]"
    >
      <div className="absolute inset-0">
        <MapComponent />
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const timelineData = [
    {
      title: "The Beginning",
      description:
        "Founded in a college dorm room with a vision to create exceptional digital experiences for businesses worldwide.",
    },
    {
      title: "First International Client",
      description:
        "Expanded beyond the United States with our first European client, marking the beginning of our global journey.",
    },
    {
      title: "Team Expansion",
      description:
        "Welcomed our first team members from Italy and Spain, bringing diverse perspectives and expertise to our work.",
    },
  ]

  const teamMembers = [
    {
      name: "Michael Culver",
      role: "Chief Strategy & Operations Officer",
      country: "United States",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TtDv4Vqh4goqVC4qbTCB5SoRt4FElN.png",
    },
    {
      name: "Eva Salzman",
      role: "Business & Communications Coordinator",
      country: "United States",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OmIOtZ2oRSjeEMoiN6ZDbrbgofHCUo.png",
    },
  ]

  const stats = [
    { value: 95, suffix: "+", label: "Clients Worldwide" },
    { value: 3, label: "Continents" },
    { value: 12, label: "Languages" },
    { value: 250, suffix: "+", label: "Projects Completed" },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      <AnimatedCursor />
      <ScrollProgress />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/djlfraoi2/image/upload/v1743310567/mthwwrmbmuqkatw2vlje.png)`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/60 to-stone-900/80"></div>
        </div>

        <motion.div
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
          style={{ opacity, scale }}
        >
          <TextReveal delay={0.1} className="mx-auto mb-4 flex max-w-xs justify-center">
            <div className="h-[1px] w-16 self-center" style={{ backgroundColor: "#e6d19f" }}></div>
            <p className="mx-4 font-serif text-sm uppercase tracking-widest" style={{ color: "#e6d19f" }}>
              Our Legacy
            </p>
            <div className="h-[1px] w-16 self-center" style={{ backgroundColor: "#e6d19f" }}></div>
          </TextReveal>

          <TextReveal
            delay={0.3}
            className="font-serif text-4xl font-light tracking-wide text-white md:text-5xl lg:text-6xl"
          >
            <span className="block" style={{ color: "#ffffff" }}>
              Our
            </span>
            <span className="text-amber-300 font-normal" style={{ color: "#dbb975" }}>
              Distinguished
            </span>
            <span className="block font-medium" style={{ color: "#ffffff" }}>
              Journey
            </span>
          </TextReveal>

          <TextReveal delay={0.5} className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: "#f0eeec" }}>
            From humble beginnings in a college dorm room to a global presence spanning three continents, discover the
            story of <span className="italic">Auctus Apex</span> and our commitment to excellence.
          </TextReveal>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <button
            onClick={() => {
              const storySection = document.querySelector("#our-story")
              if (storySection) {
                storySection.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="cursor-pointer rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
            aria-label="Scroll to our story section"
          >
            <ChevronDown className="h-8 w-8 animate-bounce text-amber-300" />
          </button>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="relative overflow-hidden bg-white py-20">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-amber-100 opacity-30"></div>
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-amber-100 opacity-30"></div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 md:order-1"
            >
              <ImageReveal
                src="/images/modern-headquarters.png"
                alt="Auctus Apex modern headquarters with mountains in the background"
                className="relative aspect-[4/3] rounded-lg shadow-xl"
                revealDirection="left"
              />
              <ImageReveal
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-U5miNSijYHilnHZSA7g3vGCTQzZHCf.png"
                alt="Historic college building where Auctus Apex was founded"
                className="absolute -bottom-6 right-6 aspect-square w-48 rounded-lg shadow-xl md:right-auto md:-left-6"
                revealDirection="bottom"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-1 md:order-2"
            >
              <div className="mb-4 inline-flex">
                <div className="h-[1px] w-12 self-center" style={{ backgroundColor: "#96703a" }}></div>
                <p className="ml-4 font-serif text-sm uppercase tracking-widest" style={{ color: "#96703a" }}>
                  Our Genesis
                </p>
              </div>
              <h2 className="font-serif text-3xl font-light tracking-wide text-gray-900 md:text-4xl">
                <span className="block" style={{ color: "#b88c3f" }}>
                  From College Dream to
                </span>
                <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                  Global Excellence
                </span>
              </h2>
              <div className="mt-2 h-px w-24 bg-amber-700 opacity-30"></div>

              <p className="mt-6 text-gray-600">
                Auctus Apex was born in a small college dorm room, where our founder envisioned a marketing agency that
                would transcend borders and deliver exceptional digital experiences to businesses worldwide. What began
                as a passionate pursuit during late-night study sessions quickly evolved into a respected name in the
                industry.
              </p>

              <p className="mt-4 text-gray-600">
                Today, our team spans three countries—the United States, Italy, and Spain—bringing together diverse
                perspectives, cultural insights, and creative approaches. This international foundation has enabled us
                to serve clients not only across North America but throughout Italy and other countries in the European
                Union. Unlike many agencies that rely on premade templates, we custom code every website from scratch,
                ensuring truly bespoke digital experiences that perfectly align with each client's unique brand
                identity.
              </p>

              <div className="mt-8">
                <MagneticButton>
                  <Button asChild className="bg-amber-700 text-white hover:bg-amber-800">
                    <Link href="/book">
                      Work With Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-stone-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-wxl mx-auto text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="h-[1px] w-16 self-center bg-amber-300 opacity-60 mr-4"></div>
              <Globe className="h-8 w-8 text-amber-300" />
              <div className="h-[1px] w-16 self-center bg-amber-300 opacity-60 ml-4"></div>
            </div>

            <blockquote className="font-serif text-3xl font-light italic tracking-wide md:text-4xl">
              <span className="text-amber-300">"</span>If you knew you couldn't fail, how big would you dream?
              <span className="text-amber-300">"</span>
            </blockquote>

            <p className="mt-6 text-amber-300 font-serif">— Robert H. Schuller</p>

            <p className="mt-8 text-gray-300 max-w-2xl mx-auto">
              Our intercontinental vision connects cultures and ideas across borders to create truly global experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
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
                <span className="font-medium">O</span>ur <span className="font-medium">J</span>ourney
              </p>
              <div className="h-[1px] w-16 self-center bg-amber-700 opacity-60"></div>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-wide text-gray-900 md:text-4xl lg:text-5xl">
              The{" "}
              <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                Evolution
              </span>{" "}
              of{" "}
              <span className="font-medium" style={{ color: "black" }}>
                Excellence
              </span>
            </h2>
            <div className="mx-auto mt-2 h-px w-24 bg-[#b88c3f] opacity-30"></div>
            <p className="mx-auto mt-8 max-w-3xl font-light leading-relaxed tracking-wide text-gray-600">
              Key milestones that have shaped our journey from a college startup to a global agency,
              <span className="italic"> each step reflecting our commitment to innovation.</span>
            </p>
          </motion.div>

          <div className="relative mt-16">
            {/* Timeline center line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-amber-200 md:block"></div>

            {/* Timeline items */}
            <div className="space-y-12 md:space-y-0">
              {timelineData.map((item, index) => (
                <TimelineItem key={index} title={item.title} description={item.description} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative overflow-hidden bg-stone-100 py-20">
        <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-amber-100 opacity-30"></div>
        <div className="absolute -right-32 top-0 h-64 w-64 rounded-full bg-amber-100 opacity-30"></div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex max-w-xs justify-center">
              <div className="h-[1px] w-12 self-center bg-amber-700"></div>
              <p className="mx-4 font-serif text-sm uppercase tracking-widest text-amber-700">Our Team</p>
              <div className="h-[1px] w-12 self-center bg-amber-700"></div>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-wide text-gray-900 md:text-4xl">
              Global{" "}
              <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                Talent
              </span>
              ,{" "}
              <span className="font-medium" style={{ color: "#b88c3f" }}>
                Shared Vision
              </span>
            </h2>
            <div className="mx-auto mt-2 h-px w-24 bg-amber-700 opacity-30"></div>
            <p className="mx-auto mt-8 max-w-3xl font-light leading-relaxed tracking-wide text-gray-600">
              Our diverse team brings together expertise from the United States, Italy, and Spain, creating a unique
              blend of perspectives that informs our global approach.
            </p>
          </motion.div>

          <div className="mt-16 flex justify-center gap-12">
            {teamMembers.map((member, index) => (
              <div className="w-full max-w-md" key={index}>
                <TeamMemberCard
                  name={member.name}
                  role={member.role}
                  country={member.country}
                  image={member.image}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Locations Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="relative mx-auto mb-6 flex max-w-xs justify-center">
              <div className="h-[1px] w-16 self-center bg-amber-700 opacity-60"></div>
              <p className="mx-4 font-serif text-sm uppercase tracking-wider text-amber-700 font-light">
                <span className="font-medium">T</span>eam <span className="font-medium">L</span>ocations
              </p>
              <div className="h-[1px] w-16 self-center bg-amber-700 opacity-60"></div>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-wide text-gray-900 md:text-4xl">
              Where Our{" "}
              <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                Team
              </span>{" "}
              <span className="font-medium" style={{ color: "#b88c3f" }}>
                Creates
              </span>
            </h2>
            <div className="mx-auto mt-2 h-px w-24 bg-amber-700 opacity-30"></div>
            <p className="mx-auto mt-8 max-w-3xl font-light leading-relaxed tracking-wide text-gray-600">
              Our talented team members work remotely from beautiful locations across the United States, Spain, and
              Italy, bringing diverse perspectives and cultural insights to every project we undertake.
            </p>
          </motion.div>

          <div className="h-[500px] md:h-[600px]">
            <GlobalPresenceMap />
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Globe className="h-10 w-10" />,
                title: "Remote-First Culture",
                description:
                  "Our distributed team collaborates seamlessly across time zones, bringing global perspectives to every project.",
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Cultural Diversity",
                description:
                  "Team members from different backgrounds contribute unique insights that enhance our creative approach.",
              },
              {
                icon: <Award className="h-10 w-10" />,
                title: "Local Expertise",
                description:
                  "Each team member brings specialized knowledge of their regional markets and cultural nuances.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-lg bg-white p-6 shadow-md"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl font-medium">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              <p className="mx-4 font-serif text-sm uppercase tracking-widest text-amber-300">Our Values</p>
              <div className="h-[1px] w-16 self-center bg-amber-300"></div>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-wide md:text-4xl lg:text-5xl">
              Principles that{" "}
              <span className="text-amber-300 font-normal" style={{ color: "#e6d19f" }}>
                Guide
              </span>{" "}
              <span className="font-medium" style={{ color: "#e6d19f" }}>
                Our Work
              </span>
            </h2>
            <div className="mx-auto mt-2 h-px w-24 bg-amber-300 opacity-30"></div>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                letter: "E",
                title: "Excellence",
                description: "We pursue perfection in every detail, from strategy to execution.",
              },
              {
                letter: "I",
                title: "Innovation",
                description: "We embrace new ideas and technologies to stay ahead of industry trends.",
              },
              {
                letter: "C",
                title: "Collaboration",
                description: "We believe in the power of diverse perspectives working together.",
              },
              {
                letter: "G",
                title: "Global Mindset",
                description: "We think beyond borders to create truly universal experiences.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg bg-stone-800 p-6 transition-all duration-300 hover:bg-stone-700"
              >
                <div className="absolute -right-4 -top-4 font-serif text-8xl font-bold text-amber-700/10 transition-all duration-300 group-hover:text-amber-700/20">
                  {value.letter}
                </div>
                <h3 className="relative z-10 font-serif text-2xl font-medium text-amber-300">{value.title}</h3>
                <div className="relative z-10 mt-2 h-px w-12 bg-amber-300/50"></div>
                <p className="relative z-10 mt-4 text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-light tracking-wide md:text-4xl">
              Join Our{" "}
              <span className="font-medium" style={{ color: "#e6d19f" }}>
                Global
              </span>{" "}
              <span className="font-normal" style={{ color: "#e6d19f" }}>
                Journey
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-amber-50">
              Partner with Auctus Apex and experience the difference that our international perspective and commitment
              to excellence can make for your brand.
            </p>

            <p className="mx-auto mt-2 font-serif text-sm italic text-amber-100">
              "Ex parvis magna" — From small beginnings come great things
            </p>

            <MagneticButton>
              <Button asChild size="lg" className="mt-8 bg-white text-amber-700 hover:bg-gray-100">
                <Link href="/book">Schedule Your Consultation</Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

