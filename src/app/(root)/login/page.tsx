import LoginForm from '@/components/shared/auth/Login';
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation';

export default async function LoginPage() {
   const session = await getServerSession()
   if (session) {
      if (session?.user.roleId === 2) {
         redirect('/')
      } else {
         redirect('/cms')
      }
   }

   return <LoginForm />
}
