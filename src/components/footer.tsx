import Link from "next/link";
import { Logo } from "./logo";
import { Collaboration } from "./subscription";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="mt-8">
      <footer className="pt-10 text-sm relative overflow-hidden">
        {/* Large faint logo in the background */}
        <div className="absolute -bottom-20 md:-bottom-32 left-0 right-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Logo className="w-[900px] shrink-0" />
        </div>

        <Collaboration />

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 relative z-10">
          {/* Logo / Brand */}
          <div className="flex items-start md:items-center">
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-foreground"
            >
              <Logo className="h-32 w-auto" />
            </Link>
          </div>

          {/* Useful links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium">Categories</h3>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li>
                <Link href="/news" className="hover:underline">
                  News
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:underline">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:underline">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/trading" className="hover:underline">
                  Trading
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium">Company</h3>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li>
                <Link href="/about-us" className="hover:underline">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="hover:underline">
                  Our team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:underline">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Articles */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium">Resources</h3>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li>
                <Link href="/resources/authors" className="hover:underline">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/resources/studio" className="hover:underline">
                  Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Articles */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium">Careers</h3>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li>
                <Link href="/careers/work-with-us" className="hover:underline">
                  Work with us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-muted-foreground border-t pt-4 mt-16 bg-background/70 pb-32">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="text-center md:text-left">
              Copyright © {year} THE20. All rights reserved.
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:underline">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
