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
import { updateCustomer } from "@/lib/actions/custumer";
import { initialState } from "@/constants/site-content";
import { toast } from "sonner";
import { IUser } from "next-auth";
import FileUploader from "../file-uplode/FileUploder";
import { useSession } from "next-auth/react";

type TUserInfo = {
   userInfo: IUser | undefined
}

const UpdateCustomer = ({ userInfo }: TUserInfo) => {
   const { update } = useSession();
   type FormData = z.infer<typeof customerSchema>;
   const form = useForm<z.infer<typeof customerSchema>>({
      resolver: zodResolver(customerSchema),
      defaultValues: {
         name: userInfo?.name,
         email: userInfo?.email,
         location: "",
         avatar: []

      },
   })
   const onSubmit = async (value: FormData) => {
      const result = await updateCustomer(initialState, value)
      if (result.error) {
         toast.error(result.message)
      }
      if (result.sucess) {
         await update({
            name: value.name,
            email: value.email,
            avatar: value.avatar
         })
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
            <FormField
               control={form.control}
               name="avatar"
               render={({ field }) => (
                  <FormItem className='w-full'>
                     <FormLabel className='text-slate-500'>Avatar</FormLabel>
                     <FormControl>
                        <FileUploader formField={field} maxFiles={1} />
                     </FormControl>
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
