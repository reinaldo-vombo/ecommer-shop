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

const UpdateCustomer = () => {
   type FormData = z.infer<typeof customerSchema>;
   const form = useForm<z.infer<typeof customerSchema>>({
      resolver: zodResolver(customerSchema),
      defaultValues: {
         name: "",
         email: "",
         location: "",

      },
   })
   const onSubmit = async (value: FormData) => {
      console.log(value);

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
