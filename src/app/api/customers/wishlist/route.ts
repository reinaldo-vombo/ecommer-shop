// app/api/customers/wishlist/route.ts
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
        wishlist: {
          push: productId,
        },
      },
    });

    return NextResponse.json({ success: true, updatedCustomer });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update wishlist' },
      { status: 500 }
    );
  }
}
// app/api/customers/wishlist/route.ts
export async function DELETE(req: Request) {
  try {
    const { customerId, productId } = await req.json();

    if (!customerId || !productId) {
      return NextResponse.json(
        { error: 'Customer ID and Product ID are required' },
        { status: 400 }
      );
    }

    const customer = await prisma.customers.findUnique({
      where: { id: customerId },
    });
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    const updatedWishlist = customer.wishlist.filter((id) => id !== productId);

    const updatedCustomer = await prisma.customers.update({
      where: { id: customerId },
      data: { wishlist: updatedWishlist },
    });

    return NextResponse.json({ success: true, updatedCustomer });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update wishlist' },
      { status: 500 }
    );
  }
}
