
import { TProductProps } from "@/components/shared/product/types";
import Image from "next/image";
import Link from "next/link";

const List = ({ props }: TProductProps) => {
   const { name, image, price, id } = props;

   return (
      <div>
         <Link href={`/cms/products/update/${id}`}>
            <div className='shadow-md rounded-lg border-slate-200 dark:border-neutral-600 bg-white text-black p-2 flex items-center justify-between'>
               <Image src={image} className='rounded-md' width={60} height={60} alt={name} />
               <h2 className="text-lg font-bold">{name}</h2>
               <h3>{price}</h3>
            </div>
         </Link>
      </div>
   )
}

export default List;
