import Link from "next/link";
import { Collaboration } from "./subscription";
import LogoIcon from "@/assets/icons/logo-white.svg";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();
  const categories = [
    {
      name: "News",
      href: "/news",
    },
    {
      name: "Learn",
      href: "/learn",
    },
    {
      name: "Insights",
      href: "/insights",
    },
    {
      name: "Trading",
      href: "/trading",
    },
  ];
  const company = [
    {
      name: "About us",
      href: "/about-us",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Disclaimer",
      href: "/disclaimer",
    },
    {
      name: "Privacy Policy",
      href: "/privacy-policy",
    },
  ];
  const resources = [
    {
      name: "Authors",
      href: "/our-team",
    },
    {
      name: "Studio",
      href: "/resources/studio",
    },
  ];
  const careers = [
    {
      name: "Work with us",
      href: "/careers/work-with-us",
    },
  ];

  return (
    <div className="mt-8 bg-primary text-white">
      <footer className="py-12 md:py-16 relative overflow-hidden px-2 md:px-0">
        <div className="container">
          <div className="flex items-end justify-between mb-6 md:mb-10 md:pb-6 md:border-b border-white">
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
            <div className="hidden md:block text-sm font-medium">
              © {year} by Crypto Threads.
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="w-full md:w-1/3 order-2 md:order-1 py-6 md:py-0">
              <Collaboration />
            </div>
            <div className="order-1 text-base md:text-sm md:order-2 flex flex-col md:flex-row justify-between flex-wrap gap-4 w-full md:w-1/2">
              {/* Useful links */}
              <div className="flex flex-col gap-2 md:gap-3">
                <h3 className="font-semibold text-lg md:text-base border-b-[0.5px] border-white pb-2 md:border-b-0">
                  Categories
                </h3>
                <ul className="flex flex-col gap-2 text-muted-foreground">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={category.href}
                        className="hover:underline block border-b-[0.5px] border-white pb-2 md:border-b-0"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Useful links */}
              <div className="flex flex-col gap-2 md:gap-3">
                <h3 className="font-semibold text-lg md:text-base border-b-[0.5px] border-white pb-2 md:border-b-0">
                  Company
                </h3>
                <ul className="flex flex-col gap-2">
                  {company.map((company) => (
                    <li key={company.name}>
                      <Link
                        href={company.href}
                        className="hover:underline block border-b-[0.5px] border-white pb-2 md:border-b-0"
                      >
                        {company.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Articles */}
              <div className="flex flex-col gap-2 md:gap-3">
                <h3 className="font-semibold text-lg md:text-base border-b-[0.5px] border-white pb-2 md:border-b-0">
                  Resources
                </h3>
                <ul className="flex flex-col gap-2 text-muted-foreground">
                  {resources.map((resource) => (
                    <li key={resource.name}>
                      <Link
                        href={resource.href}
                        className="hover:underline block border-b-[0.5px] border-white pb-2 md:border-b-0"
                      >
                        {resource.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Articles */}
              <div className="flex flex-col gap-2 md:gap-3">
                <h3 className="font-semibold text-lg md:text-base border-b-[0.5px] border-white pb-2 md:border-b-0">
                  Careers
                </h3>
                <ul className="flex flex-col gap-2 text-muted-foreground">
                  {careers.map((career) => (
                    <li key={career.name}>
                      <Link
                        href={career.href}
                        className="hover:underline block border-b-[0.5px] border-white pb-2 md:border-b-0"
                      >
                        {career.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center md:text-left block md:hidden text-sm md:text-base">
            © {year} by Crypto Threads.
          </div>
        </div>
      </footer>
    </div>
  );
}
