import { pgTable, uuid, varchar, boolean, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { relations } from 'drizzle-orm';

// Define the address type enum
export const addressTypeEnum = {
  BILLING: 'billing',
  SHIPPING: 'shipping',
} as const;

export const addresses = pgTable('addresses', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').notNull(), // Assuming there's a user table with id column
  type: varchar('type', { length: 20 }).notNull(),
  line1: varchar('line1', { length: 255 }).notNull(),
  line2: varchar('line2', { length: 255 }),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 100 }).notNull(),
  country: varchar('country', { length: 100 }).notNull(),
  postalCode: varchar('postal_code', { length: 20 }).notNull(),
  isDefault: boolean('is_default').notNull().default(false),
  // Note: We're not adding a foreign key to user.id here since we don't have the user table definition
  // In a real implementation, you would add: foreignKey({ columns: [table.userId], foreignColumns: [users.id] })
});

// Schema for inserting an address - can be used to validate API requests
export const insertAddressSchema = createInsertSchema(addresses, {
  userId: z.string().uuid(),
  type: z.enum([addressTypeEnum.BILLING, addressTypeEnum.SHIPPING] as [string, ...string[]]),
  line1: z.string().min(1).max(255),
  line2: z.string().max(255).optional().nullable(),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
  postalCode: z.string().min(1).max(20),
  isDefault: z.boolean(),
});

// Schema for selecting an address - can be used to validate API responses
export const selectAddressSchema = createSelectSchema(addresses);

// Type types extracted from the schemas
export type Address = z.infer<typeof selectAddressSchema>;
export type NewAddress = z.infer<typeof insertAddressSchema>;
export type AddressType = typeof addressTypeEnum[keyof typeof addressTypeEnum];

// Relations
export const addressesRelations = relations(addresses, ({ one, many }) => ({
  // Note: We're not adding relations to user here since we don't have the user table definition
  // In a real implementation, you would add:
  // user: one(users, {
  //   fields: [addresses.userId],
  //   references: [users.id],
  // }),
  // ordersBilling: many(orders, {
  //   relationName: 'billingAddress'
  // }),
  // ordersShipping: many(orders, {
  //   relationName: 'shippingAddress'
  // })
}));