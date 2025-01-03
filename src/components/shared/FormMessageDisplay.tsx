
type FormMessageDisplayProps = {
   state: {
      error: boolean;
      status: number;
      message: string;
      issues: string[];
      success?: undefined;
   } | {
      success: boolean;
      status: number;
      message: string;
      error?: undefined;
      issues?: undefined;
   }
}
const FormMessageDisplay = ({ state }: FormMessageDisplayProps) => {
   return (
      <div>
         {state.message !== '' && !state.issues && (
            <div className="bg-green-100 p-4 mb-4 text-green-700">
               {state.message}
            </div>
         )}
         {state.issues && (
            <div className="text-red-600">
               <ul>
                  {state.issues.map((issue) => (
                     <li key={issue} className='flex gap-1'>{issue}</li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   )
}

export default FormMessageDisplay
