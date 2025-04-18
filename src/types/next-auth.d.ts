import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    vendor_id: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    business_name?: string;
  }

  interface Session extends DefaultSession {
    user: {
      vendor_id: string;
      name?: string | null;
      email?: string | null;
      role: string;
      access_token: string;
      refresh_token: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    vendor_id: string;
    role: string;
    access_token: string;
    refresh_token: string;
    tokenData?: any;
  }
}