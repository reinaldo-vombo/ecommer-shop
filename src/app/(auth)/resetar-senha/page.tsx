import ResetPassword from '@/components/shared/auth/ResetPassword'
import React from 'react'

export default function page() {
   return (
      <section className='h-screen flex items-center justify-center'>
         <div className="container">
            <ResetPassword />
         </div>
      </section>
   )
}
