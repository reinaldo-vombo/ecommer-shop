import { User } from '@/lib/auth/user'
import Image from 'next/image'
import ProfileView from './layout/Profile'
import { TProduct } from '../product/types'
import Search from '../search-box/Search'
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
               <Image src='/avatar.jpg' className='size-6 rounded-full' width={500} height={500} alt='use name' />
            )}
         </div>
      </nav>
   )
}

export default MobileHeader;
