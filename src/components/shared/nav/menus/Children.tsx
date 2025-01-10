import { NAV_ITEMS } from "@/constants/site-content";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ChlidrenMenu = () => {
   return (
      <div>
         <div className="flex gap-4">
            <div className="w-20">
               <h3 className="mb-2 text-sm font-medium">Tenis</h3>
               {NAV_ITEMS[0].shoes?.map(item => (
                  <Link href={`/productos?gender=crianca&${item.query}`} className="mb-2 block text-sm text-neutral-400" key={item.id}>
                     {item.name}
                  </Link>
               ))}

            </div>
            <div>
               <h3 className="mb-2 text-sm font-medium">Vestuario</h3>
               {NAV_ITEMS[1].close?.map(item => (
                  <Link href={`/productos?gender=crianca&${item.query}`} className="mb-1 block text-sm text-neutral-400" key={item.id}>
                     {item.name}
                  </Link>
               ))}
            </div>
            <div>
               <h3 className="mb-2 text-sm font-medium">Acessórios</h3>
               {NAV_ITEMS[2].acessories?.map(item => (
                  <Link href={`/productos?gender=crianca&${item.query}`} className="mb-1 block text-sm text-neutral-400" key={item.id}>
                     {item.name}
                  </Link>
               ))}
            </div>
         </div>
         <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
            <span>View more</span>
            <ArrowRight />
         </button>
      </div>
   );
};
export default ChlidrenMenu;