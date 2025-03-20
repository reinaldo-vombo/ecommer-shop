import { useState } from "react";
import { X } from "lucide-react";

interface Option {
   name: string;
   value: string;
}

interface MultiSelectProps {
   options: Option[];
   selected: string[];
   value: string[];
   onChange: (selected: string[]) => void;
}

export default function MultiSelect({ options, selected, value, onChange }: MultiSelectProps) {
   console.log("Selected Values:", selected);
   console.log("Value Prop:", value);

   const [isOpen, setIsOpen] = useState(false);

   const toggleOption = (option: string) => {
      console.log('option', option);

      if (value.includes(option)) {
         onChange(value.filter((item: string) => item !== option));
      } else {
         console.log('hello');

         onChange([...value, option]);
      }
   };

   return (
      <div className="relative w-full">
         <div
            className="flex flex-wrap gap-2 border p-2 rounded cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
         >
            {selected.length === 0 ? (
               <span className="text-gray-400">Select options...</span>
            ) : (
               selected.map((value) => {
                  const option = options.find((opt) => opt.value === value);
                  return (
                     <span
                        key={value}
                        className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                     >
                        {option?.name}
                        <X
                           size={14}
                           className="cursor-pointer"
                           onClick={(e) => {
                              e.stopPropagation();
                              toggleOption(value);
                           }}
                        />
                     </span>
                  );
               })
            )}
         </div>
         {isOpen && (
            <ul className="absolute w-full bg-white border rounded mt-1 shadow-md z-10">
               {options.map((option) => (
                  <li
                     key={option.value}
                     className={`p-2 cursor-pointer hover:bg-blue-100 ${selected.includes(option.value) ? "bg-blue-200" : ""
                        }`}
                     onClick={() => toggleOption(option.value)}
                  >
                     {option.name}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}