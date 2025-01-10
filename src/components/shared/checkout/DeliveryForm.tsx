import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react'

const SHIPPING_METHOD = [
   { id: '1', method: 'Economic', feat: '5 a 8 négocios por dias' },
   { id: '2', method: 'Standard', feat: '3 a 4 négocios por dias' },
]

const DeliveryForm = () => {
   const [shippingType, setShippingType] = useState('Economic')
   const handleSelectMethod = (method: string) => {
      setShippingType(method)
   }
   return (
      <div>
         <div className='border-gray-800 border p-7 rounded-md space-y-2'>
            <div className='flex items-center'>
               <h3 className='text-slate-500'>Contacto:</h3>
               <span className='text-slate-200 ml-8'>@gmail.com</span>
               <button className='ml-auto text-blue-500 underline'>Altera</button>
            </div>
            <Separator />
            <div className='flex items-center'>
               <h3 className='text-slate-500'>Enviar para:</h3>
               <span className='text-slate-200 ml-6'>Luanda Restaurante & Event</span>
               <button className='ml-auto text-blue-500 underline'>Altera</button>
            </div>
         </div>
         <div className='mt-8 space-y-3'>
            <h2 className="mb-6 text-2xl font-bold">Metodo De Envio</h2>
            {SHIPPING_METHOD.map((shippe) => (
               <div className={`flex items-center justify-between cursor-pointer ${shippe.method === shippingType ? 'border-blue-500' : 'border-gray-800'} border p-7 rounded-t-md`} onClick={() => handleSelectMethod(shippe.method)} key={shippe.id}>
                  <div className='flex gap-4'>
                     <Checkbox className='rounded-full checked:bg-blue-500' />
                     <h2 className='font-semibold'>{shippe.method} <br /> <span className='text-slate-500'>{shippe.feat}</span></h2>
                  </div>
                  <h3>$4000</h3>
               </div>
            ))}
         </div>
      </div>
   )
}

export default DeliveryForm;
