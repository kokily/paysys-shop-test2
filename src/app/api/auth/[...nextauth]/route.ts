import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          type: 'text',
        },
        password: {
          type: 'password',
        },
      },
      async authorize(credentials, _) {
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          },
        );

        const data = await response.json();

        if (data.error) {
          return null;
        } else {
          return data;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
