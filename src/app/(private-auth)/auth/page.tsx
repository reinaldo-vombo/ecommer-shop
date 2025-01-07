import AuthContainer from '@/components/private/auth/AuthContainer';
import { authOptions } from '@/lib/auth/config';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
   const session = await getServerSession(authOptions);
   if (session) {
      redirect('/cms')
   }
   return <AuthContainer />
}
