import { DiscountType } from '@prisma/client';
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  description: z.string().optional(),
  details: z.string().optional(), // Make optional if not required
  price: z.string().min(0, {
    message: 'Price must be a positive number.',
  }),
  brand: z.string().min(1, {
    message: 'Selecione uma marca',
  }),
  category: z
    .array(z.string().min(1, { message: 'Categoria não pode estar vazia' }))
    .min(1, { message: 'Selecione pelo menos uma categoria' }),
  gender: z.string().min(1, {
    message: 'Selecione uma género',
  }),
  // status: z.string().optional(),
  image: z.array(z.instanceof(File)).nonempty({
    message: 'Deve carregar uma imagem',
  }),
  colors: z.array(
    z.object({
      color: z.string().min(1, { message: 'Cor é obrigatória' }), // Ensure color is a non-empty string
      images: z.array(z.instanceof(File)).optional(),
    })
  ),
  type: z.string().min(1, { message: 'Tipo é obrigatório' }),
  sizes: z.any(),
  stock: z.string().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  description: z.string().optional(),
  details: z.string().optional(), // Make optional if not required
  price: z.string().min(0, {
    message: 'Price must be a positive number.',
  }),
  brand: z.string().min(1, {
    message: 'Selecione uma marca',
  }),
  category: z
    .array(z.string().min(1, { message: 'Categoria não pode estar vazia' }))
    .min(1, { message: 'Selecione pelo menos uma categoria' }),
  gender: z.string().min(1, {
    message: 'Selecione uma género',
  }),
  // status: z.string().optional(),
  image: z.string().nonempty({
    message: 'Deve carregar uma imagem',
  }),
  colors: z.array(
    z.object({
      color: z.string().min(1, { message: 'Color is required' }),
      images: z.array(z.union([z.string(), z.instanceof(File)])).optional(),
    })
  ),
  type: z.string().min(1, { message: 'Tipo é obrigatório' }), // Type (e.g., shoe or clothing)
  sizes: z.array(z.union([z.string(), z.number()])),
  stock: z.string().optional(),
});
export const logninSchema = z.object({
  email: z.string().email({ message: 'Email invalido' }).min(1, {
    message: 'Email é obrigatório',
  }),
  password: z.string().min(5, {
    message: 'Palavra-passe tem que conter no minimo 5 cararteres',
  }),
});

export const signinSchema = z.object({
  name: z.string().min(4, {
    message: 'nome deve conter no minimo 5 cararteres',
  }),
  email: z.string().email({ message: 'Email invalido' }).min(1, {
    message: 'Email é obrigatório',
  }),
  password: z.string().min(5, {
    message: 'Palavra-passe deve conter no minimo 5 cararteres',
  }),
  confirmPassword: z.string().min(5, {
    message: 'Palavra-passe deve conter no minimo 5 cararteres',
  }),
});
export const recoverPasswordSchema = z.object({
  email: z.string().email({ message: 'Email invalido' }).min(1, {
    message: 'Email é obrigatório',
  }),
});

export const personalInfoSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().min(5, {
    message: 'Nome deve conter no minimo 5 cararteres',
  }),
  email: z.string().email({ message: 'Email invalido' }).min(1, {
    message: 'Email é obrigatório',
  }),
  phone: z.number().optional(),
  address: z.string().min(1, {
    message: 'Endereço é obrigatório',
  }),
});
export const securityInfoSchema = z.object({
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
export const blogSchema = z.object({
  thumbNail: z.array(z.instanceof(File)).nonempty({
    message: 'Deve carregar uma imagem',
  }),
  title: z.string().min(1, {
    message: 'Blog deve conter titulo',
  }),
  description: z.string().min(40, {
    message: 'Descrição deve conter no minino 40 caractres',
  }),
  userId: z.string().min(1, {
    message: 'E necessario o id do utilizador',
  }),
  status: z.string().optional(),
});
export const userSchema = z.object({
  photo: z.array(z.instanceof(File)).nonempty({
    message: 'Deve carregar uma imagem',
  }),
  name: z.string().min(1, {
    message: 'Blog deve conter titulo',
  }),
  email: z.string().email(),
});
export const couponSchema = z.object({
  code: z
    .string()
    .min(1, 'Coupon code is required')
    .max(50, 'Maximum 50 characters'),
  discountType: z.nativeEnum(DiscountType, {
    errorMap: () => ({ message: 'Select a discount type' }),
  }),
  discountValue: z.number().min(0, 'Value must be greater than 0'),
  minimumOrderValue: z.number().optional(),
  maxUses: z.number().default(1),
  maxUsesPerCustomer: z.number().default(1),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid start date',
  }),
  expiryDate: z
    .string()
    .optional()
    .refine((val) => val === '' || !isNaN(Date.parse(val ? val : '')), {
      message: 'Invalid expiry date',
    }),
  isActive: z.boolean(),
});
export const resetPasswordSchema = z.object({
  code: z.string().min(5, {
    message: 'Your one-time password must be 5 characters.',
  }),
  newPassword: z.string().min(6, {
    message: 'Your password must be at least 6 characters.',
  }),
  confirmPassword: z.string().min(6, {
    message: 'Your password must be at least 6 characters.',
  }),
});
