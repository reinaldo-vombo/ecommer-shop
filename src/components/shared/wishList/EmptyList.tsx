
import { Heart } from 'lucide-react'

const EmptyList = () => {
   return (
      <div className="text-center flex flex-col items-center justify-center gap-6 h-full">
         <Heart className="mx-auto size-32" fill="red" />
         <h2 className="h2-bold">Sua lista de favoritos está vazia</h2>
      </div>
   )
}

export default EmptyList;
