import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { 
  genders, colors, sizes, brands, categories, collections,
  products, variants, productImages, productCollections
} from './schema';
import { faker } from '@faker-js/faker';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Initialize the database connection
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

// Sample data for seeding
const genderData = [
  { label: 'Men', slug: 'men' },
  { label: 'Women', slug: 'women' },
  { label: 'Kids', slug: 'kids' },
  { label: 'Unisex', slug: 'unisex' },
];

const colorData = [
  { name: 'Black', slug: 'black', hexCode: '#000000' },
  { name: 'White', slug: 'white', hexCode: '#FFFFFF' },
  { name: 'Red', slug: 'red', hexCode: '#FF0000' },
  { name: 'Blue', slug: 'blue', hexCode: '#0000FF' },
  { name: 'Green', slug: 'green', hexCode: '#00FF00' },
  { name: 'Yellow', slug: 'yellow', hexCode: '#FFFF00' },
  { name: 'Purple', slug: 'purple', hexCode: '#800080' },
  { name: 'Pink', slug: 'pink', hexCode: '#FFC0CB' },
  { name: 'Orange', slug: 'orange', hexCode: '#FFA500' },
  { name: 'Gray', slug: 'gray', hexCode: '#808080' },
];

const sizeData = [
  { name: 'XS', slug: 'xs', sortOrder: 1 },
  { name: 'S', slug: 's', sortOrder: 2 },
  { name: 'M', slug: 'm', sortOrder: 3 },
  { name: 'L', slug: 'l', sortOrder: 4 },
  { name: 'XL', slug: 'xl', sortOrder: 5 },
  { name: 'XXL', slug: 'xxl', sortOrder: 6 },
];

const brandData = [
  { name: 'Nike', slug: 'nike', logoUrl: '/brands/nike.png' },
  { name: 'Adidas', slug: 'adidas', logoUrl: '/brands/adidas.png' },
  { name: 'Puma', slug: 'puma', logoUrl: '/brands/puma.png' },
  { name: 'Reebok', slug: 'reebok', logoUrl: '/brands/reebok.png' },
  { name: 'New Balance', slug: 'new-balance', logoUrl: '/brands/new-balance.png' },
];

const categoryData = [
  { name: 'Running Shoes', slug: 'running-shoes' },
  { name: 'Basketball Shoes', slug: 'basketball-shoes' },
  { name: 'Casual Shoes', slug: 'casual-shoes' },
  { name: 'Training Shoes', slug: 'training-shoes' },
  { name: 'Football Boots', slug: 'football-boots' },
];

const collectionData = [
  { name: "Summer '25", slug: 'summer-25' },
  { name: "Winter '25", slug: 'winter-25' },
  { name: 'Air Max Collection', slug: 'air-max-collection' },
  { name: 'Jordan Collection', slug: 'jordan-collection' },
];

// Product names and descriptions
const productNames = [
  'Air Force 1 Mid \'07',
  'Court Vision Low Next Nature',
  'Air Force 1 PLTAFORM',
  'Dunk Low',
  'Air Max 90',
  'Blazer Mid \'77',
  'Air Max 95',
  'Air Max 270',
  'React Infinity Run Flyknit',
  'Pegasus Trail 4 GORE-TEX',
  'Free Metcon 5',
  'Revolution 6 Next Nature',
  'Quest 5',
  'Downshifter 12',
  'Renew Run 3',
];

const productDescriptions = [
  'Iconic comfort with extra heel cushioning',
  'Classic style that speaks for itself',
  'Retro style with modern comfort',
  'Heritage hoops style with premium materials',
  'Revolutionary cushioning with visible Air units',
  'Classic basketball-inspired style',
  'Distinctive look with gradient midsole',
  'Large Air unit for maximum cushioning',
  'Designed to help reduce injury risk',
  'Trail-ready with waterproof protection',
  'Versatile training shoe for all activities',
  'Lightweight comfort for everyday wear',
  'Supportive cushioning for daily runs',
  'Smooth transitions for mile after mile',
  'Responsive cushioning for a soft landing',
];

