import Link from 'next/link'

type Props = {
  eyebrow: string
  before: string
  emphasis: string
  action?: { label: string; href: string }
}

export function SectionHeading({ eyebrow, before, emphasis, action }: Props) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-6">
      <div className="flex items-baseline gap-6">
        <span className="hidden h-px w-10 self-center bg-foreground sm:block" />
        <span className="font-mono text-xs uppercase leading-relaxed tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
        <h2 className="font-serif text-2xl font-normal tracking-tight text-foreground md:text-3xl">
          {before}
          <em className="italic text-muted-foreground">{emphasis}</em>
        </h2>
      </div>
      {action ? (
        <Link
          href={action.href}
          className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  )
}
