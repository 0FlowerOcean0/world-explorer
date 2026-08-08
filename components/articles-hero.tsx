export function ArticlesHero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-14 pt-16 md:pt-20">
      <div className="font-mono text-[11px] tracking-widest text-muted-foreground">
        <a href="#" className="transition-colors hover:text-foreground">
          REBORN
        </a>
        <span className="mx-2 opacity-50">/</span>
        <span>ARTICLES</span>
      </div>

      <h1 className="mt-6 max-w-5xl text-balance font-serif text-5xl font-normal leading-[1.05] tracking-tight text-foreground md:text-[4.25rem]">
        The <em className="italic text-accent">journal</em> — a commonplace book, kept in
        public.
      </h1>

      <p className="mt-7 max-w-xl text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
        Essays, notes, letters. Written in two languages, posted when they want to be posted.
        Navigate by year or browse the full archive.
      </p>
    </section>
  )
}
