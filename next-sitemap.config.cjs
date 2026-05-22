/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://moderncars.in',
  generateRobotsTxt: false, // We're using Next.js robots.ts
  exclude: ['/admin', '/api/*'],
};
