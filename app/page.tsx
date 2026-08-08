import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HomeHero } from '@/components/home-hero'
import { HomeTicker } from '@/components/home-ticker'
import { FeaturedArticles } from '@/components/featured-articles'
import { BookSpines } from '@/components/book-spines'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <HomeHero />
        <HomeTicker />
        <FeaturedArticles />
        <BookSpines />
      </main>
      <SiteFooter />
    </div>
  )
}
