"use client";
import { baseOptions, type NavLinkWithDropdown } from "@/app/layout.config";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  TextAlignJustify as MenuIcon,
  SunMedium,
  Moon,
  ChevronDown,
  CircleUserRound,
  LogOut,
  User,
  LogIn,
  UserPlus,
  X,
} from "lucide-react";
import { PlayIcon } from "./icons/play-icon";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import LogoWhite from "@/assets/icons/logo-white.svg";
import LogoOg from "@/assets/icons/logo-og-white.svg";
import logoOrange from "@/assets/icons/logo-orange.svg";
import EnFlagIcon from "@/assets/icons/en-flag.svg";
import ViFlagIcon from "@/assets/icons/vn-flag.svg";
import JpFlagIcon from "@/assets/icons/jp-flag.svg";
import Image from "next/image";
import { Search } from "./search";
import { useIsLogin } from "@/hooks/use-is-login";

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
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  // Refs for dropdown buttons and panels (robust outside-click detection)
  const dropdownButtonRefs = useRef<Record<string, HTMLButtonElement | null>>(
    {}
  );
  const dropdownPanelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const pathname = usePathname();
  const [lang, setLang] = useState<"en" | "vn" | "jp">("en");

  const { isLoggedIn, user, refresh } = useIsLogin();

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as
        | "en"
        | "vn"
        | "jp"
        | null;
      if (savedLang && ["en", "vn", "jp"].includes(savedLang)) {
        setLang(savedLang);
      }
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  }, [lang]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    refresh();
  };

  const handleLangChange = (newLang: "en" | "vn" | "jp") => {
    setLang(newLang);
    setIsLangDropdownOpen(false);
  };

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen((prev) => !prev);
    setIsLoginDropdownOpen(false); // Close login dropdown when opening lang dropdown
  };

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

      // Close language dropdown if clicking outside
      if (
        isLangDropdownOpen &&
        langDropdownRef.current &&
        !langDropdownRef.current.contains(target)
      ) {
        setIsLangDropdownOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutside);
    return () => window.removeEventListener("mousedown", handleOutside);
  }, [isMobileMenuOpen, openDropdown, isLoginDropdownOpen, isLangDropdownOpen]);

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
    setIsLangDropdownOpen(false); // Close lang dropdown when opening login dropdown
  };

  return (
    <nav className="container mt-4" ref={navbarRef}>
      <div className="flex gap-4 justify-between items-center bg-primary py-3 px-4 rounded-full">
        {/* Mobile menu button */}
        <button
          className="md:hidden cursor-pointer hover:scale-105 transition-transform duration-300 pr-8"
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
            className="w-28 md:w-36 h-auto object-contain"
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
        <div className="flex items-center gap-1 md:hidden">
          <Search
            onSearch={() => setIsMobileMenuOpen(false)}
            variant="mobile"
          />
          {/* Theme Toggle */}
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className={cn(
              "block md:hidden relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer",
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
                "absolute top-1 bottom-1 w-5 h-5 bg-primary rounded-full shadow-md transition-transform duration-300 ease-in-out",
                theme === "light"
                  ? "translate-x-[calc(100%+0.75rem)]"
                  : "translate-x-1"
              )}
            />
            <SunMedium
              className={cn(
                "absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-300 transition-opacity duration-300",
                theme === "light" ? "opacity-0" : "opacity-100"
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
                      onMouseLeave={() => hasDropdown && handleDropdownLeave()}
                    >
                      {hasDropdown ? (
                        <Link
                          href={link.url ?? "/"}
                          className={cn(
                            "flex items-center py-1 text-sm  transition-colors text-white hover:text-black",
                            isNavHighlighted ? "font-bold" : "font-semibold"
                          )}
                          aria-expanded={hoveredDropdown === link.text}
                          aria-controls={`dropdown-${link.text}`}
                        >
                          <div className="w-4 h-4">
                            <PlayIcon
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
                            "block px-3 py-1 text-sm transition-colors text-white hover:text-black",
                            isLinkActive ? "font-bold" : "font-semibold"
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
                            className="absolute top-full left-0 mt-1 w-48 bg-background rounded-xl shadow-lg border border-primary/80 py-2 px-4 z-50"
                            onMouseEnter={() => handleDropdownEnter(link.text)}
                            onMouseLeave={handleDropdownLeave}
                          >
                            {link.dropdown.map((item, itemIdx) => (
                              <Link
                                key={item.url}
                                href={item.url}
                                className={cn(
                                  "block py-2 text-sm transition-colors hover:text-black border-foreground/50",
                                  itemIdx !==
                                    (link.dropdown?.length ?? 0) - 1 &&
                                    "border-b-[0.5px]",
                                  pathname?.startsWith(item.url)
                                    ? "text-primary font-semibold bg-background-dark/50"
                                    : "text-primary font-medium"
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
        <div className="flex-col gap-2 hidden md:flex">
          {/* Language Toggle */}
          <div className="relative" ref={langDropdownRef}>
            <button
              aria-label="Toggle language"
              onClick={toggleLangDropdown}
              aria-expanded={isLangDropdownOpen}
              className="flex items-center justify-between gap-3 bg-white rounded-full px-2 py-1 hover:opacity-80 cursor-pointer transition-colors"
            >
              {lang === "en" ? (
                <Image
                  src={EnFlagIcon}
                  alt="English Flag"
                  className="w-5 h-auto object-contain shadow-sm"
                  width={20}
                  height={20}
                />
              ) : lang === "vn" ? (
                <Image
                  src={ViFlagIcon}
                  alt="Vietnamese Flag"
                  className="w-5 h-auto object-contain shadow-sm"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src={JpFlagIcon}
                  alt="Japanese Flag"
                  className="w-5 h-auto object-contain shadow-sm"
                  width={20}
                  height={20}
                />
              )}
              <span className="text-sm font-semibold text-primary">
                {lang === "en" ? "EN" : lang === "vn" ? "VN" : "JP"}
              </span>
            </button>

            {/* Language dropdown */}
            {isLangDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 z-50 w-[140px] bg-background border border-primary/80 rounded-xl shadow-lg px-4 py-2">
                {(["en", "vn", "jp"] as const)
                  .filter((langOption) => langOption !== lang)
                  .map((langOption, index, filteredArray) => (
                    <button
                      key={langOption}
                      onClick={() => handleLangChange(langOption)}
                      className={cn(
                        "w-full py-2 text-sm font-semibold hover:text-black cursor-pointer transition-colors flex items-center gap-2",
                        index !== filteredArray.length - 1 &&
                          "border-b-[0.5px] border-foreground/50",
                        "text-primary"
                      )}
                    >
                      {langOption === "en" ? (
                        <Image
                          src={EnFlagIcon}
                          alt="English Flag"
                          className="w-5 h-auto object-contain shadow-sm"
                          width={20}
                          height={20}
                        />
                      ) : langOption === "vn" ? (
                        <Image
                          src={ViFlagIcon}
                          alt="Vietnamese Flag"
                          className="w-5 h-auto object-contain shadow-sm"
                          width={20}
                          height={20}
                        />
                      ) : (
                        <Image
                          src={JpFlagIcon}
                          alt="Japanese Flag"
                          className="w-5 h-auto object-contain shadow-sm"
                          width={20}
                          height={20}
                        />
                      )}
                      <span>
                        {langOption === "en"
                          ? "EN "
                          : langOption === "vn"
                          ? "VN"
                          : "JP"}
                      </span>
                    </button>
                  ))}
              </div>
            )}
          </div>
          {/* Theme Toggle */}
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className={cn(
              "relative w-18 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer hover:opacity-80",
              theme === "light" ? "bg-white" : "bg-gray-600"
            )}
          >
            {/* Moon icon on the left */}
            <Moon
              className={cn(
                "absolute left-1.5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary transition-opacity duration-300",
                theme === "light" ? "opacity-100" : "opacity-0"
              )}
            />
            {/* Toggle thumb */}
            <div
              className={cn(
                "absolute top-1 bottom-1 w-5 h-5 bg-primary rounded-full shadow-md transition-transform duration-300 ease-in-out",
                theme === "light"
                  ? "translate-x-[calc(100%+1.3rem)]"
                  : "translate-x-1"
              )}
            />
            {/* Sun icon on the right */}
            <SunMedium
              className={cn(
                "absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-300 transition-opacity duration-300",
                theme === "light" ? "opacity-0" : "opacity-100"
              )}
            />
          </button>
        </div>
        {/* Settings button */}
        <div className="hidden md:flex relative" ref={loginDropdownRef}>
          <button
            onClick={toggleLoginDropdown}
            className="flex items-center justify-center rounded-full bg-primary transition-transform duration-300 cursor-pointer hover:scale-105"
            aria-label="Settings"
            aria-expanded={isLoginDropdownOpen}
          >
            {isLoggedIn ? (
              <div className="text-3xl  font-bold text-white">
                {user?.username.charAt(0).toUpperCase()}
              </div>
            ) : (
              <CircleUserRound className="h-16 w-16 text-white transition-transform duration-300" />
            )}
          </button>

          {/* login/register dropdown */}
          {isLoginDropdownOpen && (
            <div className="absolute top-full right-0 z-50 w-[200px] bg-background border border-primary/80 rounded-xl shadow-lg p-4">
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleLogout}
                    className=" py-2 text-sm text-primary font-semibold hover:text-black cursor-pointer transition-colors flex items-center gap-2 border-b-[0.5px] border-foreground/50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                  {/* Profile */}
                  <Link
                    href="/profile"
                    className=" py-2 text-sm text-primary font-semibold hover:text-black cursor-pointer transition-colors flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    href="/auth"
                    className=" py-2 text-sm text-primary font-semibold hover:text-black cursor-pointer transition-colors flex items-center gap-2 border-b-[0.5px] border-foreground/50"
                    onClick={() => setIsLoginDropdownOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/auth?type=register"
                    className=" py-2 text-sm text-primary font-semibold hover:text-black cursor-pointer transition-colors flex items-center gap-2 "
                    onClick={() => setIsLoginDropdownOpen(false)}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register</span>
                  </Link>
                </>
              )}
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
            <div className="bg-background shadow-sm rounded-2xl mt-2">
              <div className="p-4 space-y-4">
                {/* logo and close button */}
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="w-24 h-10">
                      <Image
                        src={logoOrange}
                        alt="Logo"
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                  </Link>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
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
                <div className="py-3 border-t border-foreground/10">
                  {isLoggedIn ? (
                    <div className="space-y-1">
                      <button
                        onClick={handleLogout}
                        className="block text-base font-medium p-3 rounded-lg transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Link
                        href="/auth"
                        className="block text-base font-medium p-3 rounded-lg transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth?type=register"
                        className="block text-base font-medium p-3 rounded-lg transition-colors"
                      >
                        Register
                      </Link>
                    </div>
                  )}
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
