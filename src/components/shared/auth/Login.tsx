
'use client'
import { useSearchParams } from 'next/navigation'
import LoginForm from './LoginForm';
import ForgotPassword from './ForgotPassword';
import { motion } from 'framer-motion'
import ResetPassword from './ResetPassword';

const Login = () => {
   const queryParams = useSearchParams()
   const view = queryParams.get('view')
   return (
      <div className="padding">
         <div className="relative flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            <motion.div
               initial={{ x: 0 }}
               animate={{ x: view === '4got10' ? '100%' : view === 'reset' ? '100%' : 0 }}
               transition={{ duration: 0.5 }}
               exit={{ x: '-100%' }}
               className="absolute translate-x-0 top-0 bottom-0 hidden lg:block lg:w-1/2 bg-cover"
               style={{ backgroundImage: "url('/login.webp')" }}>
            </motion.div>
            {view === 'reset' ? <ResetPassword /> : view === '4got10' ? <ForgotPassword /> : <LoginForm />}
            <LoginForm />
         </div>
      </div>
   )
}

export default Login;
