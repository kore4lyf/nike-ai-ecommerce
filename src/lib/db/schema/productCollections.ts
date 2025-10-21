import { pgTable, uuid, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { products } from './products';
import { collections } from './collections';

export const productCollections = pgTable('product_collections', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  productId: uuid('product_id').notNull(),
  collectionId: uuid('collection_id').notNull(),
}, (table) => {
  return {
    productFk: foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
    }).onDelete('cascade'),
    collectionFk: foreignKey({
      columns: [table.collectionId],
      foreignColumns: [collections.id],
    }).onDelete('cascade'),
  };
});

// Schema for inserting a product-collection relationship - can be used to validate API requests
export const insertProductCollectionSchema = createInsertSchema(productCollections, {
  productId: z.string().uuid(),
  collectionId: z.string().uuid(),
});

// Schema for selecting a product-collection relationship - can be used to validate API responses
export const selectProductCollectionSchema = createSelectSchema(productCollections);

// Type types extracted from the schemas
export type ProductCollection = z.infer<typeof selectProductCollectionSchema>;
export type NewProductCollection = z.infer<typeof insertProductCollectionSchema>;