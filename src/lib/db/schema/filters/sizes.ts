import { pgTable, uuid, varchar, integer } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const sizes = pgTable('sizes', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 10 }).notNull(),
  slug: varchar('slug', { length: 10 }).notNull().unique(),
  sortOrder: integer('sort_order').notNull().default(0),
});

// Schema for inserting a size - can be used to validate API requests
export const insertSizeSchema = createInsertSchema(sizes, {
  name: z.string().min(1).max(10),
  slug: z.string().min(1).max(10),
  sortOrder: z.number().int().nonnegative(),
});

// Schema for selecting a size - can be used to validate API responses
export const selectSizeSchema = createSelectSchema(sizes);

// Type types extracted from the schemas
export type Size = z.infer<typeof selectSizeSchema>;
export type NewSize = z.infer<typeof insertSizeSchema>;