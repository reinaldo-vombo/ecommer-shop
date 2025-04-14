import ProductTable from "@/components/private/tabeles/products"
import { getProducts } from "@/lib/db/querys";


const ProductPage = async () => {
   const data = await getProducts()
   return (
      <section>
         <ProductTable props={data} />
      </section>
   )
}

export default ProductPage;
