import SigleProduct from "@/components/layouts/SigleProduct"
import { getProductById } from "@/lib/db/querys"

type TSearchParams = {
   params: Promise<{ id: string }>
}
export default async function SigleProductPage({ params }: TSearchParams) {
   const id = (await params).id;
   const product = await getProductById(id)

   return <SigleProduct props={product} />
}
