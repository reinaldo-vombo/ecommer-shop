'use client'
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useWishlistStore } from "@/lib/store/wishListStore"
import { ScrollArea } from "../../ui/scroll-area"
import EmptyList from "./EmptyList"


const FavoriteItem = () => {
   const { wishlist, removeFromWishlist } = useWishlistStore()
   const favoriteList = wishlist
   return (
      <div className="mt-16 lg:mt-0">
         <h3 className="base-semibold">({favoriteList.length}) Itens na lista</h3>
         <ScrollArea className="h-[900px] mt-6">
            {favoriteList.length > 0 ? wishlist.map((item) => (
               <>
                  <div className="space-y-6 hidden lg:block" key={item.id}>
                     <div className="flex flex-col items-center gap-6 md:flex-row">
                        <Link href={`/productos/${item.id}`}>
                           <Image src={item.image} className="rounded-md" width={80} height={80} alt={item.name} />
                        </Link>
                        <div className="grid gap-2">
                           <h2 className="">{item.name}</h2>
                           <div className="flex flec items-center justify-end gap-4">

                              <button aria-label="shopping cart icon" className="outline outline-slate-200 outline-1 p-1 rounded-xl transition-colors hover:bg-green-100">
                                 Adicionar
                              </button>
                              <button aria-label="x icon" className="outline outline-slate-200 outline-1 p-1 rounded-xl transition-colors hover:bg-red-100" onClick={() => removeFromWishlist(item.id)}>
                                 Remover
                              </button>
                           </div>
                        </div>
                     </div>
                     <Separator />
                  </div>
                  {/* <ListItem props={item} /> */}
               </>
            )) : (
               <EmptyList />
            )}
         </ScrollArea>
      </div>
   )
}

export default FavoriteItem;
