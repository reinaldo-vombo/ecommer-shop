'use client'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { signIn } from "next-auth/react";
import { Eye, Mail } from 'lucide-react'
import { TFormView } from '../type'
import { logninSchema } from '@/lib/validation/auth'
import SubmitButton from '@/components/shared/SubmitButton'

const Lognin = ({ view }: TFormView) => {

   async function onSubmit(value: z.infer<typeof logninSchema>) {
      const email = value.email
      const password = value.password
      try {
         const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: '/'
         });

         if (result?.error) {
            toast.warning("Email ou Senha incorreta");
         }
         if (result?.ok) {
            toast.success(`Bem-vindo ao portal ${result.status}`);
         }
      } catch (error) {
         console.error(error);
         toast.error("Ocorreu um erro ao fazer login.");
      }
   }
   const form = useForm<z.infer<typeof logninSchema>>({
      resolver: zodResolver(logninSchema),
      defaultValues: {
         email: '',
         password: '',
      }
   })
   return (
      <div className='space-y-8 mt-16'>
         <Form {...form}>
            <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Email</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input placeholder='email' type="email" {...field} />
                              <Mail className='absolute right-[22px] top-[9px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Palavra-passe</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input placeholder='Palavra-passe' type="password" {...field} />
                              <Eye className='absolute right-[22px] top-[9px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                     <input type="checkbox" name="" id="" />
                     <span>Lembra-me</span>
                  </div>
                  <span onClick={() => view('recover')} className='text-xs cursor-pointer text-alpha'>Esqueceu a palvra-passe?</span>
               </div>
               <SubmitButton disabled={form.formState.isSubmitting} title='Entrar' />
            </form>
         </Form>
         {/* <div>
            <Button className='bg-red-500 w-full'>Entrar como visitante</Button>
         </div> */}
         <Separator />
         <div className='flex items-center justify-center gap-2 text-xs'>
            <span>Não tem uma conta?</span>
            <span onClick={() => view("register")} className='text-alpha cursor-pointer'>Cadastrar</span>
         </div>
      </div>
   )
}

export default Lognin;
