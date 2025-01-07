import { Button } from "@/components/ui/button"
import { TProduct } from "../../product/types"
import SheetModal from "../../SheetModal"
import { Heart, Star } from "lucide-react"
import { useCartStore } from "@/lib/store/cartStore"
import { useWishlistStore } from "@/lib/store/wishListStore"

type TProps = {
   props: TProduct
}

const ButtomTab = ({ props }: TProps) => {
   const addToCart = useCartStore((state) => state.addToCart);
   const addToWishlist = useWishlistStore((state) => state.addToWishlist);
   return (
      <div className="grid grid-cols-12 gap-4">
         <div className='col-span-6'>
            <Button className='w-full' onClick={() => addToCart(props)}>Adicionar ao carrinho</Button>
         </div>
         <div className='col-span-6 space-x-2'>
            <Button onClick={() => addToWishlist(props)}><Heart /></Button>
            <SheetModal
               trigger={<span className='flex items-center gap-2'>Revisões <Star color='black' fill='gold' /></span>}
               side='bottom'
               triggerClass='h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium'
               title='Revisões'
            >
               comments
            </SheetModal>
         </div>
      </div>
   )
}

export default ButtomTab
