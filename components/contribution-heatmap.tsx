// Deterministic pseudo-random so server and client render identically.
function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

const WEEKS = 52
const DAYS = 7

const levelColors = [
  'bg-secondary',
  'bg-[oklch(0.85_0.05_255)]',
  'bg-[oklch(0.68_0.09_255)]',
  'bg-[oklch(0.52_0.12_255)]',
  'bg-[oklch(0.38_0.14_255)]',
]

function buildGrid() {
  const grid: number[][] = []
  for (let w = 0; w < WEEKS; w++) {
    const col: number[] = []
    for (let d = 0; d < DAYS; d++) {
      const r = seeded(w * 7 + d + 1)
      // Newer weeks (right side) skew busier.
      const bias = w / WEEKS
      const v = r * 0.65 + bias * 0.5
      let level = 0
      if (v > 0.35) level = 1
      if (v > 0.55) level = 2
      if (v > 0.72) level = 3
      if (v > 0.88) level = 4
      // Leave the first few weeks emptier.
      if (w < 5 && r < 0.5) level = 0
      col.push(level)
    }
    grid.push(col)
  }
  return grid
}

export function ContributionHeatmap() {
  const grid = buildGrid()

  return (
    <div className="w-full">
      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-[720px] gap-[3px]">
          {grid.map((col, w) => (
            <div key={w} className="flex flex-1 flex-col gap-[3px]">
              {col.map((level, d) => (
                <div
                  key={d}
                  className={`aspect-square w-full rounded-[2px] ${levelColors[level]}`}
                  title={`${level * 3} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[11px] tracking-wide text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {levelColors.map((c, i) => (
            <span key={i} className={`size-3 rounded-[2px] ${c}`} />
          ))}
          <span>More</span>
        </div>
        <span className="hidden sm:inline">
          24452 CONTRIBUTIONS IN THE LAST YEAR · 32 GISTS
        </span>
      </div>
    </div>
  )
}
