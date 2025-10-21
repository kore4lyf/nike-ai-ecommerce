import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const colors = pgTable('colors', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 50 }).notNull(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  hexCode: varchar('hex_code', { length: 7 }).notNull(), // #RRGGBB format
});

// Schema for inserting a color - can be used to validate API requests
export const insertColorSchema = createInsertSchema(colors, {
  name: z.string().min(1).max(50),
  slug: z.string().min(1).max(50),
  hexCode: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color code'),
});

// Schema for selecting a color - can be used to validate API responses
export const selectColorSchema = createSelectSchema(colors);

// Type types extracted from the schemas
export type Color = z.infer<typeof selectColorSchema>;
export type NewColor = z.infer<typeof insertColorSchema>;