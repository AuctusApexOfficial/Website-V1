"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "it" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  loading: boolean
}

// Update the translations object to include more comprehensive translations for the entire website

const translations = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.book": "Book a Consultation",
    "hero.subtitle": "Elevate your brand with sophisticated marketing strategies and tailored web design solutions.",
    "hero.latin": "Ad astra per aspera",
    "hero.latinTranslation": "To the stars through difficulties",
    "footer.about":
      "Elevating brands through sophisticated marketing strategies and bespoke web design solutions since 2025.",
    "footer.quickLinks": "Quick Links",
    "footer.contactUs": "Contact Us",
    "footer.subscribe": "Subscribe",
    "footer.stayUpdated": "Stay updated with our latest news and offers.",
    "footer.subscribeButton": "Subscribe",
    "footer.latin": "Ad astra per aspera",
    "footer.latinTranslation": "To the stars through difficulties",
    "footer.copyright": "All rights reserved.",
    "contact.getInTouch": "Get in Touch",
    "contact.bespokeSolutions": "We offer bespoke marketing and web design solutions tailored to your unique needs.",
    "contact.sendMessage": "Send Us a Message",
    "contact.formDescription": "Fill out the form below and we'll get back to you as soon as possible.",
    "contact.yourName": "Your Name",
    "contact.emailAddress": "Email Address",
    "contact.phoneNumber": "Phone Number",
    "contact.serviceInterest": "Service of Interest",
    "contact.subject": "Subject",
    "contact.yourMessage": "Your Message",
    "contact.recaptchaHelp": "This helps us prevent automated spam and protect our contact system.",
    "contact.sending": "Sending...",
    "contact.send": "Send Message",
    "contact.messageSent": "Message Sent!",
    "contact.thankYou": "Thank you for contacting us. We'll get back to you shortly.",
    "contact.sendAnother": "Send Another Message",
    "contact.contactInfo": "Contact Information",
    "contact.reachOut": "Reach out to us through any of the following channels.",
    "contact.emailUs": "Email Us",
    "contact.generalInquiries": "General Inquiries:",
    "contact.support": "Support:",
    "contact.callUs": "Call Us",
    "contact.mainOffice": "Main Office:",
    "contact.customerSupport": "Customer Support:",
    "contact.businessHours": "Business Hours",
    "contact.headquarters": "Headquarters",
    "contact.connectWithUs": "Connect With Us",
    "contact.faq": "FAQ",
    "contact.frequentlyAsked": "Frequently Asked Questions",
    "contact.faqDescription": "Find answers to common questions about our services and processes.",
    "contact.moreQuestions": "Still have questions? Feel free to reach out to us directly.",
    "contact.askQuestion": "Ask a Question",
    "contact.transformPresence": "Ready to Transform Your Digital Presence?",
    "contact.bookConsultation": "Book a consultation today and discover how Auctus Apex can elevate your brand.",
    "contact.wisdomQuote": '"Sapientia est potentia" — Knowledge is power',
    "contact.bookYourConsultation": "Book Your Consultation Now",
  },
  it: {
    "nav.home": "Home",
    "nav.services": "Servizi",
    "nav.about": "Chi Siamo",
    "nav.contact": "Contatti",
    "nav.book": "Prenota una Consulenza",
    "hero.subtitle": "Eleva il tuo marchio con strategie di marketing sofisticate e soluzioni di web design su misura.",
    "hero.latin": "Ad astra per aspera",
    "hero.latinTranslation": "Alle stelle attraverso le difficoltà",
    "footer.about":
      "Elevando i marchi attraverso strategie di marketing sofisticate e soluzioni di web design su misura dal 2025.",
    "footer.quickLinks": "Link Rapidi",
    "footer.contactUs": "Contattaci",
    "footer.subscribe": "Iscriviti",
    "footer.stayUpdated": "Resta aggiornato con le nostre ultime novità e offerte.",
    "footer.subscribeButton": "Iscriviti",
    "footer.latin": "Ad astra per aspera",
    "footer.latinTranslation": "Alle stelle attraverso le difficoltà",
    "footer.copyright": "Tutti i diritti riservati.",
    "contact.getInTouch": "Mettiti in Contatto",
    "contact.bespokeSolutions": "Offriamo soluzioni di marketing e web design su misura per le tue esigenze uniche.",
    "contact.sendMessage": "Inviaci un Messaggio",
    "contact.formDescription": "Compila il modulo sottostante e ti risponderemo il prima possibile.",
    "contact.yourName": "Il Tuo Nome",
    "contact.emailAddress": "Indirizzo Email",
    "contact.phoneNumber": "Numero di Telefono",
    "contact.serviceInterest": "Servizio di Interesse",
    "contact.subject": "Oggetto",
    "contact.yourMessage": "Il Tuo Messaggio",
    "contact.recaptchaHelp":
      "Questo ci aiuta a prevenire lo spam automatizzato e proteggere il nostro sistema di contatto.",
    "contact.sending": "Invio in corso...",
    "contact.send": "Invia Messaggio",
    "contact.messageSent": "Messaggio Inviato!",
    "contact.thankYou": "Grazie per averci contattato. Ti risponderemo a breve.",
    "contact.sendAnother": "Invia un Altro Messaggio",
    "contact.contactInfo": "Informazioni di Contatto",
    "contact.reachOut": "Contattaci attraverso uno dei seguenti canali.",
    "contact.emailUs": "Inviaci un'Email",
    "contact.generalInquiries": "Richieste Generali:",
    "contact.support": "Supporto:",
    "contact.callUs": "Chiamaci",
    "contact.mainOffice": "Ufficio Principale:",
    "contact.customerSupport": "Supporto Clienti:",
    "contact.businessHours": "Orari di Lavoro",
    "contact.headquarters": "Sede Centrale",
    "contact.connectWithUs": "Connettiti Con Noi",
    "contact.faq": "FAQ",
    "contact.frequentlyAsked": "Domande Frequenti",
    "contact.faqDescription": "Trova risposte alle domande comuni sui nostri servizi e processi.",
    "contact.moreQuestions": "Hai ancora domande? Non esitare a contattarci direttamente.",
    "contact.askQuestion": "Fai una Domanda",
    "contact.transformPresence": "Pronto a Trasformare la Tua Presenza Digitale?",
    "contact.bookConsultation": "Prenota una consulenza oggi e scopri come Auctus Apex può elevare il tuo marchio.",
    "contact.wisdomQuote": '"Sapientia est potentia" — La conoscenza è potere',
    "contact.bookYourConsultation": "Prenota la Tua Consulenza Ora",
  },
  es: {
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.book": "Reservar Consulta",
    "hero.subtitle": "Eleva tu marca con estrategias de marketing sofisticadas y soluciones de diseño web a medida.",
    "hero.latin": "Ad astra per aspera",
    "hero.latinTranslation": "A las estrellas a través de las dificultades",
    "footer.about":
      "Elevando marcas a través de estrategias de marketing sofisticadas y soluciones de diseño web a medida desde 2025.",
    "footer.quickLinks": "Enlaces Rápidos",
    "footer.contactUs": "Contáctanos",
    "footer.subscribe": "Suscríbete",
    "footer.stayUpdated": "Mantente actualizado con nuestras últimas noticias y ofertas.",
    "footer.subscribeButton": "Suscribirse",
    "footer.latin": "Ad astra per aspera",
    "footer.latinTranslation": "A las estrellas a través de las dificultades",
    "footer.copyright": "Todos los derechos reservados.",
    "contact.getInTouch": "Ponte en Contacto",
    "contact.bespokeSolutions": "Ofrecemos soluciones de marketing y diseño web a medida para tus necesidades únicas.",
    "contact.sendMessage": "Envíanos un Mensaje",
    "contact.formDescription": "Completa el formulario a continuación y te responderemos lo antes posible.",
    "contact.yourName": "Tu Nombre",
    "contact.emailAddress": "Dirección de Email",
    "contact.phoneNumber": "Número de Teléfono",
    "contact.serviceInterest": "Servicio de Interés",
    "contact.subject": "Asunto",
    "contact.yourMessage": "Tu Mensaje",
    "contact.recaptchaHelp": "Esto nos ayuda a prevenir el spam automatizado y proteger nuestro sistema de contacto.",
    "contact.sending": "Enviando...",
    "contact.send": "Enviar Mensaje",
    "contact.messageSent": "¡Mensaje Enviado!",
    "contact.thankYou": "Gracias por contactarnos. Te responderemos en breve.",
    "contact.sendAnother": "Enviar Otro Mensaje",
    "contact.contactInfo": "Información de Contacto",
    "contact.reachOut": "Contáctanos a través de cualquiera de los siguientes canales.",
    "contact.emailUs": "Envíanos un Email",
    "contact.generalInquiries": "Consultas Generales:",
    "contact.support": "Soporte:",
    "contact.callUs": "Llámanos",
    "contact.mainOffice": "Oficina Principal:",
    "contact.customerSupport": "Atención al Cliente:",
    "contact.businessHours": "Horario de Atención",
    "contact.headquarters": "Sede Central",
    "contact.connectWithUs": "Conéctate Con Nosotros",
    "contact.faq": "FAQ",
    "contact.frequentlyAsked": "Preguntas Frecuentes",
    "contact.faqDescription": "Encuentra respuestas a preguntas comunes sobre nuestros servicios y procesos.",
    "contact.moreQuestions": "¿Todavía tienes preguntas? No dudes en contactarnos directamente.",
    "contact.askQuestion": "Hacer una Pregunta",
    "contact.transformPresence": "¿Listo para Transformar tu Presencia Digital?",
    "contact.bookConsultation": "Reserva una consulta hoy y descubre cómo Auctus Apex puede elevar tu marca.",
    "contact.wisdomQuote": '"Sapientia est potentia" — El conocimiento es poder',
    "contact.bookYourConsultation": "Reserva Tu Consulta Ahora",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode | ((props: { loading: boolean }) => ReactNode) }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // On initial load, check if there's a saved language preference
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "it", "es"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Update the setLanguage function to ensure loading state works properly
  const setLanguage = (newLanguage: Language) => {
    if (newLanguage !== language) {
      // Set loading state to true before changing the language
      setLoading(true)

      // Set the language state
      setLanguageState(newLanguage)

      // Save to localStorage
      localStorage.setItem("language", newLanguage)

      // Use a longer timeout to ensure all components have time to update
      setTimeout(() => {
        setLoading(false)
      }, 1200) // Increased from 800ms to 1200ms for more reliable loading
    }
  }

  // Update the t function to handle missing translations more gracefully
  const t = (key: string): string => {
    // If the key doesn't exist in the current language, fall back to English
    // If it doesn't exist in English either, return the key itself
    return translations[language]?.[key] || translations.en?.[key] || key
  }

  const contextValue = { language, setLanguage, t, loading }

  return (
    <LanguageContext.Provider value={contextValue}>
      {typeof children === "function" ? children({ loading }) : children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
