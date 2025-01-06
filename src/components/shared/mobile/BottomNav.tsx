'use client';

import React, { useEffect, useRef, useState } from 'react';
import useClickOutside from '@/lib/hooks/useClickOutside.';
import { Heart, ShoppingCart, User, WalletCards } from 'lucide-react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { cn } from '@/lib/utils';
import Cart from '../cart/Cart';

const transition = {
   type: 'spring',
   bounce: 0.1,
   duration: 0.25,
};

const ITEMS = [
   {
      id: 1,
      label: 'User',
      title: <User className='h-5 w-5' />,
      content: (
         <div className='flex flex-col space-y-4'>

         </div>
      ),
   },
   {
      id: 2,
      label: 'Cart',
      title: <ShoppingCart className='h-5 w-5' />,
      content: <Cart />,
   },
   {
      id: 3,
      label: 'Wishlist',
      title: <Heart className='h-5 w-5' />,
      content: (
         <div className='flex flex-col space-y-4'>

         </div>
      ),
   },
   {
      id: 4,
      label: 'Wallet',
      title: <WalletCards className='h-5 w-5' />,
      content: (
         <div className='flex flex-col space-y-4'>

         </div>
      ),
   },
];

export default function ToolbarExpandable() {
   const [active, setActive] = useState<number | null>(null);
   const [contentRef, { height: heightContent }] = useMeasure();
   const [menuRef, { width: widthContainer }] = useMeasure();
   const ref = useRef<HTMLDivElement>(null);
   const [isOpen, setIsOpen] = useState(false);
   const [maxWidth, setMaxWidth] = useState(0);

   useClickOutside(ref, () => {
      setIsOpen(false);
      setActive(null);
   });

   useEffect(() => {
      if (!widthContainer || maxWidth > 0) return;

      setMaxWidth(widthContainer);
   }, [widthContainer, maxWidth]);

   return (
      <MotionConfig transition={transition}>
         <div className='fixed bottom-0 w-full z-30 md:hidden' ref={ref}>
            <div className='h-full w-full rounded-xl border border-zinc-950/10 bg-white'>
               <div className='overflow-hidden'>
                  <AnimatePresence initial={false} mode='sync'>
                     {isOpen ? (
                        <motion.div
                           key='content'
                           initial={{ height: 0 }}
                           animate={{ height: heightContent || 0 }}
                           exit={{ height: 0 }}
                           style={{
                              height: 140,
                           }}
                        >
                           <div ref={contentRef} className='p-2'>
                              {ITEMS.map((item) => {
                                 const isSelected = active === item.id;

                                 return (
                                    <motion.div
                                       key={item.id}
                                       initial={{ opacity: 0 }}
                                       animate={{ opacity: isSelected ? 1 : 0 }}
                                       exit={{ opacity: 0 }}
                                    >
                                       <div
                                          className={cn(
                                             'px-2 pt-2 text-sm',
                                             isSelected ? 'block' : 'hidden'
                                          )}
                                       >
                                          {item.content}
                                       </div>
                                    </motion.div>
                                 );
                              })}
                           </div>
                        </motion.div>
                     ) : null}
                  </AnimatePresence>
               </div>
               <div className='flex space-x-2 p-2 justify-between' ref={menuRef}>
                  {ITEMS.map((item) => (
                     <button
                        key={item.id}
                        aria-label={item.label}
                        className={cn(
                           'relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]',
                           active === item.id ? 'bg-red-500 text-zinc-800' : ''
                        )}
                        type='button'
                        onClick={() => {
                           if (!isOpen) setIsOpen(true);
                           if (active === item.id) {
                              setIsOpen(false);
                              setActive(null);
                              return;
                           }

                           setActive(item.id);
                        }}
                     >
                        {item.title}
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </MotionConfig>
   );
}
