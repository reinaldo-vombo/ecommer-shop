"use client"
import { useCartStore } from '@/lib/store/cartStore';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import EmptyCart from './EmptyCart';
import { useEffect, useMemo } from 'react';
import QuantityButton from '../product/QuantityButton';
import { ScrollArea } from '@/components/ui/scroll-area';
import Summary from './Summary';
import CartMobileList from '../mobile/CartList';

const Cart = () => {
   const cart = useCartStore((state) => state.cart);
   const removeFromCart = useCartStore((state) => state.removeFromCart);
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
      <div>
         <ScrollArea className='h-[450px] '>
            <h2 className='text-center text-gray-500 mt-6 md:hidden'>Deslize a esqueda para eliminar</h2>
            <div className='gap-8 mt-12 hidden md:grid'>
               <AnimatePresence mode='popLayout'>
                  {cart.length > 0 ? cart.map((product) => (
                     <motion.div
                        layout
                        initial={{ opacity: 0, x: -400, scale: 0.5 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 200, scale: 1.2 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        key={product.id}
                        className='flex items-center gap-2'
                     >
                        <div className='bg-black w-full text-white rounded-lg p-4 flex items-center justify-between gap-6'>
                           <div className='flex items-center gap-6'>
                              <Image
                                 src={product.image}
                                 className='rounded-xl object-cover'
                                 width={64}
                                 height={64}
                                 alt={product.name}
                              />
                              <div>
                                 <h3 className='base-semibold'>{product.name}</h3>
                                 <span className='text-gray-400'>Qanty. {product.quantity}</span>
                                 <h3 className='base-semibold'>{product.price} (kz)</h3>
                              </div>
                           </div>
                           <div>
                              <QuantityButton id={product.id}
                                 initialQuantity={product.quantity} />
                           </div>
                        </div>
                        <button type='button' aria-label='x icon' onClick={() => removeFromCart(product.id)}>
                           <X width={25} />
                        </button>
                     </motion.div>
                  )) : <EmptyCart />}
               </AnimatePresence>
            </div>
         </ScrollArea>
         <Summary totalQuantity={totalQuantity} totalPrice={totalPrice} />
         <CartMobileList cart={cart} />
      </div>
   )
}

export default Cart
