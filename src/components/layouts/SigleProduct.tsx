"use client"
import { useCartStore } from '@/lib/store/cartStore';
import { TProductProps } from '../shared/product/types';
import { CarouselCustomIndicator } from '../shared/Carousel';
import Cart from '../shared/cart/Cart';
import FavoriteItem from '../shared/wishList/ListItem';
import { Heart, ShoppingBag } from 'lucide-react';
import SheetModal from '../shared/SheetModal';
import Modal from '../shared/Moadal';
import Details from '../private/product/Details';
import SizeTabel from '../private/product/SizeTabel';
import { useWishlistStore } from '@/lib/store/wishListStore';

const SigleProduct = ({ props }: TProductProps) => {
   const product = props;
   const urls = product.images[0].images
   const addToCart = useCartStore((state) => state.addToCart);
   const addToWishlist = useWishlistStore((state) => state.addToWishlist);
   return (
      <div className="padding">
         <div className="container space-y-11">
            <div className="grid grid-cols-12 gap-4">
               <div className="col-span-6">
                  <CarouselCustomIndicator images={product.images} initial={urls} />
               </div>
               <div className="col-span-6 p-8">
                  <div className="w-[69%] space-y-7">
                     <div>
                        <h2 className="h2-bold">{product.name}</h2>
                        <h3 className="font-semibold">Sapatilha para homens</h3>
                        <h4 className="mt-6 font-bold">{product.price} (kz)</h4>
                     </div>

                     <SizeTabel sizes={product.size} />
                     <div className="grid gap-6">
                        <div className='flex items-center gap-5'>
                           <SheetModal
                              side='right'
                              triggerClass='bg-primary rounded-md p-2 text-primary-foreground flex items-center justify-center'
                              title={product.name}
                              onClick={() => addToCart(product)}
                              trigger={<span className='flex items-center gap-4'>Adicionar ao carrinho <ShoppingBag className="h-4 w-4" /></span>}>
                              <Cart />
                           </SheetModal>
                           <SheetModal
                              side='right'
                              triggerClass='bg-primary rounded-md p-2 text-primary-foreground flex items-center justify-center'
                              title={product.name}
                              onClick={() => addToWishlist(product)}
                              trigger={<span className='flex items-center gap-4'>favoritos<Heart className="h-4 w-4" /></span>}>
                              <FavoriteItem />
                           </SheetModal>
                        </div>
                        <p className="text-center mt-4">Este producto esta excluido de promoção e <br /> e desconto no site</p>
                        <div className="mt-4">
                           <h3 className="font-semibold">Levantamento grátis</h3>
                           <Modal btn={<p className="underline">Procurar um loja</p>} title='Selecioneum local de levantamento'>
                              <h3 className='text-center font-semibold'>Está funcionalida ainda não está disponivel. <br /> Volte em breve</h3>
                           </Modal>
                        </div>
                        <div className='space-y-2'>
                           <span className='text-slate-500'>Descrição</span>
                           <p className="font-semibold">{product.description}</p>
                        </div>
                        <Modal btn={<p className="underline font-semibold text-left">Ver detalhes do producto</p>} title='Selecioneum local de levantamento'>
                           <Details
                              name={product.name}
                              image={product.image}
                              price={product.price}
                              description={product.description}
                           />
                        </Modal>
                        {/* {product.Reviews.length > 0 ? (
                           <Comments reviews={product.Reviews} />
                        ) : (<p>Sem commentarios</p>)} */}
                     </div>
                  </div>
               </div>
            </div>
            {/* <Gallery images={product.gallery} /> */}
            <div className="space-y-6">
               <h2 className="h2-bold">Productos relacionados</h2>
               {/* <ProductCarousel /> */}
            </div>
         </div>
      </div>
   )
}

export default SigleProduct
