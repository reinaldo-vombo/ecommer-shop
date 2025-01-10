import { NAV_ITEMS } from "@/constants/site-content";
import Link from "next/link";

const WomensMenu = () => {
   return (
      <div className="flex gap-4">
         <div className="w-20">
            <h3 className="mb-2 text-sm font-medium">Tenis</h3>
            {NAV_ITEMS[0].shoes?.map(item => (
               <Link href={`/productos?gender=mulher&${item.query}`} className="mb-2 block text-sm text-neutral-400" key={item.id}>
                  {item.name}
               </Link>
            ))}

         </div>
         <div>
            <h3 className="mb-2 text-sm font-medium">Vestuario</h3>
            {NAV_ITEMS[1].close?.map(item => (
               <Link href={`/productos?gender=mulher&${item.query}`} className="mb-1 block text-sm text-neutral-400" key={item.id}>
                  {item.name}
               </Link>
            ))}
         </div>
         <div>
            <h3 className="mb-2 text-sm font-medium">Acessórios</h3>
            {NAV_ITEMS[2].acessories?.map(item => (
               <Link href={`/productos?gender=mulher&${item.query}`} className="mb-1 block text-sm text-neutral-400" key={item.id}>
                  {item.name}
               </Link>
            ))}
         </div>
      </div>
   );
};
export default WomensMenu;