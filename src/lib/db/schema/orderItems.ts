import { pgTable, uuid, integer, numeric, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { orders } from './orders';
import { variants } from './variants';

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orderId: uuid('order_id').notNull(),
  productVariantId: uuid('product_variant_id').notNull(),
  quantity: integer('quantity').notNull(),
  priceAtPurchase: numeric('price_at_purchase', { precision: 10, scale: 2 }).notNull(),
}, (table) => {
  return {
    orderFk: foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
    }).onDelete('cascade'),
    variantFk: foreignKey({
      columns: [table.productVariantId],
      foreignColumns: [variants.id],
    }).onDelete('cascade'),
  };
});

// Schema for inserting an order item - can be used to validate API requests
export const insertOrderItemSchema = createInsertSchema(orderItems, {
  orderId: z.string().uuid(),
  productVariantId: z.string().uuid(),
  quantity: z.number().int().positive(),
  priceAtPurchase: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
});

// Schema for selecting an order item - can be used to validate API responses
export const selectOrderItemSchema = createSelectSchema(orderItems);

// Type types extracted from the schemas
export type OrderItem = z.infer<typeof selectOrderItemSchema>;
export type NewOrderItem = z.infer<typeof insertOrderItemSchema>;