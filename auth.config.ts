import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedPage = [
        '/project-proposal',
        '/activity-record',
        '/management',
        '/dashboard',
        '/profile',
      ].some((path) => nextUrl.pathname.startsWith(path));

      if (
        nextUrl.pathname.startsWith('/activity-history') ||
        nextUrl.pathname.startsWith('/verify') ||
        nextUrl.pathname === '/test'
      ) {
        return true;
      }

      if (isOnProtectedPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/project-proposal', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
