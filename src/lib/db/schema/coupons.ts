import { pgTable, uuid, varchar, numeric, timestamp, integer } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Define the discount type enum
export const discountTypeEnum = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
} as const;

export const coupons = pgTable('coupons', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  code: varchar('code', { length: 50 }).notNull().unique(),
  discountType: varchar('discount_type', { length: 20, enum: Object.values(discountTypeEnum) }).notNull(),
  discountValue: numeric('discount_value', { precision: 10, scale: 2 }).notNull(),
  expiresAt: timestamp('expires_at'),
  maxUsage: integer('max_usage').notNull().default(1),
  usedCount: integer('used_count').notNull().default(0),
});

// Schema for inserting a coupon - can be used to validate API requests
export const insertCouponSchema = createInsertSchema(coupons, {
  code: z.string().min(1).max(50),
  discountType: z.enum(Object.values(discountTypeEnum) as [string, ...string[]]),
  discountValue: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid discount value format'),
  expiresAt: z.date().optional().nullable(),
  maxUsage: z.number().int().positive(),
  usedCount: z.number().int().nonnegative(),
});

// Schema for selecting a coupon - can be used to validate API responses
export const selectCouponSchema = createSelectSchema(coupons);

// Type types extracted from the schemas
export type Coupon = z.infer<typeof selectCouponSchema>;
export type NewCoupon = z.infer<typeof insertCouponSchema>;
export type DiscountType = typeof discountTypeEnum[keyof typeof discountTypeEnum];