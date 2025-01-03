
import Image from 'next/image'
import React from 'react'
import EmptyCart from './EmptyCart'
import { AnimatePresence, motion } from 'framer-motion'
import { useCartStore } from '@/lib/store/cartStore'
import { X } from 'lucide-react'

type TProps = {
   cart: {
      id: string
      image: string
      name: string
      price: number
      quantity: number
   }[]
}
const ListItem = ({ cart }: TProps) => {
   const removeFromCart = useCartStore((state) => state.removeFromCart);

   return (
      <div className='grid gap-8 mt-12'>
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
                        <Image src={product.image} className='rounded-xl object-cover size-16' width={90} height={90} alt={product.name} />
                        <div>
                           <h3 className='base-semibold'>{product.name}</h3>
                           <span className='text-gray-400'>Ref. 01105945</span>
                           <h3 className='base-semibold'>{product.price} (kz)</h3>
                        </div>
                     </div>
                     <div>

                     </div>
                  </div>
                  <button type='button' aria-label='x icon' onClick={() => removeFromCart(product.id)}>
                     <X width={25} />
                  </button>
               </motion.div>
            )) : <EmptyCart />}
         </AnimatePresence>
      </div>)
}

export default ListItem;
