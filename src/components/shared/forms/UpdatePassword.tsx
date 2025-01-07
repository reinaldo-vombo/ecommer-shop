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
} from "@/components/ui/form";
import { customerPasswordSchema } from "@/lib/validation/customer";
import SubmitButton from "../SubmitButton";
import { updateCustomerPassWord } from "@/lib/actions/custumer";
import { initialState } from "@/constants/site-content";
import { toast } from "sonner";

const UpdateCustomerPassword = () => {
   type FormData = z.infer<typeof customerPasswordSchema>;
   const form = useForm<z.infer<typeof customerPasswordSchema>>({
      resolver: zodResolver(customerPasswordSchema),
      defaultValues: {
         old_password: "",
         new_password: ""

      },
   })
   const onSubmit = async (value: FormData) => {
      const result = await updateCustomerPassWord(initialState, value);
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
               name="old_password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Palavra-passe antiga</FormLabel>
                     <FormControl>
                        <Input
                           className="block text-gray-700 text-sm font-bold mb-2"
                           placeholder="Palavra-passe antiga"
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
               name="new_password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nova palavra-passe</FormLabel>
                     <FormControl>
                        <Input
                           className="block text-gray-700 text-sm font-bold mb-2"
                           placeholder="Nova palavra-passe"
                           {...field}
                           type="text"
                        />
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

export default UpdateCustomerPassword;
