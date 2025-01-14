import AllProducts from '@/components/layouts/AllProducts'
import { getProducts } from '@/lib/db/querys'
import { Metadata } from 'next';

export const revalidate = 7200;
export const metadata: Metadata = {
   title: "Todos productos"
}
export default async function page() {
   const data = await getProducts()
   return <AllProducts props={data} />
}
