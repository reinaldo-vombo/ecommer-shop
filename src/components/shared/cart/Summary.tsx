type TProps = {
   totalPrice: number;
   totalQuantity: number;
}

const Summary = ({ totalPrice, totalQuantity }: TProps) => {
   return (
      <div className="py-4 text-sm text-neutral-500">
         <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
            <p>Taxa</p>
            <p className="text-right text-base text-black dark:text-white">
               {totalPrice || "0,00"}&nbsp;$<span className="ml-1 inline">AKZ</span>
            </p>
         </div>
         <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
            <p>Encomenda</p>
            <p className="text-right">Calculated at checkout</p>
         </div>
         <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
            <p>Total</p>
            <p className="text-right text-base text-black dark:text-white">
               {totalQuantity}&nbsp;$
               <span className="ml-1 inline">AKZ</span>
            </p>
         </div>
      </div>
   )
}

export default Summary
