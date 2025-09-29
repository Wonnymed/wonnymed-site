/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL ?? 'https://wonnymed.com';

const EXCLUDED_ROUTES = ['/portal', '/portal/*', '/portal/**'];

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: EXCLUDED_ROUTES,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
