import { z } from 'zod';

export const logninSchema = z.object({
  email: z.string().email({ message: 'Email invalido' }).min(1, {
    message: 'Email é obrigatório',
  }),
  password: z.string().min(5, {
    message: 'Palavra-passe tem que conter no minimo 5 cararteres',
  }),
});

export const registerSchema = z.object({
  name: z.string().min(4, {
    message: 'nome deve conter no minimo 5 cararteres',
  }),
  email: z.string().email({ message: 'Email invalido' }).min(1, {
    message: 'Email é obrigatório',
  }),
  roleId: z.number().min(1).max(4).optional(),
  password: z.string().min(5, {
    message: 'Palavra-passe deve conter no minimo 5 cararteres',
  }),
  confirmPassword: z.string().min(5, {
    message: 'Palavra-passe deve conter no minimo 5 cararteres',
  }),
});
export const forgotenPasswordSchema = z.object({
  email: z.string().email({ message: 'Email invalido' }).min(1, {
    message: 'Email é obrigatório',
  }),
});
export const resetPasswordSchema = z.object({
  code: z.string().min(5, {
    message: 'Your one-time password must be 5 characters.',
  }),
  newPassword: z.string().min(6, {
    message: 'Palavra-passe deve conter no minimo 5 cararteres.',
  }),
  confirmPassword: z.string().min(6, {
    message: 'Palavra-passe deve conter no minimo 5 cararteres.',
  }),
});
