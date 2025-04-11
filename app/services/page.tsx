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
  const { language } = useLanguage()

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
                    {service.title[language]}
                  </motion.h2>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="prose prose-stone mx-auto max-w-none">
                <p className="lead text-lg text-gray-700">{service.description[language]}</p>

                <h3 className="font-serif text-xl font-medium mt-8 mb-4">
                  {language === "it" ? "Il Nostro Approccio" : language === "es" ? "Nuestro Enfoque" : "Our Approach"}
                </h3>
                <p>
                  {language === "it"
                    ? `In Auctus Apex, affrontiamo ${service.title[language].toLowerCase()} con un mix di principi consolidati nel tempo e tecniche all'avanguardia. Il nostro processo è meticolosamente elaborato per garantire risultati eccezionali che resistono alla prova del tempo, abbracciando al contempo l'innovazione moderna.`
                    : language === "es"
                      ? `En Auctus Apex, abordamos ${service.title[language].toLowerCase()} con una mezcla de principios consagrados y técnicas de vanguardia. Nuestro proceso está meticulosamente diseñado para garantizar resultados excepcionales que resistan el paso del tiempo mientras abrazan la innovación moderna.`
                      : `At Auctus Apex, we approach ${service.title[language].toLowerCase()} with a blend of time-honored principles and cutting-edge techniques. Our process is meticulously crafted to ensure exceptional results that stand the test of time while embracing modern innovation.`}
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
                      <h4 className="font-serif text-lg font-medium text-amber-800">{feature[language]}</h4>
                      <p className="mt-2 text-sm text-gray-600">
                        {language === "it"
                          ? "Il nostro team di esperti offre risultati eccezionali grazie a un'attenzione meticolosa ai dettagli e un'implementazione strategica."
                          : language === "es"
                            ? "Nuestro equipo de expertos ofrece resultados excepcionales a través de una atención meticulosa al detalle y una implementación estratégica."
                            : "Our expert team delivers exceptional results through meticulous attention to detail and strategic implementation."}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <h3 className="font-serif text-xl font-medium mt-8 mb-4">
                  {language === "it"
                    ? "Vetrina del Portfolio"
                    : language === "es"
                      ? "Exhibición de Portafolio"
                      : "Portfolio Showcase"}
                </h3>
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
                        <h5 className="font-serif text-lg">
                          {language === "it"
                            ? `Progetto ${i + 1}`
                            : language === "es"
                              ? `Proyecto ${i + 1}`
                              : `Project ${i + 1}`}
                        </h5>
                        <p className="text-sm text-gray-200">
                          {language === "it"
                            ? "Risultati eccezionali per il nostro cliente stimato"
                            : language === "es"
                              ? "Resultados excepcionales para nuestro valioso cliente"
                              : "Exceptional results for our valued client"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <Button asChild className="bg-amber-700 text-white hover:bg-amber-800">
                    <Link href="/book">
                      {language === "it"
                        ? "Prenota una Consulenza"
                        : language === "es"
                          ? "Reservar una Consulta"
                          : "Book a Consultation"}{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
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
    title: {
      en: "Social Media Marketing",
      it: "Marketing sui Social Media",
      es: "Marketing en Redes Sociales",
    },
    description: {
      en: "Strategic campaigns across Instagram, Facebook, TikTok, Snapchat, and other platforms to elevate your brand's digital presence and engagement.",
      it: "Campagne strategiche su Instagram, Facebook, TikTok, Snapchat e altre piattaforme per elevare la presenza digitale e il coinvolgimento del tuo brand.",
      es: "Campañas estratégicas en Instagram, Facebook, TikTok, Snapchat y otras plataformas para elevar la presencia digital y el compromiso de tu marca.",
    },
    features: [
      {
        en: "Platform-specific content strategies",
        it: "Strategie di contenuto specifiche per piattaforma",
        es: "Estrategias de contenido específicas para cada plataforma",
      },
      {
        en: "Audience targeting and growth",
        it: "Targeting e crescita del pubblico",
        es: "Segmentación y crecimiento de audiencia",
      },
      {
        en: "Engagement campaigns",
        it: "Campagne di coinvolgimento",
        es: "Campañas de participación",
      },
      {
        en: "Performance analytics",
        it: "Analisi delle prestazioni",
        es: "Análisis de rendimiento",
      },
      {
        en: "Trend optimization",
        it: "Ottimizzazione dei trend",
        es: "Optimización de tendencias",
      },
    ],
    image: "/placeholder.svg?height=800&width=1200",
    color: "from-amber-700 to-amber-900",
  },
  {
    icon: <Mail className="h-10 w-10" />,
    title: {
      en: "Email Marketing",
      it: "Email Marketing",
      es: "Marketing por Email",
    },
    description: {
      en: "Sophisticated email campaigns and newsletters designed to nurture customer relationships and drive conversions with elegant, personalized content.",
      it: "Campagne email e newsletter sofisticate progettate per coltivare le relazioni con i clienti e guidare le conversioni con contenuti eleganti e personalizzati.",
      es: "Campañas de correo electrónico y boletines sofisticados diseñados para nutrir las relaciones con los clientes e impulsar conversiones con contenido elegante y personalizado.",
    },
    features: [
      {
        en: "Custom newsletter design",
        it: "Design personalizzato delle newsletter",
        es: "Diseño personalizado de boletines",
      },
      {
        en: "Automated sequences",
        it: "Sequenze automatizzate",
        es: "Secuencias automatizadas",
      },
      {
        en: "List segmentation",
        it: "Segmentazione delle liste",
        es: "Segmentación de listas",
      },
      {
        en: "A/B testing",
        it: "Test A/B",
        es: "Pruebas A/B",
      },
      {
        en: "Performance reporting",
        it: "Reportistica delle prestazioni",
        es: "Informes de rendimiento",
      },
    ],
    image: "/placeholder.svg?height=800&width=1200",
    color: "from-stone-700 to-stone-900",
  },
  {
    icon: <BarChart3 className="h-10 w-10" />,
    title: {
      en: "Google Ads Marketing",
      it: "Marketing su Google Ads",
      es: "Marketing en Google Ads",
    },
    description: {
      en: "Precision-targeted advertising campaigns that position your brand prominently in search results and across the web to capture high-intent audiences.",
      it: "Campagne pubblicitarie mirate con precisione che posizionano il tuo brand in modo prominente nei risultati di ricerca e sul web per catturare audience con alta intenzione d'acquisto.",
      es: "Campañas publicitarias de precisión que posicionan tu marca de manera destacada en los resultados de búsqueda y en toda la web para captar audiencias con alta intención.",
    },
    features: [
      {
        en: "Keyword research & strategy",
        it: "Ricerca e strategia delle parole chiave",
        es: "Investigación y estrategia de palabras clave",
      },
      {
        en: "Ad copywriting",
        it: "Copywriting per annunci",
        es: "Redacción de anuncios",
      },
      {
        en: "Landing page optimization",
        it: "Ottimizzazione delle landing page",
        es: "Optimización de páginas de destino",
      },
      {
        en: "Conversion tracking",
        it: "Monitoraggio delle conversioni",
        es: "Seguimiento de conversiones",
      },
      {
        en: "ROI maximization",
        it: "Massimizzazione del ROI",
        es: "Maximización del ROI",
      },
    ],
    image: "/placeholder.svg?height=800&width=1200",
    color: "from-amber-800 to-stone-900",
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: {
      en: "Custom Website Development",
      it: "Sviluppo di Siti Web Personalizzati",
      es: "Desarrollo de Sitios Web Personalizados",
    },
    description: {
      en: "Bespoke website solutions with sophisticated user interfaces and powerful admin dashboards, crafted to embody your brand's unique essence.",
      it: "Soluzioni di siti web su misura con interfacce utente sofisticate e potenti dashboard di amministrazione, create per incarnare l'essenza unica del tuo brand.",
      es: "Soluciones de sitios web a medida con interfaces de usuario sofisticadas y potentes paneles de administración, diseñadas para encarnar la esencia única de tu marca.",
    },
    features: [
      {
        en: "Responsive design",
        it: "Design responsive",
        es: "Diseño responsive",
      },
      {
        en: "User & admin interfaces",
        it: "Interfacce utente e amministratore",
        es: "Interfaces de usuario y administrador",
      },
      {
        en: "E-commerce integration",
        it: "Integrazione e-commerce",
        es: "Integración de comercio electrónico",
      },
      {
        en: "Content management",
        it: "Gestione dei contenuti",
        es: "Gestión de contenido",
      },
      {
        en: "Analytics implementation",
        it: "Implementazione di analytics",
        es: "Implementación de análisis",
      },
    ],
    image: "/placeholder.svg?height=800&width=1200",
    color: "from-stone-800 to-black",
  },
  {
    icon: <PenTool className="h-10 w-10" />,
    title: {
      en: "Brand Identity Design",
      it: "Design dell'Identità di Marca",
      es: "Diseño de Identidad de Marca",
    },
    description: {
      en: "Comprehensive branding solutions that establish a distinctive and memorable presence, from logo design to complete visual identity systems.",
      it: "Soluzioni di branding complete che stabiliscono una presenza distintiva e memorabile, dal design del logo a sistemi completi di identità visiva.",
      es: "Soluciones integrales de marca que establecen una presencia distintiva y memorable, desde el diseño del logotipo hasta sistemas completos de identidad visual.",
    },
    features: [
      {
        en: "Logo & visual identity",
        it: "Logo e identità visiva",
        es: "Logotipo e identidad visual",
      },
      {
        en: "Brand guidelines",
        it: "Linee guida del brand",
        es: "Directrices de marca",
      },
      {
        en: "Marketing collateral",
        it: "Materiale di marketing",
        es: "Material de marketing",
      },
      {
        en: "Brand voice development",
        it: "Sviluppo della voce del brand",
        es: "Desarrollo de la voz de marca",
      },
      {
        en: "Positioning strategy",
        it: "Strategia di posizionamento",
        es: "Estrategia de posicionamiento",
      },
    ],
    image: "/placeholder.svg?height=800&width=1200",
    color: "from-amber-600 to-amber-800",
  },
  {
    icon: <MessageSquare className="h-10 w-10" />,
    title: {
      en: "Content Marketing",
      it: "Content Marketing",
      es: "Marketing de Contenidos",
    },
    description: {
      en: "Strategic content creation and distribution that positions your brand as an authority while engaging your target audience with valuable insights.",
      it: "Creazione e distribuzione strategica di contenuti che posiziona il tuo brand come un'autorità mentre coinvolge il tuo pubblico target con approfondimenti di valore.",
      es: "Creación y distribución estratégica de contenido que posiciona tu marca como una autoridad mientras involucra a tu público objetivo con información valiosa.",
    },
    features: [
      {
        en: "Content strategy",
        it: "Strategia dei contenuti",
        es: "Estrategia de contenido",
      },
      {
        en: "Blog & article writing",
        it: "Scrittura di blog e articoli",
        es: "Redacción de blogs y artículos",
      },
      {
        en: "SEO optimization",
        it: "Ottimizzazione SEO",
        es: "Optimización SEO",
      },
      {
        en: "Distribution planning",
        it: "Pianificazione della distribuzione",
        es: "Planificación de distribución",
      },
      {
        en: "Performance analysis",
        it: "Analisi delle prestazioni",
        es: "Análisis de rendimiento",
      },
    ],
    image: "/placeholder.svg?height=800&width=1200",
    color: "from-stone-600 to-stone-800",
  },
]

