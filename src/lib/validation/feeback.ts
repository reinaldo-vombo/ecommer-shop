import { z } from 'zod';

export const feedbackSchema = z.object({
  message: z.string().min(1, {
    message: 'Por-favor escreva sua messagem',
  }),
  stars: z.number().min(1).max(5).nullish(),
});
