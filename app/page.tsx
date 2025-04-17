"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
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
import StandardLoading from "@/components/standard-loading"

export default function Home() {
  const { t, language } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [videoHeight, setVideoHeight] = useState<number>(0)
  const [expandedService, setExpandedService] = useState<number | null>(null)
  const [isHeroLoading, setIsHeroLoading] = useState(true)
  const [preloadError, setPreloadError] = useState(false)

  useEffect(() => {
    // Preload the hero video asset
    const preloadHeroVideo = () => {
      const linkEl = document.createElement("link")
      linkEl.rel = "preload"
      linkEl.href =
        "https://res.cloudinary.com/djlfraoi2/video/upload/q_auto:good,f_auto,c_fill,w_1920/v1742370300/ennljsgefrx8y9evxowb.mp4"
      linkEl.as = "video"
      linkEl.type = "video/mp4"
      linkEl.onerror = () => {
        console.error("Failed to preload video")
        setPreloadError(true)
      }
      document.head.appendChild(linkEl)
    }

    // Try to preload the video as early as possible
    if (document.readyState === "complete") {
      preloadHeroVideo()
    } else {
      window.addEventListener("load", preloadHeroVideo)
      return () => window.removeEventListener("load", preloadHeroVideo)
    }
  }, [])

  useEffect(() => {
    // Reduce the initial loading time to make the hero appear faster
    const timer = setTimeout(() => {
      setIsHeroLoading(false)
    }, 300) // Reduced from 800ms to 300ms for faster initial display

    return () => clearTimeout(timer)
  }, [])

  // Set initial video height based on aspect ratio
  useEffect(() => {
    // Just ensure elements are available
    const updateVideoHeight = () => {
      if (!heroRef.current || !contentRef.current) return
      // No actual height changes here to prevent CLS
    }

    // Initial calculation
    updateVideoHeight()

    // Recalculate on window resize, but don't change dimensions that would cause layout shift
    window.addEventListener("resize", updateVideoHeight)

    return () => {
      window.removeEventListener("resize", updateVideoHeight)
    }
  }, [])

  useEffect(() => {
    // Handle parallax scrolling effect
    const handleScroll = () => {
      try {
        if (heroRef.current && contentRef.current) {
          // Parallax factor - lower number = slower scroll
          const parallaxFactor = 0.3
          const scrollY = window.scrollY

          // Apply transform to hero section - move it at a slower rate
          heroRef.current.style.transform = `translateY(${scrollY * parallaxFactor}px)`
        }
      } catch (error) {
        console.error("Error handling scroll:", error)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

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

  // Show loading screen if hero is loading
  if (isHeroLoading) {
    return <StandardLoading />
  }

  return (
    <div className="flex min-h-screen flex-col relative">
      {/* Hero Section - Parallax */}
      <section
        ref={heroRef}
        className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-taupe-950 text-white will-change-transform"
        style={{
          height: "100vh", // Use viewport height instead of calculated height
          minHeight: "600px", // Set minimum height to prevent small screens from breaking layout
        }}
      >
        <div ref={videoContainerRef} className="absolute inset-0 z-0 opacity-30">
          <HeroAnimation onLoadingChange={(loading) => setIsHeroLoading(loading)} />
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
                <span className="mr-2">
                  {language === "it"
                    ? "Prenota una Consulenza"
                    : language === "es"
                      ? "Reservar una Consulta"
                      : t("nav.book")}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
          </div>
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
              {language === "it" ? (
                <h2 className="font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl lg:text-5xl">
                  Un <span className="font-normal text-gold-600">Patrimonio</span> di{" "}
                  <span className="font-medium">Eccellenza</span>
                </h2>
              ) : language === "es" ? (
                <h2 className="font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl lg:text-5xl">
                  Un <span className="font-normal text-gold-600">Legado</span> de{" "}
                  <span className="font-medium">Excelencia</span>
                </h2>
              ) : (
                <h2 className="font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl lg:text-5xl">
                  A <span className="font-normal text-gold-600">Legacy</span> of{" "}
                  <span className="font-medium">Excellence</span>
                </h2>
              )}
              <div className="mx-auto mt-2 h-px w-24 bg-gold-600 opacity-30"></div>
              {language === "it" ? (
                <p className="mx-auto mt-8 max-w-2xl font-light leading-relaxed tracking-wide text-taupe-700">
                  Auctus Apex è fondato su principi senza tempo di qualità, artigianato e servizio eccezionale. Uniamo
                  valori classici con innovazione moderna per creare soluzioni di marketing e design che resistono alla
                  prova del tempo. Il nostro approccio onora la tradizione mentre abbraccia il futuro.
                </p>
              ) : language === "es" ? (
                <p className="mx-auto mt-8 max-w-2xl font-light leading-relaxed tracking-wide text-taupe-700">
                  Auctus Apex se basa en principios atemporales de calidad, artesanía y servicio excepcional. Combinamos
                  valores clásicos con innovación moderna para crear soluciones de marketing y diseño que resisten la
                  prueba del tiempo. Nuestro enfoque honra la tradición mientras abraza el futuro.
                </p>
              ) : (
                <p className="mx-auto mt-8 max-w-2xl font-light leading-relaxed tracking-wide text-taupe-700">
                  Auctus Apex is founded on timeless principles of quality, craftsmanship, and exceptional service. We
                  blend classical values with modern innovation to create marketing and design solutions that stand the
                  test of time. Our approach honors tradition while embracing the future.
                </p>
              )}

              <div className="mt-16 grid gap-8 md:grid-cols-3">
                <div className="group flex flex-col items-center relative">
                  <div className="absolute inset-0 bg-gold-50 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"></div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-200 shadow-sm group-hover:shadow-gold-200/30 transition-all duration-300">
                    <Clock className="h-8 w-8 text-gold-700" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-medium tracking-wide">
                    {language === "it"
                      ? "Tradizione Consolidata"
                      : language === "es"
                        ? "Tradición Establecida"
                        : "Established Tradition"}
                  </h3>
                  <div className="mx-auto mt-2 h-px w-12 bg-gold-200"></div>
                  <p className="mt-4 font-light leading-relaxed text-taupe-700">
                    {language === "it"
                      ? "Fondati con un impegno per la qualità senza tempo e l'eccellenza del servizio."
                      : language === "es"
                        ? "Fundados con un compromiso de calidad atemporal y excelencia en el servicio."
                        : "Founded with a commitment to timeless quality and service excellence."}
                  </p>
                </div>

                <div className="group flex flex-col items-center relative">
                  <div className="absolute inset-0 bg-gold-50 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"></div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-200 shadow-sm group-hover:shadow-gold-200/30 transition-all duration-300">
                    <Award className="h-8 w-8 text-gold-700" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-medium tracking-wide">
                    {language === "it"
                      ? "Competenza Comprovata"
                      : language === "es"
                        ? "Experiencia Probada"
                        : "Proven Expertise"}
                  </h3>
                  <div className="mx-auto mt-2 h-px w-12 bg-gold-200"></div>
                  <p className="mt-4 font-light leading-relaxed text-taupe-700">
                    {language === "it"
                      ? "Team di esperti che creano brand e strategie di marketing distintive."
                      : language === "es"
                        ? "Equipo de expertos que crean marcas y estrategias de marketing distinguidas."
                        : "Expert team crafting distinguished brands and marketing strategies."}
                  </p>
                </div>

                <div className="group flex flex-col items-center relative">
                  <div className="absolute inset-0 bg-gold-50 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"></div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-200 shadow-sm group-hover:shadow-gold-200/30 transition-all duration-300">
                    <Shield className="h-8 w-8 text-gold-700" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-medium tracking-wide">
                    {language === "it"
                      ? "Relazioni Durature"
                      : language === "es"
                        ? "Relaciones Duraderas"
                        : "Enduring Relationships"}
                  </h3>
                  <div className="mx-auto mt-2 h-px w-12 bg-gold-200"></div>
                  <p className="mt-4 font-light leading-relaxed text-taupe-700">
                    {language === "it"
                      ? "Costruiamo partnership durature con clienti che apprezzano tradizione e qualità."
                      : language === "es"
                        ? "Construimos asociaciones duraderas con clientes que valoran la herencia y la calidad."
                        : "Building lasting partnerships with clients who value heritage and quality."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative bg-taupe-100 py-20 overflow-hidden">
          <MarbleBackground variant="medium" opacity={0.08} />
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent"></div>

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
            {language === "it" ? (
              <h2 className="text-center font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl lg:text-5xl">
                I Nostri <span className="text-gold-600 font-normal">Servizi</span>{" "}
                <span className="font-medium">Premium</span>
              </h2>
            ) : language === "es" ? (
              <h2 className="text-center font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl lg:text-5xl">
                Nuestros <span className="text-gold-600 font-normal">Servicios</span>{" "}
                <span className="font-medium">Premium</span>
              </h2>
            ) : (
              <h2 className="text-center font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl lg:text-5xl">
                Our <span className="text-gold-600 font-normal">Premium</span>{" "}
                <span className="font-medium">Services</span>
              </h2>
            )}
            <div className="mx-auto mt-2 h-px w-24 bg-gold-600 opacity-30"></div>
            {language === "it" ? (
              <p className="mx-auto mt-8 max-w-3xl text-center font-light leading-relaxed tracking-wide text-taupe-700">
                Offriamo una gamma completa di servizi di marketing e design su misura per elevare il tuo brand,
                <span className="italic"> combinando principi senza tempo con innovazione all'avanguardia.</span>
              </p>
            ) : language === "es" ? (
              <p className="mx-auto mt-8 max-w-3xl text-center font-light leading-relaxed tracking-wide text-taupe-700">
                Ofrecemos una amplia gama de servicios de marketing y diseño adaptados para elevar tu marca,
                <span className="italic"> combinando principios atemporales con innovación de vanguardia.</span>
              </p>
            ) : (
              <p className="mx-auto mt-8 max-w-3xl text-center font-light leading-relaxed tracking-wide text-taupe-700">
                We offer a comprehensive suite of marketing and design services tailored to elevate your brand,
                <span className="italic"> combining time-honored principles with cutting-edge innovation.</span>
              </p>
            )}

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
                  icon: <PenTool className="h-10 w-10" />,
                  title: {
                    en: "AI Automation",
                    it: "Automazione AI",
                    es: "Automatización con IA",
                  },
                  description: {
                    en: "Cutting-edge AI solutions that automate processes and enhance productivity for your business.",
                    it: "Soluzioni AI all'avanguardia che automatizzano i processi e migliorano la produttività per la tua attività.",
                    es: "Soluciones de IA de vanguardia que automatizan procesos y mejoran la productividad para tu negocio.",
                  },
                  details: {
                    en: "Our AI automation services include workflow optimization, custom AI model development, chatbot implementation, data analysis automation, and predictive analytics. We help you leverage artificial intelligence to streamline operations and drive growth.",
                    it: "I nostri servizi di automazione AI includono ottimizzazione del flusso di lavoro, sviluppo di modelli AI personalizzati, implementazione di chatbot, automazione dell'analisi dei dati e analisi predittiva. Ti aiutiamo a sfruttare l'intelligenza artificiale per ottimizzare le operazioni e guidare la crescita.",
                    es: "Nuestros servicios de automatización con IA incluyen optimización de flujos de trabajo, desarrollo de modelos de IA personalizados, implementación de chatbots, automatización de análisis de datos y análisis predictivo. Te ayudamos a aprovechar la inteligencia artificial para optimizar operaciones e impulsar el crecimiento.",
                  },
                },
                {
                  icon: <Smartphone className="h-10 w-10" />,
                  title: {
                    en: "Social Media Marketing",
                    it: "Marketing sui Social Media",
                    es: "Marketing en Redes Sociales",
                  },
                  description: {
                    en: "Strategic campaigns across Instagram, Facebook, TikTok, Snapchat, and other platforms to elevate your brand's digital presence.",
                    it: "Campagne strategiche su Instagram, Facebook, TikTok, Snapchat e altre piattaforme per elevare la presenza digitale del tuo brand.",
                    es: "Campañas estratégicas en Instagram, Facebook, TikTok, Snapchat y otras plataformas para elevar la presencia digital de tu marca.",
                  },
                  details: {
                    en: "Our social media marketing services include content creation, community management, paid advertising, influencer partnerships, and detailed analytics reporting. We create tailored strategies that align with your brand voice and business objectives.",
                    it: "I nostri servizi di marketing sui social media includono creazione di contenuti, gestione della community, pubblicità a pagamento, partnership con influencer e reportistica analitica dettagliata. Creiamo strategie su misura che si allineano con la voce del tuo brand e gli obiettivi aziendali.",
                    es: "Nuestros servicios de marketing en redes sociales incluyen creación de contenido, gestión de comunidades, publicidad pagada, asociaciones con influencers e informes analíticos detallados. Creamos estrategias personalizadas que se alinean con la voz de tu marca y los objetivos comerciales.",
                  },
                },
                {
                  icon: <Mail className="h-10 w-10" />,
                  title: {
                    en: "Email Marketing",
                    it: "Email Marketing",
                    es: "Marketing por Email",
                  },
                  description: {
                    en: "Sophisticated email campaigns and newsletters designed to nurture customer relationships and drive conversions.",
                    it: "Campagne email e newsletter sofisticate progettate per coltivare le relazioni con i clienti e generare conversioni.",
                    es: "Campañas de correo electrónico y boletines sofisticados diseñados para fomentar las relaciones con los clientes y generar conversiones.",
                  },
                  details: {
                    en: "Our email marketing services include campaign strategy, template design, list segmentation, A/B testing, automation sequences, and performance analytics. We help you build meaningful connections with your audience through personalized communication.",
                    it: "I nostri servizi di email marketing includono strategia di campagna, design di template, segmentazione delle liste, test A/B, sequenze di automazione e analisi delle prestazioni. Ti aiutiamo a costruire connessioni significative con il tuo pubblico attraverso una comunicazione personalizzata.",
                    es: "Nuestros servicios de marketing por correo electrónico incluyen estrategia de campaña, diseño de plantillas, segmentación de listas, pruebas A/B, secuencias de automatización y análisis de rendimiento. Te ayudamos a construir conexiones significativas con tu audiencia a través de una comunicación personalizada.",
                  },
                },
                {
                  icon: <BarChart3 className="h-10 w-10" />,
                  title: {
                    en: "Google Ads Marketing",
                    it: "Marketing con Google Ads",
                    es: "Marketing en Google Ads",
                  },
                  description: {
                    en: "Precision-targeted advertising campaigns that position your brand prominently in search results to capture high-intent audiences.",
                    it: "Campagne pubblicitarie mirate con precisione che posizionano il tuo brand in modo prominente nei risultati di ricerca per catturare audience con alta intenzione d'acquisto.",
                    es: "Campañas publicitarias de precisión que posicionan tu marca de manera destacada en los resultados de búsqueda para captar audiencias con alta intención de compra.",
                  },
                  details: {
                    en: "Our Google Ads services include keyword research, ad copywriting, landing page optimization, bid management, conversion tracking, and ROI analysis. We create campaigns that maximize your visibility and drive qualified traffic to your website.",
                    it: "I nostri servizi di Google Ads includono ricerca di parole chiave, copywriting per annunci, ottimizzazione delle landing page, gestione delle offerte, tracciamento delle conversioni e analisi del ROI. Creiamo campagne che massimizzano la tua visibilità e portano traffico qualificato al tuo sito web.",
                    es: "Nuestros servicios de Google Ads incluyen investigación de palabras clave, redacción de anuncios, optimización de páginas de destino, gestión de pujas, seguimiento de conversiones y análisis de ROI. Creamos campañas que maximizan tu visibilidad y dirigen tráfico cualificado a tu sitio web.",
                  },
                },
                {
                  icon: <Globe className="h-10 w-10" />,
                  title: {
                    en: "Custom Website Development",
                    it: "Sviluppo di Siti Web Personalizzati",
                    es: "Desarrollo de Sitios Web Personalizados",
                  },
                  description: {
                    en: "Bespoke website solutions with sophisticated user interfaces and powerful admin dashboards tailored to your needs.",
                    it: "Soluzioni web su misura con interfacce utente sofisticate e potenti dashboard di amministrazione adattate alle tue esigenze.",
                    es: "Soluciones de sitios web a medida con interfaces de usuario sofisticadas y potentes paneles de administración adaptados a tus necesidades.",
                  },
                  details: {
                    en: "Our website development services include UX/UI design, responsive development, content management systems, e-commerce functionality, performance optimization, and ongoing maintenance. We create websites that are both visually stunning and functionally powerful.",
                    it: "I nostri servizi di sviluppo web includono design UX/UI, sviluppo responsive, sistemi di gestione dei contenuti, funzionalità e-commerce, ottimizzazione delle prestazioni e manutenzione continua. Creiamo siti web che sono sia visivamente stupefacenti che funzionalmente potenti.",
                    es: "Nuestros servicios de desarrollo web incluyen diseño UX/UI, desarrollo responsive, sistemas de gestión de contenidos, funcionalidad de comercio electrónico, optimización de rendimiento y mantenimiento continuo. Creamos sitios web que son tanto visualmente impresionantes como funcionalmente potentes.",
                  },
                },
                {
                  icon: <Palette className="h-10 w-10" />,
                  title: {
                    en: "Content Marketing",
                    it: "Marketing dei Contenuti",
                    es: "Marketing de Contenidos",
                  },
                  description: {
                    en: "Strategic content creation that positions your brand as an authority while engaging your target audience.",
                    it: "Creazione strategica di contenuti che posiziona il tuo brand come un'autorità mentre coinvolge il tuo pubblico target.",
                    es: "Creación estratégica de contenido que posiciona tu marca como una autoridad mientras involucra a tu público objetivo.",
                  },
                  details: {
                    en: "Our content marketing services include content strategy, blog writing, social media content, email newsletters, video production, and distribution planning. We create valuable content that attracts, engages, and converts your target audience.",
                    it: "I nostri servizi di marketing dei contenuti includono strategia dei contenuti, scrittura di blog, contenuti per social media, newsletter via email, produzione video e pianificazione della distribuzione. Creiamo contenuti di valore che attraggono, coinvolgono e convertono il tuo pubblico target.",
                    es: "Nuestros servicios de marketing de contenidos incluyen estrategia de contenido, redacción de blogs, contenido para redes sociales, boletines por correo electrónico, producción de videos y planificación de distribución. Creamos contenido valioso que atrae, involucra y convierte a tu público objetivo.",
                  },
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
                        title={service.title[language] || service.title.en}
                        description={
                          expandedService === index
                            ? `${service.description[language] || service.description.en} ${service.details[language] || service.details.en}`
                            : service.description[language] || service.description.en
                        }
                      />
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
                  <span className="font-medium">{language === "it" ? "M" : language === "es" ? "M" : "M"}</span>
                  {language === "it" ? "etodologia" : language === "es" ? "etodología" : "ethodology"}
                </p>
                <div className="h-[1px] w-16 self-center bg-gold-600 opacity-60"></div>
              </div>
              <h2 className="font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl">
                {language === "it" ? (
                  <>
                    Il Nostro <span className="text-gold-600 font-normal">Raffinato</span>{" "}
                    <span className="font-medium">Processo</span>
                  </>
                ) : language === "es" ? (
                  <>
                    Nuestro <span className="text-gold-600 font-normal">Refinado</span>{" "}
                    <span className="font-medium">Proceso</span>
                  </>
                ) : (
                  <>
                    Our <span className="text-gold-600 font-normal">Refined</span>{" "}
                    <span className="font-medium">Process</span>
                  </>
                )}
              </h2>
              <div className="mx-auto mt-2 h-px w-24 bg-gold-600 opacity-30"></div>
            </motion.div>

            {/* Process Steps */}
            <div className="mt-16 grid gap-8 md:grid-cols-4">
              {[
                {
                  number: "01",
                  title: language === "it" ? "Scoperta" : language === "es" ? "Descubrimiento" : "Discovery",
                  description:
                    language === "it"
                      ? "Iniziamo con un'esplorazione approfondita del tuo brand, obiettivi e pubblico target per stabilire una solida base."
                      : language === "es"
                        ? "Comenzamos con una exploración exhaustiva de tu marca, objetivos y público objetivo para establecer una base sólida."
                        : "We begin with a thorough exploration of your brand, objectives, and target audience to establish a solid foundation.",
                },
                {
                  number: "02",
                  title: language === "it" ? "Strategia" : language === "es" ? "Estrategia" : "Strategy",
                  description:
                    language === "it"
                      ? "Il nostro team sviluppa una strategia completa su misura per le tue esigenze specifiche e allineata con i tuoi obiettivi aziendali."
                      : language === "es"
                        ? "Nuestro equipo desarrolla una estrategia integral adaptada a tus necesidades específicas y alineada con tus objetivos comerciales."
                        : "Our team develops a comprehensive strategy tailored to your specific needs and aligned with your business goals.",
                },
                {
                  number: "03",
                  title: language === "it" ? "Creazione" : language === "es" ? "Creación" : "Creation",
                  description:
                    language === "it"
                      ? "I nostri artigiani creano i tuoi asset digitali con meticolosa attenzione ai dettagli e un focus sia sull'estetica che sulla funzionalità."
                      : language === "es"
                        ? "Nuestros artesanos crean tus activos digitales con meticulosa atención al detalle y un enfoque tanto en la estética como en la funcionalidad."
                        : "Our artisans craft your digital assets with meticulous attention to detail and a focus on both aesthetics and functionality.",
                },
                {
                  number: "04",
                  title: language === "it" ? "Perfezionamento" : language === "es" ? "Refinamiento" : "Refinement",
                  description:
                    language === "it"
                      ? "Ottimizziamo e perfezioniamo continuamente il nostro lavoro per garantire prestazioni eccezionali e risultati che superano le aspettative."
                      : language === "es"
                        ? "Optimizamos y refinamos continuamente nuestro trabajo para garantizar un rendimiento excepcional y resultados que superen las expectativas."
                        : "We continuously optimize and refine our work to ensure exceptional performance and results that exceed expectations.",
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
                <div className="absolute -top-4 -left-4 w-32 h-32 border-t border-l border-gold-200/40"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b border-r border-gold-200/40"></div>

                <div className="mb-4 inline-flex">
                  <div className="h-[1px] w-12 self-center bg-gold-600"></div>
                  <p className="ml-4 font-serif text-sm uppercase tracking-wider text-gold-700">
                    {language === "it"
                      ? "Perché Sceglierci"
                      : language === "es"
                        ? "Por Qué Elegirnos"
                        : "Cur Nos Eligere"}
                  </p>
                  <div className="h-[1px] w-12 self-center bg-gold-600"></div>
                </div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-taupe-900 md:text-4xl">
                  {language === "it" ? (
                    <>
                      Perché Scegliere <span className="text-gold-600">Auctus Apex</span>
                    </>
                  ) : language === "es" ? (
                    <>
                      Por Qué Elegir <span className="text-gold-600">Auctus Apex</span>
                    </>
                  ) : (
                    <>
                      Why Choose <span className="text-gold-600">Auctus Apex</span>
                    </>
                  )}
                </h2>
                <p className="mt-4 text-taupe-700">
                  {language === "it"
                    ? "Combiniamo eleganza senza tempo con innovazione all'avanguardia per offrire risultati che superano le aspettative. Il nostro approccio è radicato nei principi classici di qualità, integrità e meticolosa attenzione ai dettagli."
                    : language === "es"
                      ? "Combinamos elegancia atemporal con innovación de vanguardia para ofrecer resultados que superan las expectativas. Nuestro enfoque está arraigado en los principios clásicos de calidad, integridad y meticulosa atención al detalle."
                      : "We combine timeless elegance with cutting-edge innovation to deliver results that exceed expectations. Our approach is rooted in classical principles of quality, integrity, and meticulous attention to detail."}
                </p>

                <GoldDivider variant="double" className="my-6" />

                <ul className="mt-8 space-y-4">
                  {[
                    language === "it"
                      ? "Strategie su misura adattate alle tue esigenze uniche"
                      : language === "es"
                        ? "Estrategias personalizadas adaptadas a tus necesidades únicas"
                        : "Bespoke strategies tailored to your unique needs",
                    language === "it"
                      ? "Team dedicato di esperti del settore con decenni di esperienza combinata"
                      : language === "es"
                        ? "Equipo dedicado de expertos de la industria con décadas de experiencia combinada"
                        : "Dedicated team of industry experts with decades of combined experience",
                    language === "it"
                      ? "Comprovata esperienza di successo sin dalla nostra fondazione"
                      : language === "es"
                        ? "Historial probado de éxito desde nuestra fundación"
                        : "Proven track record of success since our founding",
                    language === "it"
                      ? "Impegno per l'eccellenza e l'innovazione in tutto ciò che facciamo"
                      : language === "es"
                        ? "Compromiso con la excelencia y la innovación en todo lo que hacemos"
                        : "Commitment to excellence and innovation in everything we do",
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
                  <Link
                    href="/book"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                  >
                    {language === "it"
                      ? "Prenota la Tua Consulenza"
                      : language === "es"
                        ? "Programa Tu Consulta"
                        : "Schedule Your Consultation"}
                  </Link>
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
                <p className="mx-4 font-serif text-sm uppercase tracking-wider text-gold-700">
                  {language === "it" ? "Approfondimenti" : language === "es" ? "Perspectivas" : "Insights"}
                </p>
                <div className="h-[1px] w-16 self-center bg-gold-600"></div>
              </div>
              <h2 className="font-serif text-3xl font-light tracking-wide text-taupe-900 md:text-4xl lg:text-5xl">
                {language === "it" ? (
                  <>
                    Ultimi dal Nostro <span className="text-gold-600 font-normal">Blog</span>
                  </>
                ) : language === "es" ? (
                  <>
                    Lo Último de Nuestro <span className="text-gold-600 font-normal">Blog</span>
                  </>
                ) : (
                  <>
                    Latest from Our <span className="text-gold-600 font-normal">Blog</span>
                  </>
                )}
              </h2>
              <div className="mx-auto mt-2 h-px w-24 bg-gold-600 opacity-30"></div>
              <p className="mx-auto mt-8 max-w-3xl font-light leading-relaxed tracking-wide text-taupe-700">
                {language === "it"
                  ? "Esplora i nostri ultimi articoli e approfondimenti su marketing, design e crescita aziendale."
                  : language === "es"
                    ? "Explora nuestros últimos artículos y perspectivas sobre marketing, diseño y crecimiento empresarial."
                    : "Explore our latest articles and insights on marketing, design, and business growth."}
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
                <p className="mx-4 font-serif text-sm uppercase tracking-wider text-gold-700">
                  {language === "it" ? "FAQ" : language === "es" ? "FAQ" : "FAQ"}
                </p>
                <div className="h-[1px] w-16 self-center bg-gold-300"></div>
              </div>
              <h2 className="font-serif text-3xl font-light tracking-wide text-gold-600 md:text-4xl lg:text-5xl">
                {language === "it"
                  ? "Domande Frequenti"
                  : language === "es"
                    ? "Preguntas Frecuentes"
                    : "Frequently Asked Questions"}
              </h2>
              <div className="mx-auto mt-2 h-px w-24 bg-gold-600 opacity-30"></div>
              <p className="mx-auto mt-8 max-w-3xl font-light leading-relaxed tracking-wide text-taupe-700">
                {language === "it"
                  ? "Trova risposte alle domande comuni sui nostri servizi e processi."
                  : language === "es"
                    ? "Encuentra respuestas a preguntas comunes sobre nuestros servicios y procesos."
                    : "Find answers to common questions about our services and processes."}
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              <div className="mt-12">
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
                          ? "I nostri prezzi sono personalizzati in base ai requisiti specifici di ogni progetto. Offriamo sia prezzi basati sul progetto che opzioni di retainer per servizi continuativi. Durante la nostra consulenza iniziale, discuteremo le tue esigenze e forniremo una proposta dettagliata che delinea tutti i costi e i risultati finali."
                          : language === "es"
                            ? "Nuestros precios se personalizan según los requisitos específicos de cada proyecto. Ofrecemos precios basados en proyectos y opciones de retención para servicios continuos. Durante nuestra consulta inicial, discutiremos sus necesidades y le proporcionaremos una propuesta detallada que describe todos los costos y los resultados finales."
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
              <p className="text-taupe-700">
                {language === "it"
                  ? "Hai ancora domande? Siamo qui per aiutarti."
                  : language === "es"
                    ? "¿Todavía tienes preguntas? Estamos aquí para ayudarte."
                    : "Still have questions? We're here to help."}
              </p>
              <Button asChild className="mt-6 bg-gold-600 text-white hover:bg-gold-700">
                <Link href="/contact">
                  {language === "it" ? "Contattaci" : language === "es" ? "Contáctanos" : "Contact Us"}
                </Link>
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

            <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
              {language === "it" ? (
                <>Pronto a Elevare il Tuo Brand?</>
              ) : language === "es" ? (
                <>¿Listo para Elevar Tu Marca?</>
              ) : (
                <>Ready to Elevate Your Brand?</>
              )}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gold-50">
              {language === "it"
                ? "Prenota una consulenza oggi e scopri come Auctus Apex può trasformare la tua presenza digitale."
                : language === "es"
                  ? "Reserva una consulta hoy y descubre cómo Auctus Apex puede transformar tu presencia digital."
                  : "Book a consultation today and discover how Auctus Apex can transform your digital presence."}
            </p>

            <p className="mx-auto mt-2 font-serif text-sm italic text-gold-100">
              "Ad astra per aspera" — To the stars through difficulties
            </p>

            <div className="mt-8 inline-block relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-200/30 via-white/80 to-gold-200/30 rounded-lg blur-sm"></div>
              <Button asChild size="lg" className="relative bg-white text-gold-700 hover:bg-taupe-50">
                <a href="https://calendly.com/auctusapex/15-minute-meeting" target="_blank" rel="noopener noreferrer">
                  {language === "it"
                    ? "Prenota la Tua Consulenza Ora"
                    : language === "es"
                      ? "Reserva Tu Consulta Ahora"
                      : "Book Your Consultation Now"}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
