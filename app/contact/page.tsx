"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Mail, Phone, MapPin, Clock, Send, ChevronDown } from "lucide-react"
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

// Add this at the top of the file, after the imports
const TESTING_MODE = false // Set to false when you verify your domain with Resend

export default function ContactPage() {
  const { t, language } = useLanguage()
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

  // Then update the handleSubmit function to include this information in the toast message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formValid) {
      toast({
        title: "Form incomplete",
        description: "Please fill out all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

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
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      console.log("Form submitted successfully:", data)
      setSubmitted(true)

      // Show different toast messages based on testing mode
      if (TESTING_MODE) {
        toast({
          title: "Message received",
          description:
            "Your message has been logged. In preview mode, emails are only sent to the developer's email address.",
          variant: "default",
        })
      } else {
        // Show a more prominent success message
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for contacting Auctus Apex. We'll get back to you shortly.",
          variant: "default",
          className: "bg-green-50 border-green-200",
        })
      }

      // Reset form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        service: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)

      // Specific error handling for network issues common in deployments
      if (error instanceof DOMException && error.name === "AbortError") {
        toast({
          title: "Request timeout",
          description: "The request took too long to complete. Please try again.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error sending message",
          description: error instanceof Error ? error.message : "Please try again later.",
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    validateForm()
  }, [formData])

  // Check for environment variables in Vercel deployment
  useEffect(() => {
    // This will help identify if environment variables are properly loaded in Vercel
    if (process.env.NODE_ENV === "production") {
      console.log("Running in production mode")

      // Check if we're running on Vercel
      if (process.env.VERCEL) {
        console.log("Running on Vercel deployment")
      }
    }
  }, [])

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
      question:
        language === "it"
          ? "Quali servizi offre Auctus Apex?"
          : language === "es"
            ? "¿Qué servicios ofrece Auctus Apex?"
            : "What services does Auctus Apex offer?",
      answer:
        language === "it"
          ? "Auctus Apex offre una suite completa di servizi di marketing e design, tra cui marketing sui social media, email marketing, marketing su Google Ads, sviluppo di siti web personalizzati, design dell'identità del brand e marketing dei contenuti. Ogni servizio è personalizzato per soddisfare le esigenze uniche dei nostri clienti."
          : language === "es"
            ? "Auctus Apex ofrece una suite completa de servicios de marketing y diseño, que incluyen marketing en redes sociales, marketing por correo electrónico, marketing en Google Ads, desarrollo de sitios web personalizados, diseño de identidad de marca y marketing de contenidos. Cada servicio está adaptado para satisfacer las necesidades únicas de nuestros clientes."
            : "Auctus Apex offers a comprehensive suite of marketing and design services, including social media marketing, email marketing, Google Ads marketing, custom website development, brand identity design, and content marketing. Each service is tailored to meet the unique needs of our clients.",
    },
    {
      question:
        language === "it"
          ? "Quanto tempo richiede un tipico progetto per essere completato?"
          : language === "es"
            ? "¿Cuánto tiempo tarda un proyecto típico en completarse?"
            : "How long does a typical project take to complete?",
      answer:
        language === "it"
          ? "Le tempistiche dei progetti variano a seconda della portata e della complessità del lavoro. Un progetto di web design richiede in genere 1-2 settimane, mentre una campagna di marketing completa potrebbe richiedere 2-4 settimane per essere sviluppata e implementata. Durante la nostra consulenza iniziale, ti forniremo una tempistica dettagliata specifica per il tuo progetto."
          : language === "es"
            ? "Los plazos de los proyectos varían según el alcance y la complejidad del trabajo. Un proyecto de diseño web suele tardar entre 1 y 2 semanas, mientras que una campaña de marketing integral puede tardar entre 2 y 4 semanas en desarrollarse e implementarse. Durante nuestra consulta inicial, le proporcionaremos un cronograma detallado específico para su proyecto."
            : "Project timelines vary depending on the scope and complexity of the work. A website design project typically takes 1-2 weeks, while a comprehensive marketing campaign might take 2-4 weeks to develop and implement. During our initial consultation, we'll provide you with a detailed timeline specific to your project.",
    },
    {
      question:
        language === "it"
          ? "Lavorate con clienti a livello internazionale?"
          : language === "es"
            ? "¿Trabajan con clientes a nivel internacional?"
            : "Do you work with clients internationally?",
      answer:
        language === "it"
          ? "Sì, lavoriamo con clienti a livello globale. Con membri del team negli Stati Uniti, in Italia e in Spagna, abbiamo la capacità di servire clienti in diversi fusi orari e contesti culturali. Il nostro team internazionale apporta diverse prospettive e approfondimenti a ogni progetto."
          : language === "es"
            ? "Sí, trabajamos con clientes a nivel mundial. Con miembros del equipo en los Estados Unidos, Italia y España, tenemos la capacidad de atender a clientes en diferentes zonas horarias y contextos culturales. Nuestro equipo internacional aporta diversas perspectivas y conocimientos a cada proyecto."
            : "Yes, we work with clients globally. With team members in the United States, Italy, and Spain, we have the capability to serve clients across different time zones and cultural contexts. Our international team brings diverse perspectives and insights to every project.",
    },
    {
      question:
        language === "it"
          ? "Qual è la vostra struttura dei prezzi?"
          : language === "es"
            ? "¿Cuál es su estructura de precios?"
            : "What is your pricing structure?",
      answer:
        language === "it"
          ? "I nostri prezzi sono personalizzati in base ai requisiti specifici di ogni progetto. Offriamo sia prezzi basati sul progetto che opzioni di retainer per servizi continuativi. Durante la nostra consulenza, discuteremo le tue esigenze e forniremo una proposta dettagliata che delinea tutti i costi e i risultati finali."
          : language === "es"
            ? "Nuestros precios se personalizan según los requisitos específicos de cada proyecto. Ofrecemos precios basados en proyectos y opciones de retención para servicios continuos. Durante nuestra consulta, discutiremos sus necesidades y le proporcionaremos una propuesta detallada que describe todos los costos y los resultados finales."
            : "Our pricing is customized based on the specific requirements of each project. We offer both project-based pricing and retainer options for ongoing services. During our consultation, we'll discuss your needs and provide a detailed proposal that outlines all costs and deliverables.",
    },
    {
      question:
        language === "it"
          ? "Come misurate il successo delle vostre campagne di marketing?"
          : language === "es"
            ? "¿Cómo miden el éxito de sus campañas de marketing?"
            : "How do you measure the success of your marketing campaigns?",
      answer:
        language === "it"
          ? "Stabiliamo KPI chiari all'inizio di ogni campagna e utilizziamo strumenti di analisi avanzati per monitorare le prestazioni. Report regolari ti tengono informato sui progressi e ottimizziamo continuamente le campagne in base alle informazioni sui dati per garantire il massimo ROI."
          : language === "es"
            ? "Establecemos KPI claros al comienzo de cada campaña y utilizamos herramientas de análisis avanzadas para rastrear el rendimiento. Los informes periódicos lo mantienen informado del progreso y optimizamos continuamente las campañas en función de la información de los datos para garantizar el máximo ROI."
            : "We establish clear KPIs at the beginning of each campaign and use advanced analytics tools to track performance. Regular reporting keeps you informed of progress, and we continuously optimize campaigns based on data insights to ensure maximum ROI.",
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
              // Add fallback background color in case image fails to load
              backgroundColor: "#1c1917",
            }}
            onError={(e) => {
              // If image fails to load, apply a darker background
              const target = e.target as HTMLElement
              target.style.backgroundColor = "#0c0a09"
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
            <span className="block" style={{ color: "#ffffff" }}>
              {language === "it" ? "Mandaci" : language === "es" ? "Comencemos una" : "Let's Start a"}
            </span>
            <span className="text-amber-300 font-normal" style={{ color: "#dbb975" }}>
              {language === "it" ? "un" : language === "es" ? "Conversación" : "Conversation"}
            </span>
            <span className="block" style={{ color: "#ffffff" }}>
              {language === "it" ? "Messaggio" : language === "es" ? "Hoy" : "Today"}
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
                  <h3 className="font-serif text-2xl font-medium text-amber-700">
                    {language === "it"
                      ? "Messaggio inviato ad Auctus!"
                      : language === "es"
                        ? "¡Mensaje enviado a Auctus!"
                        : "Message sent to Auctus!"}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {language === "it"
                      ? "Grazie per averci contattato. Ti risponderemo a breve."
                      : language === "es"
                        ? "Gracias por contactarnos. Te responderemos en breve."
                        : "Thank you for contacting us. We'll get back to you shortly."}
                  </p>
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
                          <SelectValue
                            placeholder={
                              language === "it"
                                ? "Seleziona un servizio"
                                : language === "es"
                                  ? "Selecciona un servicio"
                                  : "Select a service"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social-media">
                            {language === "it"
                              ? "Social Media Marketing"
                              : language === "es"
                                ? "Marketing en Redes Sociales"
                                : "Social Media Marketing"}
                          </SelectItem>
                          <SelectItem value="email-marketing">
                            {language === "it"
                              ? "Email Marketing"
                              : language === "es"
                                ? "Marketing por Email"
                                : "Email Marketing"}
                          </SelectItem>
                          <SelectItem value="google-ads">
                            {language === "it"
                              ? "Google Ads Marketing"
                              : language === "es"
                                ? "Marketing en Google Ads"
                                : "Google Ads Marketing"}
                          </SelectItem>
                          <SelectItem value="web-design">
                            {language === "it"
                              ? "Sviluppo di Siti Web Personalizzati"
                              : language === "es"
                                ? "Desarrollo de Sitios Web Personalizados"
                                : "Custom Website Development"}
                          </SelectItem>
                          <SelectItem value="brand-identity">
                            {language === "it"
                              ? "Design dell'Identità di Marca"
                              : language === "es"
                                ? "Diseño de Identidad de Marca"
                                : "Brand Identity Design"}
                          </SelectItem>
                          <SelectItem value="content-marketing">
                            {language === "it"
                              ? "Content Marketing"
                              : language === "es"
                                ? "Marketing de Contenidos"
                                : "Content Marketing"}
                          </SelectItem>
                          <SelectItem value="other">
                            {language === "it" ? "Altro" : language === "es" ? "Otro" : "Other"}
                          </SelectItem>
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

                  {TESTING_MODE && (
                    <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
                      <p className="text-sm text-amber-800">
                        <strong>
                          {language === "it"
                            ? "Modalità Anteprima:"
                            : language === "es"
                              ? "Modo Vista Previa:"
                              : "Preview Mode:"}
                        </strong>{" "}
                        {language === "it"
                          ? "Questo modulo è attualmente in modalità di test. Gli invii del modulo verranno registrati, ma le email verranno inviate solo all'indirizzo email dello sviluppatore fino al completamento della verifica del dominio."
                          : language === "es"
                            ? "Este formulario está actualmente en modo de prueba. Los envíos del formulario se registrarán, pero los correos electrónicos solo se enviarán a la dirección de correo electrónico del desarrollador hasta que se complete la verificación del dominio."
                            : "This form is currently in testing mode. Form submissions will be logged, but emails will only be sent to the developer's email address until domain verification is complete."}
                      </p>
                    </div>
                  )}

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
                    <p className="mt-1 text-gray-600">
                      {language === "it"
                        ? "Lunedì - Venerdì: 5:00 - 22:00"
                        : language === "es"
                          ? "Lunes - Viernes: 5:00 - 22:00"
                          : "Monday - Friday: 5:00 AM - 10:00 PM"}
                    </p>
                    <p className="text-gray-600">
                      {language === "it"
                        ? "Sabato: 8:00 - 21:00"
                        : language === "es"
                          ? "Sábado: 8:00 - 21:00"
                          : "Saturday: 8:00 AM - 9:00 PM"}
                    </p>
                    <p className="text-gray-600">
                      {language === "it"
                        ? "Domenica: Chiuso"
                        : language === "es"
                          ? "Domingo: Cerrado"
                          : "Sunday: Closed"}
                    </p>
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
                    <p className="text-gray-600">
                      {language === "it" ? "Stati Uniti" : language === "es" ? "Estados Unidos" : "United States"}
                    </p>
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
              {[
                {
                  question:
                    language === "it"
                      ? "Quali servizi offre Auctus Apex?"
                      : language === "es"
                        ? "¿Qué servicios ofrece Auctus Apex?"
                        : "What services does Auctus Apex offer?",
                  answer:
                    language === "it"
                      ? "Auctus Apex offre una suite completa di servizi di marketing e design, tra cui marketing sui social media, email marketing, marketing su Google Ads, sviluppo di siti web personalizzati, design dell'identità del brand e marketing dei contenuti. Ogni servizio è personalizzato per soddisfare le esigenze uniche dei nostri clienti."
                      : language === "es"
                        ? "Auctus Apex ofrece una suite completa de servicios de marketing y diseño, que incluyen marketing en redes sociales, marketing por correo electrónico, marketing en Google Ads, desarrollo de sitios web personalizados, diseño de identidad de marca y marketing de contenidos. Cada servicio está adaptado para satisfacer las necesidades únicas de nuestros clientes."
                        : "Auctus Apex offers a comprehensive suite of marketing and design services, including social media marketing, email marketing, Google Ads marketing, custom website development, brand identity design, and content marketing. Each service is tailored to meet the unique needs of our clients.",
                },
                {
                  question:
                    language === "it"
                      ? "Quanto tempo richiede un tipico progetto per essere completato?"
                      : language === "es"
                        ? "¿Cuánto tiempo tarda un proyecto típico en completarse?"
                        : "How long does a typical project take to complete?",
                  answer:
                    language === "it"
                      ? "Le tempistiche dei progetti variano a seconda della portata e della complessità del lavoro. Un progetto di web design richiede in genere 1-2 settimane, mentre una campagna di marketing completa potrebbe richiedere 2-4 settimane per essere sviluppata e implementata. Durante la nostra consulenza iniziale, ti forniremo una tempistica dettagliata specifica per il tuo progetto."
                      : language === "es"
                        ? "Los plazos de los proyectos varían según el alcance y la complejidad del trabajo. Un proyecto de diseño web suele tardar entre 1 y 2 semanas, mientras que una campaña de marketing integral puede tardar entre 2 y 4 semanas en desarrollarse e implementarse. Durante nuestra consulta inicial, le proporcionaremos un cronograma detallado específico para su proyecto."
                        : "Project timelines vary depending on the scope and complexity of the work. A website design project typically takes 1-2 weeks, while a comprehensive marketing campaign might take 2-4 weeks to develop and implement. During our initial consultation, we'll provide you with a detailed timeline specific to your project.",
                },
                {
                  question:
                    language === "it"
                      ? "Lavorate con clienti a livello internazionale?"
                      : language === "es"
                        ? "¿Trabajan con clientes a nivel internacional?"
                        : "Do you work with clients internationally?",
                  answer:
                    language === "it"
                      ? "Sì, lavoriamo con clienti a livello globale. Con membri del team negli Stati Uniti, in Italia e in Spagna, abbiamo la capacità di servire clienti in diversi fusi orari e contesti culturali. Il nostro team internazionale apporta diverse prospettive e approfondimenti a ogni progetto."
                      : language === "es"
                        ? "Sí, trabajamos con clientes a nivel mundial. Con miembros del equipo en los Estados Unidos, Italia y España, tenemos la capacidad de atender a clientes en diferentes zonas horarias y contextos culturales. Nuestro equipo internacional aporta diversas perspectivas y conocimientos a cada proyecto."
                        : "Yes, we work with clients globally. With team members in the United States, Italy, and Spain, we have the capability to serve clients across different time zones and cultural contexts. Our international team brings diverse perspectives and insights to every project.",
                },
                {
                  question:
                    language === "it"
                      ? "Qual è la vostra struttura dei prezzi?"
                      : language === "es"
                        ? "¿Cuál es su estructura de precios?"
                        : "What is your pricing structure?",
                  answer:
                    language === "it"
                      ? "I nostri prezzi sono personalizzati in base ai requisiti specifici di ogni progetto. Offriamo sia prezzi basati sul progetto che opzioni di retainer per servizi continuativi. Durante la nostra consulenza, discuteremo le tue esigenze e forniremo una proposta dettagliata che delinea tutti i costi e i risultati finali."
                      : language === "es"
                        ? "Nuestros precios se personalizan según los requisitos específicos de cada proyecto. Ofrecemos precios basados en proyectos y opciones de retención para servicios continuos. Durante nuestra consulta, discutiremos sus necesidades y le proporcionaremos una propuesta detallada que describe todos los costos y los resultados finales."
                        : "Our pricing is customized based on the specific requirements of each project. We offer both project-based pricing and retainer options for ongoing services. During our consultation, we'll discuss your needs and provide a detailed proposal that outlines all costs and deliverables.",
                },
                {
                  question:
                    language === "it"
                      ? "Come misurate il successo delle vostre campagne di marketing?"
                      : language === "es"
                        ? "¿Cómo miden el éxito de sus campañas de marketing?"
                        : "How do you measure the success of your marketing campaigns?",
                  answer:
                    language === "it"
                      ? "Stabiliamo KPI chiari all'inizio di ogni campagna e utilizziamo strumenti di analisi avanzati per monitorare le prestazioni. Report regolari ti tengono informato sui progressi e ottimizziamo continuamente le campagne in base alle informazioni sui dati per garantire il massimo ROI."
                      : language === "es"
                        ? "Establecemos KPI claros al comienzo de cada campaña y utilizamos herramientas de análisis avanzadas para rastrear el rendimiento. Los informes periódicos lo mantienen informado del progreso y optimizamos continuamente las campañas en función de la información de los datos para garantizar el máximo ROI."
                        : "We establish clear KPIs at the beginning of each campaign and use advanced analytics tools to track performance. Regular reporting keeps you informed of progress, and we continuously optimize campaigns based on data insights to ensure maximum ROI.",
                },
              ].map((item, index) => (
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
            <p className="text-gray-600">
              {language === "it"
                ? "Hai ancora domande? Siamo qui per aiutarti."
                : language === "es"
                  ? "¿Todavía tienes preguntas? Estamos aquí para ayudarte."
                  : "Still have questions? We're here to help."}
            </p>
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

