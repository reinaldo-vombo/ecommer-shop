import AllProducts from '@/components/layouts/AllProducts'
import { getProducts } from '@/lib/db/querys'

export default async function page() {
   const data = await getProducts()
   return <AllProducts props={data} />
}
