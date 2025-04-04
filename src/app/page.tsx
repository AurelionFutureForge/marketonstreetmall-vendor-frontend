import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
        <div className="container h-14 flex items-center">
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
          >
            <PanelsTopLeft className="w-6 h-6 mr-3" />
            <span className="font-bold">MarketOnStreetMall Vendor</span>
            <span className="sr-only">MarketOnStreetMall Vendor</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <ModeToggle />
          </nav>
        </div>
      </header>

      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="container relative pb-10">
          <section className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              Empowering Vendors to Sell Smarter & Faster
            </h1>
            <span className="max-w-[750px] text-center text-lg font-light text-foreground">
              Welcome to the official <strong>MarketOnStreetMall Vendor Dashboard</strong> — a modern platform built to streamline your product uploads, order tracking, and business performance insights. Simplify your workflow, collaborate with your team, and manage everything in one place.
            </span>
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
              <Button variant="default" asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRightIcon className="ml-2" />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <span className="text-sm text-foreground">
            © {new Date().getFullYear()} MarketOnStreetMall Vendor. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
