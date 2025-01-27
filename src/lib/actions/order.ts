'use server';

import { z } from 'zod';
import { prisma } from '../db/client';
import { TState } from '../types';
import { paymentSchema } from '../validation/payment';
type Data = z.infer<typeof paymentSchema>;

export async function createOrder(prevState: TState, data: Data) {
  const { customerId, items, total, couponId } = data;

  try {
    // Validate input
    if (!customerId || !items || items.length === 0 || !total) {
      return {
        error: true,
        message: 'Invalid order data. Please check your inputs.',
      };
    }
    for (const item of items) {
      const product = await prisma.products.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return {
          error: true,
          message: `Product with ID ${item.productId} not found.`,
        };
      }

      if (product.stock === null || product.stock < item.quantity) {
        return {
          error: true,
          message: `Insufficient stock for product ${item.productId}.`,
        };
      }
    }

    await prisma.$transaction(async (tx) => {
      // 1. Create the order
      const newOrder = await tx.orders.create({
        data: {
          customerId,
          total,
          status: 'Pending', // Default status
          couponId: couponId || null,
        },
      });

      // 2. Create the order items
      const orderItemsData = items.map((item) => ({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));

      await tx.orderItems.createMany({
        data: orderItemsData,
      });

      // 3. Update product stock and purchases
      for (const item of items) {
        const product = await tx.products.findUnique({
          where: { id: item.productId },
        });

        if (
          !product ||
          (product.stock !== null && product.stock < item.quantity)
        ) {
          throw new Error(`Insufficient stock for product ${item.productId}`);
        }

        await tx.products.update({
          where: { id: item.productId },
          data: {
            stock:
              product.stock !== null ? product.stock - item.quantity : null,
            purchases: (product.purchases || 0) + item.quantity,
          },
        });
      }

      return newOrder; // Return the created order
    });

    // Create order and associated items

    return {
      success: true,
      message: 'Pagamento confirmado',
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      error: true,
      message: 'Failed to create order. Please try again.',
    };
  }
}
