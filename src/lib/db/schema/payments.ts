import { pgTable, uuid, varchar, timestamp, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { orders } from './orders';

// Define the payment method and status enums
export const paymentMethodEnum = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  COD: 'cod', // Cash on delivery
} as const;

export const paymentStatusEnum = {
  INITIATED: 'initiated',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orderId: uuid('order_id').notNull().unique(),
  method: varchar('method', { length: 20, enum: Object.values(paymentMethodEnum) }).notNull(),
  status: varchar('status', { length: 20, enum: Object.values(paymentStatusEnum) }).notNull().default(paymentStatusEnum.INITIATED),
  paidAt: timestamp('paid_at'),
  transactionId: varchar('transaction_id', { length: 255 }),
}, (table) => {
  return {
    orderFk: foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
    }).onDelete('cascade'),
  };
});

// Schema for inserting a payment - can be used to validate API requests
export const insertPaymentSchema = createInsertSchema(payments, {
  orderId: z.string().uuid(),
  method: z.enum(Object.values(paymentMethodEnum) as [string, ...string[]]),
  status: z.enum(Object.values(paymentStatusEnum) as [string, ...string[]]),
  paidAt: z.date().optional().nullable(),
  transactionId: z.string().max(255).optional().nullable(),
});

// Schema for selecting a payment - can be used to validate API responses
export const selectPaymentSchema = createSelectSchema(payments);

// Type types extracted from the schemas
export type Payment = z.infer<typeof selectPaymentSchema>;
export type NewPayment = z.infer<typeof insertPaymentSchema>;
export type PaymentMethod = typeof paymentMethodEnum[keyof typeof paymentMethodEnum];
export type PaymentStatus = typeof paymentStatusEnum[keyof typeof paymentStatusEnum];