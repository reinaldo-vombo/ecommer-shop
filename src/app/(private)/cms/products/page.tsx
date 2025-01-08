import ProductTable from "@/components/private/tabeles/products"
import { getProducts } from "@/lib/db/querys";
import { Suspense } from "react";


const ProductPage = async () => {
   const data = await getProducts()
   return (
      <section>
         <Suspense fallback={<p>Loading..</p>}>
            <ProductTable props={data} />
         </Suspense>
      </section>
   )
}

export default ProductPage;
