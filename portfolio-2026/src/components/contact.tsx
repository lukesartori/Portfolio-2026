"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

const socialLinks = [
  { label: "Email", href: "mailto:hello@elenavasquez.com", value: "hello@elenavasquez.com" },
  { label: "LinkedIn", href: "#", value: "@elenavasquez" },
  { label: "Instagram", href: "#", value: "@elenavasquez.design" },
  { label: "Dribbble", href: "#", value: "@elenavasquez" },
]

export function Contact() {
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
      id="contact"
      className="px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div
        className={`flex items-baseline mb-16 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-sm tracking-widest uppercase text-muted-foreground">
          Contact
        </h2>
        <div className="hidden md:block h-px bg-border flex-1 mx-8" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div
          className={`flex flex-col gap-6 transition-all duration-700 ease-out delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight text-pretty">
            {"If you'd like to discuss a project or just say hello, I'm always open to a conversation."}
          </h3>
          <a
            href="mailto:hello@elenavasquez.com"
            className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-foreground border border-foreground rounded-full px-6 py-3 w-fit transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            Get in Touch
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div
          className={`flex flex-col gap-0 transition-all duration-700 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex items-center justify-between py-5 border-t border-border transition-colors hover:border-foreground/30"
            >
              <span className="text-sm text-muted-foreground tracking-wide">
                {link.label}
              </span>
              <span className="flex items-center gap-2 text-sm text-foreground">
                {link.value}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
