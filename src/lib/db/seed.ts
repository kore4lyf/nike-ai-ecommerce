import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { products } from './schema';

async function seed() {
  const sqlite = new Database('sqlite.db');
  const db = drizzle(sqlite);

  const sampleProducts = [
    {
      name: 'Nike Air Max 270',
      description: 'Iconic comfort with extra heel cushioning',
      price: '150.00',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      category: 'Shoes',
      brand: 'Nike',
    },
    {
      name: 'Nike Dri-FIT T-Shirt',
      description: 'Lightweight, breathable fabric for workouts',
      price: '35.00',
      imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400',
      category: 'Clothing',
      brand: 'Nike',
    },
    {
      name: 'Nike Sportswear Club Fleece Hoodie',
      description: 'Soft fleece for cozy comfort',
      price: '65.00',
      imageUrl: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=400',
      category: 'Clothing',
      brand: 'Nike',
    },
    {
      name: 'Nike Revolution 6 Running Shoes',
      description: 'Comfortable daily trainer for runners',
      price: '70.00',
      imageUrl: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400',
      category: 'Shoes',
      brand: 'Nike',
    },
    {
      name: 'Nike Pro Sports Bra',
      description: 'Supportive design for high-impact activities',
      price: '45.00',
      imageUrl: 'https://images.unsplash.com/photo-1591047139829-9d66d17f19de?w=400',
      category: 'Clothing',
      brand: 'Nike',
    },
    {
      name: 'Nike Heritage Crossbody Bag',
      description: 'Versatile storage for essentials',
      price: '55.00',
      imageUrl: 'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=400',
      category: 'Accessories',
      brand: 'Nike',
    },
  ];

  console.log('Seeding products...');
  
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