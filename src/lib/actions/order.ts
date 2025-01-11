'use server';

import { prisma } from '../db/client';

export async function createOrder(data: {
  customerId: string;
  items: { productId: string; quantity: number; price: number }[];
  total: number;
  couponId?: number;
}) {
  const { customerId, items, total, couponId } = data;

  try {
    // Validate input
    if (!customerId || !items || items.length === 0 || !total) {
      return {
        error: true,
        message: 'Invalid order data. Please check your inputs.',
      };
    }

    // Create order and associated items
    const newOrder = await prisma.orders.create({
      data: {
        customerId,
        total,
        status: 'Pending', // Default status
        couponId: couponId || null, // Optional coupon
        Items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        Items: true, // Include related order items in the response
      },
    });

    return {
      success: true,
      message: 'Order created successfully.',
      data: newOrder,
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      error: true,
      message: 'Failed to create order. Please try again.',
    };
  }
}
