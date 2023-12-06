export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/soldier',
    '/reserve',
    '/general',
    '/cart',
    '/fronts',
    '/fronts/:path*',
    '/fronts/update/:path*',
    '/password',
    '/items',
    '/items/:path*',
    '/items/add',
    '/items/update/:path*',
    '/users',
    '/users/:path*',
  ],
};
