import { LogoIcon } from '@/assets/logos';
import { Plus } from 'lucide-react';

const ModalButton = () => {
   return (
      <div className='relative rounded-xl p-2 w-28 '>
         <LogoIcon />
         <div className='absolute bg-[#0000006e] rounded-xl flex items-center justify-center text-white inset-0'>
            <Plus width={50} />
         </div>
      </div>
   )
}
export default ModalButton;