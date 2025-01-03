import { Separator } from "@/components/ui/separator"
import Reviews from "./Reviews";
import { TProductProps } from "@/components/shared/product/types";
import { CarouselCustomIndicator } from "@/components/shared/Carousel";

const ProductDetails = ({ props }: TProductProps) => {
   const { name, size, category, description, gender, details } = props;
   const sizes = size?.map((size, index) => {
      return (<span key={size + index}>{size},</span>)
   })
   const categories = category?.map(categorie => {
      return (<span key={categorie}>{categorie},</span>)
   })
   const urls = props.images[0].images

   return (
      <div className="mt-8 w-[30rem]">
         {/* <ActionDialog action={handleDelete} trigger={<Trash color="red" />} /> */}
         <div className="space-y-5">
            <CarouselCustomIndicator images={props.images} initial={urls} />
         </div>
         <div className="mt-4">
            <h2 className="h3-bold">{name}</h2>
            <Separator />
            <ul className="mt-4 space-y-3">
               <li className="flex items-center gap-1">
                  <b>Tipo:</b> Sapatilha
               </li>
               <li className="flex items-center gap-1">
                  <b>Categoria:</b> {categories}
               </li>
               <li className="flex items-center gap-1">
                  <b>Genéro:</b> {gender}
               </li>
               <li className="flex items-center gap-1">
                  <b>Tamanhos:</b> {sizes}
               </li>
               <li className="flex items-center gap-1">
                  <b>Estado:</b> Publicado
               </li>
               <li className="flex items-center gap-1">
                  <b>Stock:</b> 20
               </li>
            </ul>
            <div className="mt-4 space-y-5">
               <h2 className="h3-bold">Analiticys</h2>
               <Separator />
               {/* <SalesChart className="max-w-[34rem]" /> */}
            </div>
            <div className="mt-4 space-y-5">
               <h2 className="h3-bold">Conteúdo</h2>
               <Separator />
               <div className="space-y-3">
                  <h3 className="base-semibold">Descrição</h3>
                  <p className="line-clamp-4">{description}</p>
               </div>
               <div className="space-y-3">
                  <h3 className="base-semibold">Detalhes</h3>
                  <p className="line-clamp-4">{details}</p>
               </div>
               <Reviews />
            </div>
         </div>
      </div>
   )
}

export default ProductDetails;