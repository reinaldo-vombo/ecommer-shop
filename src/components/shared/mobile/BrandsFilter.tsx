import { BRANDS_LOGOS } from '@/constants/site-content'
import { createQueryString } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

const BrandsFilter = () => {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams();
   const query = searchParams.get('brand')
   const generateQueryString = useCallback(
      (name: string, value: string) => createQueryString(searchParams, name, value),
      [searchParams]
   );
   const onChange = (queryName: string, queryValue: string) => {
      router.push(pathname + '?' + generateQueryString(queryName, queryValue), { scroll: false })
   }
   return (
      <div className="grid grid-cols-6 gap-2 mb-4">
         {BRANDS_LOGOS.map((brand) => (
            <button
               key={brand.id}
               onClick={() => onChange("brand", brand.value)}
               className={`h-[3.25rem] rounded border ${query === brand.value ? 'bg-red-500' : ''}`}
            >
               {brand.logo}
            </button>
         ))}
      </div>
   )
}

export default BrandsFilter
