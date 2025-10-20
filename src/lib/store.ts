import { create } from 'zustand';

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

interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>()((set, get) => ({
  cart: [],
  addToCart: (product) => {
    const { cart } = get();
    const existingItem = cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cart: [...cart, { ...product, quantity: 1 }],
      });
    }
  },
  removeFromCart: (productId) => {
    set({
      cart: get().cart.filter((item) => item.id !== productId),
    });
  },
  clearCart: () => {
    set({ cart: [] });
  },
}));