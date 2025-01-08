'use client'
import { z } from "zod"
import { useFormState } from 'react-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from '@/components/ui/input';
import { resetPasswordSchema } from "@/lib/validation/auth"
import { resetPassword } from "@/lib/actions/auth"
import { useRef } from "react";
import { toast } from "sonner";
import { initialState } from "@/constants/site-content";
import SubmitButton from "../SubmitButton";

const ResetPassword: React.FC = () => {
   const [state, formAction, isLoading] = useFormState(resetPassword, initialState);
   const router = useRouter();
   const formRef = useRef<HTMLFormElement>(null)
   const form = useForm<z.infer<typeof resetPasswordSchema>>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: {
         code: "",
         newPassword: "",
         confirmPassword: "",
         ...(state?.fields ?? {}),
      },
   })
   if (state.status === 200) {
      toast.success(state.message)
      router.push("/login");
   }

   return (
      <Form {...form}>
         <form className="w-full p-8 lg:w-1/2"
            action={formAction}
            onSubmit={form.handleSubmit(() => formRef.current?.submit())}
         >
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
            <p className="text-xl text-gray-600 text-center">Esqueceu a palavra-passe</p>
            <div className="mt-4 flex items-center justify-between">
               <span className="border-b w-1/5 lg:w-1/4"></span>
               <a href="#" className="text-xs text-center text-gray-500 uppercase">Alteração da palavra-passe</a>
               <span className="border-b w-1/5 lg:w-1/4"></span>
               {state?.message !== "" && <p style={{ color: 'red' }} aria-live="polite">{state?.message}</p>}
            </div>
            <div className="space-y-5">
               <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Codigo de confirmaçáo</FormLabel>
                        <FormControl>
                           <InputOTP maxLength={5} {...field}>
                              <InputOTPGroup>
                                 <InputOTPSlot index={0} />
                                 <InputOTPSlot index={1} />
                                 <InputOTPSlot index={2} />
                                 <InputOTPSlot index={3} />
                                 <InputOTPSlot index={4} />
                              </InputOTPGroup>
                           </InputOTP>
                        </FormControl>
                        <FormDescription>
                           Please enter the one-time password sent to your phone.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Nova palavra-passe</FormLabel>
                        <FormControl>
                           <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>
                           Por-favor digite a nova palavra-passe
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Confirmar palavra-passe</FormLabel>
                        <FormControl>
                           <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>
                           Por-favor volte a digite a nova palavra-passe
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <SubmitButton disabled={isLoading} title="Atualizar" />
            </div>
         </form>
      </Form>
   );
};

export default ResetPassword;