import { z } from 'zod';

export const paymentSchema = z.object({
  customerId: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  items: z.array(
    z.object({
      productId: z.string(), // Ensure color is a non-empty string
      quantity: z.number(),
      price: z.number(),
    })
  ),
  total: z.number(),
  couponId: z.number().optional(),
});
