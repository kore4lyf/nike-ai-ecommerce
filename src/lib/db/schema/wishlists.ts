import { pgTable, uuid, timestamp, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { products } from './products';

export const wishlists = pgTable('wishlists', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').notNull(), // Assuming there's a user table with id column
  productId: uuid('product_id').notNull(),
  addedAt: timestamp('added_at').defaultNow().notNull(),
  // Note: We're not adding foreign keys to user.id and product.id here since we don't have the complete table definitions
  // In a real implementation, you would add foreign keys
}, (table) => {
  return {
    productFk: foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
    }).onDelete('cascade'),
    // userFk: foreignKey({
    //   columns: [table.userId],
    //   foreignColumns: [users.id], // Assuming a users table exists
    // }).onDelete('cascade'),
  };
});

// Schema for inserting a wishlist item - can be used to validate API requests
export const insertWishlistSchema = createInsertSchema(wishlists, {
  userId: z.string().uuid(),
  productId: z.string().uuid(),
});

// Schema for selecting a wishlist item - can be used to validate API responses
export const selectWishlistSchema = createSelectSchema(wishlists);

// Type types extracted from the schemas
export type Wishlist = z.infer<typeof selectWishlistSchema>;
export type NewWishlist = z.infer<typeof insertWishlistSchema>;