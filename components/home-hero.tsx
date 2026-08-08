import { WorldMap } from '@/components/world-map'
import { dispatch } from '@/lib/home'

const meta = [
  { term: 'FIRST BOOK', def: '2004 · TOEFL 高分作文' },
  { term: 'LANGUAGES', def: '中文 · English' },
  { term: 'CADENCE', def: '~2 articles / week' },
  { term: 'SINCE', def: '2018 (this journal)' },
]

export function HomeHero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:py-20">
        {/* Left: intro */}
        <div className="flex flex-col">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Beijing · Shenzhen · Tokyo · Hong Kong
          </p>
          <h1 className="mt-6 text-balance font-serif text-5xl font-normal leading-[1.02] tracking-tight text-foreground md:text-7xl">
            花海
            <br />
            <em className="italic text-accent">个人网站</em>
            <br />
            花开有时，绽放无期。
          </h1>
          <p className="mt-8 max-w-md text-pretty leading-relaxed text-muted-foreground">
            笔记、书籍和课程。关于学习、金钱、语言和注意力 — 在机器思考的时代重新开放。
          </p>

          <dl className="mt-10 grid max-w-md grid-cols-[auto_1fr] gap-x-8 gap-y-3 font-mono text-xs">
            {meta.map((m) => (
              <div key={m.term} className="contents">
                <dt className="uppercase tracking-[0.2em] text-muted-foreground">
                  {m.term}
                </dt>
                <dd className="text-foreground">{m.def}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: dispatch / colophon card */}
        <aside
          aria-label="Dispatch and colophon"
          className="flex flex-col border border-border bg-card p-6 md:p-8"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            § Dispatch · Colophon
          </p>

          <div className="relative mt-6">
            <WorldMap />
            <span className="absolute right-0 top-2 max-w-[7rem] text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-muted-foreground">
              Bureaux
              <span className="mt-1 block font-serif text-sm normal-case italic tracking-normal text-foreground">
                Beijing
                <br />→ Shenzhen
                <br />→ Tokyo
                <br />→ Hong Kong
              </span>
            </span>
          </div>

          <div className="my-6 flex items-center justify-center text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            <span className="px-4 font-serif italic">§</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <dl className="flex flex-col divide-y divide-border/70 font-mono text-xs">
            <Row label="READING">
              <span className="font-sans text-sm text-foreground">
                {dispatch.reading.title}
                <em className="text-muted-foreground"> · {dispatch.reading.meta}</em>
              </span>
            </Row>
            <Row label="WRITING">
              <span className="font-sans text-sm text-foreground">
                <a href="#" className="text-accent hover:underline">hua-hai.com</a>
                {', and '}
                <a href="#" className="text-accent hover:underline">hua-hai.com</a>
              </span>
            </Row>
            <Row label="SHIPPING">
              <span className="font-sans text-sm text-foreground">
                {dispatch.shipping.title}
                <em className="text-muted-foreground"> · {dispatch.shipping.meta}</em>
              </span>
            </Row>
            <Row label="CODING">
              <span className="flex items-center gap-2 font-sans text-sm text-foreground">
                {dispatch.coding.title}
                <em className="text-muted-foreground"> · {dispatch.coding.meta}</em>
                <Sparkline data={dispatch.activity} />
              </span>
            </Row>
          </dl>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>
              Set in <em className="italic">Newsreader</em> &amp; Inter
            </span>
            <span className="border border-border px-2 py-1 text-accent">
              {dispatch.date}
            </span>
          </div>
        </aside>
      </div>
    </section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 py-3">
      <dt className="flex items-baseline gap-2 uppercase tracking-[0.2em] text-muted-foreground">
        <span className="text-accent">·</span>
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  )
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data, 1)
  return (
    <span className="ml-auto flex items-end gap-0.5" aria-hidden="true">
      {data.map((v, i) => (
        <span
          key={i}
          className="w-1 bg-accent"
          style={{ height: `${Math.max(2, (v / max) * 14)}px` }}
        />
      ))}
    </span>
  )
}
