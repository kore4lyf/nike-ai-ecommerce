import { pgTable, uuid, varchar, numeric, timestamp, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { addresses } from './addresses';

// Define the order status enum
export const orderStatusEnum = {
  PENDING: 'pending',
  PAID: 'paid',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').notNull(), // Assuming there's a user table with id column
  status: varchar('status', { length: 20, enum: Object.values(orderStatusEnum) }).notNull().default(orderStatusEnum.PENDING),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  shippingAddressId: uuid('shipping_address_id').notNull(),
  billingAddressId: uuid('billing_address_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  // Note: We're not adding foreign keys to user.id and addresses.id here since we don't have the complete table definitions
  // In a real implementation, you would add foreign keys
}, (table) => {
  return {
    shippingAddressFk: foreignKey({
      columns: [table.shippingAddressId],
      foreignColumns: [addresses.id],
    }).onDelete('cascade'),
    billingAddressFk: foreignKey({
      columns: [table.billingAddressId],
      foreignColumns: [addresses.id],
    }).onDelete('cascade'),
    // userFk: foreignKey({
    //   columns: [table.userId],
    //   foreignColumns: [users.id], // Assuming a users table exists
    // }).onDelete('cascade'),
  };
});

// Schema for inserting an order - can be used to validate API requests
export const insertOrderSchema = createInsertSchema(orders, {
  userId: z.string().uuid(),
  status: z.enum(Object.values(orderStatusEnum) as [string, ...string[]]),
  totalAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount format'),
  shippingAddressId: z.string().uuid(),
  billingAddressId: z.string().uuid(),
});

// Schema for selecting an order - can be used to validate API responses
export const selectOrderSchema = createSelectSchema(orders);

// Type types extracted from the schemas
export type Order = z.infer<typeof selectOrderSchema>;
export type NewOrder = z.infer<typeof insertOrderSchema>;
export type OrderStatus = typeof orderStatusEnum[keyof typeof orderStatusEnum];