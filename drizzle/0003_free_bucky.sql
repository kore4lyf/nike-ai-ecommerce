PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` numeric NOT NULL,
	`image_url` text,
	`category` text,
	`brand` text,
	`badge` text,
	`badge_type` text,
	`created_at` integer DEFAULT '"2025-10-20T16:39:28.478Z"',
	`updated_at` integer DEFAULT '"2025-10-20T16:39:28.478Z"'
);
--> statement-breakpoint
INSERT INTO `__new_products`("id", "name", "description", "price", "image_url", "category", "brand", "badge", "badge_type", "created_at", "updated_at") SELECT "id", "name", "description", "price", "image_url", "category", "brand", "badge", "badge_type", "created_at", "updated_at" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
PRAGMA foreign_keys=ON;