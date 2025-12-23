"use client";
import { baseOptions, type NavLinkWithDropdown } from "@/app/layout.config";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  TextAlignJustify as MenuIcon,
  Sun,
  Moon,
  ChevronDown,
  Globe,
  Settings,
  Play,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import LogoWhite from "@/assets/icons/logo-white.svg";
import LogoOg from "@/assets/icons/logo-og-white.svg";
import Image from "next/image";
import { Search } from "./search";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const closeDropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const navbarRef = useRef<HTMLDivElement>(null);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const loginDropdownRef = useRef<HTMLDivElement>(null);
  // Refs for dropdown buttons and panels (robust outside-click detection)
  const dropdownButtonRefs = useRef<Record<string, HTMLButtonElement | null>>(
    {}
  );
  const dropdownPanelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const pathname = usePathname();

  // Outside click / mousedown handler (uses specific refs)
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      // Close mobile menu if clicking outside navbar
      if (
        isMobileMenuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }

      // If a dropdown is open (mobile), only keep it open when click is inside its button or panel
      if (openDropdown) {
        const btn = dropdownButtonRefs.current[openDropdown];
        const panel = dropdownPanelRefs.current[openDropdown];

        const clickedInsideButton = !!btn && btn.contains(target);
        const clickedInsidePanel = !!panel && panel.contains(target);

        if (!clickedInsideButton && !clickedInsidePanel) {
          setOpenDropdown(null);
        }
      }

      // Close login dropdown if clicking outside
      if (
        isLoginDropdownOpen &&
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(target)
      ) {
        setIsLoginDropdownOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutside);
    return () => window.removeEventListener("mousedown", handleOutside);
  }, [isMobileMenuOpen, openDropdown, isLoginDropdownOpen]);

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (
      stored === "dark" ||
      (!stored &&
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (next === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    return () => {
      if (closeDropdownTimeout.current) {
        clearTimeout(closeDropdownTimeout.current);
      }
    };
  }, []);

  const mainLinks = (baseOptions.links ?? []).filter(
    (l) => l.type === "main"
  ) as NavLinkWithDropdown[];

  const handleDropdownEnter = (linkText: string) => {
    if (closeDropdownTimeout.current) {
      clearTimeout(closeDropdownTimeout.current);
      closeDropdownTimeout.current = null;
    }
    setHoveredDropdown(linkText);
  };

  const handleDropdownLeave = () => {
    if (closeDropdownTimeout.current)
      clearTimeout(closeDropdownTimeout.current);
    closeDropdownTimeout.current = setTimeout(
      () => setHoveredDropdown(null),
      120
    );
  };

  const toggleDropdown = (linkText: string) => {
    setOpenDropdown((prev) => (prev === linkText ? null : linkText));
  };

  const toggleLoginDropdown = () => {
    setIsLoginDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="container mt-4" ref={navbarRef}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4 justify-between items-center bg-primary py-3 px-4 md:px-6 rounded-full flex-1">
          {/* Mobile menu button */}
          <button
            className="md:hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => {
              setIsMobileMenuOpen((p) => !p);
            }}
          >
            <MenuIcon className="w-7 h-7 text-white" />
          </button>
          {/* LEFT: Logo */}
          <Link href="/" className="hidden md:block">
            <Image
              src={LogoWhite}
              alt="Logo"
              className="w-28 md:w-32 h-auto"
              width={128}
              height={64}
            />
          </Link>
          <Link href="/" className="block md:hidden">
            <Image
              src={LogoOg}
              alt="Logo"
              className="w-10 h-10"
              width={40}
              height={40}
            />
          </Link>
          <div className="flex items-center gap-2 md:hidden">
            <Search
              onSearch={() => setIsMobileMenuOpen(false)}
              variant="mobile"
            />
            {/* Theme Toggle */}
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className={cn(
                "block md:hidden relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer",
                theme === "light" ? "bg-white text-primary " : "bg-gray-600"
              )}
            >
              {/* Moon icon on the left */}
              <Moon
                className={cn(
                  "absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 text-primary transition-opacity duration-300",
                  theme === "light" ? "opacity-100" : "opacity-0"
                )}
              />
              {/* Toggle thumb */}
              <div
                className={cn(
                  "absolute top-1.5 bottom-1 w-5 h-5 bg-primary rounded-full shadow-md transition-transform duration-300 ease-in-out",
                  theme === "light"
                    ? "translate-x-[calc(100%+1rem)]"
                    : "translate-x-1"
                )}
              />
            </button>
          </div>

          {/* CENTER: Search + Navigation + Theme */}
          <div className="hidden md:flex flex-1 flex-col gap-2">
            {/* Search */}
            <Search
              onSearch={() => setIsMobileMenuOpen(false)}
              className="w-full"
            />

            {/* Navigation links (left) */}
            <div className="flex items-center justify-between">
              {mainLinks.length > 0 ? (
                <>
                  {mainLinks.map((link, idx) => {
                    const hasDropdown = !!(
                      link.dropdown && link.dropdown.length > 0
                    );
                    const isLinkActive =
                      !hasDropdown && link.url
                        ? pathname === link.url ||
                          pathname?.startsWith(`${link.url}/`)
                        : false;
                    const isMainNavActive =
                      hasDropdown && link.url
                        ? pathname === link.url ||
                          pathname?.startsWith(`${link.url}/`)
                        : false;
                    const isDropdownActive =
                      hasDropdown &&
                      link.dropdown?.some(
                        (item) =>
                          pathname === item.url ||
                          pathname?.startsWith(`${item.url}/`)
                      );
                    const isNavHighlighted = hasDropdown
                      ? isMainNavActive ||
                        isDropdownActive ||
                        hoveredDropdown === link.text
                      : isLinkActive || hoveredDropdown === link.text;
                    return (
                      <div
                        key={link.url ?? idx}
                        className="relative"
                        onMouseEnter={() =>
                          hasDropdown && handleDropdownEnter(link.text)
                        }
                        onMouseLeave={() =>
                          hasDropdown && handleDropdownLeave()
                        }
                      >
                        {hasDropdown ? (
                          <Link
                            href={link.url ?? "/"}
                            className={cn(
                              "flex items-center gap-1 px-3 py-1 text-sm font-medium transition-colors text-white hover:text-black",
                              isNavHighlighted ? " font-semibold" : ""
                            )}
                            aria-expanded={hoveredDropdown === link.text}
                            aria-controls={`dropdown-${link.text}`}
                          >
                            <div className="w-3 h-3">
                              <Play
                                className={cn(
                                  "w-full h-full transition-transform duration-300",
                                  hoveredDropdown === link.text && "rotate-90"
                                )}
                              />
                            </div>
                            <span>{link.text}</span>
                          </Link>
                        ) : (
                          <Link
                            href={link.url ?? "/"}
                            className={cn(
                              "block px-3 py-1 text-sm font-medium transition-colors text-white hover:text-black",
                              isLinkActive ? "font-semibold" : ""
                            )}
                          >
                            {link.text}
                          </Link>
                        )}

                        {/* Dropdown Menu - Show on hover */}
                        {hasDropdown &&
                          hoveredDropdown === link.text &&
                          link.dropdown && (
                            <div
                              id={`dropdown-${link.text}`}
                              ref={(el) => {
                                dropdownPanelRefs.current[link.text] = el;
                              }}
                              className="absolute top-full left-0 mt-1 w-48 bg-background rounded-lg shadow-lg border border-foreground/10 py-2 z-50"
                              onMouseEnter={() =>
                                handleDropdownEnter(link.text)
                              }
                              onMouseLeave={handleDropdownLeave}
                            >
                              {link.dropdown.map((item, itemIdx) => (
                                <Link
                                  key={itemIdx}
                                  href={item.url}
                                  className={cn(
                                    "block px-4 py-2 text-sm transition-colors rounded-md",
                                    pathname?.startsWith(item.url)
                                      ? "text-foreground font-medium bg-background-dark/50"
                                      : "text-foreground/80 hover:text-foreground hover:bg-background-dark"
                                  )}
                                >
                                  {item.text}
                                </Link>
                              ))}
                            </div>
                          )}
                      </div>
                    );
                  })}
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex-col gap-2 hidden md:flex">
          {/* Theme Toggle */}
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className={cn(
              "relative w-18 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer hover:bg-primary/90",
              theme === "light" ? "bg-primary" : "bg-gray-600"
            )}
          >
            {/* Moon icon on the left */}
            <Moon
              className={cn(
                "absolute left-1.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white transition-opacity duration-300",
                theme === "light" ? "opacity-100" : "opacity-0"
              )}
            />
            {/* Toggle thumb */}
            <div
              className={cn(
                "absolute top-1 bottom-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out",
                theme === "light"
                  ? "translate-x-[calc(100%+1rem)]"
                  : "translate-x-1"
              )}
            />
          </button>
          {/* Language Toggle English - vietnamese */}

          <button
            aria-label="Toggle language"
            onClick={() => {}}
            className="flex items-center justify-between bg-primary rounded-full px-2 py-1.5 hover:bg-background-dark transition-colors"
          >
            <Globe className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">EN</span>
          </button>
        </div>
        {/* Settings button */}
        <div className="hidden md:flex relative" ref={loginDropdownRef}>
          <button
            onClick={toggleLoginDropdown}
            className="flex items-center justify-center rounded-full p-2 bg-primary transition-transform duration-300 cursor-pointer hover:scale-105"
            aria-label="Settings"
            aria-expanded={isLoginDropdownOpen}
          >
            <Settings className="w-8 h-8 text-white transition-transform duration-300" />
          </button>

          {/* login/register dropdown */}
          {isLoginDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 z-50 w-[200px] bg-background border border-foreground/10 rounded-lg shadow-lg py-2">
              <Link
                href="/auth"
                className="block px-4 py-2 text-sm text-foreground hover:underline transition-colors"
                onClick={() => setIsLoginDropdownOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/auth?type=register"
                className="block px-4 py-2 text-sm text-foreground hover:underline transition-colors"
                onClick={() => setIsLoginDropdownOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu (includes search + links + theme) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden md:hidden"
          >
            <div className="bg-background">
              <div className="p-4 space-y-4">
                {/* Links list with dropdowns */}
                <div className="space-y-1">
                  {mainLinks.map((link) => {
                    const hasDropdown = !!(
                      link.dropdown && link.dropdown.length > 0
                    );
                    const isDropdownOpen = openDropdown === link.text;
                    const isMainNavActive =
                      hasDropdown && link.url
                        ? pathname === link.url ||
                          pathname?.startsWith(`${link.url}/`)
                        : false;
                    const isDropdownActive =
                      hasDropdown &&
                      link.dropdown?.some(
                        (item) =>
                          pathname === item.url ||
                          pathname?.startsWith(`${item.url}/`)
                      );
                    const isLinkActive =
                      !hasDropdown && link.url
                        ? pathname === link.url ||
                          pathname?.startsWith(`${link.url}/`)
                        : false;
                    const isNavHighlighted = hasDropdown
                      ? isMainNavActive || isDropdownActive
                      : isLinkActive;
                    return (
                      <div key={link.url}>
                        {hasDropdown ? (
                          <>
                            <div className="w-full flex items-center justify-between">
                              <Link
                                href={link.url ?? "/"}
                                className={cn(
                                  "flex-1 text-base font-medium p-3 rounded-lg transition-colors",
                                  isNavHighlighted
                                    ? "text-foreground font-semibold bg-background-dark/40"
                                    : "text-foreground/80 hover:text-foreground hover:bg-background-dark"
                                )}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setOpenDropdown(null);
                                }}
                              >
                                {link.text}
                              </Link>
                              <button
                                ref={(el) => {
                                  dropdownButtonRefs.current[link.text] = el;
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleDropdown(link.text);
                                }}
                                className={cn(
                                  "p-3 rounded-lg transition-colors",
                                  isNavHighlighted
                                    ? "text-foreground hover:bg-background-dark/60"
                                    : "text-foreground/80 hover:text-foreground hover:bg-background-dark"
                                )}
                                aria-label="Toggle dropdown"
                              >
                                <ChevronDown
                                  className={cn(
                                    "w-4 h-4 transition-transform",
                                    isDropdownOpen && "rotate-180"
                                  )}
                                />
                              </button>
                            </div>
                            {isDropdownOpen && link.dropdown && (
                              <div
                                ref={(el) => {
                                  dropdownPanelRefs.current[link.text] = el;
                                }}
                                className="ml-4 mt-1 space-y-1"
                              >
                                {link.dropdown.map((item, itemIdx) => (
                                  <Link
                                    key={itemIdx}
                                    href={item.url}
                                    className={cn(
                                      "block text-sm font-medium p-2 rounded-lg transition-colors",
                                      pathname?.startsWith(item.url)
                                        ? "text-foreground font-semibold bg-background-dark/40"
                                        : "text-foreground/70 hover:text-foreground hover:bg-background-dark"
                                    )}
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setOpenDropdown(null);
                                    }}
                                  >
                                    {item.text}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            href={link.url ?? "/"}
                            className={cn(
                              "block text-base font-medium p-3 rounded-lg transition-colors",
                              isLinkActive
                                ? "text-foreground font-semibold bg-background-dark/40"
                                : "text-foreground/80 hover:text-foreground hover:bg-background-dark"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.text}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Theme Toggle */}
                <div className="pt-3 border-t border-foreground/10 flex items-center justify-between">
                  <span className="text-sm text-foreground/70 font-medium">
                    Theme
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-foreground/10 hover:bg-background-dark transition-colors"
                  >
                    {theme === "light" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                    <span className="text-sm capitalize">{theme}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
