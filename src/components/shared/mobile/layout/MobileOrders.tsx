
import SheetModal from "@/components/shared/SheetModal"
import { Badge } from "@/components/ui/badge"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"
import { TProduct } from "../../product/types"

const MobileOrders = () => {
   const PRODUCTS: TProduct[] = []
   return (
      <Tabs defaultValue="pending" className="w-full">
         <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">Pendente</TabsTrigger>
            <TabsTrigger value="completed">Completos</TabsTrigger>
         </TabsList>
         <TabsContent value="pending">
            <Card>
               <CardHeader>
                  <CardTitle>Compras pendentes</CardTitle>
                  <CardDescription>
                     Listas de compras pendentes
                  </CardDescription>
               </CardHeader>
               <CardContent className="space-y-2">
                  {PRODUCTS.map((item) => (
                     <Card key={item.id}>
                        <CardContent className="flex items-center justify-between p-1">
                           <Image src={item.image} className="rounded-md" width={60} height={60} alt={item.name} />
                           <div>
                              <div className="flex items-center flex-col">
                                 <h2 className="text-base grid">
                                    {item.name}
                                    <span>Tamanho:</span>
                                 </h2>
                                 <div className="flex items-center gap-4">
                                    <SheetModal
                                       trigger={<Badge className="bg-black">Comentar</Badge>}
                                       side="bottom"
                                    >comment</SheetModal>
                                    <Badge className="bg-green-500">Concluido</Badge>
                                 </div>
                              </div>
                              <div></div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </CardContent>
               <CardFooter>

               </CardFooter>
            </Card>
         </TabsContent>
         <TabsContent value="completed">
            <Card>
               <CardHeader>
                  <CardTitle>Comprar Concluidas</CardTitle>
                  <CardDescription>
                     Compras pagas e recebidas
                  </CardDescription>
               </CardHeader>
               <CardContent className="space-y-2">
                  {PRODUCTS.map((item) => (
                     <Card key={item.id}>
                        <CardContent className="flex items-center justify-between p-1">
                           <Image src={item.image} className="rounded-md" width={60} height={60} alt={item.name} />
                           <div>
                              <div className="flex items-center flex-col">
                                 <h2 className="text-base grid">
                                    {item.name}
                                    <span>Tamanho:</span>
                                 </h2>
                                 <div className="flex items-center gap-4">
                                    <SheetModal
                                       trigger={<Badge className="bg-black">Ver</Badge>}
                                       side="bottom"
                                    >comment</SheetModal>
                                    <Badge className="bg-green-500">Concluido</Badge>
                                 </div>
                              </div>
                              <div></div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </CardContent>
               <CardFooter>

               </CardFooter>
            </Card>
         </TabsContent>
      </Tabs>
   )
}

export default MobileOrders;
