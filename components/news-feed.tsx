'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { ContributionHeatmap } from '@/components/contribution-heatmap'
import {
  yesterdayRepos,
  thisWeekRepos,
  earlierRepos,
  gists,
  type NewsEvent,
  type NewsRepo,
} from '@/lib/news'

function SectionMarker({ tag, sub }: { tag: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] tracking-widest text-muted-foreground">
      <span className="h-px w-8 bg-border" />
      <span>
        {tag} · {sub}
      </span>
    </div>
  )
}

function EventRow({ event }: { event: NewsEvent }) {
  return (
    <a
      href="#"
      className="group flex items-center gap-3 border-b border-border py-3 transition-colors hover:bg-secondary/50"
    >
      <span className="flex h-6 w-11 items-center justify-center rounded-full border border-border font-mono text-[10px] tracking-wide text-muted-foreground">
        {event.kind}
      </span>
      <span className="flex-1 text-sm text-foreground/90 group-hover:text-foreground">
        {event.text}
      </span>
      <time className="font-mono text-[11px] text-muted-foreground">{event.time}</time>
    </a>
  )
}

function RepoBlock({ repo }: { repo: NewsRepo }) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-foreground/30 pb-3">
        <a
          href="#"
          className="font-mono text-sm text-foreground transition-colors hover:text-accent"
        >
          {repo.name}
        </a>
        <div className="flex items-center gap-2">
          {repo.tags.map((t) => (
            <span
              key={t.label}
              className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              <span className="text-foreground">{t.count}</span> {t.label}
            </span>
          ))}
        </div>
      </div>
      <div>
        {repo.events.map((e, i) => (
          <EventRow key={i} event={e} />
        ))}
      </div>
    </div>
  )
}

function CollapsibleGroup({
  label,
  sub,
  children,
}: {
  label: string
  sub: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full items-center gap-3 py-4 text-left"
      >
        <ChevronRight
          className={`size-4 text-muted-foreground transition-transform ${
            open ? 'rotate-90 text-foreground' : 'group-hover:translate-x-0.5'
          }`}
          strokeWidth={1.5}
        />
        <span className="font-mono text-xs tracking-widest text-foreground">
          {label} <span className="text-muted-foreground">· {sub}</span>
        </span>
      </button>
      {open && <div className="pb-8">{children}</div>}
    </div>
  )
}

export function NewsFeed() {
  return (
    <section id="content" className="mx-auto max-w-6xl px-6 pb-24">
      {/* Activity block */}
      <div className="border-t border-border pt-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <SectionMarker tag="§ 05a" sub="ACTIVITY" />
            <h2 className="font-serif text-2xl text-foreground md:text-3xl">
              GitHub — <em className="italic text-accent">contribution rhythm</em>
            </h2>
          </div>
          <a
            href="https://github.com/hua-hai"
            className="font-mono text-[11px] tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            VIEW ON GITHUB →
          </a>
        </div>

        <div className="mt-8">
          <ContributionHeatmap />
        </div>

        {/* Today */}
        <div className="mt-12">
          <h3 className="font-mono text-xs tracking-widest text-foreground">
            TODAY <span className="text-muted-foreground">· QUIET SO FAR</span>
          </h3>
          <p className="mt-4 font-serif text-base italic leading-relaxed text-muted-foreground">
            No public activity yet today. Check back later — or drift through{' '}
            <a href="https://github.com/hua-hai" className="text-accent underline underline-offset-4">
              the archive on GitHub
            </a>
            .
          </p>
        </div>

        {/* Yesterday */}
        <div className="mt-12">
          <h3 className="font-mono text-xs tracking-widest text-foreground">
            YESTERDAY <span className="text-muted-foreground">· 5 ACROSS 2 REPOS</span>
          </h3>

          <div className="mt-6 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {yesterdayRepos.map((repo) => (
              <RepoBlock key={repo.name} repo={repo} />
            ))}
          </div>
        </div>

        {/* Collapsible groups */}
        <div className="mt-10">
          <CollapsibleGroup label="THIS WEEK" sub="30 ACROSS 5 REPOS">
            <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
              {thisWeekRepos.map((repo) => (
                <RepoBlock key={repo.name} repo={repo} />
              ))}
            </div>
          </CollapsibleGroup>

          <CollapsibleGroup label="EARLIER" sub="165 ACROSS 26 REPOS">
            <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
              {earlierRepos.map((repo) => (
                <RepoBlock key={repo.name} repo={repo} />
              ))}
            </div>
          </CollapsibleGroup>
        </div>
      </div>

      {/* Gists block */}
      <div className="mt-20 border-t border-border pt-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <SectionMarker tag="§ 05b" sub="GISTS" />
            <h2 className="font-serif text-2xl text-foreground md:text-3xl">
              Gists — <em className="italic text-accent">snippets in the margin</em>
            </h2>
          </div>
          <a
            href="https://gist.github.com/hua-hai"
            className="font-mono text-[11px] tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            ALL GISTS →
          </a>
        </div>

        <div className="mt-8">
          <CollapsibleGroup label="EARLIER" sub="32 GISTS">
            <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2">
              {gists.map((g) => (
                <a
                  key={g.name}
                  href="#"
                  className="group flex flex-col gap-2 border-b border-r border-border p-5 transition-colors hover:bg-secondary/60"
                >
                  <span className="font-mono text-sm text-foreground group-hover:text-accent">
                    {g.name}
                  </span>
                  <span className="text-sm text-muted-foreground">{g.desc}</span>
                  <span className="mt-2 font-mono text-[10px] tracking-widest text-muted-foreground">
                    {g.lang.toUpperCase()} · {g.updated}
                  </span>
                </a>
              ))}
            </div>
          </CollapsibleGroup>
        </div>
      </div>
    </section>
  )
}
