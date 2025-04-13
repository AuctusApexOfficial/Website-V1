"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Testimonial {
  quote: string
  author: string
  position: string
  company: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Auctus Apex transformed our digital presence completely. Their strategic approach to marketing has resulted in a 200% increase in qualified leads.",
    author: "Alexandra Reynolds",
    position: "CEO",
    company: "Luminary Ventures",
  },
  {
    quote:
      "The web design team at Auctus Apex created a site that perfectly captures our brand essence. The attention to detail and aesthetic sensibility is unmatched.",
    author: "Marcus Chen",
    position: "Creative Director",
    company: "Artisan Collective",
  },
  {
    quote:
      "Working with Auctus Apex has been a game-changer for our business. Their marketing expertise and innovative strategies have helped us stand out in a crowded market.",
    author: "Sophia Williams",
    position: "Marketing Director",
    company: "Elevate Industries",
  },
]

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(next, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <Card className="border-none bg-transparent shadow-none">
                <CardContent className="p-6 text-center">
                  <Quote className="mx-auto mb-6 h-10 w-10 text-gold-300 opacity-50" />
                  <p className="mb-6 text-xl italic leading-relaxed text-taupe-200">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-serif text-lg font-semibold text-gold-300">{testimonial.author}</p>
                    <p className="text-sm text-taupe-400">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border-white bg-black/30 text-white hover:bg-black/50"
        onClick={prev}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous testimonial</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border-white bg-black/30 text-white hover:bg-black/50"
        onClick={next}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next testimonial</span>
      </Button>

      <div className="mt-6 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${current === index ? "bg-gold-300" : "bg-taupe-600"}`}
            onClick={() => setCurrent(index)}
          >
            <span className="sr-only">Testimonial {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
