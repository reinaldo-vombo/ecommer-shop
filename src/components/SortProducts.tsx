import React from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SelectOption from './shared/Select'
import { PRICE } from '@/constants/site-content'

const SortProducts = () => {
   return (
      <div className="flex items-center justify-between">
         <h2 className="text-xl font-semibold">
            Mens Shoes & Sneakers
         </h2>
         <div className="flex items-center gap-4">
            <SelectOption options={PRICE} placeholder='Preços' />
            <div className="flex">
               <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
               </Button>
               <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
               </Button>
            </div>
         </div>
      </div>
   )
}

export default SortProducts
