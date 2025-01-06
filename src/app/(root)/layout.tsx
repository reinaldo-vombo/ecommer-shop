import Footer from '@/components/layouts/Footer'
import ToolbarExpandable from '@/components/shared/mobile/BottomNav'
import Header from '@/components/shared/nav/Header'
import { TProduct } from '@/components/shared/product/types'
import { getProducts } from '@/lib/db/querys'
import { LayoutProp } from '@/lib/types'

export default async function Mainlayout({ children }: LayoutProp) {
   const data = await getProducts()
   return (
      <div className='relative'>
         <Header data={data as unknown as TProduct[]} />
         <main className='isolate'>
            {/* <div className='relative pt-14'>
               <div
                  className="absolute left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 blur-xl sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                  style={{
                     clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
               ></div>
            </div> */}
            {children}
         </main>
         <Footer />
         <ToolbarExpandable />
      </div>
   )
}
