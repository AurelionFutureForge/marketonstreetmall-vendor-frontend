import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";

const authOptions: AuthOptions = {
  pages: {
    signIn: "/", 
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and Password are required.");
        }
        console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/vendor/auth/login`)
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/vendor/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          
          const result = await response.json();
          console.log(result.data)
          if (!response.ok || !result.success) {
            throw new Error(result.message || "Login failed.");
          }

          const { user, tokens } = result.data;

          return {
            ...user,
            accessToken: tokens.accessToken as string,
            refreshToken: tokens.refreshToken as string,
          };
        } catch (err: any) {
          throw new Error(err?.message || "Something went wrong during login.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // On initial sign in
      if (user) {
        // Add proper type assertion to handle extended user properties
        const authUser = user as any;
        token = {
          ...token,
          vendor_id: authUser.vendor_id,
          name: authUser.name || authUser.business_name,
          email: authUser.email,
          role: authUser.role,
          access_token: authUser.accessToken,
          refresh_token: authUser.refreshToken,
        };
      }

      // If session is being updated
      if (trigger === "update" && session?.tokenData) {
        token.tokenData = session.tokenData;
      }

      return token;
    },
    async session({ session, token }) {
      // Type assertion for the token to ensure TypeScript understands our custom properties
      const customToken = token as JWT & {
        vendor_id: string;
        role: string;
        access_token: string;
        refresh_token: string;
      };
      
      session.user = {
        vendor_id: customToken.vendor_id,
        name: customToken.name,
        email: customToken.email,
        role: customToken.role,
        access_token: customToken.access_token,
        refresh_token: customToken.refresh_token,
      };
      return session;
    },
  },
  events: {
    async signOut() {
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
