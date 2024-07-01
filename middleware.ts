import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtected = createRouteMatcher([
  '/explore(.*)',
  '/inbox(.*)',
  '/rented(.*)',
  '/user(.*)',
  '/wishlist(.*)',
  '/chat(.*)',
  '/form(.*)',
  '/tools(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtected(req)) auth().protect();
});

export const config = {
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};