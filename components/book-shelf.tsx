'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { books, bookLangFilters, bookTopicFilters, bookHref } from '@/lib/books'

const langMap: Record<string, string> = {
  中文: 'ZH',
  English: 'EN',
  Bilingual: 'BI',
}

export function BookShelf() {
  const [lang, setLang] = useState<string>('All')
  const [topic, setTopic] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const langOk = lang === 'All' || b.lang === langMap[lang]
      const topicOk = !topic || b.topics.includes(topic)
      return langOk && topicOk
    })
  }, [lang, topic])

  return (
    <section id="content" className="mx-auto max-w-6xl px-6 pb-24">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[11px] tracking-widest text-muted-foreground">
            LANGUAGE
          </span>
          {bookLangFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setLang(f)}
              className={
                lang === f
                  ? 'rounded-full bg-foreground px-3 py-1 text-xs text-background'
                  : 'rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground'
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[11px] tracking-widest text-muted-foreground">
            TOPIC
          </span>
          {bookTopicFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setTopic((t) => (t === f ? null : f))}
              className={
                topic === f
                  ? 'rounded-full bg-foreground px-3 py-1 text-xs text-background'
                  : 'rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground'
              }
            >
              {f}
            </button>
          ))}
        </div>

        <span className="ml-auto font-mono text-xs text-muted-foreground">
          {filtered.length} titles
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((book) => (
          <Link
            key={book.no}
            href={bookHref(book)}
            className="group flex min-h-[11rem] flex-col border-b border-r border-border p-5 transition-colors hover:bg-secondary/60"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[oklch(0.4_0.09_255)]">{book.no}</span>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                {book.lang}
              </span>
            </div>

            <h2 className="mt-6 text-pretty font-serif text-xl leading-snug text-foreground">
              {book.title}
            </h2>

            <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
              <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
                {book.langLabel}
              </span>
              <ArrowRight
                className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground"
                strokeWidth={1.5}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
