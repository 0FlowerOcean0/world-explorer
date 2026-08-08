import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { articles, articleYear, articleHref, type Article } from '@/lib/articles'

function LangBadges({ langs }: { langs: Article['langs'] }) {
  return (
    <span className="flex items-center gap-1">
      {langs.map((lang) =>
        lang === 'CN' ? (
          <span
            key={lang}
            aria-label="Chinese"
            className="flex size-6 items-center justify-center rounded-full bg-[oklch(0.35_0.09_255)] font-mono text-[10px] font-medium text-background"
          >
            中
          </span>
        ) : (
          <span
            key={lang}
            aria-label="English"
            className="flex h-6 items-center justify-center rounded-full border border-border px-2 font-mono text-[10px] font-medium tracking-wide text-muted-foreground"
          >
            EN
          </span>
        ),
      )}
    </span>
  )
}

function ArticleTitle({ article }: { article: Article }) {
  if (article.emphasis) {
    return (
      <span>
        {article.before}
        <em className="italic text-accent">{article.emphasis}</em>
        {article.after}
      </span>
    )
  }
  return <span>{article.title}</span>
}

export function ArticleList() {
  return (
    <section id="content" className="mx-auto max-w-6xl px-6 pb-24">
      {/* Year heading */}
      <div className="flex items-baseline gap-4 border-b-2 border-foreground pb-3">
        <h2 className="font-serif text-5xl font-normal tracking-tight text-foreground">
          {articleYear}
        </h2>
        <span className="font-mono text-xs text-muted-foreground">
          {articles.length} articles
        </span>
      </div>

      {/* List */}
      <ul>
        {articles.map((article, i) => (
          <li key={`${article.date}-${i}`}>
            <Link
              href={articleHref(article)}
              className="group grid grid-cols-[7rem_3.5rem_1fr_auto] items-center gap-4 border-b border-border py-6 transition-colors hover:bg-secondary/60 md:gap-6"
            >
              <time className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {article.date}
              </time>

              <LangBadges langs={article.langs} />

              <h3 className="text-pretty font-serif text-xl leading-snug text-foreground md:text-[1.7rem]">
                <ArticleTitle article={article} />
              </h3>

              <ArrowRight
                className="size-5 justify-self-end text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground"
                strokeWidth={1.5}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
