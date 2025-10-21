import { pgTable, uuid, integer, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { carts } from './carts';
import { variants } from './variants';

export const cartItems = pgTable('cart_items', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  cartId: uuid('cart_id').notNull(),
  productVariantId: uuid('product_variant_id').notNull(),
  quantity: integer('quantity').notNull().default(1),
}, (table) => {
  return {
    cartFk: foreignKey({
      columns: [table.cartId],
      foreignColumns: [carts.id],
    }).onDelete('cascade'),
    variantFk: foreignKey({
      columns: [table.productVariantId],
      foreignColumns: [variants.id],
    }).onDelete('cascade'),
  };
});

// Schema for inserting a cart item - can be used to validate API requests
export const insertCartItemSchema = createInsertSchema(cartItems, {
  cartId: z.string().uuid(),
  productVariantId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

// Schema for selecting a cart item - can be used to validate API responses
export const selectCartItemSchema = createSelectSchema(cartItems);

// Type types extracted from the schemas
export type CartItem = z.infer<typeof selectCartItemSchema>;
export type NewCartItem = z.infer<typeof insertCartItemSchema>;