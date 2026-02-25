export interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  year: string
  approach: string
  role: string
  timeline: string
  outcome: string
}

export const projects: Project[] = [
  {
    title: "Timeline Health",
    description:
      "Building a seamless path to better cellular health through brand identity and web experience.",
    tags: ["Brand Identity", "Web Design", "Figma"],
    image: "/images/project-1.jpg",
    year: "2025",
    approach:
      "Starting from deep research into the longevity space, we crafted a visual language that balances scientific credibility with human warmth. Every touchpoint — from the wordmark to the website interactions — was designed to make complex science feel approachable.",
    role: "Lead Designer — Brand Identity, Web Design, Art Direction",
    timeline: "4 months",
    outcome:
      "The rebrand helped Timeline Health increase their conversion rate by 35% and establish a distinctive presence in the competitive wellness market. The design system continues to scale across new product lines.",
  },
  {
    title: "Meridian Studio",
    description:
      "A complete digital presence for an architecture studio, emphasizing spatial storytelling.",
    tags: ["Web Design", "UI/UX", "Development"],
    image: "/images/project-2.jpg",
    year: "2025",
    approach:
      "The website was conceived as a digital gallery, letting the architecture speak through carefully composed imagery and restrained typography. Scroll-driven animations create a sense of moving through space, mirroring the studio's physical work.",
    role: "Design & Development — UI/UX, Front-End, Motion Design",
    timeline: "3 months",
    outcome:
      "The site won an Awwwards Honorable Mention and helped the studio attract international commissions, with project inquiries increasing by 60% in the first quarter after launch.",
  },
  {
    title: "Forma Editorial",
    description:
      "Art direction and layout design for a contemporary design publication.",
    tags: ["Editorial", "Art Direction", "Typography"],
    image: "/images/project-3.jpg",
    year: "2024",
    approach:
      "Each issue was treated as a unique design object. Working closely with writers and photographers, I developed flexible grid systems that could adapt to wildly different content while maintaining the publication's refined visual identity.",
    role: "Art Director — Layout Design, Typography, Image Curation",
    timeline: "Ongoing — 6 issues",
    outcome:
      "Forma has grown to become one of the most respected independent design publications in Europe, with a subscriber base that tripled over two years and recognition at the European Design Awards.",
  },
  {
    title: "Aura Finance",
    description:
      "Designing a mobile banking experience that feels personal and intuitive.",
    tags: ["Product Design", "Mobile", "Prototyping"],
    image: "/images/project-4.jpg",
    year: "2024",
    approach:
      "We challenged the cold, utilitarian patterns common in fintech by introducing warmth through micro-interactions, contextual guidance, and a visual hierarchy that reduces cognitive load. User testing shaped every decision, from onboarding to daily transaction flows.",
    role: "Product Designer — UX Research, UI Design, Prototyping",
    timeline: "6 months",
    outcome:
      "The redesigned app achieved a 4.8-star rating on the App Store and reduced customer support tickets by 40%. The design system now serves as the foundation for the company's expanding product suite.",
  },
  {
    title: "Casa Mura",
    description:
      "Interior architecture brand identity and immersive website experience.",
    tags: ["Brand Identity", "Web Design", "3D"],
    image: "/images/project-5.jpg",
    year: "2024",
    approach:
      "Drawing from the studio's Mediterranean roots, we developed a visual identity that evokes tactile materials — stone, linen, warm wood. The website pairs ambient 3D room visualizations with editorial-quality project documentation.",
    role: "Lead Designer — Brand Identity, Web Design, 3D Art Direction",
    timeline: "5 months",
    outcome:
      "Casa Mura's new identity positioned them as a premium studio, leading to partnerships with luxury hospitality brands and a feature in Wallpaper* magazine.",
  },
  {
    title: "Noire Botanics",
    description:
      "Premium skincare packaging design and e-commerce experience.",
    tags: ["Packaging", "E-Commerce", "Brand"],
    image: "/images/project-6.jpg",
    year: "2023",
    approach:
      "The packaging design draws from apothecary traditions with a modern, minimal twist. Deep tones and tactile finishes create a sense of ritual, while the e-commerce experience uses generous whitespace and subtle motion to let the products take center stage.",
    role: "Creative Director — Packaging, E-Commerce Design, Brand Strategy",
    timeline: "4 months",
    outcome:
      "The launch collection sold out within two weeks. The brand has since expanded to 12 SKUs, with the packaging design winning a Dieline Award for beauty packaging.",
  },
]
