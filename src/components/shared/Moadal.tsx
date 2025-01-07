import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { TModalProps } from "./type"

const Modal = ({ btn, children, title, className, size = 'md' }: TModalProps) => {
   return (
      <Dialog>
         <DialogTrigger className={className}>{btn}</DialogTrigger>
         <DialogContent size={size}>
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            {children}
         </DialogContent>
      </Dialog>

   )
}

export default Modal