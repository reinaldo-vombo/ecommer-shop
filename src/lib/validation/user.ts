import { z } from 'zod';

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, {
    message: 'Palavra-passe deve conter no minimo 5 cararteres',
  }),
  newPassword: z.string().min(5, {
    message: 'Palavra-passe deve conter no minimo 5 cararteres',
  }),
  confirmPassword: z.string().min(1, {
    message: 'Palavra-passe deve conter no minimo 5 cararteres',
  }),
});
