"use client"

import { useEffect, useRef } from "react"

export default function BookingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient background
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#7c2d12")
      gradient.addColorStop(1, "#b45309")
      return gradient
    }

    // Circle class
    class Circle {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 60 + 20
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.08 + 0.02})`
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < -this.radius) this.x = canvas.width + this.radius
        if (this.x > canvas.width + this.radius) this.x = -this.radius
        if (this.y < -this.radius) this.y = canvas.height + this.radius
        if (this.y > canvas.height + this.radius) this.y = -this.radius
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create circles
    const circles: Circle[] = []
    const circleCount = 15

    for (let i = 0; i < circleCount; i++) {
      circles.push(new Circle())
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = createGradient()
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and update circles
      circles.forEach((circle) => {
        circle.update()
        circle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="h-full w-full" />
}
