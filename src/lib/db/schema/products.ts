import { pgTable, uuid, varchar, text, boolean, timestamp, foreignKey, numeric } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { categories } from './categories';
import { brands } from './brands';
import { genders } from './filters/genders';
import { variants } from './variants';

export const products = pgTable('products', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  categoryId: uuid('category_id').notNull(),
  genderId: uuid('gender_id').notNull(),
  brandId: uuid('brand_id').notNull(),
  isPublished: boolean('is_published').notNull().default(false),
  defaultVariantId: uuid('default_variant_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
  return {
    categoryFk: foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
    }).onDelete('cascade'),
    genderFk: foreignKey({
      columns: [table.genderId],
      foreignColumns: [genders.id],
    }).onDelete('cascade'),
    brandFk: foreignKey({
      columns: [table.brandId],
      foreignColumns: [brands.id],
    }).onDelete('cascade'),
    defaultVariantFk: foreignKey({
      columns: [table.defaultVariantId],
      foreignColumns: [variants.id],
    }).onDelete('set null'),
  };
});

// Schema for inserting a product - can be used to validate API requests
export const insertProductSchema = createInsertSchema(products, {
  name: z.string().min(1).max(255),
  description: z.string().min(1),
  categoryId: z.string().uuid(),
  genderId: z.string().uuid(),
  brandId: z.string().uuid(),
  isPublished: z.boolean(),
  defaultVariantId: z.string().uuid().optional().nullable(),
});

// Schema for selecting a product - can be used to validate API responses
export const selectProductSchema = createSelectSchema(products);

// Type types extracted from the schemas
export type Product = z.infer<typeof selectProductSchema>;
export type NewProduct = z.infer<typeof insertProductSchema>;