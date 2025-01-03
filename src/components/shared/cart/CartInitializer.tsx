"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";

const CartInitializer = () => {
   const loadCart = useCartStore((state) => state.loadCart);

   useEffect(() => {
      loadCart(); // Load the cart from cookies
   }, [loadCart]);

   return null; // This component doesn't render anything
};

export default CartInitializer;
