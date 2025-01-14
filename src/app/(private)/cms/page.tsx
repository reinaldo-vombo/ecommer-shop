import OverViewCards from '@/components/private/overviews/OverViewCards'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
   title: "Gerenciador de Conteúdo"
}
export default function page() {
   return (
      <section>
         <OverViewCards />
      </section>
   )
}
