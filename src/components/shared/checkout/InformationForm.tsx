import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Search } from 'lucide-react'
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
const InformationForm = () => {

   return (
      <div>
         <h2 className="mb-6 text-2xl font-bold">Contacto</h2>
         <div className="space-y-6">
            <div>
               <Input
                  type="text"
                  placeholder="Email or mobile phone number"
                  className="bg-transparent border-gray-800"
               />
            </div>
            <div className="flex items-center gap-2">
               <Checkbox id="newsletter" />
               <Label htmlFor="newsletter" className="text-sm">
                  Receber nóticias e ofertas por email
               </Label>
            </div>

            <div>
               <h2 className="mb-6 text-2xl font-bold">Endereço de Entrega</h2>
               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <Input
                        type="text"
                        placeholder="First name (optional)"
                        className="bg-transparent border-gray-800"
                     />
                     <Input
                        type="text"
                        placeholder="Last name"
                        className="bg-transparent border-gray-800"
                     />
                  </div>

                  <div className="relative">
                     <Select>
                        <SelectTrigger className="w-[180px]">
                           <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                              <SelectItem value="blueberry">Blueberry</SelectItem>
                              <SelectItem value="grapes">Grapes</SelectItem>
                              <SelectItem value="pineapple">Pineapple</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                     <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  </div>

                  <Input
                     type="text"
                     placeholder="Apartment, suite, etc. (optional)"
                     className="bg-transparent border-gray-800"
                  />

                  <div className="grid grid-cols-[2fr_2fr_1fr] gap-4">

                     <Input
                        type="text"
                        placeholder="ZIP code"
                        className="bg-transparent border-gray-800"
                     />
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-2">
               <Checkbox id="save-info" />
               <Label htmlFor="save-info" className="text-sm">
                  Salvar as informações para proxima vez
               </Label>
            </div>

         </div>
      </div>
   )
}

export default InformationForm;
