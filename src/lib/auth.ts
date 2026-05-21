import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as AdminPlugin } from "better-auth/plugins/admin";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db-config"; // your drizzle instance
import * as schema from "./schema/auth-schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    emailAndPassword: {
        enabled: true,
        requireEmailVerification:false,
    },
    
    plugins:[AdminPlugin({
        defaultRole:"user",
    }),nextCookies()]
});