'use client'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from '@/components/ui/input'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
   FormDescription
} from "@/components/ui/form";
import { customerSchema } from "@/lib/validation/customer";
import SubmitButton from "../SubmitButton";
import { IUser } from "next-auth";
import { updateCustomer } from "@/lib/actions/custumer";
import { initialState } from "@/constants/site-content";
import { toast } from "sonner";
type TUserInfo = {
   userInfo: IUser
}

const UpdateCustomer = ({ userInfo }: TUserInfo) => {
   const { name, email } = userInfo;
   type FormData = z.infer<typeof customerSchema>;
   const form = useForm<z.infer<typeof customerSchema>>({
      resolver: zodResolver(customerSchema),
      defaultValues: {
         name: name,
         email: email,
         location: "",

      },
   })
   const onSubmit = async (value: FormData) => {
      const result = await updateCustomer(initialState, value)
      if (result.error) {
         toast.error(result.message)
      }
      if (result.sucess) {
         toast.success(result.message)
      }
   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome</FormLabel>
                     <FormControl>
                        <Input
                           className="block text-gray-700 text-sm font-bold mb-2"
                           placeholder="Seu nome"
                           {...field}
                           type="text"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input
                           className="block text-gray-700 text-sm font-bold mb-2"
                           placeholder="Email"
                           {...field}
                           type="text"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="location"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Localização</FormLabel>
                     <FormControl>
                        <Input
                           className="block text-gray-700 text-sm font-bold mb-2"
                           placeholder="Sua localização"
                           {...field}
                           type="text"
                        />
                     </FormControl>
                     <FormDescription>Opcional, ajuda na filtragem de loja perto si</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <SubmitButton title="Atualizar" disabled={form.formState.isSubmitting} />
         </form>
      </Form>
   )
}

export default UpdateCustomer
