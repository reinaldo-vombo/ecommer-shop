"use client"
import SortProducts from '../SortProducts';
import FilterSideBar from '../FiltersSidebar';
import { TProduct } from '../shared/product/types';
import ProductCard from '../shared/product/ProductCard';
import { getPriceRange } from '@/lib/helper';
import { useSearchParams } from 'next/navigation';

type TProps = {
   props: TProduct[]
}
const AllProducts = ({ props }: TProps) => {
   const searchParams = useSearchParams();

   const price = searchParams.get('price')
   const brand = searchParams.get('brand')
   const size = searchParams.get('size')
   const category = searchParams.get('category')
   const color = searchParams.get('color')
   const [minPrice, maxPrice] = getPriceRange(price);

   const filteredProducts = props.filter((product) => {
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesBrand = brand ? product.brand === brand : true;
      const matchesColor = color
         ? product.images.some((img) => img.color === color)
         : true;
      const matchesSize = size ? product.size.includes(Number(size)) : true;
      const matchesCategory = category
         ? product.category.includes(category)
         : true;

      return (
         matchesPrice &&
         matchesBrand &&
         matchesColor &&
         matchesSize &&
         matchesCategory
      );
   });
   return (
      <section className='py-32'>
         <div className='h-96 bg-black/5 mb-20 bg-cover bg-center relative' style={{ backgroundImage: `url(/cover.jpg)` }}>
            <div className="absolute bottom-0 w-full overflow-hidden leading-[0] transform translate-y-[3.5rem]">
               <svg xmlns="http://www.w3.org/2000/svg" className='w-full' width={1440} height={131} viewBox="0 0 1440 131" fill="none">
                  <path d="M-194 0C516.557 96.6467 915.089 93.8887 1626 10.2282V131H-194V0Z" fill="white" />
               </svg>
            </div>
         </div>
         <div className="container">
            <div className="grid md:grid-cols-[240px,1fr] gap-8">
               <FilterSideBar />
               <div className="space-y-6">
                  <SortProducts />
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                        <ProductCard props={product} key={product.id} />
                     )) : (<p>Sem product</p>)}
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default AllProducts;
