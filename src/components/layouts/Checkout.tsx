'use client'
import Image from 'next/image'
import WizardStepper from '../shared/checkout/WizadStepper'
import { useCartStore } from '@/lib/store/cartStore';
import { useEffect, useMemo } from 'react';

const Checkout = () => {

   const cart = useCartStore((state) => state.cart);
   const loadCart = useCartStore((state) => state.loadCart);

   // Ensure the cart is loaded on component mount
   useEffect(() => {
      loadCart();
   }, [loadCart]);
   const { totalQuantity, totalPrice } = useMemo(() => {
      const totals = cart.reduce(
         (acc, item) => {
            acc.totalQuantity += item.quantity;
            acc.totalPrice += item.quantity * item.price;
            return acc;
         },
         { totalQuantity: 0, totalPrice: 0 }
      );
      return totals;
   }, [cart]);
   return (
      <div className="min-h-screen bg-black text-white">
         <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
               {/* Left Column - Form */}
               <WizardStepper />
               {/* Right Column - Cart Summary */}
               <div className="space-y-6">
                  <div className="space-y-4">
                     {cart.map((item) => (
                        <div className="flex items-center gap-4" key={item.id}>
                           <div className="relative">
                              <Image
                                 src={item.image}
                                 alt={item.name}
                                 width={60}
                                 height={60}
                                 className="h-16 w-16 rounded bg-gray-800"
                              />
                              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-700 text-xs">
                                 {item.quantity}
                              </span>
                           </div>
                           <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-400">White / S</p>
                           </div>
                           <p className="font-medium">${item.price}</p>
                        </div>
                     ))}
                  </div>

                  <div className="space-y-4 border-t border-gray-800 pt-4">
                     <div className="flex justify-between">
                        <p className="text-gray-400">Subtotal • {cart.length} items</p>
                        <p className="font-medium">${totalPrice}</p>
                     </div>
                     <div className="flex justify-between">
                        <p className="text-gray-400">Shipping</p>
                        <p className="text-gray-400">Calculated at next step</p>
                     </div>
                     <div className="flex justify-between border-t border-gray-800 pt-4">
                        <p className="font-medium">Total</p>
                        <div className="text-right">
                           <p className="text-sm text-gray-400">USD</p>
                           <p className="text-xl font-bold">${totalQuantity}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <footer className="mt-8 text-center text-sm text-gray-500">
               All rights reserved Dev <span className='text-violet-800'>Nivia</span> Shop
            </footer>
         </div>
      </div>
   )
}

export default Checkout;

