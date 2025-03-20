"use client"
import { TProduct } from '../shared/product/types'
import ProductCard from '../shared/product/ProductCard'
import { Separator } from '../ui/separator'
import SelectOption from '../shared/Select'
import { PRICE } from '@/constants/site-content'
import { useSearchParams } from 'next/navigation'
import { getPriceRange } from '@/lib/helper'
import NoProductFound from '../shared/product/NoProductFound'
type TProps = {
   products: TProduct[]
}

const ProductSection = ({ products }: TProps) => {
   const searchParams = useSearchParams();
   const price = searchParams.get('price')
   const [minPrice, maxPrice] = getPriceRange(price);

   const filteredProducts = products.filter((product) => {
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      return matchesPrice;
   });
   return (
      <section className='padding hidden sm:block'>
         <div className="container">
            <div className='space-y-6'>
               <div className='flex items-center justify-between'>
                  <h2 className='text-left h2-bold'>Productos Novos</h2>
                  <SelectOption options={PRICE} placeholder='Preços' />
               </div>
               <Separator />
               <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                     <ProductCard props={product} key={product.id} />
                  )) : (<NoProductFound />)}
               </div>
            </div>
            <div className='mt-8 space-y-6'>
               <div>
                  <h2 className='h2-bold'>Productos Mais Vendidos</h2>
               </div>
               <Separator />
               <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                     <ProductCard props={product} key={product.id} />
                  )) : (<NoProductFound />)}
               </div>
               <div></div>
            </div>
         </div>
      </section>
   )
}

export default ProductSection;
