"use client"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { TSelectOption } from "./type"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { createQueryString } from "@/lib/utils"

const SelectOption = ({ options, placeholder, className }: TSelectOption) => {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams();
   const generateQueryString = useCallback(
      (name: string, value: string) => createQueryString(searchParams, name, value),
      [searchParams]
   );
   const onChange = (value: string) => {
      router.push(pathname + '?' + generateQueryString("price", value), { scroll: false })
   }
   return (
      <Select onValueChange={onChange}>
         <SelectTrigger aria-label={`Select ${placeholder}`} className={`${className ? className : 'w-[180px]'}`}>
            <SelectValue placeholder={placeholder} />
         </SelectTrigger>
         <SelectContent>
            {options.map((item,) => (
               <SelectItem
                  key={item.id}
                  value={item.value}
               >
                  {item.name}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default SelectOption;
