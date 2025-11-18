'use client';
import { baseOptions, type NavLinkWithDropdown } from '@/app/layout.config';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu as MenuIcon, Search as SearchIcon, Sun, Moon, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Logo } from './logo';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const navbarRef = useRef<HTMLDivElement>(null);

    // Refs for dropdown buttons and panels (robust outside-click detection)
    const dropdownButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const dropdownPanelRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Outside click / mousedown handler (uses specific refs)
    useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
            const target = e.target as Node | null;
            if (!target) return;

            // Close mobile menu if clicking outside navbar
            if (isMobileMenuOpen && navbarRef.current && !navbarRef.current.contains(target)) {
                setIsMobileMenuOpen(false);
            }

            // If a dropdown is open, only keep it open when click is inside its button or panel
            if (openDropdown) {
                const btn = dropdownButtonRefs.current[openDropdown];
                const panel = dropdownPanelRefs.current[openDropdown];

                const clickedInsideButton = !!btn && btn.contains(target);
                const clickedInsidePanel = !!panel && panel.contains(target);

                if (!clickedInsideButton && !clickedInsidePanel) {
                    setOpenDropdown(null);
                }
            }
        };

        window.addEventListener('mousedown', handleOutside);
        return () => window.removeEventListener('mousedown', handleOutside);
    }, [isMobileMenuOpen, openDropdown]);

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
        if (
            stored === 'dark' ||
            (!stored && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        localStorage.setItem('theme', next);
        if (next === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    };

    const handleSearchSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        const q = query.trim();
        if (!q) return;
        router.push(`/search?q=${encodeURIComponent(q)}`);
        setIsMobileMenuOpen(false);
    };

    const mainLinks = (baseOptions.links ?? []).filter((l) => l.type === 'main') as NavLinkWithDropdown[];

    const toggleDropdown = (linkText: string) => {
        setOpenDropdown((prev) => (prev === linkText ? null : linkText));
    };

    return (
        <nav className="w-full" ref={navbarRef}>
            <div className="w-full mx-auto bg-background border-b border-foreground/10 pb-4">
                <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="flex items-center h-12 gap-4 justify-between">
                        {/* LEFT: Logo */}
                        <div className="flex items-center flex-shrink-0">
                            <Link href="/" className="flex items-center gap-2 font-medium">
                                <Logo className={cn(
                                    "h-8 w-8",
                                    theme === 'light' ? "text-black" : "text-white"
                                )} />
                                <span className="hidden sm:inline text-xl font-semibold text-foreground">
                                    {baseOptions.nav?.title}
                                </span>
                            </Link>
                        </div>

                        {/* CENTER: Search + Navigation + Theme */}
                        <div className="hidden md:flex flex-1 flex-col items-center justify-center gap-2">
                            {/* Search */}
                            <form onSubmit={handleSearchSubmit} className="w-full max-w-3xl" aria-label="search-form">
                                <div className="relative">
                                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                                    <input
                                        aria-label="Search"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSearchSubmit();
                                        }}
                                        placeholder="Search"
                                        className="w-full rounded-full py-1.5 pl-10 pr-4 text-sm bg-background-light border border-foreground/10 focus:outline-none focus:ring-1 focus:ring-foreground/20"
                                    />
                                </div>
                            </form>

                            {/* Navigation (left) + Theme (right) in same width as search */}
                            <div className="w-full max-w-3xl flex items-center justify-between gap-3">
                                {/* Navigation links (left) */}
                                <div className="flex items-center gap-3">
                                    {mainLinks.length > 0 ? (
                                        <>
                                            {mainLinks.map((link, idx) => {
                                                const hasDropdown = !!(link.dropdown && link.dropdown.length > 0);
                                                return (
                                                    <div key={link.url ?? idx} className="relative">
                                                        {hasDropdown ? (
                                                            <button
                                                                type="button"
                                                                ref={(el) => {
                                                                    dropdownButtonRefs.current[link.text] = el;
                                                                }}
                                                                onClick={() => toggleDropdown(link.text)}
                                                                className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                                                                aria-expanded={openDropdown === link.text}
                                                                aria-controls={`dropdown-${link.text}`}
                                                            >
                                                                <span>{link.text}</span>
                                                                <ChevronDown className={cn(
                                                                    'w-3 h-3 transition-transform',
                                                                    openDropdown === link.text && 'rotate-180'
                                                                )} />
                                                            </button>
                                                        ) : (
                                                            <Link
                                                                href={link.url ?? '/'}
                                                                className="block px-3 py-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                                                            >
                                                                {link.text}
                                                            </Link>
                                                        )}

                                                        {/* Dropdown Menu */}
                                                        {hasDropdown && openDropdown === link.text && link.dropdown && (
                                                            <div
                                                                id={`dropdown-${link.text}`}
                                                                ref={(el) => { dropdownPanelRefs.current[link.text] = el; }}
                                                                className="absolute top-full left-0 mt-1 w-48 bg-background rounded-lg shadow-lg border border-foreground/10 py-2 z-50"
                                                            >
                                                                {link.dropdown.map((item, itemIdx) => (
                                                                    <Link
                                                                        key={itemIdx}
                                                                        href={item.url}
                                                                        className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-background-dark transition-colors"
                                                                        onClick={() => setOpenDropdown(null)}
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

                                {/* Theme button (right) */}
                                <button
                                    aria-label="Toggle theme"
                                    onClick={toggleTheme}
                                    className="inline-flex items-center justify-center rounded-full p-2 hover:bg-background-dark transition-colors"
                                >
                                    {theme === 'light' ? (
                                        <Sun className="w-5 h-5 text-foreground" />
                                    ) : (
                                        <Moon className="w-5 h-5 text-foreground" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <Button
                            className="md:hidden"
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                setIsMobileMenuOpen((p) => !p);
                            }}
                        >
                            <MenuIcon className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile menu (includes search + links + theme) */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden border-t border-foreground/10 md:hidden"
                        >
                            <div className="bg-background">
                                <div className="p-4 space-y-4">
                                    {/* Mobile: search (full width) */}
                                    <form onSubmit={handleSearchSubmit}>
                                        <div className="relative">
                                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                                            <input
                                                aria-label="Search"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                placeholder="Search"
                                                className="w-full rounded-lg py-2 pl-10 pr-4 text-sm bg-background-light border border-foreground/10 focus:outline-none"
                                            />
                                        </div>
                                    </form>

                                    {/* Links list with dropdowns */}
                                    <div className="space-y-1">
                                        {mainLinks.map((link) => {
                                            const hasDropdown = !!(link.dropdown && link.dropdown.length > 0);
                                            const isDropdownOpen = openDropdown === link.text;
                                            return (
                                                <div key={link.url}>
                                                    {hasDropdown ? (
                                                        <>
                                                            <button
                                                                ref={(el) => {
                                                                    dropdownButtonRefs.current[link.text] = el
                                                                }}
                                                                onClick={() => toggleDropdown(link.text)}
                                                                className="w-full flex items-center justify-between text-foreground/80 hover:text-foreground text-base font-medium p-3 rounded-lg hover:bg-background-dark transition-colors"
                                                            >
                                                                <span>{link.text}</span>
                                                                <ChevronDown className={cn(
                                                                    'w-4 h-4 transition-transform',
                                                                    isDropdownOpen && 'rotate-180'
                                                                )} />
                                                            </button>
                                                            {isDropdownOpen && link.dropdown && (
                                                                <div
                                                                    ref={(el) => {
                                                                        dropdownPanelRefs.current[link.text] = el
                                                                    }}
                                                                    className="ml-4 mt-1 space-y-1"
                                                                >
                                                                    {link.dropdown.map((item, itemIdx) => (
                                                                        <Link
                                                                            key={itemIdx}
                                                                            href={item.url}
                                                                            className="block text-foreground/70 hover:text-foreground text-sm font-medium p-2 rounded-lg hover:bg-background-dark transition-colors"
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
                                                            href={link.url ?? '/'}
                                                            className="block text-foreground/80 hover:text-foreground text-base font-medium p-3 rounded-lg hover:bg-background-dark transition-colors"
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
                                        <span className="text-sm text-foreground/70 font-medium">Theme</span>
                                        <button
                                            onClick={toggleTheme}
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-foreground/10 hover:bg-background-dark transition-colors"
                                        >
                                            {theme === 'light' ? (
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
            </div>
        </nav>
    );
};

export default Navbar;
