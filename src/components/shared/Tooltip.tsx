import {
   Tooltip as TooltipBody,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"
import { TTooltip } from "./type"

const Tooltip = ({ chlidren, trigger = 'hove me' }: TTooltip) => {
   return (
      <TooltipProvider>
         <TooltipBody>
            <TooltipTrigger>{trigger}</TooltipTrigger>
            <TooltipContent>
               {chlidren}
            </TooltipContent>
         </TooltipBody>
      </TooltipProvider>
   )
}

export default Tooltip
