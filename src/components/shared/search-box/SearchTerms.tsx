import { DebouncedState } from "use-debounce";

const POPULAR_SEACH = ['Nike Air Max Plus', 'Patta Chuck 70 Marquis Hi', 'Air MAx', 'Blazer']
type TProps = {
   onChange: DebouncedState<(term: string) => void>;
}
const SearchTerms = ({ onChange }: TProps) => {
   return (
      <div className="mt-6 hidden md:block">
         <h3>Termor de pesquisa populares</h3>
         <ul className="grid gap-4">
            {POPULAR_SEACH.map((item, index) => (
               <li className="text-[1.5rem] cursor-pointer leading-[140%] tracking-tighter" key={index} onClick={() => onChange(item)}>
                  {item}
               </li>
            ))}
         </ul>
      </div>
   )
}

export default SearchTerms