// Website showcase section
const websiteShowcase = [
  {
    title: {
      en: "Seibert Plumbing",
      it: "Seibert Plumbing",
      es: "Seibert Plumbing",
    },
    description: {
      en: "Premium plumbing service website with elegant design for this established company from Easton, Pennsylvania.",
      it: "Sito web di servizi idraulici premium con design elegante per questa azienda consolidata di Easton, Pennsylvania.",
      es: "Sitio web de servicios de fontanería premium con diseño elegante para esta empresa establecida de Easton, Pensilvania.",
    },
    image: "/images/seibert-plumbing.png",
    features: {
      en: ["Modern responsive design", "Service request system", "Client testimonials"],
      it: ["Design responsive moderno", "Sistema di richiesta servizi", "Testimonianze dei clienti"],
      es: ["Diseño responsive moderno", "Sistema de solicitud de servicios", "Testimonios de clientes"],
    },
  },
  {
    title: {
      en: "Luxury E-commerce",
      it: "E-commerce di Lusso",
      es: "E-commerce de Lujo",
    },
    description: {
      en: "Elegant online shopping experience with seamless checkout and inventory management.",
      it: "Esperienza di shopping online elegante con checkout fluido e gestione dell'inventario.",
      es: "Experiencia de compra en línea elegante con pago fluido y gestión de inventario.",
    },
    image: "/images/luxury-ecommerce.png",
    features: {
      en: ["Custom product filtering", "Integrated payment processing", "Admin dashboard"],
      it: ["Filtro prodotti personalizzato", "Elaborazione pagamenti integrata", "Dashboard di amministrazione"],
      es: ["Filtrado de productos personalizado", "Procesamiento de pagos integrado", "Panel de administración"],
    },
  },
]

