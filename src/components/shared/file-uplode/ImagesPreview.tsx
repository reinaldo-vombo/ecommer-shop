import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ImageIcon, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
type TProps = {
   preview: { color: string, images: string[] }
}
const ImagePreview = ({ preview }: TProps) => {
   return (
      <div className="relative">
         <Accordion type='multiple'>
            <AccordionItem value='item1'>
               <AccordionTrigger className='rounded-lg text-white flex items-center px-5' style={{ backgroundColor: preview.color }}>
                  <h2>{preview.images && preview.images.length} images</h2>
                  <ImageIcon className='ml-auto' />
               </AccordionTrigger>
               <AccordionContent>
                  {preview.images.length > 0 ? preview.images.map((url, index) => {
                     console.log(url)
                     return (
                        <motion.div className='w-full p-2 flex items-center justify-between rounded-md outline-1 outline-[#eaeaea] mb-2'
                           key={url}
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ duration: 0.3 }}>
                           <div className='flex items-center gap-5'>
                              <Image
                                 src={url}
                                 className='rounded-lg'
                                 width={60}
                                 height={60}
                                 alt={`Image preview-${index}`}
                              />
                              <div>

                              </div>
                           </div>
                           <Button className='size-8 text-white bg-red-500 rounded-md' onClick={() => { }}>
                              <X />
                           </Button>
                        </motion.div>
                     )
                  }) : (<p>No images</p>)}
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </div>
   )
}

export default ImagePreview;
