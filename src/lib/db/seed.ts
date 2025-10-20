import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { products } from './schema';

async function seed() {
  const sqlite = new Database('sqlite.db');
  const db = drizzle(sqlite);

  const sampleProducts = [
    {
      name: 'Air Force 1 Mid \'07',
      description: 'Iconic comfort with extra heel cushioning',
      price: '98.30',
      imageUrl: '/hero-shoe.png',
      category: 'Men\'s Shoes',
      brand: 'Nike',
      badge: 'Best Seller',
      badgeType: 'bestseller',
    },
    {
      name: 'Court Vision Low Next Nature',
      description: 'Classic style that speaks for itself',
      price: '98.30',
      imageUrl: '/trending-1.png',
      category: 'Men\'s Shoes',
      brand: 'Nike',
      badge: 'Extra 20% off',
      badgeType: 'discount',
    },
    {
      name: 'Air Force 1 PLTAFORM',
      description: 'Retro style with modern comfort',
      price: '98.30',
      imageUrl: '/trending-2.png',
      category: 'Men\'s Shoes',
      brand: 'Nike',
      badge: 'Sustainable Materials',
      badgeType: 'sustainable',
    },
    {
      name: 'Dunk Low',
      description: 'Heritage hoops style with premium materials',
      price: '120.00',
      imageUrl: '/trending-3.png',
      category: 'Men\'s Shoes',
      brand: 'Nike',
      badge: null,
      badgeType: null,
    },
  ];

  
  // Clear existing products
  await db.delete(products);
  
  // Insert sample products
  for (const product of sampleProducts) {
    await db.insert(products).values(product);
  }

  console.log('Seeding completed!');
  
  // Close the database connection
  sqlite.close();
}

seed().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});
