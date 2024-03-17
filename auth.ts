import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { pool } from '@/app/lib/db';
import { z } from 'zod';
import { authConfig } from '@/auth.config';
// import { Session } from 'next-auth/types';

async function login(username: string) {
  try {
    const user = await pool.query(
      'SELECT * FROM users WHERE is_delete = false AND username = $1',
      [username],
    );
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;

          const user = await login(username);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user } : {token: any, user: any}) {
      if (!token.sub) return token;

      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.role = token.role
      };

      return session;
    },
  },
});
