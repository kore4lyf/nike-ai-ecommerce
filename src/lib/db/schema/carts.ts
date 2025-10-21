import { pgTable, uuid, varchar, timestamp, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const carts = pgTable('carts', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id'), // Nullable for guest users
  guestId: varchar('guest_id', { length: 255 }), // For guest users
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  // Note: We're not adding a foreign key to user.id here since we don't have the user table definition
  // In a real implementation, you would add: foreignKey({ columns: [table.userId], foreignColumns: [users.id] })
}, (table) => {
  return {
    // Ensuring either userId or guestId is set, but not both
    // This constraint would typically be handled at the application level
  };
});

// Schema for inserting a cart - can be used to validate API requests
export const insertCartSchema = createInsertSchema(carts, {
  userId: z.string().uuid().optional().nullable(),
  guestId: z.string().max(255).optional().nullable(),
}).refine(
  (data) => (data.userId && !data.guestId) || (!data.userId && data.guestId),
  {
    message: 'Either userId or guestId must be provided, but not both',
    path: ['userId', 'guestId'],
  }
);

// Schema for selecting a cart - can be used to validate API responses
export const selectCartSchema = createSelectSchema(carts);

// Type types extracted from the schemas
export type Cart = z.infer<typeof selectCartSchema>;
export type NewCart = z.infer<typeof insertCartSchema>;