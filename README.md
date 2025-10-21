This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database Schema

This project uses a comprehensive PostgreSQL database schema built with Drizzle ORM. The schema includes:

### Core Entities
- **Products** - Main product information
- **Product Variants** - Size, color, and stock variations
- **Categories** - Product categorization (with hierarchical support)
- **Brands** - Product brands
- **Collections** - Curated product collections

### Filters
- **Genders** - Gender-specific categorization
- **Colors** - Color options with hex codes
- **Sizes** - Size options with sort ordering

### User Management
- **Addresses** - Shipping and billing addresses
- **Reviews** - Product reviews and ratings

### E-commerce Functionality
- **Carts** - Shopping carts for registered and guest users
- **Orders** - Order management with status tracking
- **Payments** - Payment processing records
- **Coupons** - Discount codes and promotions
- **Wishlists** - User wishlists

### Relationships
- **Product Collections** - Many-to-many relationships between products and collections

## Database Setup

1. Set up a PostgreSQL database (we recommend [Neon](https://neon.tech/))
2. Set the `DATABASE_URL` environment variable
3. Generate migrations: `npm run db:generate`
4. Apply migrations: `npm run db:migrate`
5. Seed the database: `npm run db:seed`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.