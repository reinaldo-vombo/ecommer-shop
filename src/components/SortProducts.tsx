import React from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SelectOption from './shared/Select'
import { PRICE } from '@/constants/site-content'
import { useSearchParams } from 'next/navigation'

const SortProducts = () => {
   const searchParams = useSearchParams();

   const gender = searchParams.get('gender')
   const type = searchParams.get('type')
   const genderType = () => {
      switch (gender) {
         case 'homen':
            return 'Homem'
         case 'mulher':
            return 'Mulher'
         case 'Criança':
            return 'Criança'
         default:
            break;
      }

   }
   const productType = () => {
      switch (type) {
         case 'sapatos':
            return 'Sapatos & Tenis para'
         case 'roupas':
            return 'Roupas para'
         case 'acessorios':
            return 'Acessorios para'
         default:
            return 'Mens Shoes & Sneakers';
      }

   }
   return (
      <div className="flex items-center justify-between">
         <h2 className="text-xl font-semibold">
            {productType()} {genderType()}
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
