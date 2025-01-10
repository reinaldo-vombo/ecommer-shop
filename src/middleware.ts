import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Handle `/uploads` for dynamic file serving
  if (url.pathname.startsWith('/uploads')) {
    return NextResponse.next(); // Allow `/uploads` to proceed
  }

  // Get the token for user authentication
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect to `/login` if no token is found
  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // const customerRoleId = 2;

  // // Redirect customers with specific role to the homepage
  // if (token.roleId === customerRoleId) {
  //   return NextResponse.redirect(new URL('/', req.url));
  // }
  const customerRoleId = 2; // Define customer role ID
  const adminRoleId = 1; // Define admin role ID (or other roles as needed)

  // Redirect customers to the homepage if they try to access `/cms`
  if (url.pathname.startsWith('/cms') && token.roleId === customerRoleId) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow admins to access `/cms`
  if (url.pathname.startsWith('/cms') && token.roleId === adminRoleId) {
    return NextResponse.next();
  }

  // Allow other requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/cms/:path*', '/uploads/:path*'],
};
