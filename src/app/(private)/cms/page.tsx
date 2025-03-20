import RevenueChart from '@/components/private/charts/revenue'
import { SalesChart } from '@/components/private/charts/Sales'
import OverViewCards from '@/components/private/overviews/OverViewCards'
import OrdersTable from '@/components/private/tabeles/Orders'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
   title: "Gerenciador de Conteúdo"
}
export default function page() {
   return (
      <section className='space-y-8'>
         <OverViewCards />
         <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-8'>
               <RevenueChart />
            </div>
            <div className='col-span-4'>
               <SalesChart />
            </div>
         </div>
         <div>
            <OrdersTable />
         </div>
      </section>
   )
}
