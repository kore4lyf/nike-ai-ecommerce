CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` numeric NOT NULL,
	`image_url` text,
	`category` text,
	`brand` text,
	`created_at` integer DEFAULT '"2025-10-20T10:03:43.360Z"',
	`updated_at` integer DEFAULT '"2025-10-20T10:03:43.360Z"'
);
