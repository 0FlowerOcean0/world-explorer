import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { PageHero } from '@/components/page-hero'
import { AboutContent } from '@/components/about-content'
import { SiteFooter } from '@/components/site-footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PageHero
          section="§ 06 · ABOUT"
          before="About — "
          emphasis="关于"
          eyebrow={
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-foreground">HUA HAI</span>
              <span className="opacity-50">花海</span>
              <span className="opacity-50">·</span>
              <span>WRITER · LEARNER · EXPLORER</span>
            </span>
          }
          description={
            <>
              笔记、书籍、课程 — a single-page résumé, kept current. Essays live on{' '}
              <Link href="/articles" className="text-accent underline underline-offset-4">
                Articles
              </Link>
              ; books on{' '}
              <Link href="/books" className="text-accent underline underline-offset-4">
                Books
              </Link>
              .
            </>
          }
        />
        <AboutContent />
      </main>
      <SiteFooter />
    </div>
  )
}
