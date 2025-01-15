import SigleProduct from "@/components/layouts/SigleProduct"
import { getProductById, getProductReviews, getRelatedProducts } from "@/lib/db/querys"

type TSearchParams = {
   params: Promise<{ id: string }>
}
export default async function SigleProductPage({ params }: TSearchParams) {
   const id = (await params).id;
   const [product, reviews] = await Promise.all([
      getProductById(id),       // Fetch product details
      getProductReviews(id),    // Fetch product reviews
   ]);
   const relatedProducts = await getRelatedProducts(
      product.id,
      product.type || '',
      product.brand
   );

   return <SigleProduct props={{ product, reviews, relatedProducts }} />
}