export default function ServicesPage() {
  const { t, language } = useLanguage()
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
              {language === "it" ? "Creando" : language === "es" ? "Creando" : "Crafting"}
            </span>
            <span className="text-amber-300 font-normal" style={{ color: "#dbb975" }}>
              {language === "it"
                ? "Eccellenza Digitale"
                : language === "es"
                  ? "Excelencia Digital"
                  : "Digital Excellence"}
            </span>
            <span className="block font-medium" style={{ color: "#ffffff" }}>
              {language === "it" ? "Dal MMXXV" : language === "es" ? "Desde MMXXV" : "Since MMXXV"}
            </span>
          </TextReveal>

          <div className="mx-auto mt-6 max-w-2xl font-serif italic font-light text-taupe-100 tracking-wider leading-relaxed md:text-xl">
            {language === "it"
              ? "Eleva il tuo brand con la nostra suite completa di servizi di marketing e design, realizzati con meticolosa attenzione ai dettagli e un impegno per l'eccellenza."
              : language === "es"
                ? "Eleva tu marca con nuestra completa suite de servicios de marketing y diseño, elaborados con meticulosa atención al detalle y un compromiso con la excelencia."
                : "Elevate your brand with our comprehensive suite of marketing and design services, crafted with meticulous attention to detail and a commitment to excellence."}
          </div>

          <TextReveal delay={0.7}>
            <Button asChild size="lg" className="mt-10 bg-amber-700 text-white hover:bg-amber-800">
              <Link href="/book">
                {language === "it"
                  ? "Prenota una Consulenza"
                  : language === "es"
                    ? "Reservar una Consulta"
                    : "Book a Consultation"}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
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
                    {language === "it"
                      ? "La Nostra Filosofia"
                      : language === "es"
                        ? "Nuestra Filosofía"
                        : "Our Philosophy"}
                  </p>
                </div>
                <h2 className="font-serif text-3xl font-light tracking-wide text-gray-900 md:text-4xl">
                  <span className="block" style={{ color: "#b88c3f" }}>
                    {language === "it" ? "L'Arte della" : language === "es" ? "El Arte de la" : "The Art of"}
                  </span>
                  <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                    {language === "it"
                      ? "Maestria Digitale"
                      : language === "es"
                        ? "Maestría Digital"
                        : "Digital Craftsmanship"}
                  </span>
                </h2>
                <div className="mt-2 h-px w-24" style={{ backgroundColor: "#b88c3f", opacity: "0.3" }}></div>

                <p className="mt-6 text-gray-600">
                  {language === "it"
                    ? "In Auctus Apex, affrontiamo il marketing digitale e il web design come una forma d'arte, bilanciando bellezza estetica con precisione tecnica. I nostri artigiani creano esperienze digitali che catturano e generano risultati misurabili."
                    : language === "es"
                      ? "En Auctus Apex, abordamos el marketing digital y el diseño web como una forma de arte, equilibrando la belleza estética con la precisión técnica. Nuestros artesanos crean experiencias digitales que cautivan y generan resultados medibles."
                      : "At Auctus Apex, we approach digital marketing and web design as an art form—balancing aesthetic beauty with technical precision. Our artisans craft digital experiences that captivate and drive measurable results."}
                </p>

                <p className="mt-4 text-gray-600">
                  {language === "it"
                    ? "Una presenza digitale eccezionale emerge dalla fusione di principi di design senza tempo con tecnologia all'avanguardia. Ogni progetto riceve un'attenzione meticolosa ai dettagli e il nostro incrollabile impegno per l'eccellenza."
                    : language === "es"
                      ? "Una presencia digital excepcional surge de la combinación de principios de diseño atemporales con tecnología de vanguardia. Cada proyecto recibe una atención meticulosa al detalle y nuestro inquebrantable compromiso con la excelencia."
                      : "Exceptional digital presence emerges from blending timeless design principles with cutting-edge technology. Each project receives meticulous attention to detail and our unwavering commitment to excellence."}
                </p>

                <div className="mt-4 text-gray-600">
                  {language === "it"
                    ? "Utilizziamo algoritmi AI sofisticati e framework di codice proprietari per elevare i nostri contenuti, assicurando che ogni progetto si distingua con precisione e raffinatezza in un panorama digitale sempre più competitivo."
                    : language === "es"
                      ? "Utilizamos algoritmos de IA sofisticados y marcos de código propietarios para elevar nuestro contenido, asegurando que cada proyecto destaque con precisión y refinamiento en un panorama digital cada vez más competitivo."
                      : "We leverage sophisticated AI algorithms and proprietary code frameworks to elevate our content, ensuring each project stands out with precision and refinement in an increasingly competitive digital landscape."}
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
                    <span className="text-amber-300">"</span>
                    {language === "it"
                      ? "Il design non è solo ciò che appare e si percepisce. Il design è come funziona."
                      : language === "es"
                        ? "El diseño no es solo lo que se ve y se siente. El diseño es cómo funciona."
                        : "Design is not just what it looks like and feels like. Design is how it works."}
                    <span className="text-amber-300">"</span>
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
              {language === "it" ? (
                <>
                  I Nostri{" "}
                  <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                    Servizi
                  </span>{" "}
                  <span className="font-medium text-black">Distintivi</span>
                </>
              ) : language === "es" ? (
                <>
                  Nuestros{" "}
                  <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                    Servicios
                  </span>{" "}
                  <span className="font-medium text-black">Distinguidos</span>
                </>
              ) : (
                <>
                  Our{" "}
                  <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                    Distinguished
                  </span>{" "}
                  <span className="font-medium text-black">Services</span>
                </>
              )}
            </h2>
            <div className="mx-auto mt-2 h-px w-24 bg-amber-700 opacity-30"></div>
            <p className="mx-auto mt-8 max-w-3xl font-light leading-relaxed tracking-wide text-gray-600">
              {language === "it" ? (
                <>
                  Offriamo una suite completa di servizi di marketing e design su misura per elevare il tuo brand,
                  <span className="italic"> combinando principi senza tempo con innovazione all'avanguardia.</span>
                </>
              ) : language === "es" ? (
                <>
                  Ofrecemos una suite completa de servicios de marketing y diseño adaptados para elevar tu marca,
                  <span className="italic"> combinando principios atemporales con innovación de vanguardia.</span>
                </>
              ) : (
                <>
                  We offer a comprehensive suite of marketing and design services tailored to elevate your brand,
                  <span className="italic"> combining time-honored principles with cutting-edge innovation.</span>
                </>
              )}
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
                      <h3 className="font-serif text-2xl font-medium tracking-wide">{service.title[language]}</h3>
                      <div className="mt-2 h-px w-16 bg-amber-200 transition-all duration-300 group-hover:w-24 group-hover:bg-amber-400"></div>
                      <p className="mt-4 text-gray-600 flex-grow">{service.description[language]}</p>
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
              <p className="mx-4 font-serif text-sm uppercase tracking-widest text-amber-300">
                {language === "it"
                  ? "Portfolio di Siti Web"
                  : language === "es"
                    ? "Portfolio de Sitios Web"
                    : "Website Portfolio"}
              </p>
              <div className="h-[1px] w-16 self-center bg-amber-300"></div>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-wide text-white md:text-4xl lg:text-5xl">
              {language === "it" ? (
                <>
                  Esperienze{" "}
                  <span className="text-amber-300 font-normal" style={{ color: "#e6d19f" }}>
                    Digitali
                  </span>{" "}
                  <span className="font-medium" style={{ color: "#e6d19f" }}>
                    Eccezionali
                  </span>
                </>
              ) : language === "es" ? (
                <>
                  Experiencias{" "}
                  <span className="text-amber-300 font-normal" style={{ color: "#e6d19f" }}>
                    Digitales
                  </span>{" "}
                  <span className="font-medium" style={{ color: "#e6d19f" }}>
                    Excepcionales
                  </span>
                </>
              ) : (
                <>
                  Exceptional{" "}
                  <span className="text-amber-300 font-normal" style={{ color: "#e6d19f" }}>
                    Digital
                  </span>{" "}
                  <span className="font-medium" style={{ color: "#e6d19f" }}>
                    Experiences
                  </span>
                </>
              )}
            </h2>
            <div className="mx-auto mt-2 h-px w-24 bg-amber-300 opacity-30"></div>
            <p className="mx-auto mt-8 max-w-3xl font-light leading-relaxed tracking-wide text-gray-300">
              {language === "it"
                ? "Esplora il nostro portfolio di siti web su misura, ognuno realizzato con meticolosa attenzione ai dettagli e progettato per offrire esperienze utente eccezionali."
                : language === "es"
                  ? "Explora nuestro portfolio de sitios web a medida, cada uno elaborado con meticulosa atención al detalle y diseñado para ofrecer experiencias de usuario excepcionales."
                  : "Explore our portfolio of bespoke websites, each crafted with meticulous attention to detail and designed to deliver exceptional user experiences."}
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
                  <h3 className="font-serif text-2xl font-medium tracking-wide text-amber-300">
                    {project.title[language]}
                  </h3>
                  <div className="mt-2 h-px w-16 bg-amber-300 opacity-50"></div>

                  <p className="mt-4 text-gray-300">{project.description[language]}</p>

                  <ul className="mt-6 space-y-2">
                    {(project.features[language] || []).map((feature, i) => (
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
                  {language === "it"
                    ? "Discuti il Tuo Progetto"
                    : language === "es"
                      ? "Discute Tu Proyecto"
                      : "Discuss Your Project"}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
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
                <span className="font-medium">{language === "it" ? "M" : language === "es" ? "M" : "M"}</span>
                {language === "it" ? "etodologia" : language === "es" ? "etodología" : "ethodology"}
              </p>
              <div className="h-[1px] w-16 self-center" style={{ backgroundColor: "#96703a", opacity: "0.6" }}></div>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-wide text-gray-900 md:text-4xl">
              {language === "it" ? (
                <>
                  Il Nostro{" "}
                  <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                    Raffinato
                  </span>{" "}
                  <span className="font-medium" style={{ color: "black" }}>
                    Processo
                  </span>
                </>
              ) : language === "es" ? (
                <>
                  Nuestro{" "}
                  <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                    Refinado
                  </span>{" "}
                  <span className="font-medium" style={{ color: "black" }}>
                    Proceso
                  </span>
                </>
              ) : (
                <>
                  Our{" "}
                  <span className="text-amber-700 font-normal" style={{ color: "#b88c3f" }}>
                    Refined
                  </span>{" "}
                  <span className="font-medium" style={{ color: "black" }}>
                    Process
                  </span>
                </>
              )}
            </h2>
            <div className="mx-auto mt-2 h-px w-24 bg-amber-700 opacity-30"></div>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              {
                number: "01",
                title: {
                  en: "Discovery",
                  it: "Scoperta",
                  es: "Descubrimiento",
                },
                description: {
                  en: "We begin with a thorough exploration of your brand, objectives, and target audience to establish a solid foundation.",
                  it: "Iniziamo con un'esplorazione approfondita del tuo brand, obiettivi e pubblico target per stabilire una solida base.",
                  es: "Comenzamos con una exploración exhaustiva de tu marca, objetivos y público objetivo para establecer una base sólida.",
                },
              },
              {
                number: "02",
                title: {
                  en: "Strategy",
                  it: "Strategia",
                  es: "Estrategia",
                },
                description: {
                  en: "Our team develops a comprehensive strategy tailored to your specific needs and aligned with your business goals.",
                  it: "Il nostro team sviluppa una strategia completa su misura per le tue esigenze specifiche e allineata con i tuoi obiettivi aziendali.",
                  es: "Nuestro equipo desarrolla una estrategia integral adaptada a tus necesidades específicas y alineada con tus objetivos comerciales.",
                },
              },
              {
                number: "03",
                title: {
                  en: "Creation",
                  it: "Creazione",
                  es: "Creación",
                },
                description: {
                  en: "Our artisans craft your digital assets with meticulous attention to detail and a focus on both aesthetics and functionality.",
                  it: "I nostri artigiani creano i tuoi asset digitali con meticolosa attenzione ai dettagli e un focus sia sull'estetica che sulla funzionalità.",
                  es: "Nuestros artesanos crean tus activos digitales con meticulosa atención al detalle y un enfoque tanto en la estética como en la funcionalidad.",
                },
              },
              {
                number: "04",
                title: {
                  en: "Refinement",
                  it: "Perfezionamento",
                  es: "Refinamiento",
                },
                description: {
                  en: "We continuously optimize and refine our work to ensure exceptional performance and results that exceed expectations.",
                  it: "Ottimizziamo e perfezioniamo continuamente il nostro lavoro per garantire prestazioni eccezionali e risultati che superano le aspettative.",
                  es: "Optimizamos y refinamos continuamente nuestro trabajo para garantizar un rendimiento excepcional y resultados que superen las expectativas.",
                },
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
                  <h3 className="mt-2 font-serif text-2xl font-medium tracking-wide">{step.title[language]}</h3>
                  <div className="mt-2 h-px w-12 bg-amber-200 transition-all duration-300 group-hover:w-20 group-hover:bg-amber-400"></div>
                  <p className="mt-4 text-gray-600">{step.description[language]}</p>
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
              {language === "it" ? (
                <>
                  Pronto a{" "}
                  <span className="font-medium" style={{ color: "#e6d19f" }}>
                    Elevare
                  </span>{" "}
                  il Tuo{" "}
                  <span className="font-normal" style={{ color: "#e6d19f" }}>
                    Brand
                  </span>
                  ?
                </>
              ) : language === "es" ? (
                <>
                  ¿Listo para{" "}
                  <span className="font-medium" style={{ color: "#e6d19f" }}>
                    Elevar
                  </span>{" "}
                  Tu{" "}
                  <span className="font-normal" style={{ color: "#e6d19f" }}>
                    Marca
                  </span>
                  ?
                </>
              ) : (
                <>
                  Ready to{" "}
                  <span className="font-medium" style={{ color: "#e6d19f" }}>
                    Elevate
                  </span>{" "}
                  Your{" "}
                  <span className="font-normal" style={{ color: "#e6d19f" }}>
                    Brand
                  </span>
                  ?
                </>
              )}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-amber-50">
              {language === "it"
                ? "Prenota una consulenza oggi e scopri come Auctus Apex può trasformare la tua presenza digitale con i nostri servizi di marketing e web design su misura."
                : language === "es"
                  ? "Reserva una consulta hoy y descubre cómo Auctus Apex puede transformar tu presencia digital con nuestros servicios de marketing y diseño web a medida."
                  : "Book a consultation today and discover how Auctus Apex can transform your digital presence with our bespoke marketing and web design services."}
            </p>

            <p className="mx-auto mt-2 font-serif text-sm italic text-amber-100">
              "Ad astra per aspera" —{" "}
              {language === "it"
                ? "Alle stelle attraverso le difficoltà"
                : language === "es"
                  ? "A las estrellas a través de las dificultades"
                  : "To the stars through difficulties"}
            </p>

            <MagneticButton>
              <Button asChild size="lg" className="mt-8 bg-white text-amber-700 hover:bg-gray-100">
                <Link href="/book">
                  {language === "it"
                    ? "Prenota la Tua Consulenza Ora"
                    : language === "es"
                      ? "Reserva Tu Consulta Ahora"
                      : "Book Your Consultation Now"}
                </Link>
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
