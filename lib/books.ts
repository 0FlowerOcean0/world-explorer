export type BookLang = 'ZH' | 'EN' | 'BI'

export type Book = {
  no: string
  title: string
  lang: BookLang
  langLabel: string
  topics: string[]
  href: string
}

export const books: Book[] = [
  { no: '01', title: '三体', lang: 'ZH', langLabel: '中文', topics: ['Sci-Fi'], href: '#' },
  { no: '02', title: '活着', lang: 'ZH', langLabel: '中文', topics: ['Literature'], href: '#' },
  { no: '03', title: '百年孤独', lang: 'ZH', langLabel: '中文', topics: ['Literature'], href: '#' },
  { no: '04', title: '小王子', lang: 'ZH', langLabel: '中文', topics: ['Literature'], href: '#' },
  { no: '05', title: '围城', lang: 'ZH', langLabel: '中文', topics: ['Literature'], href: '#' },
  { no: '06', title: '平凡的世界', lang: 'ZH', langLabel: '中文', topics: ['Literature'], href: '#' },
  { no: '07', title: '白夜行', lang: 'ZH', langLabel: '中文', topics: ['Mystery'], href: '#' },
  { no: '08', title: '解忧杂货店', lang: 'ZH', langLabel: '中文', topics: ['Fiction'], href: '#' },
  { no: '09', title: '追风筝的人', lang: 'ZH', langLabel: '中文', topics: ['Fiction'], href: '#' },
  { no: '10', title: '人类简史', lang: 'ZH', langLabel: '中文', topics: ['History'], href: '#' },
  { no: '11', title: '思考，快与慢', lang: 'ZH', langLabel: '中文', topics: ['Psychology'], href: '#' },
  { no: '12', title: '穷查理宝典', lang: 'ZH', langLabel: '中文', topics: ['Finance'], href: '#' },
  { no: '13', title: '原则', lang: 'ZH', langLabel: '中文', topics: ['Finance'], href: '#' },
  { no: '14', title: '刻意练习', lang: 'ZH', langLabel: '中文', topics: ['Learning'], href: '#' },
  { no: '15', title: '当下的力量', lang: 'ZH', langLabel: '中文', topics: ['Spirituality'], href: '#' },
  { no: '16', title: 'Atomic Habits', lang: 'EN', langLabel: 'ENGLISH', topics: ['Self-Help'], href: '#' },
  { no: '17', title: 'The Psychology of Money', lang: 'EN', langLabel: 'ENGLISH', topics: ['Finance'], href: '#' },
]

export const bookLangFilters = ['All', '中文', 'English', 'Bilingual'] as const
export const bookTopicFilters = ['Sci-Fi', 'Literature', 'Mystery', 'Fiction', 'History', 'Psychology', 'Finance', 'Learning', 'Spirituality', 'Self-Help'] as const

export function bookSlug(b: Book): string {
  // Chinese titles have no ASCII to slugify, so fall back to the catalogue number.
  const ascii = b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return ascii.length >= 2 ? `${b.no}-${ascii}` : b.no
}

export function bookHref(b: Book): string {
  return `/books/${bookSlug(b)}`
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => bookSlug(b) === slug)
}

const langName: Record<BookLang, string> = {
  ZH: '中文 · Chinese',
  EN: 'English',
  BI: 'Bilingual · 双语',
}

export function bookLangName(b: Book): string {
  return langName[b.lang]
}

/**
 * Synthetic, original placeholder blurb — NOT the real book text.
 * Gives each detail page some readable content.
 */
export function bookBlurb(b: Book): string[] {
  return [
    `《${b.title}》is part of an open, ever-revised body of work. This page is a demonstration detail view — the summary below is placeholder copy, not the book's actual contents.`,
    `The book grew out of notes written and rewritten over many years. Its aim is practical: to hand the reader a small number of durable ideas and enough worked examples to start using them the same day.`,
    `Topics covered here relate to ${b.topics.join(', ')}. Read it once for the shape of the argument, then again slowly, with a pen, testing each claim against your own experience.`,
  ]
}
