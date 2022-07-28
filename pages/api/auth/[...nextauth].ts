import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY || "",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/login")) return baseUrl;
      return `${baseUrl}/login`;
    },
  },
});
