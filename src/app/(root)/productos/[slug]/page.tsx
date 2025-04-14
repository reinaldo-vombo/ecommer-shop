import SigleProduct from "@/components/layouts/SigleProduct"
import { getProductBySlug, getProductReviews, getRelatedProducts } from "@/lib/db/querys"
import { Metadata, ResolvingMetadata } from "next"

type TSearchParams = {
   params: Promise<{ slug: string }>
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
   { params }: TSearchParams,
   parent: ResolvingMetadata
): Promise<Metadata> {
   // read route params
   const { slug } = await params

   // fetch data
   const product = await getProductBySlug(slug)

   // optionally access and extend (rather than replace) parent metadata
   const previousImages = (await parent).openGraph?.images || []

   return {
      title: product.name,
      openGraph: {
         images: [product.image, ...previousImages],
      },
   }
}
export default async function SigleProductPage({ params }: TSearchParams) {
   const slug = (await params).slug;
   const product = await getProductBySlug(slug);

   // Now use the product ID
   const [reviews, relatedProducts] = await Promise.all([
      getProductReviews(product.id),
      getRelatedProducts(product.id, product.type || "", product.brand),
   ]);
   // const relatedProducts = await getRelatedProducts(
   //    product.id,
   //    product.type || '',
   //    product.brand
   // );

   return <SigleProduct props={{ product, reviews, relatedProducts }} />
}
