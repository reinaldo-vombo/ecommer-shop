import React from 'react'
import { Button } from '../ui/button'
import { SpinerIcon } from '@/assets/logos'
type TProps = {
   disabled: boolean
}

const SubmitButton = ({ disabled }: TProps) => {
   return (
      <Button
         type="submit"
         className="w-full"
         disabled={disabled}
      >
         {disabled ? (
            <SpinerIcon />
         ) : "Entrar"}
      </Button>
   )
}

export default SubmitButton;
