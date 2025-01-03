'use client'
import Image, { StaticImageData } from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import coverImage from '@/assets/images/AIR+MAX+DN-nbg.png'
import img1 from '@/assets/images/AIR+MAX+DNB-nbg.png'
import img2 from '@/assets/images/AIR+MAX+DNP-nbg.png'
import img3 from '@/assets/images/AIR+MAX+DNG-nbg.png'
import img4 from '@/assets/images/AIR+MAX+DNP-nbg.png'
import { AnimatePresence, motion } from 'framer-motion'

const images = [
   { id: '1', img: img1, alt: 'Product 1' },
   { id: '2', img: img2, alt: 'Product 2' },
   { id: '3', img: img3, alt: 'Product 3' },
   { id: '4', img: img4, alt: 'Product 4' },
]

const Banner = () => {
   const [selectedImage, setSelectedImage] = useState<StaticImageData | ''>('')

   const handleImagePreview = (image: StaticImageData) => {
      setSelectedImage(image)
   }
   return (
      <section className="container mx-auto px-4 py-8 md:py-40">
         <div className="grid md:grid-cols-[1fr,auto] gap-8 items-start">
            {/* Product Section */}
            <div className="space-y-8">
               <div className="space-y-2">
                  <h1 className="text-2xl font-bold">Nike Air Max 720 Horizon</h1>
                  <p className="text-gray-600">Experience Next-Level Comfort</p>
               </div>

               {/* Main Product Image */}
               <div className="relative aspect-square md:aspect-[4/1] overflow-hidden">
                  <AnimatePresence>
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className='absolute inset-0'
                     >
                        <Image
                           src={selectedImage || coverImage}
                           alt="Nike Air Max 720 Horizon"
                           className="object-contain"
                           fill
                           priority
                        />
                     </motion.div>
                  </AnimatePresence>
               </div>

               <Button className="w-full md:w-auto">SHOP NOW</Button>

               {/* Social Links */}
               <div className="flex items-center gap-4 pt-4 border-t">
                  {/* <Link href="#" className="text-gray-600 hover:text-black">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link> */}
               </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex flex-row md:flex-col gap-4 overflow-auto md:overflow-visible pb-4 md:pb-0">
               {images.map((item) => (
                  <button
                     key={item.id}
                     onClick={() => handleImagePreview(item.img)}
                     className="relative h-16 w-36 flex-shrink-0 rounded-lg overflow-hidden transition-colors"
                  >
                     <Image
                        src={item.img}
                        alt={`Product`}
                        fill
                        className="object-cover"
                     />
                  </button>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Banner;
