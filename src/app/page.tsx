import ProductCard from '@/components/ProductCard';
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

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nike Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest Nike products designed to enhance your performance and style.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
