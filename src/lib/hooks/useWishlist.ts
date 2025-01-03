'use client';

import { useOptimistic } from 'react';

type WishlistAction =
  | { type: 'add'; productId: string }
  | { type: 'remove'; productId: string };

export const useWishlist = (customerId: string) => {
  const [wishlist, setWishlist] = useOptimistic<string[], WishlistAction>(
    [],
    (state, action) => {
      switch (action.type) {
        case 'add':
          return [...state, action.productId];
        case 'remove':
          return state.filter((id) => id !== action.productId);
        default:
          return state;
      }
    }
  );

  const addToWishlist = async (productId: string) => {
    setWishlist({ type: 'add', productId });

    try {
      await fetch('/api/customers/wishlist', {
        method: 'POST',
        body: JSON.stringify({ customerId, productId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      setWishlist({ type: 'remove', productId }); // Revert optimistic update
    }
  };

  const removeFromWishlist = async (productId: string) => {
    setWishlist({ type: 'remove', productId });

    try {
      await fetch('/api/customers/wishlist', {
        method: 'DELETE',
        body: JSON.stringify({ customerId, productId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      setWishlist({ type: 'add', productId }); // Revert optimistic update
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
};
