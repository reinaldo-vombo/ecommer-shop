import LoginForm from '@/components/shared/auth/Login';
import { authOptions } from '@/lib/auth/config';
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation';

export default async function LoginPage() {
   const session = await getServerSession(authOptions)
   if (session) {
      if (session?.user.roleId === 2) {
         redirect('/')
      } else {
         redirect('/cms')
      }
   }

   return (
      <div className='padding'>
         <LoginForm />
      </div>
   )
}
