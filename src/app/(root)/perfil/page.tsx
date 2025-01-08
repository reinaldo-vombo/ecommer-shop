
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth/config"
import { redirect } from "next/navigation"
import Profile from '@/components/layouts/Profile';


export default async function ProfilePage() {
   const session = await getServerSession(authOptions);
   if (!session) {
      redirect('/login')
   }

   return <Profile user={session.user} />
}
