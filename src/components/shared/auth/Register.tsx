'use client'
import SubmitButton from '@/components/shared/SubmitButton'
import { registerSchema } from '@/lib/validation/auth'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, Mail, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from 'sonner'
import { z } from 'zod'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import Link from 'next/link'
import { createQueryString } from '@/lib/utils'
import { useCallback } from 'react'


const Register = () => {
   const pathname = usePathname();
   const searchParams = useSearchParams();
   function onSubmit(value: z.infer<typeof registerSchema>) {
      console.log(value)
      toast.success('hhhhh')
      // Handle form submission
   }
   const form = useForm<z.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
         confirmPassword: ""
      }
   })
   const generateQueryString = useCallback(
      (name: string, value: string) => createQueryString(searchParams, name, value),
      [searchParams]
   );
   return (
      <div className='space-y-8'>
         <Form {...form}>
            <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Nome</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input placeholder='Nome' {...field} />
                              <User className='absolute right-[22px] top-[9px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Email</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input placeholder='email' {...field} />
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
                              <Input type='password' placeholder='Palavra-passe' {...field} />
                              <Eye className='absolute right-[22px] top-[9px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Confirmar Palavra-passe</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input type='password' placeholder='confirmar' {...field} />
                              <Eye className='absolute right-[22px] top-[9px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <SubmitButton disabled={form.formState.isSubmitting} title='Entrar' />
            </form>
         </Form>
         <Separator />
         <div className='flex items-center justify-center gap-2 text-xs'>
            <span>Já tenho uma conta</span>
            <Link href={pathname + '?' + generateQueryString('view', 'login')} className='text-alpha cursor-pointer'>Entrar</Link>
         </div>
      </div>
   )
}

export default Register
