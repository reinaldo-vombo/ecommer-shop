
import { useWishlistStore } from '@/lib/store/wishListStore'
import React from 'react'
import EmptyList from '../../wishList/EmptyList'
import ProductList from '../product/ProductList'

const Wishlist = () => {
   const { wishlist } = useWishlistStore()
   const favoriteList = wishlist
   return (
      <div className='h-screen' style={{ paddingTop: '5rem' }}>
         <div>
            <h2 className='base-semibold text-center'>Favoritos</h2>
         </div>
         <div className='space-y-5 mt-4'>
            {favoriteList.length > 0 ? wishlist.map((item) => (
               <ProductList props={item} key={item.id} />
            )) : (
               <EmptyList />)}
         </div>
      </div>
   )
}

export default Wishlist;
