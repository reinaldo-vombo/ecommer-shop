import { Button } from "@/components/ui/button"
import { SIZES } from "@/constants/site-content"


const SizeTabel = ({ sizes }: { sizes: number[] }) => {
   return (
      <div>
         <h4 className="text-slate-400">Tamanhos</h4>
         <div className="grid grid-cols-4 gap-2">
            {SIZES.map((size) => (
               <button
                  key={size}
                  className={`h-9 rounded border hover:border-black`}
               >
                  {size}
               </button>
            ))}
         </div>
      </div>
   )
}

export default SizeTabel
