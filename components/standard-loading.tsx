"use client"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function StandardLoading() {
  const { language } = useLanguage()

  // Get the loading message based on the language
  const getLoadingMessage = () => {
    switch (language) {
      case "it":
        return "Auctus sta caricando..."
      case "es":
        return "Auctus está cargando..."
      default:
        return "Auctus is Loading..."
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#faf8f1]">
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 flex items-center justify-center" style={{ minHeight: "160px" }}>
          <div className="logo-container">
            <Image
              src="/auctus-logo.png"
              alt="Auctus Apex Logo"
              width={120}
              height={120}
              className="object-contain drop-shadow-md"
              priority
            />
          </div>
        </div>
        <p className="mt-4 font-serif text-xl text-amber-700">{getLoadingMessage()}</p>
      </div>

      {/* CSS for the vertical rotation animation */}
      <style jsx global>{`
       .logo-container {
         animation: rotateY 2s infinite linear;
         transform-style: preserve-3d;
         perspective: 1000px;
       }
       
       @keyframes rotateY {
         0% {
           transform: rotateY(0deg);
         }
         100% {
           transform: rotateY(360deg);
         }
       }
     `}</style>
    </div>
  )
}
