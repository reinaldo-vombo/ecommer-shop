import Image from "next/image"

type TProps = {
   name: string;
   price: number;
   image: string;
   description: string;

}

const Details = ({ name, price, image, description }: TProps) => {
   return (
      <div className="flex flex-col gap-6">
         <div className="mr-auto flex items-center gap-4">
            <Image src={image} className="rounded-md object-cover" width={80} height={50} alt={name} />
            <div className="grid gap-2">
               <h2 className="base-semibold">{name}</h2>
               <h3 className="base-semibold">{price}(kz)</h3>
            </div>
         </div>
         <div>
            <p>{description}</p>
         </div>
      </div>
   )
}

export default Details;
