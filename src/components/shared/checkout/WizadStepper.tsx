"use client";

import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import InformationForm from "./InformationForm";
import DeliveryForm from "./DeliveryForm";
import ConfirmationForm from "./ConfirmationForm";

const steps = [
   { id: 1, name: 'Informação', content: <InformationForm /> },
   { id: 2, name: 'Entrega', content: <DeliveryForm /> },
   { id: 3, name: 'Pagamento', content: <ConfirmationForm /> },
];


const WizardStepper = () => {
   const [currentStep, setCurrentStep] = useState(0);

   const handleNext = () => {
      if (currentStep < steps.length - 1) {
         setCurrentStep((prev) => prev + 1);
      }
   };

   const handleBack = () => {
      if (currentStep > 0) {
         setCurrentStep((prev) => prev - 1);
      }
   };

   return (
      <div className="w-full p-4">
         <nav className="mb-8">
            <div className="flex items-center gap-3 text-sm">
               {steps.map((step, index) => (
                  <Fragment key={step.id}>
                     <span className={` ${index <= currentStep ? "text-blue-500" : "text-gray-300"
                        }`}>{step.name}</span>
                     <ChevronRight className="h-4 w-4 text-gray-500" />
                  </Fragment>
               ))}
            </div>
         </nav>

         <div className="relative h-[35rem] overflow-hidden">
            <AnimatePresence mode="wait">
               <motion.div
                  key={steps[currentStep].id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                  className="absolute w-full rounded-lg"
               >
                  {steps[currentStep].content}
               </motion.div>
            </AnimatePresence>
         </div>

         <div className="mt-6 flex justify-between">
            <button
               onClick={handleBack}
               disabled={currentStep === 0}
               className={`px-4 py-2 rounded-md ${currentStep === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
                  }`}
            >
               Retroceder
            </button>
            <button
               onClick={handleNext}
               disabled={currentStep === steps.length - 1}
               className={`px-4 py-2 rounded-md ${currentStep === steps.length - 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
                  }`}
            >
               Proximo
            </button>
         </div>
      </div>
   );
};

export default WizardStepper;
