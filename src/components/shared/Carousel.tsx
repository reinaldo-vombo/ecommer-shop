'use client';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from '@/components/ui/carousel';
import { useState } from 'react';
import Image from 'next/image';

type TProps = {
   initial: string[]
   images: { color: string; images: string[] }[];
}
export function CarouselCustomIndicator({ images, initial }: TProps) {
   const [index, setIndex] = useState(0);
   const [selectedColor, setSelectedColor] = useState(initial);

   const handleColorChange = (urls: string[]) => {
      setSelectedColor(urls)
   }

   return (
      <div className='relative w-full max-w-xs md:max-w-full py-8'>
         <Carousel index={index} onIndexChange={setIndex}>
            <CarouselContent className='relative'>
               {selectedColor.map((item, i) => {
                  return (
                     <CarouselItem key={i} className='p-4'>
                        <div className='flex aspect-square relative items-center justify-center border border-zinc-200 dark:border-zinc-800'>
                           <Image src={item} className='rounded-lg' fill sizes='100%' alt={`preview${i}`} />
                        </div>
                     </CarouselItem>
                  );
               })}
            </CarouselContent>
         </Carousel>
         <div className='flex w-full justify-center space-x-3 px-4'>
            {selectedColor.map((item, index) => {
               return (
                  <button
                     key={item}
                     type='button'
                     aria-label={`Go to slide ${item}`}
                     onClick={() => setIndex(index)}
                     className='h-12 w-12 border rounded-lg border-zinc-200 dark:border-zinc-800'
                  >
                     <Image src={item} width={48} height={48} alt='preview' />
                  </button>
               );
            })}
         </div>
         <div className='flex gap-3 mt-6'>
            {images && images.map((color) => {
               return (
                  <button
                     className='size-4 rounded-full'
                     key={color.color}
                     onClick={() => handleColorChange(color.images)}
                     style={{ backgroundColor: color.color }} />
               )
            })}
         </div>
      </div>
   );
}
