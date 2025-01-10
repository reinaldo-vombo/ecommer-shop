import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1, {
    message: 'Preencha com seu nome',
  }),
  email: z.string().email({
    message: 'preencha com email valido',
  }),
  location: z.string().optional(),
  avatar: z.array(z.instanceof(File)).optional(),
});

export const customerPasswordSchema = z.object({
  old_password: z.string().min(5, {
    message: 'Palavra-passe deve conter no minimo 5 cararteres',
  }),
  new_password: z.string().min(5, {
    message: 'Palavra-passe deve conter no minimo 5 cararteres',
  }),
});
