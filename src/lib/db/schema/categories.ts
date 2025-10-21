import { pgTable, uuid, varchar, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  parentId: uuid('parent_id'),
}, (table) => {
  return {
    parentFk: foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
    }).onDelete('set null'),
  };
});

// Schema for inserting a category - can be used to validate API requests
export const insertCategorySchema = createInsertSchema(categories, {
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  parentId: z.string().uuid().optional().nullable(),
});

// Schema for selecting a category - can be used to validate API responses
export const selectCategorySchema = createSelectSchema(categories);

// Type types extracted from the schemas
export type Category = z.infer<typeof selectCategorySchema>;
export type NewCategory = z.infer<typeof insertCategorySchema>;