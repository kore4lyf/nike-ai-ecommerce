import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const collections = pgTable('collections', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Schema for inserting a collection - can be used to validate API requests
export const insertCollectionSchema = createInsertSchema(collections, {
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
});

// Schema for selecting a collection - can be used to validate API responses
export const selectCollectionSchema = createSelectSchema(collections);

// Type types extracted from the schemas
export type Collection = z.infer<typeof selectCollectionSchema>;
export type NewCollection = z.infer<typeof insertCollectionSchema>;