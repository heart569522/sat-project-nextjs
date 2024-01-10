const million = require('million/compiler');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_HOST,
    APP_SCRIPT_SHEET: process.env.URL_SCRIPT_SHEET }
};

module.exports = million.next(nextConfig, { auto: { rsc: true } });
