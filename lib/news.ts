export type NewsEvent = {
  kind: 'ISS' | 'COM' | 'PR' | 'FORK'
  text: string
  time: string
}

export type NewsRepo = {
  name: string
  tags: { label: string; count: number }[]
  events: NewsEvent[]
}

export const yesterdayRepos: NewsRepo[] = [
  {
    name: 'hua-hai/flowers',
    tags: [
      { label: 'COM', count: 3 },
      { label: 'PR', count: 1 },
    ],
    events: [
      { kind: 'COM', text: 'Add new flower species data', time: '06:15' },
      { kind: 'COM', text: 'Update seasonal bloom schedule', time: '05:42' },
      { kind: 'COM', text: 'Fix image gallery layout', time: '04:28' },
    ],
  },
  {
    name: 'hua-hai/garden-tools',
    tags: [
      { label: 'ISS', count: 2 },
      { label: 'COM', count: 4 },
    ],
    events: [
      { kind: 'ISS', text: 'Opened issue #42 — watering schedule', time: '03:55' },
      { kind: 'COM', text: 'Implemented weather API integration', time: '02:30' },
    ],
  },
]

export const thisWeekRepos: NewsRepo[] = [
  {
    name: 'hua-hai/photography',
    tags: [
      { label: 'COM', count: 12 },
      { label: 'PR', count: 3 },
    ],
    events: [
      { kind: 'COM', text: 'Add spring collection photos', time: 'Jul 24' },
      { kind: 'PR', text: 'Merged PR #55 — new filter styles', time: 'Jul 23' },
      { kind: 'COM', text: 'Optimize image compression', time: 'Jul 22' },
    ],
  },
  {
    name: 'hua-hai/community',
    tags: [
      { label: 'ISS', count: 6 },
      { label: 'COM', count: 8 },
    ],
    events: [
      { kind: 'ISS', text: 'Opened issue #33 — event planning', time: 'Jul 25' },
      { kind: 'COM', text: 'Updated community guidelines', time: 'Jul 24' },
      { kind: 'COM', text: 'Added member showcase page', time: 'Jul 23' },
    ],
  },
]

export const earlierRepos: NewsRepo[] = [
  {
    name: 'hua-hai/design-system',
    tags: [
      { label: 'COM', count: 56 },
      { label: 'PR', count: 12 },
    ],
    events: [
      { kind: 'COM', text: 'Release v2.0 color palette', time: 'Jul 20' },
      { kind: 'PR', text: 'Merged PR #128 — typography update', time: 'Jul 18' },
      { kind: 'FORK', text: 'Forked by garden-lovers', time: 'Jul 15' },
    ],
  },
  {
    name: 'hua-hai/api',
    tags: [
      { label: 'ISS', count: 18 },
      { label: 'COM', count: 45 },
    ],
    events: [
      { kind: 'COM', text: 'Add plant database endpoints', time: 'Jul 12' },
      { kind: 'ISS', text: 'Triaged 6 feature requests', time: 'Jul 10' },
      { kind: 'COM', text: 'Performance optimization pass', time: 'Jul 8' },
    ],
  },
]

export type Gist = {
  name: string
  desc: string
  lang: string
  updated: string
}

export const gists: Gist[] = [
  { name: 'flower-care-guide.md', desc: 'Seasonal care instructions for common flowers', lang: 'Markdown', updated: 'Jul 25' },
  { name: 'bloom-tracker.py', desc: 'Track and visualize flowering periods', lang: 'Python', updated: 'Jul 20' },
  { name: 'garden-planner.ipynb', desc: 'Interactive garden layout planner notebook', lang: 'Jupyter', updated: 'Jul 15' },
  { name: 'nature-palette.css', desc: 'Nature-inspired color palette for web design', lang: 'CSS', updated: 'Jul 10' },
]
