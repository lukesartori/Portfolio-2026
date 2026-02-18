"use client"

import { useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { X, ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/projects"

interface ProjectDetailProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetail({ project, isOpen, onClose }: ProjectDetailProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleKeyDown)
      // Reset scroll position when opening
      if (contentRef.current) {
        contentRef.current.scrollTop = 0
      }
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title}`}
      className={`fixed inset-0 z-[60] transition-all duration-500 ease-out ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={contentRef}
        className={`absolute inset-0 bg-background overflow-y-auto transition-all duration-500 ease-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-5 right-6 md:top-8 md:right-12 lg:right-20 z-[70] flex items-center justify-center w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur-md text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:border-foreground"
          aria-label="Close project details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="min-h-svh">
          {/* Hero image */}
          <div className="relative w-full aspect-[16/10] md:aspect-[16/8] lg:aspect-[16/7]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover transition-all duration-700 ease-out delay-100 ${
                isOpen ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>

          {/* Project info */}
          <div className="relative px-6 md:px-12 lg:px-20 -mt-24 md:-mt-32 pb-24">
            <div className="max-w-4xl">
              {/* Title block */}
              <div
                className={`transition-all duration-600 ease-out delay-200 ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <span className="text-sm tracking-widest uppercase text-muted-foreground">
                  {project.year}
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mt-3 text-balance">
                  {project.title}
                </h2>
              </div>

              {/* Tags */}
              <div
                className={`flex flex-wrap gap-2 mt-6 transition-all duration-600 ease-out delay-300 ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted-foreground border border-border rounded-full px-4 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div
                className={`h-px bg-border my-10 md:my-14 transition-all duration-600 ease-out delay-[350ms] ${
                  isOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                } origin-left`}
              />

              {/* Description grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
                <div
                  className={`md:col-span-4 transition-all duration-600 ease-out delay-[400ms] ${
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
                    Overview
                  </h3>
                  <p className="text-base text-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div
                  className={`md:col-span-4 transition-all duration-600 ease-out delay-[450ms] ${
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
                    Approach
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {project.approach}
                  </p>
                </div>

                <div
                  className={`md:col-span-4 flex flex-col gap-6 transition-all duration-600 ease-out delay-[500ms] ${
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <div>
                    <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
                      Role
                    </h3>
                    <p className="text-base text-foreground leading-relaxed">
                      {project.role}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
                      Timeline
                    </h3>
                    <p className="text-base text-foreground leading-relaxed">
                      {project.timeline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div
                className={`mt-16 md:mt-24 transition-all duration-600 ease-out delay-[550ms] ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={project.image}
                    alt={`${project.title} showcase`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
              </div>

              {/* Outcome */}
              <div
                className={`mt-16 md:mt-24 max-w-2xl transition-all duration-600 ease-out delay-[600ms] ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-6">
                  Outcome
                </h3>
                <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed text-pretty">
                  {project.outcome}
                </p>
              </div>

              {/* CTA */}
              <div
                className={`mt-16 md:mt-20 flex flex-col md:flex-row items-start md:items-center gap-6 pt-10 border-t border-border transition-all duration-600 ease-out delay-[650ms] ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <span className="text-sm text-muted-foreground">
                  {"Interested in working together?"}
                </span>
                <a
                  href="mailto:hello@elenavasquez.com"
                  className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-foreground border border-foreground rounded-full px-6 py-3 transition-all duration-300 hover:bg-foreground hover:text-background"
                >
                  Get in Touch
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
