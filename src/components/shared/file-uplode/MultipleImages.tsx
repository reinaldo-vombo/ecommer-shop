import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
type TProps = {
   files: (File & {
      preview: string;
   })[];
   setFiles: React.Dispatch<React.SetStateAction<(File & {
      preview: string;
   })[]>>
}

const MultipleImage = ({ setFiles, files }: TProps) => {
   const MAX_LENGTH = 20; // Set your desired max length here

   const truncateText = (text: string) => {
      if (text) {
         if (text?.length > MAX_LENGTH) {
            return text.slice(0, MAX_LENGTH) + '...'; // Append ellipsis
         }
         return text;
      }
   };
   return (
      <Accordion type='multiple'>
         <AccordionItem value='item1'>
            <AccordionTrigger className='bg-black rounded-lg text-white flex items-center px-5'>
               <h2>{files && files.length} images</h2>
               <ImageIcon className='ml-auto' />
            </AccordionTrigger>
            <AccordionContent>
               {files.length > 0 ? files.map((file) => {
                  console.log(file.preview)
                  return (
                     <motion.div className='w-full p-2 flex items-center justify-between rounded-md outline-1 outline-[#eaeaea] mb-2'
                        key={file.preview}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}>
                        <div className='flex items-center gap-5'>
                           <Image
                              src={file.preview}
                              className='rounded-lg'
                              width={60}
                              height={60}
                              alt={file.preview}
                           />
                           <div>
                              {file.name ? (
                                 <h3 className='base-semibold'>{truncateText(file.name)}</h3>
                              ) : (<h3 className='base-semibold'>{truncateText(file.preview)}</h3>)}
                              <h4>{file.size}</h4>
                           </div>
                        </div>
                        <Button className='size-8 text-white bg-red-500 rounded-md' onClick={() => setFiles((prev) => prev.filter(f => f.name !== file.name))}>
                           <X />
                        </Button>
                     </motion.div>
                  )
               }) : (<p>No images</p>)}
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
}

export default MultipleImage;