'use client';

import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';

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

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
            <p className="text-gray-500 text-sm">{product.brand}</p>
          </div>
          <span className="font-bold text-lg text-gray-900">${product.price}</span>
        </div>
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">{product.description}</p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}