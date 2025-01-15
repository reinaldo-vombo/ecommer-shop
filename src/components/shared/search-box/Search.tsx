'use client'
import { LogoIcon } from '@/assets/logos';
import { SheetHeader, SheetTitle } from '../../ui/sheet';
import SheetModal from '../SheetModal';
import { SearchIcon } from 'lucide-react';
import { Input } from '../../ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { TProduct } from '../product/types';
import SearchTerms from './SearchTerms';
import { FilteredProducts } from './FilteredProducts';
import { Suspense } from 'react';
import Skeleton from '../LoadingCard';
type TSearch = {
   product: TProduct[]
}


const Search = ({ product }: TSearch) => {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();

   const handleSearch = useDebouncedCallback((term) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set('query', term);
      } else {
         params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
   }, 300);
   return (
      <SheetModal
         label="shop icon"
         side="top"
         title="Pesquisar Produtos"
         trigger={
            <div className="hover:bg-slate-200 rounded-full p-2 flex items-center justify-center">
               <SearchIcon width={25} />
            </div>
         }>
         <div className="md:container mt-4 md:mt-0">
            <div className="grid grid-cols-12">
               <SheetHeader className="col-span-12 md:col-span-3">
                  <SheetTitle className="hidden md:block"><LogoIcon width={90} /></SheetTitle>
                  <SearchTerms products={product} onChange={handleSearch} />
               </SheetHeader>
               <div className="col-span-12 md:col-span-9 space-y-6">
                  <div className="relative">
                     <Input
                        onChange={(e) => {
                           handleSearch(e.target.value);
                        }}
                        defaultValue={searchParams.get('query')?.toString()}
                        className="px-10 bg-gray-200" placeholder="Pesquisar" />
                     <SearchIcon width={25} className="absolute top-[6px] left-3" />
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                     <Suspense fallback={<Skeleton />}>
                        <FilteredProducts product={product} />
                     </Suspense>
                  </div>
               </div>
            </div>
         </div>
      </SheetModal>
   )
}

export default Search;
