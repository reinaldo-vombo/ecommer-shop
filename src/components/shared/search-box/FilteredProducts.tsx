import { Fragment } from "react";
import SearchItem from "./SearchItem";
import SearchList from "../mobile/SearchList";
import { useSearchParams } from "next/navigation";
import { TProduct } from "../product/types";
import { Search, X } from "lucide-react";

export const FilteredProducts = ({ product }: { product: TProduct[] }) => {
   const searchParams = useSearchParams();
   const query = searchParams.get("query")?.toString() || "";

   // Show no products if there is no query
   if (!query) {
      return <div className=" col-span-12">
         <p className="text-gray-500">Começe a escrever para procurar productos...</p>
         <Search className="text-gray-500 size-7" />
      </div>;
   }


   const filteredProducts = product.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
   );

   return (
      <>
         {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
               <Fragment key={product.id}>
                  <SearchItem props={product} />
                  {/* mobile */}
                  <SearchList props={product} />
                  {/* mobile */}
               </Fragment>
            ))
         ) : (
            <div className=" col-span-12">
               <p className="text-gray-500">Nenhum producto encontrado para <b>{query}</b></p>
               <X className="text-gray-500 size-7" />
            </div>
         )}
      </>
   );
}