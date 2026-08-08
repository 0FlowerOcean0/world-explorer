import Link from 'next/link'
import { SectionHeading } from '@/components/section-heading'
import { books } from '@/lib/books'

// deterministic muted spine colors cycling through the palette
const spineColors = [
  'oklch(0.42 0.06 160)',
  'oklch(0.38 0.05 150)',
  'oklch(0.4 0.08 250)',
  'oklch(0.38 0.07 300)',
  'oklch(0.4 0.09 250)',
  'oklch(0.42 0.07 150)',
  'oklch(0.4 0.05 160)',
  'oklch(0.36 0.1 20)',
  'oklch(0.42 0.08 110)',
  'oklch(0.38 0.07 250)',
  'oklch(0.36 0.1 350)',
  'oklch(0.4 0.09 130)',
  'oklch(0.38 0.08 200)',
  'oklch(0.36 0.1 20)',
]

export function BookSpines() {
  const shelf = books.slice(0, 14)
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <SectionHeading
          eyebrow="§ 02 · Books"
          before="The shelf — "
          emphasis="14 volumes, in rotation"
          action={{ label: 'OPEN CATALOGUE →', href: '/books' }}
        />

        <div className="mt-12 flex items-end gap-1.5 overflow-x-auto border-b border-border pb-4">
          {shelf.map((b, i) => (
            <Link
              key={b.no}
              href="/books"
              title={b.title}
              className="group flex shrink-0 flex-col items-center justify-between rounded-sm px-2 py-4 text-primary-foreground transition-transform duration-300 hover:-translate-y-2"
              style={{
                backgroundColor: spineColors[i % spineColors.length],
                height: `${190 + ((i * 7) % 40)}px`,
                width: '46px',
              }}
            >
              <span
                className="font-serif text-sm leading-tight tracking-tight"
                style={{ writingMode: 'vertical-rl' }}
              >
                {b.title}
              </span>
              <span className="font-mono text-[9px] opacity-70">{b.no}</span>
            </Link>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>← Scroll · 14 spines ·</span>
          <span>中文 · English · Bilingual editions</span>
          <span>Last rev. 2025</span>
        </div>
      </div>
    </section>
  )
}
