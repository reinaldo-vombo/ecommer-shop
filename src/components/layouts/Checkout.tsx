'use client'

import { useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PaymentForm from '../shared/forms/Payment'
import { useCartStore } from '@/lib/store/cartStore'
import Link from 'next/link'
import Image from 'next/image'
import QuantityButton from '../shared/product/QuantityButton'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

const Checkout = () => {
   const listItems = useCartStore((state) => state.cart);
   const loadCart = useCartStore((state) => state.loadCart);
   const removeFromCart = useCartStore((state) => state.removeFromCart);
   const { totalPrice } = useMemo(() => {
      const totals = listItems.reduce(
         (acc, item) => {
            acc.totalQuantity += item.quantity;
            acc.totalPrice += item.quantity * item.price;
            return acc;
         },
         { totalQuantity: 0, totalPrice: 0 }
      );
      return totals;
   }, [listItems]);
   useEffect(() => {
      loadCart();
   }, [loadCart]);

   return (
      <section className="padding">
         <div className="container">
            <h1 className="text-2xl font-bold mb-4">Payment Information</h1>
            <div className="grid gap-6 md:grid-cols-2">
               <Card>
                  <CardHeader>
                     <CardTitle>Informações de pagamento</CardTitle>
                     <CardDescription>Preencha as suas informações de credito</CardDescription>
                  </CardHeader>
                  <PaymentForm totalQuantity={totalPrice} />
               </Card>
               <Card>
                  <CardHeader>
                     <CardTitle>Suas compras</CardTitle>
                     <CardDescription>Manage your saved credit cards</CardDescription>
                  </CardHeader>
                  <CardContent>
                     {listItems.length === 0 ? (
                        <div>
                           <p className="text-center text-gray-500">Sem item no carrinho</p>
                           <Link href='/'>Voltar</Link>
                        </div>
                     ) : (
                        <ul className="space-y-4">
                           {listItems.map(product => (
                              <li key={product.id} className="flex items-center justify-between p-4 shadow-md rounded-lg relative group">
                                 <Button onClick={() => removeFromCart(product.id)} className='bg-red-500 rounded-full absolute top-0 inset-x-0 z-10 opacity-0 cursor-none transition-opacity group-hover:opacity-100 group-hover:cursor-pointer' size={'icon'}>
                                    <X />
                                 </Button>
                                 <div className='relative size-[60px]'>
                                    <Image src={product.image} className='rounded-md' fill sizes='100%' alt={product.name} />
                                 </div>
                                 <div>
                                    <h2 className='base-semibold'>{product.name}</h2>
                                    <h2 className='base-semibold'>{product.price}</h2>
                                 </div>
                                 <div className="flex space-x-2">
                                    <QuantityButton id={product.id}
                                       initialQuantity={product.quantity} />
                                 </div>
                              </li>
                           ))}
                        </ul>
                     )}
                  </CardContent>
               </Card>
            </div>
         </div>
      </section>
   )
}
export default Checkout;