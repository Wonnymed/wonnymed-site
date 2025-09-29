import createMiddleware from 'next-intl/middleware';

const locales = ['pt', 'en', 'es', 'ko', 'zh-hans', 'zh-hant', 'ar'];

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/', `/(${locales.join('|')})/:path*`]
};
