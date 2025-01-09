'use client'
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
import { Separator } from "@/components/ui/separator"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { User } from "@/lib/auth/user"
import { useRouter } from "next/navigation"

const Profile = () => {
   const router = useRouter()

   const user = User()
   if (!user) {
      router.push('/auth')
   }
   const logout = () => {
      signOut()
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
                                 src={user?.avatar || '/placeholder.jpg'}
                                 className="rounded-full"
                                 fill
                                 sizes="100%"
                                 alt={user?.name || ''} />
                           </div>
                        </div>

                        <Separator />
                        <div>
                           <h2 className="text-center h2-bold">{user?.name}</h2>
                           <div className="flex items-center justify-between">
                              <span>Cilente</span>
                              <Button onClick={() => logout()}><LogOut /></Button>
                           </div>
                        </div>
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
                              <UpdateCustomer userInfo={user} />
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

export default Profile;
