// app/api/customers/cart/route.ts
import { prisma } from '@/lib/db/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { customerId, productId } = await req.json();

    if (!customerId || !productId) {
      return NextResponse.json(
        { error: 'Customer ID and Product ID are required' },
        { status: 400 }
      );
    }

    const updatedCustomer = await prisma.customers.update({
      where: { id: customerId },
      data: {
        cart: {
          push: productId,
        },
      },
    });

    return NextResponse.json({ success: true, updatedCustomer });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}
