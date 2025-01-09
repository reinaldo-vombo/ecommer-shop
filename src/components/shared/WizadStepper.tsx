"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
   { id: 1, content: "Step 1: Personal Information" },
   { id: 2, content: "Step 2: Address Details" },
   { id: 3, content: "Step 3: Review & Submit" },
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
         <div className="mb-6">
            <div className="flex justify-between">
               {steps.map((step, index) => (
                  <div
                     key={step.id}
                     className={`w-full h-2 ${index <= currentStep ? "bg-blue-500" : "bg-gray-300"
                        }`}
                  ></div>
               ))}
            </div>
            <p className="text-center mt-2">
               Step {currentStep + 1} of {steps.length}
            </p>
         </div>

         <div className="relative h-40 overflow-hidden">
            <AnimatePresence mode="wait">
               <motion.div
                  key={steps[currentStep].id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                  className="absolute w-full text-center p-4 bg-white rounded-lg shadow-md"
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
               Back
            </button>
            <button
               onClick={handleNext}
               disabled={currentStep === steps.length - 1}
               className={`px-4 py-2 rounded-md ${currentStep === steps.length - 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
                  }`}
            >
               Next
            </button>
         </div>
      </div>
   );
};

export default WizardStepper;
