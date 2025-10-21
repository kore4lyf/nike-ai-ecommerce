import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const genders = pgTable('genders', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  label: varchar('label', { length: 50 }).notNull(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
});

// Schema for inserting a gender - can be used to validate API requests
export const insertGenderSchema = createInsertSchema(genders, {
  label: z.string().min(1).max(50),
  slug: z.string().min(1).max(50),
});

// Schema for selecting a gender - can be used to validate API responses
export const selectGenderSchema = createSelectSchema(genders);

// Type types extracted from the schemas
export type Gender = z.infer<typeof selectGenderSchema>;
export type NewGender = z.infer<typeof insertGenderSchema>;