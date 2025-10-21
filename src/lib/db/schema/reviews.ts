import { pgTable, uuid, text, integer, timestamp, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { products } from './products';

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  productId: uuid('product_id').notNull(),
  userId: uuid('user_id').notNull(), // Assuming there's a user table with id column
  rating: integer('rating').notNull(), // 1-5
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
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

// Schema for inserting a review - can be used to validate API requests
export const insertReviewSchema = createInsertSchema(reviews, {
  productId: z.string().uuid(),
  userId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional().nullable(),
});

// Schema for selecting a review - can be used to validate API responses
export const selectReviewSchema = createSelectSchema(reviews);

// Type types extracted from the schemas
export type Review = z.infer<typeof selectReviewSchema>;
export type NewReview = z.infer<typeof insertReviewSchema>;