import CreateProduct from '@/components/private/forms/CreateProduct'
import { getProducts } from '@/lib/db/querys'
import { Metadata } from 'next';

export const revalidate = 7200;
export const metadata: Metadata = {
   title: "Gerenciador de Productos"
}

export default async function page() {
   const products = await getProducts()
   return (
      <div>
         <CreateProduct products={products} />
      </div>
   )
}
