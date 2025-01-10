import {
   MorphingDialog,
   MorphingDialogTrigger,
   MorphingDialogContent,
   MorphingDialogTitle,
   MorphingDialogImage,
   MorphingDialogSubtitle,
   MorphingDialogClose,
   MorphingDialogContainer,
   MorphingDialogLogout,
} from '@/components/shared/mobile/ui/morphing-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User } from '@/lib/auth/user';
import MobileUserTab from './MobileUserTab';
import { LogOut } from 'lucide-react';

const ProfileView = () => {
   const user = User()
   return (
      <div className='sm:hidden'>
         <MorphingDialog
            transition={{
               type: 'spring',
               stiffness: 200,
               damping: 24,
            }}
         >
            <MorphingDialogTrigger
               style={{
                  borderRadius: '4px',
               }}
               className='border border-gray-200/60 bg-white'
            >
               <div className='flex items-center space-x-3 p-3'>
                  <MorphingDialogImage
                     src={user?.avatar || '/placeholder.jpg'}
                     alt={user?.name || ''}
                     className='h-8 w-8 object-cover object-top rounded-full'
                     style={{ width: 32, height: 32 }}
                  />
               </div>
            </MorphingDialogTrigger>
            <MorphingDialogContainer>
               <MorphingDialogContent
                  style={{
                     borderRadius: '12px',
                  }}
                  className='relative h-full sm:h-auto w-[500px] border border-gray-100 bg-white'
               >
                  <ScrollArea className='h-[90vh]' type='scroll'>
                     <div className='relative p-6'>
                        <div className='flex justify-center py-10'>
                           <MorphingDialogImage
                              src={user?.avatar || '/placeholder.jpg'}
                              alt={user?.name || ''}
                              className='h-auto w-[200px] rounded-full'
                           />
                        </div>
                        <div className=''>
                           <MorphingDialogTitle className='text-black'>
                              {user?.name}
                           </MorphingDialogTitle>
                           <MorphingDialogSubtitle className='font-light text-gray-400'>
                              Cliente
                           </MorphingDialogSubtitle>
                           <MobileUserTab />
                        </div>
                     </div>
                  </ScrollArea>
                  <MorphingDialogClose className='text-zinc-500' />
                  <MorphingDialogLogout className='text-zinc-500'>
                     <LogOut color='red' />
                  </MorphingDialogLogout>
               </MorphingDialogContent>
            </MorphingDialogContainer>
         </MorphingDialog>
      </div>
   )
}

export default ProfileView;
