import Link from 'next/link'
import { SectionHeading } from '@/components/section-heading'
import { featuredArticles } from '@/lib/home'

export function FeaturedArticles() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <SectionHeading
          eyebrow="§ 01 · Articles"
          before="The journal — "
          emphasis="a commonplace book, kept in public"
          action={{ label: 'ALL →', href: '/articles' }}
        />

        <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.map((a) => (
            <li key={a.date + (a.title || a.emphasis)}>
              <Link href={a.href} className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.image || '/placeholder.svg'}
                    alt={a.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <time className="font-mono text-xs text-muted-foreground">
                    {a.date}
                  </time>
                  {a.langs.map((l) => (
                    <span
                      key={l}
                      className="border border-border px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground"
                    >
                      {l}
                    </span>
                  ))}
                </div>
                <h3 className="mt-2 font-serif text-xl font-normal leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {a.emphasis ? (
                    <>
                      {a.before}
                      <em className="italic text-accent">{a.emphasis}</em>
                      {a.after}
                    </>
                  ) : (
                    a.title
                  )}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
