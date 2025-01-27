
import { SIZES } from "@/constants/site-content"
import { createQueryString } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const SizeTabel = ({ sizes }: { sizes: number[] }) => {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams();
   const selectedSize = searchParams.get("size");
   const generateQueryString = useCallback(
      (name: string, value: string) => createQueryString(searchParams, name, value),
      [searchParams]
   );
   const onChange = (queryName: string, queryValue: string) => {
      router.push(pathname + '?' + generateQueryString(queryName, queryValue), { scroll: false })
   }

   return (
      <div>
         <h4 className="text-slate-400">Tamanhos</h4>
         <div className="grid grid-cols-4 gap-2">
            {SIZES.map((size) => {
               const sizeNumber = Number(size); // Convert string to number
               const isAvailable = sizes.includes(sizeNumber); // Match sizes
               const isSelected = selectedSize === size;
               return (
                  <button
                     key={size}
                     onClick={() => onChange("size", size)}
                     className={`h-9 rounded border border-gray-300 ${isAvailable
                           ? isSelected
                              ? "bg-blue-500 text-white" // Active state
                              : "hover:bg-gray-100 focus:bg-gray-200"
                           : "opacity-50 cursor-not-allowed"
                        }`}
                     disabled={!isAvailable}
                  >
                     {size}
                  </button>
               );
            })}

         </div>
      </div>
   )
}

export default SizeTabel
