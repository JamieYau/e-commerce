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

export const { handlers, signIn, signOut, auth } = NextAuth({
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
  }),
  providers: [Google, Github],
});
