// store/cartStore.ts
import { toast } from 'sonner';
import { create } from 'zustand';
import { CartItem } from './type';
import { TProduct } from '@/components/shared/product/types';

interface CartState {
  cart: CartItem[];
  loadCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  addToCart: (product: TProduct) => void;
  updateAttributes: (id: string, color: string, size: number[]) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

// Save cart to local storage

export const useCartStore = create<CartState>((set) => ({
  cart: [], // Initialize cart from local storage
  loadCart: () => {
    try {
      const cartFromStorage = localStorage.getItem('cart');
      const parsedCart = cartFromStorage ? JSON.parse(cartFromStorage) : [];
      set({ cart: parsedCart });
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  },
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...product, quantity: 1 }];
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // Notify the user
      toast.success(`${product.name} foi adicionado ao carrinho`);

      return { cart: updatedCart };
    }),
  updateQuantity: (id: string, quantity: number) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return { cart: updatedCart };
    }),
  updateAttributes: (id: string, color: string, size: number[]) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, color, size } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
  removeFromCart: (id) =>
    set((state) => {
      // Notify the user
      toast.success(`Item removido do carrinho`);

      // Remove the item from the cart
      const updatedCart = state.cart.filter((item) => item.id !== id);

      // Update Zustand state
      set({ cart: updatedCart });

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return { cart: updatedCart };
    }),
  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem('cart');
    toast.success('Carrinho limpo com sucesso');
  },
}));
