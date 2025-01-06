'use client'
import {
   MorphingDialog,
   MorphingDialogTrigger,
   MorphingDialogContent,
   MorphingDialogTitle,
   MorphingDialogImage,
   MorphingDialogSubtitle,
   MorphingDialogClose,
   MorphingDialogContainer,
   MorphingDialogSlider,
   MorphingDialogTab,
} from '@/components/shared/mobile/ui/morphing-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { Feedback } from '@/components/private/product/feedback';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TProductProps } from '../product/types';
import { CarouselCustomIndicator } from '../Carousel';
import Stars from '../product/Stars';
interface IProduct extends TProductProps {
   className?: string
}

const SearchList = ({ props }: IProduct) => {
   const { image, name, price, images, size } = props;
   const [stars, setStars] = useState<number | null>(null)
   return (
      <div className='sm:hidden col-span-12'>
         <MorphingDialog
            transition={{
               type: 'spring',
               stiffness: 200,
               damping: 24,
            }}
         >
            <MorphingDialogTrigger style={{ borderRadius: '4px' }} className={` bg-white`}>
               <div className='flex items-center space-x-3 p-3 shadow-md rounded-lg'>
                  <MorphingDialogImage
                     src={image}
                     alt={name}
                     className='w-12  h-12 object-cover object-top'
                     style={{
                        borderRadius: '4px',
                     }}
                  />
                  <div className='flex flex-col items-start justify-center space-y-0'>
                     <MorphingDialogTitle className='base-semibold text-black dark:text-white'>
                        {name}
                     </MorphingDialogTitle>
                     <MorphingDialogSubtitle className='text-base text-gray-600'>
                        {price}(kz)
                     </MorphingDialogSubtitle>
                  </div>
               </div>
            </MorphingDialogTrigger>
            <MorphingDialogContainer>
               <MorphingDialogContent
                  style={{
                     borderRadius: '12px',
                  }}
                  className='relative h-full w-[500px] border border-gray-100 bg-white'
               >
                  <ScrollArea className='h-[90vh]' type='scroll'>
                     <div className='relative'>
                        <div className='flex justify-center'>
                           <MorphingDialogSlider>
                              <CarouselCustomIndicator images={images} initial={images[0].images} />
                           </MorphingDialogSlider>
                        </div>
                        <div className='p-6 space-y-5'>
                           <MorphingDialogTitle className='text-black'>
                              <span className='font-light text-gray-400 mb-6'>Sapatilha para homem</span>
                              <div className='flex'>
                                 <span className='font-light text-gray-400 mb-3'>Produto:</span>
                                 <h2>{name}</h2>
                              </div>
                              <div className='mb-4'>
                                 <Stars length={4} />
                              </div>
                           </MorphingDialogTitle>
                           <Separator />
                           <MorphingDialogSubtitle className='grid'>
                              <div>
                                 <div className='flex gap-2'>
                                    <span className='font-light text-gray-400 mb-3'>Preço:</span>
                                    <h2 className='font-semibold'>{price} (kz)</h2>
                                 </div>
                                 <h3 className="font-light text-gray-400 mb-3">Tamanhos</h3>
                                 <div className="grid grid-cols-4 gap-2 mb-4">
                                    {size.map((size, index) => (
                                       <button
                                          key={`${size}-${index}`}
                                          className="h-9 rounded border"
                                       >
                                          {size}
                                       </button>
                                    ))}
                                 </div>
                                 <Feedback
                                    setStars={setStars}
                                    stars={stars}
                                    productId={props.id} />
                              </div>
                           </MorphingDialogSubtitle>
                           <div className='mt-4 text-sm text-gray-700'>
                              <span className="font-light text-gray-400 mb-3">Descrição:</span>
                              <p>
                                 In 1982, having sold his jazz bar to devote himself to
                                 writing, Murakami began running to keep fit. A year later,
                                 he’d completed a solo course from Athens to Marathon, and
                                 now, after dozens of such races, not to mention triathlons
                                 and a dozen critically acclaimed books, he reflects upon the
                                 influence the sport has had on his life and—even more
                                 important—on his writing.
                              </p>
                              <p>
                                 Equal parts training log, travelogue, and reminiscence, this
                                 revealing memoir covers his four-month preparation for the
                                 2005 New York City Marathon and takes us to places ranging
                                 from Tokyo’s Jingu Gaien gardens, where he once shared the
                                 course with an Olympian, to the Charles River in Boston
                                 among young women who outpace him. Through this marvelous
                                 lens of sport emerges a panorama of memories and insights:
                                 the eureka moment when he decided to become a writer, his
                                 greatest triumphs and disappointments, his passion for
                                 vintage LPs, and the experience, after fifty, of seeing his
                                 race times improve and then fall back.
                              </p>
                           </div>
                        </div>
                     </div>
                  </ScrollArea>
                  <MorphingDialogTab className='absolute bottom-[97px] w-full flex '>
                     <Button size={'lg'}>Adicionar ao carrinho</Button>
                     <Button size={'default'}>Adicionar aos favoritos</Button>
                  </MorphingDialogTab>
                  <MorphingDialogClose className='text-zinc-500' />
               </MorphingDialogContent>
            </MorphingDialogContainer>
         </MorphingDialog>
      </div>
   )
}

export default SearchList;
