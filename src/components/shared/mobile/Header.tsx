import { User } from '@/lib/auth/user'
import Image from 'next/image'
import ProfileView from './layout/Profile'
import { TProduct } from '../product/types'
import Search from '../search-box/Search'
import Link from 'next/link'
type THeader = {
   title: string
   data: TProduct[]
}

const MobileHeader = ({ title, data }: THeader) => {
   const user = User()
   return (
      <nav className='md:hidden flex items-center justify-between h-16 md:h-auto'>
         <div>
            <Search product={data} />
         </div>
         <div>
            <h2 className='base-semibold'>{title}</h2>
         </div>
         <div>
            {user ? (
               <ProfileView />
            ) : (
               <Link href='/auth'>
                  <div className='relative size-6'>
                     <Image
                        src='/placeholder.jpg'
                        className='rounded-full'
                        fill
                        sizes='100%'
                        alt='use name' />
                  </div>
               </Link>
            )}
         </div>
      </nav>
   )
}

export default MobileHeader;
