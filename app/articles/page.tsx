import { SiteHeader } from '@/components/site-header'
import { ArticlesHero } from '@/components/articles-hero'
import { ArticleList } from '@/components/article-list'
import { SiteFooter } from '@/components/site-footer'

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <ArticlesHero />
        <ArticleList />
      </main>
      <SiteFooter />
    </div>
  )
}
