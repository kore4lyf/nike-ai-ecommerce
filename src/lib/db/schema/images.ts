import { pgTable, uuid, varchar, integer, boolean, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { products } from './products';
import { variants } from './variants';

export const productImages = pgTable('product_images', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  productId: uuid('product_id').notNull(),
  variantId: uuid('variant_id'),
  url: varchar('url', { length: 500 }).notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  isPrimary: boolean('is_primary').notNull().default(false),
}, (table) => {
  return {
    productFk: foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
    }).onDelete('cascade'),
    variantFk: foreignKey({
      columns: [table.variantId],
      foreignColumns: [variants.id],
    }).onDelete('cascade'),
  };
});

// Schema for inserting a product image - can be used to validate API requests
export const insertProductImageSchema = createInsertSchema(productImages, {
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional().nullable(),
  url: z.string().url(),
  sortOrder: z.number().int().nonnegative(),
  isPrimary: z.boolean(),
});

// Schema for selecting a product image - can be used to validate API responses
export const selectProductImageSchema = createSelectSchema(productImages);

// Type types extracted from the schemas
export type ProductImage = z.infer<typeof selectProductImageSchema>;
export type NewProductImage = z.infer<typeof insertProductImageSchema>;