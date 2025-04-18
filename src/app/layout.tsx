import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import QueryProvider from "@/lib/QueryProvider";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "MarketOnStreetMall Vendor",
  description:
    "A powerful and intuitive admin panel for managing MarketOnStreetMall Vendor, built with Next.js, featuring a responsive and user-friendly interface.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "MarketOnStreetMall Vendor",
    description:
      "A powerful and intuitive admin panel for managing MarketOnStreetMall Vendor, built with Next.js, featuring a responsive and user-friendly interface.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "MarketOnStreetMall Vendor",
    description:
      "A powerful and intuitive admin panel for managing MarketOnStreetMall Vendor, built with Next.js, featuring a responsive and user-friendly interface."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <AuthProvider>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
