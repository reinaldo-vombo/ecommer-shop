import { TProduct } from "@/components/shared/product/types"
import List from "./List"

type ListProductProps = {
   products: TProduct[]
}

const ListProduct = ({ products }: ListProductProps) => {
   return (
      <div className='col-span-4 sticky top-0 space-y-5'>
         {products.length > 0 ? products.map((product) => (
            <List props={product} key={product.id} />
         )) : (
            <p>Os productos seram exibidos aqui</p>
         )}
      </div>
   )
}

export default ListProduct
