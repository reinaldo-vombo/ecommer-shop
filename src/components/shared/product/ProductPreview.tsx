"use client"
import { Star } from "lucide-react"
import { CarouselCustomIndicator } from "../Carousel"
import { TProductProps } from "./types"
import SizeTabel from "@/components/private/product/SizeTabel"
import { Feedback } from "@/components/private/product/feedback"
import { useState } from "react"
import Tooltip from "../Tooltip"
import Rating from "../Rating"

const ProductPreview = ({ props }: TProductProps) => {
   const [stars, setStars] = useState<number | null>(null)
   const { name, price, images, size } = props;
   const defaultUrls = images[0].images;
   return (
      <div className="container">
         <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 space-y-6">
               <div className="space-y-3">
                  <h2 className="h2-bold">{name}</h2>
                  <h3 className="base-semibold">{price} (kz)</h3>
                  <div className="grid gap-2">
                     <Tooltip
                        chlidren={<Rating />}
                        trigger={<span className="flex items-center"><Star color="gold" /> (5/0)</span>}
                     />
                     <span className="text-slate-400">Sapatilha para homems</span>
                  </div>
               </div>
               <div className="space-y-3">
                  <h4 className="text-slate-400">Tamanhos</h4>
                  <SizeTabel sizes={size} />
               </div>

            </div>
            <div className="col-span-4">
               <div className="max-w-lg">
                  <CarouselCustomIndicator images={images} initial={defaultUrls} />
               </div>
            </div>
            <div className="col-span-4 space-y-6">
               <div className="space-y-3">
                  <h4 className="text-slate-400">Descrição</h4>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae unde eligendi nobis dolorum vitae repellendus voluptatem veritatis autem assumenda? Ipsa blanditiis fuga fugit quos, neque excepturi aspernatur earum porro autem assumenda delectus doloremque harum nobis, libero placeat perspiciatis deserunt adipisci laborum aliquid atque! Fuga nulla, nisi est explicabo maxime rem aspernatur animi. Natus voluptate libero culpa aliquid eius accusantium omnis illo quae eos ex, voluptates, voluptatem perspiciatis repellendus labore tenetur dolorum sapiente aut consectetur nihil illum molestiae? Dolores quas, veritatis atque consequuntur facilis saepe ab iusto, modi quidem corporis voluptatem!</p>
               </div>
               <Feedback setStars={setStars} stars={stars} />
            </div>
         </div>
      </div>
   )
}

export default ProductPreview;
