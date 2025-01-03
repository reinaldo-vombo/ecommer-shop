import CreateProduct from '@/components/private/forms/CreateProduct'
import { getProducts } from '@/lib/db/querys'

export default async function page() {
   const products = await getProducts()
   return (
      <div>
         <CreateProduct products={products} />
      </div>
   )
}
