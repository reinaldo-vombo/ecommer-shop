import React from 'react'
import { Button } from '../ui/button'
import { SpinerIcon } from '@/assets/logos'
type TProps = {
   disabled: boolean;
   title?: 'Entrar' | 'Enviar' | 'Atualizar' | 'Eliminar' | 'Postar' | 'Confirmar' | 'Cancelar'
}

const SubmitButton = ({ disabled, title = 'Postar' }: TProps) => {
   return (
      <Button
         type="submit"
         className="w-full"
         disabled={disabled}
      >
         {disabled ? (
            <SpinerIcon />
         ) : title}
      </Button>
   )
}

export default SubmitButton;
