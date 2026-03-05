import type { NextAuthOptions } from "next-auth";
import PatreonProvider from "next-auth/providers/patreon";
import { checkIsVIP } from "@/lib/patreon";

export const authOptions: NextAuthOptions = {
  providers: [
    PatreonProvider({
      clientId: process.env.PATREON_CLIENT_ID!,
      clientSecret: process.env.PATREON_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identity identity.memberships",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.isVIP = await checkIsVIP(account.access_token);
      }
      return token;
    },

    async session({ session, token }) {
      session.isVIP = token.isVIP ?? false;
      session.accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};
