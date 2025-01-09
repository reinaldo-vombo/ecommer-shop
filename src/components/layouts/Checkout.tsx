'use client'

import { Fragment, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import { ChevronRight, Search } from 'lucide-react'
import Image from 'next/image'

const NAV_ITEMS = [
   { id: '1', name: 'Informação' },
   { id: '2', name: 'Entrega' },
   { id: '3', name: 'Pagamento' },
]

const Checkout = () => {
   const [step, setStep] = useState('information')

   return (
      <div className="min-h-screen bg-black text-white">
         <div className="container mx-auto px-4 py-8">
            {/* Navigation */}
            <nav className="mb-8">
               <div className="flex items-center gap-3 text-sm">
                  {NAV_ITEMS.map((item) => (
                     <Fragment key={item.id}>
                        <span className={`${step === item.name ? 'text-red-500' : 'text-white'}`}>Information</span>
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                     </Fragment>
                  ))}
               </div>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
               {/* Left Column - Form */}
               <div>
                  <h2 className="mb-6 text-2xl font-bold">Contact</h2>
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
                           Email me with news and offers
                        </Label>
                     </div>

                     <div>
                        <h2 className="mb-6 text-2xl font-bold">Shipping address</h2>
                        <div className="space-y-4">
                           <Select defaultValue="US">
                              <SelectTrigger className="w-full bg-transparent border-gray-800">
                                 <SelectValue placeholder="Country/Region" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="US">United States</SelectItem>
                                 <SelectItem value="CA">Canada</SelectItem>
                                 <SelectItem value="UK">United Kingdom</SelectItem>
                              </SelectContent>
                           </Select>

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
                              <Input
                                 type="text"
                                 placeholder="City"
                                 className="bg-transparent border-gray-800"
                              />
                              <Select>
                                 <SelectTrigger className="bg-transparent border-gray-800">
                                    <SelectValue placeholder="State" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="CA">California</SelectItem>
                                    <SelectItem value="NY">New York</SelectItem>
                                    <SelectItem value="TX">Texas</SelectItem>
                                 </SelectContent>
                              </Select>
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
                           Save this information for next time
                        </Label>
                     </div>

                     <Button
                        onClick={() => setStep('shipping')}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                     >
                        Continue to shipping
                     </Button>
                  </div>
               </div>

               {/* Right Column - Cart Summary */}
               <div className="space-y-6">
                  <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="relative">
                           <Image
                              src="/placeholder.svg?height=64&width=64"
                              alt="T-shirt"
                              width={60}
                              height={60}
                              className="h-16 w-16 rounded bg-gray-800"
                           />
                           <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-700 text-xs">
                              1
                           </span>
                        </div>
                        <div className="flex-1">
                           <p className="font-medium">Acme Circles T-Shirt</p>
                           <p className="text-sm text-gray-400">White / S</p>
                        </div>
                        <p className="font-medium">$15.00</p>
                     </div>

                     <div className="flex items-center gap-4">
                        <div className="relative">
                           <Image
                              src="/placeholder.svg?height=64&width=64"
                              alt="T-shirt"
                              width={60}
                              height={60}
                              className="h-16 w-16 rounded bg-gray-800"
                           />
                           <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-700 text-xs">
                              1
                           </span>
                        </div>
                        <div className="flex-1">
                           <p className="font-medium">Acme Prism T-Shirt</p>
                           <p className="text-sm text-gray-400">XS</p>
                        </div>
                        <p className="font-medium">$20.00</p>
                     </div>
                  </div>

                  <div className="space-y-4 border-t border-gray-800 pt-4">
                     <div className="flex justify-between">
                        <p className="text-gray-400">Subtotal • 2 items</p>
                        <p className="font-medium">$35.00</p>
                     </div>
                     <div className="flex justify-between">
                        <p className="text-gray-400">Shipping</p>
                        <p className="text-gray-400">Calculated at next step</p>
                     </div>
                     <div className="flex justify-between border-t border-gray-800 pt-4">
                        <p className="font-medium">Total</p>
                        <div className="text-right">
                           <p className="text-sm text-gray-400">USD</p>
                           <p className="text-xl font-bold">$35.00</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <footer className="mt-8 text-center text-sm text-gray-500">
               All rights reserved Dev Vercel Shop
            </footer>
         </div>
      </div>
   )
}

export default Checkout;

