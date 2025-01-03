import { useState } from "react";
import { HexColorPicker } from "react-colorful";

type TColorPickerProps = {
   formField: any; // Field provided by `react-hook-form`
}

const ColorPiker = ({ formField }: TColorPickerProps) => {
   const [color, setColor] = useState(formField.value || "#aabbcc");
   const handleChange = (newColor: string) => {
      setColor(newColor);
      formField.onChange(newColor); // Update the form state
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputColor = event.target.value;
      setColor(inputColor);
      formField.onChange(inputColor); // Update the form state
   };
   return (
      <div className="flex flex-col gap-2">
         <HexColorPicker color={color} onChange={handleChange} />
         <input
            type="text"
            value={color}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2"
            placeholder="#aabbcc"
         />
      </div>
   )
};

export default ColorPiker;