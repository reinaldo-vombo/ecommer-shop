import { useCartStore } from "@/lib/store/cartStore";
import { useState } from "react";
type QuantityButtonProps = {
   id: string; // ID of the cart item
   initialQuantity: number;
};
const QuantityButton = ({ id, initialQuantity }: QuantityButtonProps) => {
   const [count, setCount] = useState(initialQuantity)
   const updateQuantity = useCartStore((state) => state.updateQuantity);

   const handleIncrement = () => {
      const newCount = count + 1;
      setCount(newCount);
      updateQuantity(id, newCount); // Update in the store
   };

   const handleDecrement = () => {
      const newCount = count > 1 ? count - 1 : 1;
      setCount(newCount);
      updateQuantity(id, newCount); // Update in the store
   };
   return (
      <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700" data-hs-input-number="">
         <div className="flex items-center gap-x-1.5">
            <button type="button" onClick={handleDecrement} className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabIndex={-1} aria-label="Decrease" data-hs-input-number-decrement="">
               <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
               </svg>
            </button>
            <input className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white" style={{ MozAppearance: "textfield" }} type="number" aria-roledescription="Number field" defaultValue={count} data-hs-input-number-input="" />
            <button type="button" onClick={handleIncrement} className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabIndex={-1} aria-label="Increase" data-hs-input-number-increment="">
               <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
               </svg>
            </button>
         </div>
      </div>
   )
}

export default QuantityButton;
