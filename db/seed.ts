import { db } from './index'
import { posts, locations, profile } from './schema'

async function seed() {
  console.log('Seeding data...')

  // Seed locations
  const locationData = [
    { name: 'Beijing', country: 'China', lat: '39.9', lng: '116.4', description: 'The capital of China, home to many historical sites.' },
    { name: 'Shanghai', country: 'China', lat: '31.2', lng: '121.5', description: 'A major financial hub with a blend of cultures.' },
    { name: 'Shenzhen', country: 'China', lat: '22.54', lng: '114.06', description: 'A technology hub in southern China.' },
    { name: 'Hong Kong', country: 'China', lat: '22.32', lng: '114.17', description: 'A major international financial center.' },
    { name: 'Tokyo', country: 'Japan', lat: '35.69', lng: '139.69', description: 'The vibrant capital of Japan.' },
  ]

  const insertedLocations = await db.insert(locations).values(locationData).returning()

  // Seed posts
  const postData = [
    {
      titleZh: '人工智能时代的学习之道',
      titleEn: 'Learning in the Age of AI',
      contentZh: '这是"人工智能时代的学习之道"的占位阅读视图。每个想法都因其多次有用而赢得一席之地。一篇好文章不会急于得出结论；它让读者自己到达那里，一次一个诚实的句子。',
      contentEn: 'This is a placeholder reading view for "Learning in the Age of AI". Every idea earns its place by being useful multiple times over.',
      slug: 'learning-in-the-age-of-ai',
      locationId: insertedLocations[0].id,
    },
    {
      titleZh: 'The Future of Creative Writing',
      titleEn: 'The Future of Creative Writing',
      contentZh: '这是一篇关于创意写作未来的文章占位内容。技术正在改变我们创作和分享故事的方式。',
      contentEn: 'This is a placeholder article about the future of creative writing. Technology is changing the way we create and share stories.',
      slug: 'the-future-of-creative-writing',
      locationId: insertedLocations[4].id,
    },
    {
      titleZh: '读书与思考的艺术',
      titleEn: 'The Art of Reading and Thinking',
      contentZh: '读书是一门需要终身修炼的艺术。真正有价值的阅读不是为了记住每一个细节，而是为了培养思考的能力。',
      contentEn: 'Reading is an art that requires lifelong practice. Truly valuable reading is not about remembering every detail, but about cultivating the ability to think.',
      slug: 'the-art-of-reading-and-thinking',
      locationId: insertedLocations[1].id,
    },
    {
      titleZh: 'How to Build Better Habits',
      titleEn: 'How to Build Better Habits',
      contentZh: '建立更好的习惯需要理解习惯的形成机制。',
      contentEn: 'Building better habits requires understanding the mechanics of habit formation.',
      slug: 'how-to-build-better-habits',
      locationId: insertedLocations[2].id,
    },
    {
      titleZh: '生活中的小确幸',
      titleEn: 'Small Joys in Life',
      contentZh: '生活中的小确幸往往被我们忽略。学会发现和珍惜这些微小的美好，是幸福生活的重要秘诀。',
      contentEn: 'Small joys in life are often overlooked. Learning to discover and cherish these tiny beauties is an important secret to a happy life.',
      slug: 'small-joys-in-life',
      locationId: insertedLocations[3].id,
    },
  ]

  await db.insert(posts).values(postData)

  // Seed profile
  await db.insert(profile).values({
    id: 1,
    name: '花海',
    bioZh: '笔记、书籍和课程，关于学习、金钱、语言和注意力。',
    bioEn: 'Notes, books and courses on learning, money, language and attention.',
    avatarUrl: '/placeholder-user.jpg',
  })

  console.log('Database seeded successfully!')
}

seed().catch(console.error)
