"use client"
import { useCartStore } from '@/lib/store/cartStore';
import { TProductProps } from '../shared/product/types';
import { CarouselCustomIndicator } from '../shared/Carousel';
import Cart from '../shared/cart/Cart';
import FavoriteItem from '../shared/wishList/ListItem';
import { Heart, ShoppingBag } from 'lucide-react';
import SheetModal from '../shared/SheetModal';
import Modal from '../shared/Moadal';
import Comments from '../shared/product/Comments';
import Details from '../private/product/Details';
import SizeTabel from '../private/product/SizeTabel';
import Image from 'next/image';
import { useState } from 'react';

const SigleProduct = ({ props }: TProductProps) => {
   const product = props;
   const urls = product.images[0].images
   const [defaultUrls, setDefaultUrls] = useState(urls)
   const addToCart = useCartStore((state) => state.addToCart);
   const handleImageChange = (urls: string[]) => {
      setDefaultUrls(urls)
   }
   return (
      <div className="padding">
         <div className="container space-y-11">
            <div className="grid grid-cols-12 gap-4">
               <div className="col-span-6">
                  <CarouselCustomIndicator images={product.images} initial={defaultUrls} />
               </div>
               <div className="col-span-6 p-8">
                  <div className="w-[69%] space-y-7">
                     <div>
                        <h2 className="h2-bold">{product.name}</h2>
                        <h3 className="font-semibold">Sapatilha para homens</h3>
                        <h4 className="mt-6 font-bold">{product.price} (kz)</h4>
                     </div>
                     <div>
                        {product.images.map((image) => (
                           <Image
                              onClick={() => handleImageChange(image.images)}
                              key={`${image.color}`}
                              src={image.images[0]}
                              className='rounded-lg'
                              width={80}
                              height={80}
                              alt='preview' />
                        ))}
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
                              trigger={<span className='flex items-center gap-4'>favoritos<Heart className="h-4 w-4" /></span>}>
                              <FavoriteItem />
                           </SheetModal>
                        </div>
                        <p className="text-center mt-4">Este producto esta excluido de promoção e <br /> e desconto no site</p>
                        <div className="mt-4">
                           <h3 className="font-semibold">Levantamento grátis</h3>
                           <Modal btn={<p className="underline">Procurar um loja</p>} title='Selecioneum local de levantamento'>
                              procuara loja
                           </Modal>
                        </div>
                        <div>
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
