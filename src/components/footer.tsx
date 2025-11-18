import { baseOptions } from '@/app/layout.config';
import { MailIcon } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="mt-32">
      <footer className="pt-32 text-sm relative overflow-hidden">
        {/* Large faint logo in the background */}
        <div className="absolute -bottom-20 md:-bottom-32 left-0 right-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Logo className="w-[900px] shrink-0" />
        </div>

        {/* Collaboration CTA */}
        <div className="container mx-auto px-4 sm:px-6 relative mb-16 sm:mb-20 z-10">
          <div className="rounded-3xl border border-foreground/10 bg-gradient-to-br from-background-light/90 to-background-dark/30 px-5 py-8 sm:px-8 sm:py-12 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="text-center md:text-left flex-1">
              <p className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                Don’t be shy!
                <br /> Let’s collaborate
              </p>
              <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto md:mx-0">
                Share your email and we’ll reach out with partnership opportunities, product updates, and ways we can help grow your crypto community.
              </p>
            </div>
            <form className="w-full md:w-auto">
              <label htmlFor="footer-collab-email" className="sr-only">
                Enter your email
              </label>
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-1 min-w-[220px]">
                  <MailIcon className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    id="footer-collab-email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-2xl border border-foreground/10 bg-background-light/80 py-3 pl-11 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition"
                  />
                </div>
                <button
                  type="button"
                  className="rounded-2xl bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-85 transition w-full sm:w-auto"
                >
                  Let’s talk
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 relative z-10">
          {/* Logo / Brand */}
          <div className="flex items-start md:items-center">
            <Link href="/" className="flex items-center gap-2 font-medium text-foreground">
              <Logo className="h-32 w-auto" />
            </Link>
          </div>

          {/* Useful links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium">Categories</h3>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li>
                <Link href="/news" className="hover:underline">News</Link>
              </li>
              <li>
                <Link href="/learn" className="hover:underline">Learn</Link>
              </li>
              <li>
                <Link href="/insights" className="hover:underline">Insights</Link>
              </li>
              <li>
                <Link href="/trading" className="hover:underline">Trading</Link>
              </li>
            </ul>
          </div>

          {/* Useful links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium">Company</h3>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li>
                <Link href="/about-us" className="hover:underline">About us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">Contact</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
              </li>
              <li>
                <Link href="/trading" className="hover:underline">Trading</Link>
              </li>
            </ul>
          </div>

          {/* Articles */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium">Resources</h3>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li>
                <Link href="/resources/authors" className="hover:underline">Authors</Link>
              </li>
              <li>
                <Link href="/resources/studio" className="hover:underline">Studio</Link>
              </li>
            </ul>
          </div>

          {/* Articles */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium">Careers</h3>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li>
                <Link href="/careers/work-with-us" className="hover:underline">Work with us</Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="text-muted-foreground border-t pt-4 mt-16 bg-background/70 pb-32">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="text-center md:text-left">Copyright © {year} THE20. All rights reserved.</div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
              <Link href="/cookies" className="hover:underline">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
