"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const experience = [
  {
    period: "2022 — Present",
    role: "Independent Designer",
    description:
      "Working with select clients on brand identity, web design, and digital product experiences.",
  },
  {
    period: "2019 — 2022",
    role: "Senior Designer, Studio Norte",
    description:
      "Led design direction for high-profile brand and digital projects across fashion, architecture, and technology.",
  },
  {
    period: "2017 — 2019",
    role: "Product Designer, Kinto",
    description:
      "Designed core product experiences for a fintech startup, from concept to launch.",
  },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div
        className={`flex items-baseline mb-16 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-sm tracking-widest uppercase text-muted-foreground">
          About
        </h2>
        <div className="hidden md:block h-px bg-border flex-1 mx-8" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div
          className={`lg:col-span-4 transition-all duration-700 ease-out delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
            <Image
              src="/images/portrait.jpg"
              alt="Portrait of Elena Vasquez"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-12">
          <div
            className={`flex flex-col gap-6 transition-all duration-700 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed text-pretty">
              {"I'm an independent digital product designer based in Barcelona. While design is my primary focus, I regularly work with code, believing that understanding the technical foundations leads to more thoughtful designs."}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
              {"With over eight years of experience across brand identity, web design, and digital products, I've had the opportunity to work with studios, startups, and established brands. My approach centers on clarity, restraint, and lasting impact."}
            </p>
          </div>

          <div
            className={`flex flex-col gap-0 transition-all duration-700 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-6">
              Experience
            </h3>
            {experience.map((item, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 py-6 border-t border-border"
              >
                <span className="text-xs text-muted-foreground tracking-wide md:w-40 flex-shrink-0 pt-0.5">
                  {item.period}
                </span>
                <div className="flex-1">
                  <h4 className="text-base font-medium text-foreground">
                    {item.role}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
