"use client"

import { useEffect, useRef } from "react"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = containerRef.current?.querySelectorAll("[data-animate]")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-svh flex flex-col justify-end px-6 pb-12 pt-32 md:px-12 lg:px-20 md:pb-20"
    >
      <div className="flex flex-col gap-8 max-w-4xl">
        <p
          data-animate
          className="text-sm tracking-widest uppercase text-muted-foreground opacity-0 translate-y-6 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
        >
          Digital Product Designer
        </p>
        <h1
          data-animate
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-[1.1] text-balance opacity-0 translate-y-6 transition-all duration-700 ease-out delay-100 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
        >
          {"I design thoughtful digital experiences that connect people with purpose."}
        </h1>
        <p
          data-animate
          className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed opacity-0 translate-y-6 transition-all duration-700 ease-out delay-200 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
        >
          Independent designer focused on brand identity, web design, and digital
          product experiences. Currently based in Barcelona.
        </p>
      </div>

      <a
        href="#work"
        data-animate
        className="absolute bottom-8 right-6 md:right-12 lg:right-20 flex items-center justify-center w-12 h-12 rounded-full border border-border text-muted-foreground transition-all duration-300 hover:text-foreground hover:border-foreground opacity-0 translate-y-6 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
        style={{ transitionDelay: "400ms" }}
        aria-label="Scroll to work"
      >
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  )
}
