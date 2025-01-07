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
