import UpdateCustomer from "@/components/shared/forms/UpdateCustomer"
import UpdateCustomerPassword from "@/components/shared/forms/UpdatePassword"
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
import Image from "next/image"
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth/config"
import { redirect } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import UserInfoTab from "@/components/shared/UserInfoTab"


export default async function ProfilePage() {
   const session = await getServerSession(authOptions);
   if (!session) {
      redirect('/login')
   }

   return (
      <section className='padding'>
         <div className="container">
            <div className="grid grid-cols-12 gap-4">
               <div className="col-span-6">
                  <Card>
                     <CardHeader>
                        <CardTitle>Conta</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-2">
                        <div className="flex">
                           <div className="relative size-40 mx-auto">
                              <Image
                                 src={session?.user.avatar || '/avatar.jpg'}
                                 className="rounded-full"
                                 fill
                                 sizes="100%"
                                 alt={session?.user.name} />
                           </div>
                        </div>

                        <Separator />
                        <UserInfoTab user={session.user} />
                     </CardContent>
                  </Card>
               </div>
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
                              <UpdateCustomer userInfo={session.user} />
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
                              <UpdateCustomerPassword />
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
