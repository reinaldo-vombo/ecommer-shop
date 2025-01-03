import Image from "next/image"
import { TProductProps } from "../product/types"


const SearchItem = ({ props }: TProductProps) => {
   const { name, price, image } = props
   return (
      <div className="hidden sm:flex col-span-3 flex-col items-center gap-4">
         <div className="relative">
            <Image src={image} className="rounded-xl w-16 md:w-[500px]" width={500} height={500} alt={name} />
         </div>
         <div className="space-y-4 mt-4 w-full">
            <h2 className="font-bold text-sm">{name}</h2>
            <span className="text-slate-300 hidden md:block">Sapatilha para homem</span>
            <h3 className="md:font-bold text-sm">{price} kz</h3>
         </div>
      </div>
   )
}

export default SearchItem;
