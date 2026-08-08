import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import {
  books,
  bookSlug,
  bookBlurb,
  bookLangName,
  getBookBySlug,
} from '@/lib/books'

export function generateStaticParams() {
  return books.map((b) => ({ slug: bookSlug(b) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const book = getBookBySlug(slug)
  if (!book) return { title: 'Not found — Reborn' }
  return {
    title: `${book.title} — Reborn`,
    description: bookBlurb(book)[0],
  }
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = getBookBySlug(slug)
  if (!book) notFound()

  const blurb = bookBlurb(book)

  return (
    <>
      <SiteHeader />
      <main id="content">
        <article className="mx-auto max-w-3xl px-6 pb-24 pt-16">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.5} />
            ALL BOOKS
          </Link>

          <div className="mt-8 grid gap-8 md:grid-cols-[10rem_1fr]">
            {/* Cover placeholder */}
            <div className="flex aspect-[3/4] w-40 flex-col justify-between rounded-sm border border-border bg-secondary p-4">
              <span className="font-mono text-xs text-muted-foreground">{book.no}</span>
              <span className="text-pretty font-serif text-lg leading-tight text-foreground">
                {book.title}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-wider text-muted-foreground">
                <span className="rounded-full border border-border px-2 py-0.5">
                  {bookLangName(book)}
                </span>
                {book.topics.map((t) => (
                  <span key={t} className="rounded-full border border-border px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 text-balance font-serif text-4xl font-normal leading-[1.1] tracking-tight text-foreground">
                {book.title}
              </h1>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-full bg-foreground px-5 py-2 text-sm text-background transition-opacity hover:opacity-90"
                >
                  Read online
                </button>
                <button
                  type="button"
                  className="rounded-full border border-border px-5 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-6 border-t border-border pt-10">
            {blurb.map((p, i) => (
              <p
                key={i}
                className="text-pretty font-serif text-lg leading-relaxed text-foreground/90"
              >
                {p}
              </p>
            ))}
          </div>

          <p className="mt-12 border-t border-border pt-6 font-mono text-[11px] leading-relaxed text-muted-foreground">
            Note: this is a demonstration detail view with placeholder copy, not
            the book&apos;s actual contents.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
