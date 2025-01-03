import { toast } from 'sonner';
import { create } from 'zustand'; // Adjust according to your toast library

type WishlistItem = {
  id: string;
  name: string;
  image: string; // Add other fields as needed
};

type WishlistState = {
  wishlist: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
};

// Load wishlist from local storage
const loadWishlistFromLocalStorage = (): WishlistItem[] => {
  if (typeof window !== 'undefined') {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  }
  return [];
};

// Save wishlist to local storage
const saveWishlistToLocalStorage = (wishlist: WishlistItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
};

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: loadWishlistFromLocalStorage(),
  addToWishlist: (product) =>
    set((state) => {
      const existingItem = state.wishlist.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        toast.info(`${product.name} já está na lista de desejos`);
        return { wishlist: state.wishlist };
      }
      toast.success(`${product.name} adicionado à lista de desejos`);
      const newWishlist = [...state.wishlist, product];
      saveWishlistToLocalStorage(newWishlist);
      return { wishlist: newWishlist };
    }),
  removeFromWishlist: (id) =>
    set((state) => {
      toast.success(`Item removido da lista de desejos`);
      const updatedWishlist = state.wishlist.filter((item) => item.id !== id);
      saveWishlistToLocalStorage(updatedWishlist); // Save updated wishlist
      return { wishlist: updatedWishlist };
    }),
  clearWishlist: () => {
    set({ wishlist: [] });
    localStorage.removeItem('wishlist'); // Clear local storage
  },
}));
