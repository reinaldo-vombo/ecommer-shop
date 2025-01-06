'use server';

import { authOptions } from '../auth/config';
import { prisma } from '../db/client';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { feedbackSchema } from '../validation/feeback';

type Data = z.infer<typeof feedbackSchema>;

export async function postReview(
  prevState: unknown,
  data: Data,
  productId: string
) {
  const session = await getServerSession(authOptions);
  const customerId = session?.user.id;
  const { stars, message } = data;
  try {
    if (!productId || !customerId || !stars) {
      return {
        error: true,
        status: 404,
        message: 'Preencha todos os campos',
      };
    }

    if (stars < 1 || stars > 5) {
      return {
        error: true,
        status: 404,
        message: 'Strela tem está em 1 e 5',
      };
    }

    // Create a new review in the database
    await prisma.reviews.create({
      data: {
        productId,
        customerId,
        comment: message, // Optional field
        stars,
      },
    });

    return {
      success: true,
      status: 200,
      message: 'Avalição eviada',
    };
  } catch (error) {
    console.error('Error creating review:', error);
    return {
      error: true,
      status: 500,
      message: 'Ocorreu um erro ao enviar avalição',
    };
  }
}
