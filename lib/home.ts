export type FeaturedArticle = {
  date: string
  title: string
  before?: string
  emphasis?: string
  after?: string
  image: string
  alt: string
  langs: ('CN' | 'EN')[]
  href: string
}

export const featuredArticles: FeaturedArticle[] = [
  {
    date: 'Jul 25, 2026',
    title: '人工智能时代的学习之道',
    image: '/articles/ai-learning.png',
    alt: '人工智能与学习的融合',
    langs: ['CN'],
    href: '#',
  },
  {
    date: 'Jul 20, 2026',
    title: 'The Future of Creative Writing',
    image: '/articles/creative-writing.png',
    alt: 'Creative writing in the digital age',
    langs: ['EN'],
    href: '#',
  },
  {
    date: 'Jul 15, 2026',
    title: '读书与思考的艺术',
    image: '/articles/reading-art.png',
    alt: '阅读与思考',
    langs: ['CN'],
    href: '#',
  },
  {
    date: 'Jul 10, 2026',
    title: 'How to Build Better Habits',
    image: '/articles/habits.png',
    alt: 'Building better habits',
    langs: ['EN'],
    href: '#',
  },
  {
    date: 'Jul 5, 2026',
    title: '生活中的小确幸',
    image: '/articles/little-joys.png',
    alt: '生活中的小确幸',
    langs: ['CN'],
    href: '#',
  },
  {
    date: 'Jul 1, 2026',
    title: '',
    before: '关于 ',
    emphasis: '时间管理',
    after: ' 的思考',
    image: '/articles/time-management.png',
    alt: '时间管理的思考',
    langs: ['CN'],
    href: '#',
  },
]

export const dispatch = {
  bureaux: ['Beijing', 'Shanghai', 'Shenzhen', 'Hangzhou'],
  reading: { title: '人工智能时代的学习之道', meta: '3 days ago' },
  shipping: { title: '28 articles this year', meta: 'the journal' },
  coding: { title: 'busy today', meta: '42 this week' },
  activity: [5, 3, 8, 12, 6, 2, 4],
  date: '27 JUL 2026',
}

export const tickerItems = [
  '17 published books',
  '3 languages',
  '28 articles this year',
  'latest book · 人工智能小白书',
  'GH this week · 42 events',
  'busy today',
]
