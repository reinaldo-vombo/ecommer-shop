import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Search } from 'lucide-react'
import LocationSelector from '@/components/ui/location-input'
import { useState } from 'react'

const InformationForm = () => {
   const [countryName, setCountryName] = useState<string>('')
   const [stateName, setStateName] = useState<string>('')
   console.log({ countryName, stateName });

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
                     <Input
                        type="text"
                        placeholder="Address"
                        className="bg-transparent border-gray-800 pr-10"
                     />
                     <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  </div>

                  <Input
                     type="text"
                     placeholder="Apartment, suite, etc. (optional)"
                     className="bg-transparent border-gray-800"
                  />

                  <div className="grid grid-cols-[2fr_2fr_1fr] gap-4">
                     <LocationSelector
                        onCountryChange={(country) => {
                           setCountryName(country?.name || '')
                           //  form.setValue(field.name, [country?.name || '', stateName || ''])
                        }}
                        onStateChange={(state) => {
                           setStateName(state?.name || '')
                           //  form.setValue(field.name, [countryName || '', state?.name || ''])
                        }}
                     />
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
