'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from '@/components/ui/carousel';
import img1 from '@/assets/images/AIR+MAX+DNB-nbg.png'
import img2 from '@/assets/images/AIR+MAX+DNP-nbg.png'
import img3 from '@/assets/images/AIR+MAX+DNG-nbg.png'
import img4 from '@/assets/images/AIR+MAX+DNP-nbg.png'


const images = [
   { id: '1', img: img1, alt: 'Product 1' },
   { id: '2', img: img2, alt: 'Product 2' },
   { id: '3', img: img3, alt: 'Product 3' },
   { id: '4', img: img4, alt: 'Product 4' },
]
const MobileBanner = () => {
   const [index, setIndex] = useState(0);
   return (
      <div className="md:hidden mt-12">
         <div className='relative w-full max-w-full py-8'>
            <div className="space-y-2 absolute top-0 left-0">
               <h1 className="text-2xl font-bold">Nike Air Max 720 Horizon</h1>
               <p className="text-gray-600">Experience Next-Level Comfort</p>
            </div>
            <Carousel index={index} onIndexChange={setIndex}>
               <CarouselContent className='relative'>
                  {images.map((item, i) => {
                     return (
                        <CarouselItem key={item.id} className='p-4'>
                           <div className='flex aspect-square relative items-center justify-center'>
                              <Image src={item.img} className='rounded-lg object-contain' fill sizes='100%' alt={`preview${i}`} />
                           </div>
                        </CarouselItem>
                     );
                  })}
               </CarouselContent>
            </Carousel>
            <div className='flex w-full justify-center space-x-3 px-4'>
               {images.map((item, index) => {
                  return (
                     <button
                        key={item.id}
                        type='button'
                        aria-label={`Go to slide ${item}`}
                        onClick={() => setIndex(index)}
                        className='h-12 w-12 border rounded-lg border-zinc-200 dark:border-zinc-800'
                     >
                        <Image src={item.img} width={48} height={48} alt='preview' />
                     </button>
                  );
               })}
            </div>
         </div>
      </div>
   )
}

export default MobileBanner;
