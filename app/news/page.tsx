import { SiteHeader } from '@/components/site-header'
import { PageHero } from '@/components/page-hero'
import { NewsFeed } from '@/components/news-feed'
import { SiteFooter } from '@/components/site-footer'

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PageHero
          section="§ 05 · NEWS"
          before="The "
          emphasis="ticker"
          after=" — daily shipping log."
          description="GitHub activity and gists, tracked automatically. A thin, public view of what’s being shipped, reviewed, or abandoned."
        />
        <NewsFeed />
      </main>
      <SiteFooter />
    </div>
  )
}
