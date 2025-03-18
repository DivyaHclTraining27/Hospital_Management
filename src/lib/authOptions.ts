import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDB } from "./mongodb";
import User from "@/models/user";
import logger from "@/logger/winston.logger";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          logger.info(`Error caught - No user Found}`);
          throw new Error("User not found");
        }
        const isMatch = await user.matchPassword(credentials?.password);
        if (!isMatch) throw new Error("Invalid credentials");
        return {
          id: user?._id,
          name: user?.name,
          email: user?.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
        token.role = (user as unknown as { role: string })?.role;
        token.email = user?.email;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as { id: string }).id = token.id as string;
      (session.user as { role: string }).role = token.role as string;
      (session.user as { email: string }).email = token.email as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
