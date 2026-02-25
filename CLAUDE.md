# CLAUDE.md — Portfolio 2026

This file provides guidance for AI assistants working in this repository.

## Project Overview

This is a single-page portfolio website for **Elena Vasquez**, an independent digital product designer based in Barcelona. The site showcases selected work, an about section, and contact information. It is a static, single-route Next.js application deployed via Vercel.

## Repository Structure

```
Portfolio-2026/                        # Git repository root
└── portfolio-2026/
    └── src/                           # ← Next.js project root (run commands here)
        ├── app/
        │   ├── globals.css            # Tailwind v4 CSS config + design tokens
        │   ├── layout.tsx             # Root layout (fonts, metadata, Vercel Analytics)
        │   └── page.tsx               # Single page — composes all sections
        ├── components/
        │   ├── navigation.tsx         # Fixed header with mobile hamburger menu
        │   ├── hero.tsx               # Full-viewport hero section
        │   ├── portfolio.tsx          # Project grid + ProjectCard sub-component
        │   ├── project-detail.tsx     # Full-screen slide-up project modal
        │   ├── about.tsx              # Portrait image + experience timeline
        │   ├── contact.tsx            # CTA + social links
        │   ├── footer.tsx             # Simple copyright footer
        │   ├── theme-provider.tsx     # next-themes ThemeProvider wrapper
        │   └── ui/                    # shadcn/ui component library (do not edit manually)
        ├── hooks/
        │   ├── use-mobile.ts          # useIsMobile() — viewport width check
        │   └── use-toast.ts           # useToast() — toast notification hook
        ├── lib/
        │   ├── projects.ts            # Project data array + Project type definition
        │   └── utils.ts               # cn() — clsx + tailwind-merge helper
        ├── public/
        │   ├── images/                # Project images (project-1.jpg … project-6.jpg, portrait.jpg)
        │   └── icon*, apple-icon.png  # Favicon assets (light/dark variants)
        ├── styles/
        │   └── globals.css            # Duplicate/alternate global CSS entry
        ├── components.json            # shadcn/ui CLI configuration
        ├── next.config.mjs            # Next.js config
        ├── package.json               # Dependencies and scripts
        ├── pnpm-lock.yaml             # pnpm lockfile
        ├── postcss.config.mjs         # PostCSS config (Tailwind v4)
        └── tsconfig.json              # TypeScript config
```

> **Important:** The Next.js project root is `portfolio-2026/src/`. All `pnpm` / `next` commands must be run from that directory.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.7 (strict mode) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Component Library | shadcn/ui — "new-york" style |
| Icons | lucide-react |
| Fonts | Inter (sans) + Playfair Display (serif) via `next/font/google` |
| Animations | CSS transitions + IntersectionObserver (no animation library) |
| Analytics | Vercel Analytics (`@vercel/analytics`) |
| Package Manager | **pnpm** |

## Development Commands

All commands must be run from `portfolio-2026/src/`:

```bash
cd portfolio-2026/src

pnpm dev        # Start local dev server (http://localhost:3000)
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## Key Conventions

### Component Patterns

- All section-level and interactive components are **Client Components** (`"use client"` at the top).
- The root `page.tsx` and `layout.tsx` are Server Components (no `"use client"`).
- Named exports are used for all components (e.g., `export function Hero()`), not default exports.
- Sub-components that are only used within a single file are defined in that same file (e.g., `ProjectCard` inside `portfolio.tsx`).

### Styling

- Use **Tailwind utility classes** exclusively — no CSS modules, no inline styles (except for dynamic `transitionDelay`).
- Use the `cn()` helper from `@/lib/utils` to conditionally merge Tailwind classes:
  ```ts
  import { cn } from "@/lib/utils"
  cn("base-class", condition && "conditional-class", className)
  ```
- All color tokens are CSS custom properties defined in `app/globals.css`. Use semantic names (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`) — never hardcode hex/oklch values in components.
- The color system uses **oklch** color space.
- Dark mode is implemented via the `.dark` CSS class (next-themes class strategy).

