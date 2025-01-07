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
    if (!stars) {
      return {
        error: true,
        status: 404,
        message: 'Adicione uma percentagem',
      };
    }
    if (!customerId) {
      return {
        error: true,
        status: 404,
        message: 'Tem que estar logado para commentar',
      };
    }
    if (!productId) {
      return {
        error: true,
        status: 401,
        message: 'Esté product não exite',
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
