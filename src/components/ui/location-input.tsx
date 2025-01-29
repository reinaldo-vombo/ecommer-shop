import React, { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
   Command,
   CommandList,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
} from '@/components/ui/command'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { TCapital, TProvince } from '@/lib/types'



interface LocationSelectorProps {
   disabled?: boolean
   onCountryChange?: (country: TProvince | null) => void
   onStateChange?: (state: TCapital | null) => void
   countries: TProvince[]
   states: TCapital[]
}

const LocationSelector = ({
   disabled,
   onCountryChange,
   onStateChange,
   countries,
   states
}: LocationSelectorProps) => {
   const [selectedCountry, setSelectedCountry] = useState<TProvince | null>(
      null,
   )
   const [selectedState, setSelectedState] = useState<TCapital | null>(null)
   const [openCountryDropdown, setOpenCountryDropdown] = useState(false)
   const [openStateDropdown, setOpenStateDropdown] = useState(false)

   // Cast imported JSON data to their respective types
   const countriesData = countries as TProvince[]
   const statesData = states as TCapital[]

   // Filter states for selected country
   const availableStates = statesData.filter(
      (state) => state.id === selectedCountry?.id,
   )

   const handleCountrySelect = (country: TProvince | null) => {
      setSelectedCountry(country)
      setSelectedState(null) // Reset state when country changes
      onCountryChange?.(country)
      onStateChange?.(null)
   }

   const handleStateSelect = (state: TCapital | null) => {
      setSelectedState(state)
      onStateChange?.(state)
   }

   return (
      <div className="flex gap-4">
         {/* Country Selector */}
         <Popover open={openCountryDropdown} onOpenChange={setOpenCountryDropdown}>
            <PopoverTrigger asChild>
               <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCountryDropdown}
                  disabled={disabled}
                  className="w-full justify-between"
               >
                  {selectedCountry ? (
                     <div className="flex items-center gap-2">
                        {/* <span>{selectedCountry.emoji}</span> */}
                        <span>{selectedCountry.nome}</span>
                     </div>
                  ) : (
                     <span>Select Country...</span>
                  )}
                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
               </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
               <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                     <CommandEmpty>No country found.</CommandEmpty>
                     <CommandGroup>
                        <ScrollArea className="h-[300px]">
                           {countriesData.map((country) => (
                              <CommandItem
                                 key={country.id}
                                 value={country.nome}
                                 onSelect={() => {
                                    handleCountrySelect(country)
                                    setOpenCountryDropdown(false)
                                 }}
                                 className="flex cursor-pointer items-center justify-between text-sm"
                              >
                                 <div className="flex items-center gap-2">
                                    {/* <span>{country.emoji}</span> */}
                                    <span>{country.nome}</span>
                                 </div>
                                 <Check
                                    className={cn(
                                       'h-4 w-4',
                                       selectedCountry?.id === country.id
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                    )}
                                 />
                              </CommandItem>
                           ))}
                           <ScrollBar orientation="vertical" />
                        </ScrollArea>
                     </CommandGroup>
                  </CommandList>
               </Command>
            </PopoverContent>
         </Popover>

         {/* State Selector - Only shown if selected country has states */}
         {availableStates.length > 0 && (
            <Popover open={openStateDropdown} onOpenChange={setOpenStateDropdown}>
               <PopoverTrigger asChild>
                  <Button
                     variant="outline"
                     role="combobox"
                     aria-expanded={openStateDropdown}
                     disabled={!selectedCountry}
                     className="w-full justify-between"
                  >
                     {selectedState ? (
                        <span>{selectedState.capital}</span>
                     ) : (
                        <span>Select State...</span>
                     )}
                     <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="p-0">
                  <Command>
                     <CommandInput placeholder="Search state..." />
                     <CommandList>
                        <CommandEmpty>No state found.</CommandEmpty>
                        <CommandGroup>
                           <ScrollArea className="h-[300px]">
                              {availableStates.map((state) => (
                                 <CommandItem
                                    key={state.id}
                                    value={state.capital}
                                    onSelect={() => {
                                       handleStateSelect(state)
                                       setOpenStateDropdown(false)
                                    }}
                                    className="flex cursor-pointer items-center justify-between text-sm"
                                 >
                                    <span>{state.capital}</span>
                                    <Check
                                       className={cn(
                                          'h-4 w-4',
                                          selectedState?.id === state.id
                                             ? 'opacity-100'
                                             : 'opacity-0',
                                       )}
                                    />
                                 </CommandItem>
                              ))}
                              <ScrollBar orientation="vertical" />
                           </ScrollArea>
                        </CommandGroup>
                     </CommandList>
                  </Command>
               </PopoverContent>
            </Popover>
         )}
      </div>
   )
}

export default LocationSelector
