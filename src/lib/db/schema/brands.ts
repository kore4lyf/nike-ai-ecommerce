import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const brands = pgTable('brands', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  logoUrl: varchar('logo_url', { length: 500 }),
});

// Schema for inserting a brand - can be used to validate API requests
export const insertBrandSchema = createInsertSchema(brands, {
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  logoUrl: z.string().url().optional().nullable(),
});

// Schema for selecting a brand - can be used to validate API responses
export const selectBrandSchema = createSelectSchema(brands);

// Type types extracted from the schemas
export type Brand = z.infer<typeof selectBrandSchema>;
export type NewBrand = z.infer<typeof insertBrandSchema>;