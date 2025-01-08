import Banner from "@/components/layouts/Banner";
import ProductSection from "@/components/layouts/ProductSection";
import { getProducts } from "@/lib/db/querys";
import MobileProductSection from '@/components/shared/mobile/layout/ProductSection';
import { TProduct } from "@/components/shared/product/types";
import { Suspense } from "react";


export default async function Home() {
  const data = await getProducts()

  return (
    <main>
      <Banner />
      <Suspense fallback={<p>loading..</p>}>
        <ProductSection products={data as unknown as TProduct[]} />
      </Suspense>
      <MobileProductSection products={data as unknown as TProduct[]} />
    </main>
  );
}
