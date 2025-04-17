"use client"

import Image from "next/image"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen flex-col items-center justify-center bg-[#faf8f1]">
      <div className="text-center">
        <div className="logo-container mb-4 inline-block">
          <Image
            src="/auctus-logo.png"
            alt="Auctus Apex Logo"
            width={120}
            height={120}
            className="object-contain drop-shadow-md"
            priority
          />
        </div>
        <h2 className="font-serif text-xl text-amber-700">Auctus is Loading...</h2>

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
    </div>
  )
}
