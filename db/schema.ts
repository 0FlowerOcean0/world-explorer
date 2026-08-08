import { pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  titleZh: text('title_zh').notNull(),
  titleEn: text('title_en').notNull().default(''),
  contentZh: text('content_zh').notNull().default(''),
  contentEn: text('content_en').notNull().default(''),
  slug: text('slug').notNull().unique(),
  locationId: serial('location_id').references(() => locations.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  country: text('country').notNull(),
  lat: text('lat').notNull(),
  lng: text('lng').notNull(),
  description: text('description').notNull().default(''),
})

export const profile = pgTable('profile', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  bioZh: text('bio_zh').notNull().default(''),
  bioEn: text('bio_en').notNull().default(''),
  avatarUrl: text('avatar_url').notNull().default(''),
})
