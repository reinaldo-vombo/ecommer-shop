'use server';

import { authOptions } from '../auth/config';
import { prisma } from '../db/client';
import { getServerSession } from 'next-auth';

export async function postReview(prevState: unknown, data: FormData) {
  const session = await getServerSession(authOptions);
  try {
    // Extract fields from FormData
    const productId = data.get('productId')?.toString();
    const customerId = session?.user.id;
    const comment = data.get('comment')?.toString();
    const stars = parseInt(data.get('stars')?.toString() || '0', 10);

    // Validate the input
    if (!productId || !customerId || !stars) {
      throw new Error('Product ID, Customer ID, and Stars are required.');
    }

    if (stars < 1 || stars > 5) {
      throw new Error('Stars must be between 1 and 5.');
    }

    // Create a new review in the database
    await prisma.reviews.create({
      data: {
        productId,
        customerId,
        comment: comment || null, // Optional field
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
