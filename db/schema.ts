import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titleZh: text('title_zh').notNull(),
  titleEn: text('title_en').notNull().default(''),
  contentZh: text('content_zh').notNull().default(''),
  contentEn: text('content_en').notNull().default(''),
  slug: text('slug').notNull().unique(),
  locationId: integer('location_id').references(() => locations.id),
  createdAt: text('created_at')
    .notNull()
    .default(sql`datetime('now')`),
})

export const locations = sqliteTable('locations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  country: text('country').notNull(),
  lat: text('lat').notNull(),
  lng: text('lng').notNull(),
  description: text('description').notNull().default(''),
})

export const profile = sqliteTable('profile', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  bioZh: text('bio_zh').notNull().default(''),
  bioEn: text('bio_en').notNull().default(''),
  avatarUrl: text('avatar_url').notNull().default(''),
})
