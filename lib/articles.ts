export type Article = {
  date: string
  title: string
  /** rendered as italic serif inside the title */
  emphasis?: string
  /** text that comes before the emphasis span */
  before?: string
  /** text that comes after the emphasis span */
  after?: string
  langs: ('CN' | 'EN')[]
  href: string
}

export const articleYear = '2026'

/** The complete, human-readable title for an article (merges emphasis parts). */
export function fullTitle(a: Article): string {
  if (a.emphasis) return `${a.before ?? ''}${a.emphasis}${a.after ?? ''}`.trim()
  return a.title
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9一-龥]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function articleSlug(a: Article): string {
  return slugify(fullTitle(a))
}

export function articleHref(a: Article): string {
  return `/articles/${articleSlug(a)}`
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => articleSlug(a) === slug)
}

/**
 * Synthetic, original editorial placeholder body — NOT the real published text.
 * Generates a few paragraphs so detail pages have readable content.
 */
export function articleBody(a: Article): string[] {
  const t = fullTitle(a)
  return [
    `这是"${t}"的占位阅读视图。下面的布局演示了长篇文章在本站上的呈现方式——优雅的衬线字体、舒适的阅读宽度，以及为持续专注而设计的安静边距。`,
    `每个想法都因其多次有用而赢得一席之地。一篇好文章不会急于得出结论；它让读者自己到达那里，一次一个诚实的句子。`,
    `最有力的论点往往是最简单的那些，朴素地陈述出来，然后针对明显的反对意见进行压力测试。清晰不是深度的敌人——而是深度的证明。`,
    `当你读完时，真正的工作开始了：注意这个想法在你的生活中如何应用，并反复回来，直到它成为一种习惯，而不是一条笔记。`,
  ]
}

export const articles: Article[] = [
  { date: 'Jul 25, 2026', title: '人工智能时代的学习之道', langs: ['CN'], href: '#' },
  { date: 'Jul 20, 2026', title: 'The Future of Creative Writing', langs: ['EN'], href: '#' },
  { date: 'Jul 15, 2026', title: '读书与思考的艺术', langs: ['CN'], href: '#' },
  { date: 'Jul 10, 2026', title: 'How to Build Better Habits', langs: ['EN'], href: '#' },
  { date: 'Jul 5, 2026', title: '生活中的小确幸', langs: ['CN'], href: '#' },
  {
    date: 'Jul 1, 2026',
    title: '',
    before: '关于 ',
    emphasis: '时间管理',
    after: ' 的思考',
    langs: ['CN'],
    href: '#',
  },
  { date: 'Jun 28, 2026', title: '阅读改变人生', langs: ['CN'], href: '#' },
  { date: 'Jun 25, 2026', title: 'The Power of Daily Practice', langs: ['EN'], href: '#' },
  {
    date: 'Jun 20, 2026',
    title: '数字时代的注意力管理',
    langs: ['CN', 'EN'],
    href: '#',
  },
  {
    date: 'Jun 15, 2026',
    title: 'Why Writing Matters More Than Ever',
    langs: ['CN', 'EN'],
    href: '#',
  },
  {
    date: 'Jun 10, 2026',
    title: '从零开始学习一门新技能',
    langs: ['CN'],
    href: '#',
  },
  { date: 'Jun 5, 2026', title: 'The Art of Living Simply', langs: ['EN'], href: '#' },
  {
    date: 'Jun 1, 2026',
    title: '如何培养深度思考的能力',
    langs: ['CN'],
    href: '#',
  },
  {
    date: 'May 28, 2026',
    title: 'Building a Second Brain',
    langs: ['CN', 'EN'],
    href: '#',
  },
  { date: 'May 25, 2026', title: '生活中的美学', langs: ['CN'], href: '#' },
  {
    date: 'May 20, 2026',
    title: 'The Benefits of Morning Routines',
    langs: ['EN'],
    href: '#',
  },
  { date: 'May 15, 2026', title: '关于财富的几个真相', langs: ['CN'], href: '#' },
  {
    date: 'May 10, 2026',
    title: 'How to Stay Focused in a Distracted World',
    langs: ['EN'],
    href: '#',
  },
  { date: 'May 5, 2026', title: '学习是一辈子的事', langs: ['CN'], href: '#' },
  {
    date: 'May 1, 2026',
    title: 'The Growth Mindset in Practice',
    langs: ['CN', 'EN'],
    href: '#',
  },
]
