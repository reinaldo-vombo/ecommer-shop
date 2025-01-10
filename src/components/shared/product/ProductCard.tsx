
'use client'
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { TProductProps } from './types';
import Link from 'next/link';
import SheetModal from '../SheetModal';
import Cart from '../cart/Cart';
import FavoriteItem from '../wishList/ListItem';
import ProductPreview from './ProductPreview';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishListStore';

const ProductCard = ({ props }: TProductProps) => {
   const { name, image, price, id, images } = props;
   const addToCart = useCartStore((state) => state.addToCart);
   const addToWishlist = useWishlistStore((state) => state.addToWishlist);
   const colors = images.map(item => item.images[0])

   return (
      <div>
         <div className="group">
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
               <Link href={`/productos/${id}`}>
                  <Image
                     src={image}
                     alt={name}
                     className="object-cover rounded-lg"
                     fill
                     sizes='100%'
                  />
               </Link>
               <SheetModal
                  side='right'
                  triggerClass='absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity bg-primary rounded-md w-9 h-9 text-primary-foreground flex items-center justify-center'
                  title={name}
                  className="sm:max-w-lg"
                  onClick={() => addToCart(props)}
                  trigger={<ShoppingBag className="h-4 w-4" />}>
                  <Cart />
               </SheetModal>
               <SheetModal
                  side='bottom'
                  triggerClass='absolute right-4 top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-primary rounded-md w-9 h-9 text-primary-foreground flex items-center justify-center'
                  title={name}
                  trigger={<Eye className="h-4 w-4" />}>
                  <ProductPreview props={props} />
               </SheetModal>
               <SheetModal
                  side='right'
                  triggerClass='absolute right-4 top-28 opacity-0 group-hover:opacity-100 transition-opacity bg-primary rounded-md w-9 h-9 text-primary-foreground flex items-center justify-center'
                  title="Seu favoritos"
                  className="sm:max-w-lg"
                  onClick={() => addToWishlist(props)}
                  trigger={<Heart className="h-4 w-4" />}>
                  <FavoriteItem />
               </SheetModal>

            </div>
            <div className='transition-all flex gap-3'>
               {colors.map((url, idx) => (
                  <div className='flex gap-3 items-center' key={idx}>
                     <Image src={url} key={url} className='opacity-0 group-hover:opacity-100 transition-opacity rounded-lg' width={40} height={40} alt='w' />
                     {/* <p>+ {idx - 4}</p> */}
                  </div>
               ))}
            </div>
            <div className='mt-4'>
               <span className='text-slate-500 font-medium mb-4'>Sapatilhia para homens</span>
               <h3 className="font-bold text-xl">{name}</h3>
               <p className="text-gray-600">{price} (kz)</p>
            </div>
         </div>
      </div>
   )
}

export default ProductCard;
