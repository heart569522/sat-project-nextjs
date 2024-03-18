const million = require('million/compiler');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_HOST,
    APP_SCRIPT_ACTIVITY_SHEET: process.env.URL_SCRIPT_ACTIVITY_SHEET,
    APP_SCRIPT_STUDENT_SHEET: process.env.URL_SCRIPT_STUDENT_SHEET,
    APP_SCRIPT_INSERT_ATTENDANCE_SHEET:
      process.env.URL_SCRIPT_INSERT_ATTENDANCE,
  },
};

module.exports = million.next(nextConfig, { auto: { rsc: true } });
