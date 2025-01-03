import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { TDialog } from "./type"

const ActionDialog = ({ action, trigger }: TDialog) => {
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button variant="outline">{trigger}</Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
               <AlertDialogDescription>

               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancelar</AlertDialogCancel>
               <AlertDialogAction onClick={action}>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
export default ActionDialog