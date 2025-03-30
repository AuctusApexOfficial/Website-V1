"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Mail, Phone, MapPin, Clock, Send, Instagram, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import AnimatedCursor from "@/components/animated-cursor"
import ScrollProgress from "@/components/scroll-progress"
import TextReveal from "@/components/text-reveal"
import MagneticButton from "@/components/magnetic-button"
import { useLanguage } from "@/contexts/language-context"
import { toast } from "@/components/ui/use-toast"
import { generateCSRFToken } from "@/utils/security"

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const recaptchaRef = useRef<any>(null)
  const [csrfToken, setCsrfToken] = useState("")

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }))
  }

  const validateForm = () => {
    setFormValid(formData.name && formData.email && formData.subject && formData.message)
  }

  useEffect(() => {
    setCsrfToken(generateCSRFToken())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formValid) {
      alert("Please fill out all required fields.")
      return
    }

    setIsSubmitting(true)

    try {
      // Send the data to our API endpoint
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          ...formData,
          csrfToken,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to send message")
      }

      console.log("Form submitted:", formData)
      setSubmitted(true)
      toast({
        title: "Message sent successfully",
        description: "Thank you for contacting us. We'll get back to you shortly.",
        variant: "default",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Office locations
  const offices = [
    {
      city: "Cheyenne",
      country: "United States",
      address: "1021 E Lincolnway, Cheyenne, WY 82001",
      phone: "+1 (484) 536-9423",
      email: "us@auctusapex.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
    },
    {
      city: "Milan",
      country: "Italy",
      address: "Via Montenapoleone 8, 20121 Milan, Italy",
      phone: "+39 02 7634 5291",
      email: "italy@auctusapex.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
    },
    {
      city: "Madrid",
      country: "Spain",
      address: "Calle de Serrano 21, 28001 Madrid, Spain",
      phone: "+34 91 435 2287",
      email: "spain@auctusapex.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
    },
  ]

  // FAQ items
  const faqItems = [
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
        "Yes, we work with clients globally. With Auctus members in the United States, Italy, and Spain, we have the capability to serve clients across different time zones and cultural contexts. Our international team brings diverse perspectives and insights to every project.",
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
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      <AnimatedCursor />
      <ScrollProgress />
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/djlfraoi2/image/upload/v1743312230/h5kwur8d6keei9py8p6t.png)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/90 via-stone-900/70 to-stone-900/90"></div>
        </div>

        <motion.div
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
          style={{ opacity, scale }}
        >
          <TextReveal delay={0.1} className="mx-auto mb-4 flex max-w-xs justify-center">
            <div className="h-[1px] w-16 self-center" style={{ backgroundColor: "#e6d19f" }}></div>
            <p className="mx-4 font-serif text-sm uppercase tracking-widest" style={{ color: "#e6d19f" }}>
              {t("contact.getInTouch")}
            </p>
            <div className="h-[1px] w-16 self-center" style={{ backgroundColor: "#e6d19f" }}></div>
          </TextReveal>

          <TextReveal
            delay={0.3}
            className="font-serif text-4xl font-light tracking-wide text-white md:text-5xl lg:text-6xl"
          >
            <span className="block">
              <span style={{ color: "#ffffff" }}>Let&apos;s </span>
              <span style={{ color: "#dbb975" }}>Start </span>
              <span style={{ color: "#ffffff" }}>a </span>
              <span style={{ color: "#dbb975" }}>Conversation </span>
              <span style={{ color: "#ffffff" }}>Today</span>
            </span>
          </TextReveal>

          <TextReveal delay={0.5} className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            {t("contact.bespokeSolutions")}
          </TextReveal>

          <TextReveal delay={0.7}>
            <Button
              onClick={() => {
                const contactFormSection = document.querySelector("#contact-form")
                if (contactFormSection) {
                  contactFormSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="mt-10 rounded-full bg-transparent border border-amber-300 text-amber-300 hover:bg-amber-300/10"
              style={{ borderColor: "#e6d19f", color: "#e6d19f" }}
            >
              {t("nav.contact")} <ChevronDown className="ml-2 h-4 w-4" style={{ color: "#e6d19f" }} />
            </Button>
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
              const contactFormSection = document.querySelector("#contact-form")
              if (contactFormSection) {
                contactFormSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="cursor-pointer rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
            style={{ "--ring-color": "#e6d19f" } as React.CSSProperties}
            aria-label="Scroll to contact form"
          >
            <ChevronDown className="h-8 w-8 animate-bounce" style={{ color: "#e6d19f" }} />
          </button>
        </motion.div>
      </section>
      {/* Contact Form and Info Section */}
      <section id="contact-form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-6">
                <h2 className="font-serif text-3xl font-light tracking-wide text-gray-900" style={{ color: "#b88c3f" }}>
                  {t("contact.sendMessage")}
                </h2>
                <div className="mt-2 h-px w-24 bg-amber-700 opacity-30" style={{ backgroundColor: "#b88c3f" }} />
                <p className="mt-4 text-gray-600">{t("contact.formDescription")}</p>
              </div>

              {submitted ? (
                <div className="rounded-lg bg-amber-50 p-8 text-center border border-amber-200">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                    <Send className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-amber-700">{t("contact.messageSent")}</h3>
                  <p className="mt-2 text-gray-600">{t("contact.thankYou")}</p>
                  <Button
                    onClick={() => {
                      setSubmitted(false)
                      // Clear the form data
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                        service: "",
                      })
                      // Generate a new CSRF token
                      setCsrfToken(generateCSRFToken())
                    }}
                    className="mt-6 bg-amber-700 text-white hover:bg-amber-800"
                  >
                    {t("contact.sendAnother")}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="csrfToken" value={csrfToken} />
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block font-serif text-sm font-medium text-gray-700">
                        {t("contact.yourName")} <span className="text-amber-700">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => {
                          handleChange(e)
                          validateForm()
                        }}
                        required
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block font-serif text-sm font-medium text-gray-700">
                        {t("contact.emailAddress")} <span className="text-amber-700">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          handleChange(e)
                          validateForm()
                        }}
                        required
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-2 block font-serif text-sm font-medium text-gray-700">
                        {t("contact.phoneNumber")}
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          handleChange(e)
                          validateForm()
                        }}
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="mb-2 block font-serif text-sm font-medium text-gray-700">
                        {t("contact.serviceInterest")}
                      </label>
                      <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="border-amber-200 focus:ring-amber-400">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social-media">Social Media Marketing</SelectItem>
                          <SelectItem value="email-marketing">Email Marketing</SelectItem>
                          <SelectItem value="google-ads">Google Ads Marketing</SelectItem>
                          <SelectItem value="web-design">Custom Website Development</SelectItem>
                          <SelectItem value="brand-identity">Brand Identity Design</SelectItem>
                          <SelectItem value="content-marketing">Content Marketing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block font-serif text-sm font-medium text-gray-700">
                      {t("contact.subject")} <span className="text-amber-700">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => {
                        handleChange(e)
                        validateForm()
                      }}
                      required
                      className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block font-serif text-sm font-medium text-gray-700">
                      {t("contact.yourMessage")} <span className="text-amber-700">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => {
                        handleChange(e)
                        validateForm()
                      }}
                      required
                      className="min-h-[150px] border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-700 text-white hover:bg-amber-800"
                    disabled={isSubmitting || !formValid}
                  >
                    {isSubmitting ? t("contact.sending") : t("contact.send")}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-6">
                <h2 className="font-serif text-3xl font-light tracking-wide text-gray-900" style={{ color: "#b88c3f" }}>
                  {t("contact.contactInfo")}
                </h2>
                <div className="mt-2 h-px w-24 bg-amber-700 opacity-30" style={{ backgroundColor: "#b88c3f" }} />
                <p className="mt-4 text-gray-600">{t("contact.reachOut")}</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium">{t("contact.emailUs")}</h3>
                    <p className="mt-1 text-gray-600">{t("contact.generalInquiries")}</p>
                    <a href="mailto:info@auctusapex.com" className="text-amber-700 hover:text-amber-800">
                      info@auctusapex.com
                    </a>
                    <p className="mt-1 text-gray-600">{t("contact.support")}</p>
                    <a href="mailto:support@auctusapex.com" className="text-amber-700 hover:text-amber-800">
                      support@auctusapex.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium">{t("contact.callUs")}</h3>
                    <p className="mt-1 text-gray-600">{t("contact.mainOffice")}</p>
                    <a href="tel:+14845369423" className="text-amber-700 hover:text-amber-800">
                      +1 (484) 536-9423
                    </a>
                    <p className="mt-1 text-gray-600">{t("contact.customerSupport")}</p>
                    <a href="tel:+12035854982" className="text-amber-700 hover:text-amber-800">
                      +1 (203) 585-4982
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium">{t("contact.businessHours")}</h3>
                    <p className="mt-1 text-gray-600">Monday - Friday: 5:00 AM - 10:00 PM</p>
                    <p className="text-gray-600">Saturday: 8:00 AM - 9:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium">{t("contact.headquarters")}</h3>
                    <p className="mt-1 text-gray-600">30 N Gould St # 35974</p>
                    <p className="text-gray-600">Sheridan, WY 82801</p>
                    <p className="text-gray-600">United States</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-medium mb-3">{t("contact.connectWithUs")}</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/auctusapex/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 transition-colors hover:bg-amber-200"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@auctus.apex?_t=ZP-8v3BQBMYhV0&_r=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 transition-colors hover:bg-amber-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M9 12a4 4 0 1 0 5 4v-7a3 3 0 0 0 3 -3h-2.5"></path>
                        <path d="M15 5.5v4.5a5 5 0 0 1 -5 5"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="bg-stone-100 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex max-w-xs justify-center">
              <div className="h-[1px] w-12 self-center bg-amber-700"></div>
              <p className="mx-4 font-serif text-sm uppercase tracking-widest text-amber-700">{t("contact.faq")}</p>
              <div className="h-[1px] w-12 self-center bg-amber-700"></div>
            </div>
            <h2
              className="font-serif text-3xl font-light tracking-wide text-gray-900 md:text-4xl"
              style={{ color: "#e6d19f" }}
            >
              {t("contact.frequentlyAsked")}
            </h2>
            <div className="mx-auto mt-2 h-px w-24 bg-amber-700 opacity-30"></div>
            <p className="mx-auto mt-8 max-w-3xl font-light leading-relaxed tracking-wide text-gray-600">
              {t("contact.faqDescription")}
            </p>
          </motion.div>

          <div className="mt-12 mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-amber-200">
                  <AccordionTrigger className="font-serif text-lg font-medium text-gray-900 hover:text-amber-700">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">{t("contact.moreQuestions")}</p>
            <a
              href="mailto:info@auctusapex.com?subject=Question About..."
              className="inline-block mt-6 px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
            >
              {t("contact.askQuestion")} <ArrowRight className="inline-block ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-amber-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="font-serif text-3xl font-light tracking-wide md:text-4xl">
              {t("contact.transformPresence")}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-amber-50">{t("contact.bookConsultation")}</p>

            <p className="mx-auto mt-2 font-serif text-sm italic text-amber-100">{t("contact.wisdomQuote")}</p>

            <MagneticButton>
              <Button asChild size="lg" className="mt-8 bg-white text-amber-700 hover:bg-gray-100">
                <Link href="/book">{t("contact.bookYourConsultation")}</Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

