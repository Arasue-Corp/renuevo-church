import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed' // Only adds /en prefix, keeps / for es
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|studio|.*\\..*).*)']
};
