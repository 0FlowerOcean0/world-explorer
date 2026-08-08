'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Monitor, Moon, Sun } from 'lucide-react'

const nav = [
  { label: 'Articles', href: '/articles' },
  { label: 'Books', href: '/books' },
  { label: 'News', href: '/news' },
  { label: 'About', href: '/about' },
]

type Theme = 'system' | 'light' | 'dark'

function formatToday() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${mm}.${dd}.${yyyy}`
}

export function SiteHeader() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<Theme>('system')
  const [today, setToday] = useState('06.07.2026')

  useEffect(() => {
    setToday(formatToday())
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    if (theme === 'light') root.classList.add('light')
    if (theme === 'dark') root.classList.add('dark')
  }, [theme])

  const cycleTheme = () => {
    setTheme((t) => (t === 'system' ? 'light' : t === 'light' ? 'dark' : 'system'))
  }

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-1.5 focus:font-mono focus:text-xs focus:text-background"
      >
        SKIP TO CONTENT
      </a>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        {/* Brand */}
        <Link href="/" className="flex items-baseline gap-3 whitespace-nowrap">
          <span className="font-serif text-xl leading-none tracking-tight text-foreground">
            花海
          </span>
          <span className="hidden font-mono text-[11px] tracking-wider text-muted-foreground sm:inline">
            @花海 — {today}
          </span>
        </Link>

        {/* Primary nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={
                      active
                        ? 'border-b-2 border-foreground pb-0.5 text-sm text-foreground'
                        : 'text-sm text-muted-foreground transition-colors hover:text-foreground'
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={cycleTheme}
            aria-label={`Theme: ${theme} — click to change`}
            title={`Theme: ${theme}`}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ThemeIcon className="size-[18px]" strokeWidth={1.5} />
          </button>
          <a
            href="#"
            className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary"
          >
            Sign in
          </a>
        </div>
      </div>
    </header>
  )
}
