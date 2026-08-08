import Link from 'next/link'

type PageHeroProps = {
  section: string
  before: string
  emphasis: string
  after?: string
  description: React.ReactNode
  eyebrow?: React.ReactNode
}

export function PageHero({
  section,
  before,
  emphasis,
  after,
  description,
  eyebrow,
}: PageHeroProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-14 pt-16 md:pt-20">
      <div className="font-mono text-[11px] tracking-widest text-muted-foreground">
        <Link href="/articles" className="transition-colors hover:text-foreground">
          REBORN
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span>{section}</span>
      </div>

      {eyebrow ? (
        <div className="mt-6 font-mono text-[11px] tracking-widest text-muted-foreground">
          {eyebrow}
        </div>
      ) : null}

      <h1 className="mt-4 max-w-5xl text-balance font-serif text-5xl font-normal leading-[1.05] tracking-tight text-foreground md:text-[4.25rem]">
        {before}
        <em className="italic text-accent">{emphasis}</em>
        {after}
      </h1>

      <div className="mt-7 max-w-2xl text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
        {description}
      </div>
    </section>
  )
}
