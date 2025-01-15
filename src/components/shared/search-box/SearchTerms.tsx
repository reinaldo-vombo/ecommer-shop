import { DebouncedState } from "use-debounce";
import { TProduct } from "../product/types";

type TProps = {
   onChange: DebouncedState<(term: string) => void>;
   products: TProduct[]
}
const SearchTerms = ({ onChange, products }: TProps) => {
   return (
      <div className="mt-6 hidden md:block">
         <h3>Termor de pesquisa populares</h3>
         <ul className="grid gap-4">
            {products.map((item, index) => index < 5 && (
               <li className="text-lg font-semibold cursor-pointer leading-[140%] tracking-tighter text-gray-500" key={index} onClick={() => onChange(item.name)}>
                  {item.name}
               </li>
            ))}
         </ul>
      </div>
   )
}

export default SearchTerms
