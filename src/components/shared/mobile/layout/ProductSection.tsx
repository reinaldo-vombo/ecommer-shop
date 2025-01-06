'use client'
import { useSearchParams } from "next/navigation";
import { TProduct } from "../../product/types";
import ProductView from "../product/ProductBox";
import { Separator } from "@/components/ui/separator";
import SelectOption from "../../Select";
import { PRICE } from "@/constants/site-content";
import { getPriceRange } from "@/lib/helper";
import BrandsFilter from "../BrandsFilter";

// import ModalView from '../shared/mobile/ModalView'
type TProps = {
   products: TProduct[]
}
const ProductSection = ({ products }: TProps) => {
   const searchParams = useSearchParams();
   const brand = searchParams.get('brand')
   const price = searchParams.get('price')
   const [minPrice, maxPrice] = getPriceRange(price);

   const filteredProductsByPrice = products.filter((product) => {
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      return matchesPrice;
   });

   const filteredProductsByBrand = products.filter((product) => {
      const matchesBrand = brand ? product.brand === brand : true;

      return matchesBrand;
   });
   return (
      <section className='py-6 md:hidden'>
         <div className="container space-y-8">
            <div className="space-y-6">
               <BrandsFilter />
               <div>
                  <h2 className="base-semibold">Novos productos</h2>
               </div>
               <Separator />
               <div className='grid grid-cols-12 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {filteredProductsByBrand.length > 0 ? filteredProductsByBrand.map((product) => (
                     <ProductView props={product} key={product.id} className="col-span-6" />
                  )) : (<p>Sem product</p>)}
               </div>
            </div>
            <div className="space-y-5">
               <div className='flex items-center justify-between'>
                  <h2 className='base-semibold'>Destaque</h2>
                  <SelectOption options={PRICE} placeholder='Preços' />
               </div>
               <Separator />
               <div className='grid grid-cols-12 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {filteredProductsByPrice.length > 0 ? filteredProductsByPrice.map((product) => (
                     <ProductView props={product} key={product.id} className="col-span-6" />
                  )) : (<p>Sem product</p>)}
               </div>
            </div>

         </div>
      </section>
   )
}

export default ProductSection
