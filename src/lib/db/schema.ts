import { sqliteTable, integer, text, numeric } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  price: numeric('price').notNull(),
  imageUrl: text('image_url'),
  category: text('category'),
  brand: text('brand'),
  badge: text('badge'),
  badgeType: text('badge_type'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(new Date()),
});