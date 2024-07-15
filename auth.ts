import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import db from "./db/db";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from "./db/schema";
import { Adapter } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  // add logo for sign in
  // theme: {
  //     logo:""
  // },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }) as Adapter,
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
  providers: [Google, Github],
});
