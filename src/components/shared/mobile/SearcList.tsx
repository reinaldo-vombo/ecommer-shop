
import Link from 'next/link'
import Image from 'next/image';
import { TProductProps } from '../product/types';

const SearcList = ({ props }: TProductProps) => {
   const { name, image, price, id } = props;
   return (
      <Link href={`/productos/${id}`} className='col-span-12 sm:hidden'>
         <div className="shadow-md rounded-lg p-2 flex items-center justify-between">
            <div className="space-y-3">
               <h2 className="base-semibold">{name}</h2>
               <span className="base-semibold">{price} (kz)</span>
            </div>
            <div className="relative size-20">
               <Image src={image} className="object-cover rounded-lg" fill sizes="100%" alt={name} />
            </div>
         </div>
      </Link>
   )
}

export default SearcList
