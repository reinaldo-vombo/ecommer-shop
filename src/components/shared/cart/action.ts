'use server';
import { CartItem } from '@/lib/store/type';
import { cookies } from 'next/headers';

export async function updateCart(cart: CartItem[]) {
  const cartString = JSON.stringify(cart);
  const cookieSession = await cookies();

  // Set the cookie
  cookieSession.set('cart', cartString, {
    httpOnly: false, // Accessible via JavaScript
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 1 week
  });
}
export async function getCartFromCookies() {
  const cookieSession = await cookies();
  const cartCookie = cookieSession.get('cart')?.value;
  return cartCookie ? JSON.parse(cartCookie) : [];
}
