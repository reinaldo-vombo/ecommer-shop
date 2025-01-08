import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from '@/components/ui/input'
import { LogoIcon, SpinerIcon } from '@/assets/logos';
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { logninSchema } from "@/lib/validation/auth";
import { TAuthForm } from "./type";

const LoginForm = ({ onChange }: TAuthForm) => {

   type FormData = z.infer<typeof logninSchema>;

   const form = useForm({
      resolver: zodResolver(logninSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = async (data: FormData) => {
      const { email, password } = data;

      try {
         const result = await signIn('credentials', {
            redirect: false, // Prevent automatic redirection
            email,
            password,
            callbackUrl: '/'
         });

         // Handle the case where `result` is `null` or undefined
         if (!result) {
            toast.error('Erro ao tentar efetuar login. Tente novamente.');
            return;
         }

         // Handle different states of the `result`
         if (!result.ok) {
            const errorMessage =
               result.error === 'CredentialsSignin'
                  ? 'Email ou password incorreta.'
                  : 'Ocorreu um erro durante o login.';
            toast.error(errorMessage);
            return;
         }

         // Login successful
         toast.success('Bem-vindo de volta!');
      } catch (error: any) {
         // Log the error for debugging purposes
         console.error('Login error:', error);

         // Display user-friendly error messages
         if (error.response?.data?.message) {
            toast.error(error.response.data.message);
         } else {
            toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.');
         }
      }
   }
   return (
      <div className="w-full p-8 lg:w-1/2">
         <div className='flex items-center justify-center'>
            <LogoIcon width={50} />
         </div>
         <p className="text-xl text-gray-600 text-center">Welcome back!</p>
         <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase">or login with email</a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
         </div>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                           <Input
                              className="block text-gray-700 text-sm font-bold mb-2"
                              placeholder="Provide Email"
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
                  name="password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Palavra-passe</FormLabel>
                        <FormControl>
                           <Input
                              className="block text-gray-700 text-sm font-bold mb-2"
                              placeholder="Hasło"
                              {...field}
                              type="password"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
               >
                  {form.formState.isSubmitting ? (
                     <SpinerIcon />
                  ) : "Entrar"}
               </Button>
            </form>
         </Form>
         <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <span onClick={() => onChange("4got10")} className="text-xs text-gray-500">Esqueceu a palavra-passe?</span>
            <span className="border-b w-1/5 md:w-1/4"></span>
         </div>
      </div>
   )
}

export default LoginForm;
