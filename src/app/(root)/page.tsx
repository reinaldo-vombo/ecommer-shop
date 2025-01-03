import Banner from "@/components/layouts/Banner";
import ProductSection from "@/components/layouts/ProductSection";
import { getCartFromCookies } from "@/components/shared/cart/action";
import { getProducts } from "@/lib/db/querys";


export default async function Home() {
  const data = await getProducts()
  const cartFromCookies = await getCartFromCookies()

  return (
    <main>
      <Banner />
      <ProductSection products={data} />
    </main>
  );
}
