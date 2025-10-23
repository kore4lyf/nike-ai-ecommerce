import { pgTable, uuid, varchar, numeric, integer, jsonb, timestamp, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { relations } from 'drizzle-orm';
import { products } from './products';
import { colors } from './filters/colors';
import { sizes } from './filters/sizes';
import { productImages } from './images';
import { cartItems } from './cartItems';
import { orderItems } from './orderItems';

export const variants = pgTable('product_variants', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  productId: uuid('product_id').notNull(),
  sku: varchar('sku', { length: 100 }).notNull().unique(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  salePrice: numeric('sale_price', { precision: 10, scale: 2 }),
  colorId: uuid('color_id').notNull(),
  sizeId: uuid('size_id').notNull(),
  inStock: integer('in_stock').notNull().default(0),
  weight: numeric('weight', { precision: 8, scale: 3 }), // in kg
  dimensions: jsonb('dimensions'), // { length, width, height } in cm
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
  return {
    productFk: foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
    }).onDelete('cascade'),
    colorFk: foreignKey({
      columns: [table.colorId],
      foreignColumns: [colors.id],
    }).onDelete('cascade'),
    sizeFk: foreignKey({
      columns: [table.sizeId],
      foreignColumns: [sizes.id],
    }).onDelete('cascade'),
  };
});

// Schema for inserting a variant - can be used to validate API requests
export const insertVariantSchema = createInsertSchema(variants, {
  productId: z.string().uuid(),
  sku: z.string().min(1).max(100),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
  salePrice: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format').optional().nullable(),
  colorId: z.string().uuid(),
  sizeId: z.string().uuid(),
  inStock: z.number().int().nonnegative(),
  weight: z.string().regex(/^\d+(\.\d{1,3})?$/, 'Invalid weight format').optional().nullable(),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
  }).optional().nullable(),
});

// Schema for selecting a variant - can be used to validate API responses
export const selectVariantSchema = createSelectSchema(variants);

// Type types extracted from the schemas
export type Variant = z.infer<typeof selectVariantSchema>;
export type NewVariant = z.infer<typeof insertVariantSchema>;

// Relations
export const variantsRelations = relations(variants, ({ one, many }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
    relationName: 'defaultVariant'
  }),
  color: one(colors, {
    fields: [variants.colorId],
    references: [colors.id]
  }),
  size: one(sizes, {
    fields: [variants.sizeId],
    references: [sizes.id]
  }),
  images: many(productImages),
  cartItems: many(cartItems),
  orderItems: many(orderItems)
}));
// Type types extracted from the schemas
export type Variant = z.infer<typeof selectVariantSchema>;
export type NewVariant = z.infer<typeof insertVariantSchema>;

// Relations
export const variantsRelations = relations(variants, ({ one, many }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
    relationName: 'defaultVariant'
  }),
  color: one(colors, {
    fields: [variants.colorId],
    references: [colors.id]
  }),
  size: one(sizes, {
    fields: [variants.sizeId],
    references: [sizes.id]
  }),
  images: many(productImages),
  cartItems: many(cartItems),
  orderItems: many(orderItems)
}));