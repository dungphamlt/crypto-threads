"use client";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/categories-service";
import { ChevronDownIcon } from "lucide-react";
import TelegramIcon from "@/assets/icons/telegram.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import Image from "next/image";

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export default function Navigation() {
  const pathname = usePathname();

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAllCategories,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  const { data: subCategories, isLoading: isLoadingSubCategories } = useQuery({
    queryKey: ["subCategories"],
    queryFn: categoryService.getAllSubCategories,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  const navItems = useMemo<NavItem[]>(() => {
    if (!categories || !subCategories) {
      return [];
    }

    const subCategoriesByCategory = subCategories.reduce<
      Record<string, { href: string; label: string }[]>
    >((acc, subCategory) => {
      const categoryId = subCategory.categoryId?.id;
      if (!categoryId) return acc;

      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }

      acc[categoryId].push({
        href: `/sub-categories/${subCategory.key}`,
        label: subCategory.key,
      });

      return acc;
    }, {});

    return [
      { href: "/", label: "Home" },
      ...categories.map((category) => ({
        href: `/categories/${category.key}`,
        label: category.key,
        children: subCategoriesByCategory[category.id] ?? [],
      })),
    ];
  }, [categories, subCategories]);

  if (isLoadingCategories || isLoadingSubCategories) {
    return (
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 py-4">
            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>
        </div>
      </nav>
    );
  }

  if (navItems.length === 0) {
    return null;
  }

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-primary dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center font-medium">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.children?.some((child) => pathname === child.href) ??
                  false);

              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-6 py-3 hover:bg-gray-300 transition-colors ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                        : "text-white hover:text-gray-700 dark:text-gray-300  dark:hover:text-blue-400"
                    }`}
                  >
                    <span className="uppercase">{item.label}</span>
                    {item.children && item.children.length > 0 && (
                      <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>

                  {item.children && item.children.length > 0 && (
                    <ul className="absolute left-0 top-full min-w-[200px] rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg hidden group-hover:flex flex-col py-2 z-20">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              pathname === child.href
                                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://x.com/cryptothreads"
              className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-110 transition-all duration-300"
            >
              <Image src={TwitterIcon} alt="Twitter" width={16} height={16} />
            </Link>
            <Link
              href="https://t.me/cryptothreads"
              className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-110 transition-all duration-300"
            >
              <Image src={TelegramIcon} alt="Telegram" width={16} height={16} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
