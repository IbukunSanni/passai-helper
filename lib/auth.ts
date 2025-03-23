// auth.ts
// This is the authentication configuration file that sets up the better-auth library
// We use the Prisma database adapter and plugins such as the Next.js cookies plugin.
// The cookies work for server actions
// We currently have email and password authentication enabled with Google OAuth.
// The email verification is disabled for now.
// The auth object is exported to be used in the API routes.

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, oAuthProxy, openAPI } from "better-auth/plugins";

import prisma from "@/db";

export const auth = betterAuth({
  appName: "passai-parent-helper",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  account: {
    accountLinking: {
      trustedProviders: ["google"],
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || ("" as string),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ("" as string),
    },
  },
  plugins: [
    admin({
      adminUserIds: ["BNrwpk5g53yma8A0KPOvJmfImOU46i15"],
    }),
    oAuthProxy(),
    openAPI(),
    nextCookies(),
  ],
});
