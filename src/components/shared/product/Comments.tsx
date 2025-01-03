"use client"
import { useState } from 'react'
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger
} from '../../ui/accordion'
import { TReviwes } from './types'
import Stars from './Stars'
import { Feedback } from '@/components/private/product/feedback'

type TProps = {
   reviews: TReviwes[]
}

const Comments = ({ reviews }: TProps) => {
   const [stars, setStars] = useState<number | null>(null)
   return (
      <Accordion type='multiple'>
         <AccordionItem value='item1'>
            <AccordionTrigger className='gap-4'>
               <div className='flex items-center justify-between w-full'>
                  <h3 className='base-semibold'>Avaliações ()</h3>
                  <div className='flex'>
                     {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index}>
                           <svg className={`w-4 h-4 ms-1 text-black`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                           </svg>
                        </div>
                     ))}
                  </div>
               </div>
            </AccordionTrigger>
            <AccordionContent>
               <div>
                  <Feedback stars={stars} setStars={setStars} />
                  {reviews.length > 0 ? reviews.map((feed) => (
                     <div className='mt-8' key={feed.id}>
                        <div className='flex items-center justify-between'>
                           <Stars length={feed.stars} />
                           <h3 className='base-semibold text-gray-400'>{feed.customer} - 22 Feb 2024</h3>
                        </div>
                        <div className='mt-6'>
                           <h3 className='base-semibold'>{feed.comment}</h3>
                        </div>
                     </div>
                  )) : (<p>Sem comentarios</p>)}
               </div>
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
}

export default Comments;
