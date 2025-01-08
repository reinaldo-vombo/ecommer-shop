
'use client'
import LoginForm from './LoginForm';
import ForgotPassword from './ForgotPassword';
import { motion } from 'framer-motion'
import Register from './Register';
import { useState } from 'react';

const Login = () => {
   const [view, setView] = useState('login')
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
            {
               view === '4got10'
                  ? <ForgotPassword onChange={setView} />
                  : view === 'new' ? <Register onChange={setView} /> : <LoginForm onChange={setView} />}
            <LoginForm onChange={setView} />
         </div>
      </div>
   )
}

export default Login;
