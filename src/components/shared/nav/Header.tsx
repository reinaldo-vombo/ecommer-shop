'use client'
import React, { use, useEffect, useState } from 'react'
import { LogoIcon } from '@/assets/logos';
import Link from 'next/link';
import { ShiftingDropDown } from './Dropdwon';
import Search from '../search-box/Search';
import { Heart, ShoppingCart, User as UserIcon } from 'lucide-react';
import SheetModal from '../SheetModal';
import Cart from '../cart/Cart';
import { User } from '@/lib/auth/user'
import FavoriteItem from '../wishList/ListItem';
import { TProduct } from '../product/types';
import MobileHeader from '../mobile/Header';
import Image from 'next/image';

const Header = ({ data }: { data: TProduct[] }) => {
   const user = User()
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
      <header className={`fixed w-full z-30 ${scrolled ? 'bg-white shadow' : `bg-transparent}`} transition-all ease-in`}>
         <div className="container">
            <nav className='items-center justify-between hidden md:flex'>
               <div>
                  <Link href='/'>
                     <LogoIcon width={40} height={40} />
                  </Link>
               </div>
               <div>
                  <ShiftingDropDown />
               </div>
               <div className="flex items-center gap-3">
                  <Search product={data} />
                  {user ? (
                     <Link href='/perfiel' aria-label="user profile photo" className="">
                        <Image src={user?.avatar || '/avatar.jpg'} className='rounded-full' width={30} height={30} alt={use?.name} />
                     </Link>
                  ) : (
                     <Link href='/auth' aria-label="user icon" className="hover:bg-slate-200 rounded-full p-2 flex items-center justify-center">
                        <UserIcon width={25} />
                     </Link>
                  )}
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
            <MobileHeader title='Discover' data={data} />
         </div>
      </header>
   )
}

export default Header;
