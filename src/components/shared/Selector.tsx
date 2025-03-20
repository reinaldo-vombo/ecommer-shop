import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { TSelectProps } from "./type"
import { useEffect, useState } from "react";

const Selector = ({ options, placeholder, className, formField, multiple = false }: TSelectProps) => {
   const [selectedValues, setSelectedValues] = useState<string[]>(
      Array.isArray(formField.value) ? formField.value : []
   );
   useEffect(() => {
      // Sync local state with form value
      if (multiple && Array.isArray(formField.value)) {
         setSelectedValues(formField.value);
      }
   }, [multiple]);

   const onChange = (value: string) => {
      if (multiple) {
         const updatedValues = selectedValues.includes(value)
            ? selectedValues.filter((item) => item !== value) // Remove if already selected
            : [...selectedValues, value]; // Add if not already selected

         setSelectedValues(updatedValues);
         formField.onChange(updatedValues); // Update form field with the array
      } else {
         console.log('value', value);

         formField.onChange(value); // For single select
      }
   };

   return (
      <Select onValueChange={onChange} value={multiple ? undefined : formField.value}>
         <SelectTrigger ref={formField.ref} className={`${className ? className : 'w-[180px]'}`}>
            <SelectValue placeholder={placeholder} />
         </SelectTrigger>
         <SelectContent>
            {options.map((item,) => (
               <SelectItem className={multiple && selectedValues.includes(item.value) ? "font-bold" : ""} value={item.value} key={item.id}>{item.name}</SelectItem>
            ))}
         </SelectContent>
      </Select>

   )
}

export default Selector;