async function seed() {
  console.log('Seeding database...');
  
  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await sql`DELETE FROM product_collections`;
    await sql`DELETE FROM product_images`;
    await sql`DELETE FROM product_variants`;
    await sql`DELETE FROM products`;
    await sql`DELETE FROM collections`;
    await sql`DELETE FROM categories`;
    await sql`DELETE FROM brands`;
    await sql`DELETE FROM sizes`;
    await sql`DELETE FROM colors`;
    await sql`DELETE FROM genders`;
    
    // Seed genders
    console.log('Seeding genders...');
    const genderRecords = await db.insert(genders).values(genderData).returning();
    
    // Seed colors
    console.log('Seeding colors...');
    const colorRecords = await db.insert(colors).values(colorData).returning();
    
    // Seed sizes
    console.log('Seeding sizes...');
    const sizeRecords = await db.insert(sizes).values(sizeData).returning();
    
    // Seed brands
    console.log('Seeding brands...');
    const brandRecords = await db.insert(brands).values(brandData).returning();
    
    // Seed categories
    console.log('Seeding categories...');
    const categoryRecords = await db.insert(categories).values(categoryData).returning();
    
    // Seed collections
    console.log('Seeding collections...');
    const collectionRecords = await db.insert(collections).values(collectionData).returning();
    
    // Get Nike brand
    const nikeBrand = brandRecords.find(b => b.slug === 'nike');
    if (!nikeBrand) {
      throw new Error('Nike brand not found');
    }
    
    // Get Men's gender
    const mensGender = genderRecords.find(g => g.slug === 'men');
    if (!mensGender) {
      throw new Error('Men\'s gender not found');
    }
    
    // Get Running Shoes category
    const runningShoesCategory = categoryRecords.find(c => c.slug === 'running-shoes');
    if (!runningShoesCategory) {
      throw new Error('Running Shoes category not found');
    }
    
    // Seed products
    console.log('Seeding products...');
    const productRecords = [];
    const shoeImages = [
      '/shoes/shoe-1.jpg', '/shoes/shoe-2.webp', '/shoes/shoe-3.webp',
      '/shoes/shoe-4.webp', '/shoes/shoe-5.avif', '/shoes/shoe-6.avif',
      '/shoes/shoe-7.avif', '/shoes/shoe-8.avif', '/shoes/shoe-9.avif',
      '/shoes/shoe-10.avif', '/shoes/shoe-11.avif', '/shoes/shoe-12.avif',
      '/shoes/shoe-13.avif', '/shoes/shoe-14.avif', '/shoes/shoe-15.avif'
    ];
    
    for (let i = 0; i < 15; i++) {
      const productData = {
        name: productNames[i] || `Nike Product ${i + 1}`,
        description: productDescriptions[i] || 'High-quality Nike product',
        categoryId: runningShoesCategory.id,
        genderId: mensGender.id,
        brandId: nikeBrand.id,
        isPublished: true,
      };
      
      const [product] = await db.insert(products).values(productData).returning();
      productRecords.push(product);
      
      // Create 2-4 variants per product
      const variantCount = faker.number.int({ min: 2, max: 4 });
      let defaultVariantId: string | null = null;
      
      for (let j = 0; j < variantCount; j++) {
        // Randomly select color and size
        const randomColor = colorRecords[faker.number.int({ min: 0, max: colorRecords.length - 1 })];
        const randomSize = sizeRecords[faker.number.int({ min: 0, max: sizeRecords.length - 1 })];
        
        // Generate random price and stock
        const price = faker.commerce.price({ min: 80, max: 200, dec: 2 });
        const inStock = faker.number.int({ min: 0, max: 100 });
        
        const variantData = {
          productId: product.id,
          sku: `SKU-${product.id.substring(0, 8).toUpperCase()}-${j + 1}`,
          price,
          colorId: randomColor.id,
          sizeId: randomSize.id,
          inStock,
          weight: faker.number.float({ min: 0.5, max: 2.0, fractionDigits: 3 }).toString(),
          dimensions: {
            length: faker.number.float({ min: 20, max: 35, fractionDigits: 1 }),
            width: faker.number.float({ min: 10, max: 15, fractionDigits: 1 }),
            height: faker.number.float({ min: 8, max: 12, fractionDigits: 1 }),
          },
        };
        
        const [variant] = await db.insert(variants).values(variantData).returning();
        
        // Set the first variant as default
        if (j === 0) {
          defaultVariantId = variant.id;
        }
        
        // Add images for variants (1-3 images per variant)
        const imageCount = faker.number.int({ min: 1, max: 3 });
        for (let k = 0; k < imageCount; k++) {
          const imageIndex = faker.number.int({ min: 0, max: shoeImages.length - 1 });
          const imageData = {
            productId: product.id,
            variantId: variant.id,
            url: shoeImages[imageIndex],
            sortOrder: k,
            isPrimary: k === 0,
          };
          
          await db.insert(productImages).values(imageData);
        }
      }
      
      // Update product with default variant
      if (defaultVariantId) {
        await db.update(products).set({ defaultVariantId }).where(products.id.eq(product.id));
      }
    }
    
    // Associate products with collections
    console.log('Associating products with collections...');
    for (const product of productRecords) {
      // Associate each product with 1-2 collections
      const collectionCount = faker.number.int({ min: 1, max: 2 });
      const selectedCollections = faker.helpers.arrayElements(collectionRecords, collectionCount);
      
      for (const collection of selectedCollections) {
        await db.insert(productCollections).values({
          productId: product.id,
          collectionId: collection.id,
        });
      }
    }
    
    console.log('Seeding completed successfully!');
    console.log(`Seeded ${genderRecords.length} genders`);
    console.log(`Seeded ${colorRecords.length} colors`);
    console.log(`Seeded ${sizeRecords.length} sizes`);
    console.log(`Seeded ${brandRecords.length} brands`);
    console.log(`Seeded ${categoryRecords.length} categories`);
    console.log(`Seeded ${collectionRecords.length} collections`);
    console.log(`Seeded ${productRecords.length} products`);
    
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});