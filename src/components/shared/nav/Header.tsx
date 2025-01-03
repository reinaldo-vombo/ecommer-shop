'use client'
import React, { useEffect, useState } from 'react'
import { LogoIcon } from '@/assets/logos';
import Link from 'next/link';
import { ShiftingDropDown } from './Dropdwon';
import Search from '../search-box/Search';
import { Heart, ShoppingCart, User } from 'lucide-react';
import SheetModal from '../SheetModal';
import Cart from '../cart/Cart';
import FavoriteItem from '../wishList/ListItem';

const Header = () => {
   const [scrolled, setScrolled] = useState(false);
   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 50); // Change 50 to the scroll threshold you prefer
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);
   return (
      <header className={`fixed w-full z-30 ${scrolled ? 'bg-white shadow' : `bg-transparent}`} transition-all ease-in hidden sm:block`}>
         <div className="container">
            <nav className='flex items-center justify-between'>
               <div>
                  <Link href='/'>
                     <LogoIcon width={40} height={40} />
                  </Link>
               </div>
               <div>
                  <ShiftingDropDown scrolled={scrolled} />
               </div>
               <div className="flex items-center gap-3">
                  <Search />
                  <Link href='/login' aria-label="user icon" className="hover:bg-slate-200 rounded-full p-2 flex items-center justify-center">
                     <User width={25} />
                  </Link>
                  <SheetModal
                     label="shop icon"
                     side="right"
                     className="sm:max-w-lg"
                     title="Productos No Carrinho"
                     trigger={
                        <div className="hover:bg-slate-200 rounded-full p-2 flex items-center justify-center">
                           <ShoppingCart width={25} />
                        </div>
                     }
                  >
                     <Cart />
                  </SheetModal>
                  <SheetModal
                     label="shop icon"
                     side="right"
                     className="sm:max-w-lg"
                     trigger={
                        <div className="hover:bg-slate-200 rounded-full p-2 flex items-center justify-center">
                           <Heart width={25} />
                        </div>
                     }
                  >
                     <FavoriteItem />
                  </SheetModal>
               </div>
            </nav>
         </div>
      </header>
   )
}

export default Header;
