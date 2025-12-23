import Link from "next/link";
import { Logo } from "./logo";
import { Collaboration } from "./subscription";
import LogoIcon from "@/assets/icons/logo-white.svg";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="mt-8 bg-primary text-white">
      <footer className="py-16 text-sm relative overflow-hidden">
        <div className="container">
          <div className="flex items-end justify-between mb-10 pb-6 border-b border-white">
            {/* Logo / Brand */}
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-foreground"
            >
              <Image
                src={LogoIcon}
                alt="Logo"
                className="w-40 h-auto"
                width={128}
                height={64}
              />
            </Link>
            <div className="text-center md:text-left">
              Copyright © {year} THE20. All rights reserved.
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="w-full md:w-1/3">
              <Collaboration />
            </div>
            <div className="flex justify-between flex-wrap gap-4 w-full md:w-1/2">
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
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link href="/about-us" className="hover:underline">
                      About us
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
                  <li>
                    <Link href="/privacy-policy" className="hover:underline">
                      Privacy Policy
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
                    <Link
                      href="/careers/work-with-us"
                      className="hover:underline"
                    >
                      Work with us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
