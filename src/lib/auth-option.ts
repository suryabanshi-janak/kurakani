import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions, getServerSession } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';

import { db } from './db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        const matchPassword = await compare(
          credentials.password,
          user.password
        );

        if (!matchPassword) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (!user) {
        return token;
      }

      const name = `${(user as User).firstname} ${(user as User).lastname}`;
      return {
        ...token,
        id: user.id,
        picture: user.image,
        name,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
