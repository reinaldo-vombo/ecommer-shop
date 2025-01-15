import {
   Carousel,
   CarouselContent,
   CarouselNavigation,
   CarouselItem,
} from '@/components/ui/carousel';
import { TProduct } from '../product/types';
import Image from 'next/image';

type TCarousel = {
   data: TProduct[];
};

export function CarouselCustomSizes({ data }: TCarousel) {

   return (
      <div className='relative w-full'>
         <Carousel>
            <CarouselContent>
               {data.map((item) => (
                  <CarouselItem className='basis-1/5' key={item.id}>
                     <div className='flex aspect-square relative items-center justify-center border-b border-l border-t border-zinc-200 dark:border-zinc-800'>
                        <Image src={item.image} fill sizes='100%' alt={item.name} />
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselNavigation />
         </Carousel>
      </div>
   );
}
