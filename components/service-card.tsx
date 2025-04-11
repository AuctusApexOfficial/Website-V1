import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card className="group overflow-hidden border-gold-100 transition-all duration-300 hover:border-gold-300 hover:shadow-lg">
      <CardContent className="flex h-full flex-col p-6 pt-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700">
          {icon}
        </div>
        <h3 className="font-serif text-xl font-semibold">{title}</h3>
        <p className="mt-2 flex-grow text-taupe-600">{description}</p>
      </CardContent>
    </Card>
  )
}
