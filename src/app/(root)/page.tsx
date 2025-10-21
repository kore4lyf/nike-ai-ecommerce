import Card from '@/components/Card';
import { db } from '@/lib/db/database';
import { products } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

// Define the product type
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}

export default async function Home() {
  let allProducts: Product[] = [];
  
  // Fetch products from database
  try {
    const result = await db.select().from(products).orderBy(desc(products.id));
    allProducts = result as Product[];
  } catch (error) {
    console.error('Failed to fetch products from database:', error);
  }

  // Placeholder data if database is empty
  const placeholderProducts = [
    {
      id: 1,
      name: 'Air Max 270',
      description: 'Iconic comfort with extra heel cushioning',
      price: '$150.00',
      imageUrl: '/shoes/shoe-1.jpg',
      category: 'Running',
      brand: 'Nike',
    },
    {
      id: 2,
      name: 'Air Force 1',
      description: 'Classic style that speaks for itself',
      price: '$110.00',
      imageUrl: '/shoes/shoe-2.webp',
      category: 'Lifestyle',
      brand: 'Nike',
    },
    {
      id: 3,
      name: 'Blazer Mid',
      description: 'Retro style with modern comfort',
      price: '$90.00',
      imageUrl: '/shoes/shoe-3.webp',
      category: 'Lifestyle',
      brand: 'Nike',
    },
    {
      id: 4,
      name: 'Dunk Low',
      description: 'Heritage hoops style with premium materials',
      price: '$120.00',
      imageUrl: '/shoes/shoe-4.webp',
      category: 'Basketball',
      brand: 'Nike',
    },
  ];

  const productsToDisplay = allProducts.length > 0 ? allProducts : placeholderProducts;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nike Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest Nike products designed to enhance your performance and style.
          </p>
        </div>
        
        {/* Latest Shoes Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Shoes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productsToDisplay.map((product) => (
              <Card
                key={product.id}
                title={product.name}
                category={product.category}
                colors={product.brand}
                price={product.price}
                image={product.imageUrl}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}