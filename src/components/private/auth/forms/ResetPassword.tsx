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
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Separator } from '@/components/ui/separator'
import { resetPasswordSchema } from '@/lib/validation/auth'
import { TFormView } from '../type'
import { Eye, Mail } from 'lucide-react'
import SubmitButton from '@/components/shared/SubmitButton'

const ResetPassword = ({ view }: TFormView) => {
   function onSubmit(value: z.infer<typeof resetPasswordSchema>) {
      console.log(value)
      toast.success('hhhhh')
      // Handle form submission
   }
   const form = useForm<z.infer<typeof resetPasswordSchema>>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: {
         code: "",
         newPassword: "",
         confirmPassword: "",
      }
   })
   return (
      <div className='space-y-8'>
         <Form {...form}>
            <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
               <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Token</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input placeholder='Token' {...field} />
                              <Mail className='absolute right-[22px] top-[9px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Palavra-passe</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input placeholder='Palavra-passe' {...field} />
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
                              <Input placeholder='Confirmar Palavra-passe' {...field} />
                              <Eye className='absolute right-[22px] top-[9px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <SubmitButton disabled={form.formState.isSubmitting} title='Atualizar' />
            </form>
         </Form>
         <Separator />
         <div className='flex items-center justify-center gap-2 text-xs'>
            <span>Já tem uma conta?</span>
            <b onClick={() => view('login')} className='text-alpha cursor-pointer'>Entart</b>
         </div>
      </div>
   )
}

export default ResetPassword