### Animation Pattern

Scroll-triggered animations follow a consistent pattern using `IntersectionObserver`:

```tsx
const ref = useRef<HTMLDivElement>(null)
const [isVisible, setIsVisible] = useState(false)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect() // Animate once only
      }
    },
    { threshold: 0.1 }
  )
  if (ref.current) observer.observe(ref.current)
  return () => observer.disconnect()
}, [])

// In JSX:
<div
  ref={ref}
  className={`transition-all duration-700 ease-out ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
  }`}
/>
```

- Staggered children use `transitionDelay` as an inline style: `style={{ transitionDelay: `${index * 100}ms` }}`.
- All animations use `translate-y` + `opacity` transitions.
- The Hero section uses a slightly different pattern: `data-animate` attributes with a single shared IntersectionObserver and `.animate-in` CSS class toggling.

### Path Aliases

The `tsconfig.json` defines `@/*` to resolve from the `src/` directory:

```ts
import { cn } from "@/lib/utils"          // → src/lib/utils.ts
import { projects } from "@/lib/projects" // → src/lib/projects.ts
import { Button } from "@/components/ui/button"
```

### Project Data

All portfolio project content lives in `src/lib/projects.ts` as a typed array. To add or modify projects, edit that file. The `Project` interface defines the required fields:

```ts
interface Project {
  title: string
  description: string
  tags: string[]
  image: string       // Path relative to /public (e.g. "/images/project-1.jpg")
  year: string
  approach: string
  role: string
  timeline: string
  outcome: string
}
```

### Adding shadcn/ui Components

Use the shadcn CLI from `portfolio-2026/src/`:

```bash
pnpm dlx shadcn@latest add <component-name>
```

Do **not** manually edit files inside `src/components/ui/` — they are managed by the shadcn CLI.

### Fonts

Two font families are configured:
- `font-sans` → Inter (`--font-inter`)
- `font-serif` → Playfair Display (`--font-playfair`)

Apply them with Tailwind: `font-sans` (default body) or `font-serif` (headings, brand name).

### Accessibility

- Interactive non-`<button>` elements that act as buttons use `role="button"`, `tabIndex={0}`, and `onKeyDown` with Enter/Space handling (see `ProjectCard` in `portfolio.tsx`).
- Modals/overlays set `role="dialog"` and `aria-modal="true"`.
- Escape key closes overlays via `keydown` event listeners.
- Body scroll is locked (`document.body.style.overflow = "hidden"`) when modals or mobile menus are open, and restored on close/unmount.

## Notable Configuration

- **`next.config.mjs`**: TypeScript build errors are ignored (`ignoreBuildErrors: true`) and image optimization is disabled (`unoptimized: true`). This suggests the project may be exported as static HTML or deployed to a CDN.
- **`components.json`**: shadcn/ui is configured with `"style": "new-york"`, CSS variables enabled, and `lucide` as the icon library.
- **No test setup**: There are no test files or test dependencies. When writing tests, you would need to add a testing framework first.
- **No CI/CD config**: No `.github/workflows` directory exists.

## Page Sections (in render order)

1. **`<Navigation />`** — Fixed top bar. Transparent until scroll > 20px, then frosted-glass background. Hamburger menu on mobile with full-screen overlay.
2. **`<Hero />`** — Full-viewport opening section. Animated tagline, headline, and subtext.
3. **`<Portfolio />`** (`id="work"`) — 2-column responsive project grid. Clicking a card opens `<ProjectDetail />`.
4. **`<ProjectDetail />`** — Full-screen slide-up panel with hero image, project metadata, and outcome. Closes on Escape or backdrop click.
5. **`<About />`** (`id="about"`) — Portrait photo + bio text + experience timeline.
6. **`<Contact />`** (`id="contact"`) — CTA link + social links list.
7. **`<Footer />`** — Copyright line + Privacy/Imprint links.

## Deployment

The site uses Vercel Analytics (imported in `layout.tsx`). Deploying to Vercel is the expected target — push to the main branch to trigger a production deployment.
