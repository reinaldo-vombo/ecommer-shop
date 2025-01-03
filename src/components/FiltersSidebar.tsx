import { CATEGORIES } from '@/constants/site-content'
import { cn, createQueryString } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
// const categories = [
//    { name: "Running", count: 76 },
//    { name: "Basketball", count: 69 },
//    { name: "Football", count: 21 },
//    { name: "Soccer", count: 13 },
//    { name: "Training & Gym", count: 54 },
// ]

const colors = [
   { name: "White", class: "bg-white border" },
   { name: "Gray", class: "bg-gray-200" },
   { name: "Yellow", class: "bg-yellow-400" },
   { name: "Orange", class: "bg-orange-500" },
   { name: "Green", class: "bg-green-500" },
   { name: "Blue", class: "bg-blue-500" },
   { name: "Purple", class: "bg-purple-500" },
   { name: "Red", class: "bg-red-500" },
]

const sizes = [
   "4", "4.5", "5", "5.5", "6",
   "6.5", "7", "7.5", "8", "8.5",
   "9", "9.5", "10", "10.5", "11",
   "11.5", "12", "12.5", "13", "13.5",
   "14", "14.5", "15", "15.5"
]
const FilterSideBar = () => {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams();
   const generateQueryString = useCallback(
      (name: string, value: string) => createQueryString(searchParams, name, value),
      [searchParams]
   );
   const onChange = (queryName: string, queryValue: string) => {
      router.push(pathname + '?' + generateQueryString(queryName, queryValue), { scroll: false })
   }
   return (
      <aside className="hidden md:block space-y-6">
         <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
               {CATEGORIES.map((category) => (
                  <li key={category.name}>
                     <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" onClick={() => onChange("category", category.name)} />
                        <span>{category.name}</span>
                        {/* <span className="ml-auto text-gray-500">
                           {category.name}
                        </span> */}
                     </label>
                  </li>
               ))}
            </ul>
         </div>

         <div>
            <h3 className="font-semibold mb-4">Price</h3>

            <div className="flex justify-between text-sm">
               <span>$0</span>
               <span>$500</span>
            </div>
         </div>

         <div>
            <h3 className="font-semibold mb-4">Colors</h3>
            <div className="grid grid-cols-6 gap-2">
               {colors.map((color) => (
                  <button
                     onClick={() => onChange("color", color.name)}
                     key={color.name}
                     className={cn(
                        "h-8 w-8 rounded-full",
                        color.class
                     )}
                     title={color.name}
                  />
               ))}
            </div>
         </div>

         <div>
            <h3 className="font-semibold mb-4">Size</h3>
            <div className="grid grid-cols-4 gap-2">
               {sizes.map((size) => (
                  <button
                     onClick={() => onChange("size", size)}
                     key={size}
                     className="h-9 rounded border hover:border-black"
                  >
                     {size}
                  </button>
               ))}
            </div>
         </div>
      </aside>
   )
}

export default FilterSideBar;