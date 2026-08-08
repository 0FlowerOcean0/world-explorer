import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import {
  articles,
  articleSlug,
  fullTitle,
  articleBody,
  getArticleBySlug,
} from '@/lib/articles'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: articleSlug(a) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'Not found — Reborn' }
  return {
    title: `${fullTitle(article)} — Reborn`,
    description: articleBody(article)[0],
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const title = fullTitle(article)
  const body = articleBody(article)

  return (
    <>
      <SiteHeader />
      <main id="content">
        <article className="mx-auto max-w-2xl px-6 pb-24 pt-16">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.5} />
            ALL ARTICLES
          </Link>

          <div className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <time>{article.date}</time>
            <span className="opacity-50">—</span>
            <span>{article.langs.join(' · ')}</span>
          </div>

          <h1 className="mt-4 text-balance font-serif text-4xl font-normal leading-[1.1] tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>

          <div className="mt-10 space-y-6 border-t border-border pt-10">
            {body.map((p, i) => (
              <p
                key={i}
                className="text-pretty font-serif text-lg leading-relaxed text-foreground/90"
              >
                {p}
              </p>
            ))}
          </div>

          <p className="mt-12 border-t border-border pt-6 font-mono text-[11px] leading-relaxed text-muted-foreground">
            Note: this is a demonstration reading view with placeholder text, not
            the original published essay.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
