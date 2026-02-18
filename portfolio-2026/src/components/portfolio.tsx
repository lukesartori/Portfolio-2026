"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { projects, type Project } from "@/lib/projects"
import { ProjectDetail } from "@/components/project-detail"

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project
  index: number
  onSelect: (project: Project) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`View project: ${project.title}`}
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect(project)
        }
      }}
      className={`group cursor-pointer transition-all duration-700 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${(index % 2) * 100}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />
      </div>

      <div className="flex items-start justify-between mt-5 gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="text-lg md:text-xl font-serif text-foreground group-hover:opacity-70 transition-opacity">
              {project.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 flex-shrink-0" />
          </div>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
        <span className="text-xs text-muted-foreground tracking-wide flex-shrink-0 pt-1.5">
          {project.year}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1 transition-colors group-hover:border-foreground/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Portfolio() {
  const headingRef = useRef<HTMLDivElement>(null)
  const [headingVisible, setHeadingVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (headingRef.current) observer.observe(headingRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project)
    setIsDetailOpen(true)
  }, [])

  const handleCloseDetail = useCallback(() => {
    setIsDetailOpen(false)
    // Wait for exit animation before clearing project
    setTimeout(() => setSelectedProject(null), 500)
  }, [])

  return (
    <>
      <section id="work" className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div
          ref={headingRef}
          className={`flex items-baseline justify-between mb-16 transition-all duration-700 ease-out ${
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-sm tracking-widest uppercase text-muted-foreground">
            Selected Work
          </h2>
          <div className="hidden md:block h-px bg-border flex-1 mx-8" />
          <span className="text-sm text-muted-foreground">
            {`${projects.length} Projects`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onSelect={handleSelectProject}
            />
          ))}
        </div>
      </section>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
        />
      )}
    </>
  )
}
