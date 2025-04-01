"use client"

import Image from "next/image"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50">
      <div className="text-center">
        <div
          className="mb-4 inline-block"
          style={{
            animation: "flipY 2s infinite linear",
            perspective: "1000px",
          }}
        >
          <Image
            src="/auctus-logo.png"
            alt="Auctus Apex Logo"
            width={80}
            height={80}
            className="object-contain"
            style={{
              transformStyle: "preserve-3d",
            }}
          />
        </div>
        <style jsx global>{`
          @keyframes flipY {
            0% {
              transform: rotateY(0deg);
            }
            100% {
              transform: rotateY(360deg);
            }
          }
        `}</style>
        <h2 className="font-serif text-xl text-amber-700">Auctus is loading...</h2>
      </div>
    </div>
  )
}

