import { forgotenPasswordSchema } from '@/lib/validation/auth'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Mail } from 'lucide-react'
import { TFormView } from '../type'
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
import SubmitButton from '@/components/shared/SubmitButton'


const ForgotPasswor = ({ view }: TFormView) => {
   function onSubmit(value: z.infer<typeof forgotenPasswordSchema>) {
      console.log(value)
      toast.success('hhhhh')
      // Handle form submission
   }
   const form = useForm<z.infer<typeof forgotenPasswordSchema>>({
      resolver: zodResolver(forgotenPasswordSchema),
      defaultValues: {
         email: "",
      }
   })
   return (
      <div className='space-y-8'>
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
                              <Input placeholder='email' {...field} />
                              <Mail className='absolute right-[22px] top-[9px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <SubmitButton disabled={form.formState.isSubmitting} title='Enviar' />
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

export default ForgotPasswor
