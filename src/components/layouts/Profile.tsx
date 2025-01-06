
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/components/ui/tabs"

const Profile = () => {
   return (
      <section className='padding'>
         <div className="container">
            <div className="grid grid-cols-12 gap-4">
               <div className="col-span-6"></div>
               <div className="col-span-6">
                  <Tabs defaultValue="account" className="w-full">
                     <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Conta</TabsTrigger>
                        <TabsTrigger value="password">Palavra-passe</TabsTrigger>
                     </TabsList>
                     <TabsContent value="account">
                        <Card>
                           <CardHeader>
                              <CardTitle>Conta</CardTitle>
                              <CardDescription>
                                 Faça alterações em sua conta aqui. Clique em salvar quando terminar.
                              </CardDescription>
                           </CardHeader>
                           <CardContent className="space-y-2">
                              {/* <UpdateCustomer /> */}
                           </CardContent>
                        </Card>
                     </TabsContent>
                     <TabsContent value="password">
                        <Card>
                           <CardHeader>
                              <CardTitle>Palavra-passe</CardTitle>
                              <CardDescription>
                                 Faça alterações da sua palavra-passe aqui. assim que salvar tera sessão encerada.
                              </CardDescription>
                           </CardHeader>
                           <CardContent className="space-y-2">
                              {/* <UpdateCustomerPassword /> */}
                           </CardContent>
                        </Card>
                     </TabsContent>
                  </Tabs>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Profile
