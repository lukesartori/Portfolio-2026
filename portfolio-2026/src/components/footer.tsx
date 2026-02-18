export function Footer() {
  return (
    <footer className="px-6 py-8 md:px-12 lg:px-20 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          {"© 2026 Elena Vasquez. All rights reserved."}
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Imprint
          </a>
        </div>
      </div>
    </footer>
  )
}
