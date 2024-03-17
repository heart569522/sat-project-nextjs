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
        '/welcome',
        '/project-proposal',
        '/activity-record',
        '/management',
        '/dashboard',
        '/profile',
        '/setting'
      ].some((path) => nextUrl.pathname.startsWith(path));

      if (
        nextUrl.pathname.startsWith('/activity-history') ||
        nextUrl.pathname.startsWith('/verify')
      ) {
        return true;
      }

      if (isOnProtectedPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/welcome', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
