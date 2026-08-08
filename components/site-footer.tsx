const columns = [
  {
    title: 'READ',
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'RSS · EN', href: '#' },
      { label: 'RSS · 中文', href: '#' },
      { label: 'News', href: '/news' },
    ],
  },
  {
    title: 'LEARN',
    links: [
      { label: 'Books', href: '/books' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    title: 'ELSEWHERE',
    links: [
      { label: 'GitHub', href: 'https://github.com/hua-hai' },
      { label: 'Twitter / X', href: '#' },
      { label: 'WeChat「花海」', href: '#' },
      { label: 'Terms & Privacy', href: '#' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand blurb */}
          <div className="max-w-xs">
            <p className="font-serif text-lg text-foreground">
              花海<span className="italic text-accent">·</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Maintained by <strong className="font-semibold text-foreground">@花海</strong>.
              Set in Newsreader and Inter. Built in the open. Licensed permissively where
              possible, strictly where necessary.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] tracking-widest text-muted-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 font-mono text-[11px] tracking-wide text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© 2026 @花海</span>
          <span className="text-center">
            Beijing / Shenzhen / Tokyo / Hong Kong · CC-BY-SA where applicable
          </span>
          <a href="#" className="transition-colors hover:text-foreground">
            京ICP备2026020066号
          </a>
        </div>
      </div>
    </footer>
  )
}
