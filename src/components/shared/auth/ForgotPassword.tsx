
import { useActionState } from "react";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button';
import { recoverPassword } from '@/lib/actions/auth';
import { toast } from 'sonner';
import { TAuthForm } from './type';

const initialState = {
   message: '',
   error: false,
   status: 0,
   success: undefined
}
const ForgotPassword = ({ onChange }: TAuthForm) => {
   const [state, formAction, pending] = useActionState(recoverPassword, initialState)
   if (state?.status === 200) {
      toast.success(state?.message)
   }

   return (
      <form className="w-full p-8 lg:w-1/2" action={formAction}>
         <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
         <p className="text-xl text-gray-600 text-center">Esqueceu a palavra-passe</p>
         <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase">Recupreção da passe</a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
         </div>
         <div className="mt-4">
            <Label className="block text-gray-700 text-sm font-bold mb-2">Email Address</Label>
            <Input name='email' className={`bg-slate-200 text-gray-700 focus:outline-none focus:shadow-outline border rounded py-2 px-4 block w-full appearance-none ${state.error ? 'border-red-500' : 'border-slate-200'} `} type="email" />
            {state?.error && <p style={{ color: 'red' }} aria-live="polite">{state?.message}</p>}
         </div>
         <div className="mt-8">
            <Button className="w-full" disabled={pending} type="submit">Enviar</Button>
         </div>
         <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <span onClick={() => onChange("login")} className="text-xs text-gray-500 uppercase">Entrar</span>
            <span className="border-b w-1/5 md:w-1/4"></span>
         </div>
      </form>

   )
}

export default ForgotPassword
