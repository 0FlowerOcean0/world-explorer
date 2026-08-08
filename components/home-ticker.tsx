import { tickerItems } from '@/lib/home'

export function HomeTicker() {
  const items = [...tickerItems, ...tickerItems]
  return (
    <div className="overflow-hidden border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center gap-8 overflow-hidden px-6 py-3">
        <span className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Alpha Wolf
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-[ticker_40s_linear_infinite] gap-8 whitespace-nowrap">
            {items.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-8 font-mono text-xs text-muted-foreground"
              >
                {item}
                <span className="text-accent">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
