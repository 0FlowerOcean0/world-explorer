import { SiteHeader } from '@/components/site-header'
import { PageHero } from '@/components/page-hero'
import { BookShelf } from '@/components/book-shelf'
import { SiteFooter } from '@/components/site-footer'

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PageHero
          section="§ 02 · BOOKS"
          before="The "
          emphasis="shelf"
          after=" — 17 volumes, in rotation."
          description="Open-source and bilingual editions: writing, learning, money, attention. Chinese originals live next to English revisions; several titles rewritten more than once."
        />
        <BookShelf />
      </main>
      <SiteFooter />
    </div>
  )
}
