import { ShoppingCart } from "lucide-react"

const EmptyCart = () => {
   return (
      <div className="grid place-content-center place-items-center">
         <ShoppingCart className="size-32" />
         <h2 className="h2-bold">Seu carrinho está vazio</h2>
      </div>
   )
}

export default EmptyCart;
