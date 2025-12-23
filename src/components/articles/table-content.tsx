"use client";

import { useMemo, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableContentProps {
  content: string;
  className?: string;
}

export function TableContent({ content, className }: TableContentProps) {
  const [activeId, setActiveId] = useState<string>("");

  const toc = useMemo(() => {
    if (!content) return [];

    const items: TocItem[] = [];
    // Match h1, h2, h3 tags
    const headingRegex = /<h([1-3])[^>]*>(.*?)<\/h[1-3]>/gi;
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1], 10);
      const text = match[2]
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .trim();

      if (text) {
        // Create ID from text (lowercase, replace spaces with hyphens, remove special chars)
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");

        items.push({
          id,
          text,
          level,
        });
      }
    }

    return items;
  }, [content]);

  // Add IDs to headings in content
  useEffect(() => {
    if (toc.length === 0) return;

    toc.forEach((item) => {
      const heading = document.getElementById(item.id);
      if (!heading) {
        // Find heading by text content and add ID
        const headings = Array.from(document.querySelectorAll("h1, h2, h3"));
        const targetHeading = headings.find(
          (h) => h.textContent?.trim() === item.text
        );
        if (targetHeading && !targetHeading.id) {
          targetHeading.id = item.id;
        }
      }
    });
  }, [toc]);

  // Track active section on scroll
  //   useEffect(() => {
  //     if (toc.length === 0) return;

  //     const handleScroll = () => {
  //       const scrollPosition = window.scrollY + 100; // Offset for header

  //       for (let i = toc.length - 1; i >= 0; i--) {
  //         const element = document.getElementById(toc[i].id);
  //         if (element) {
  //           const offsetTop = element.offsetTop;
  //           if (scrollPosition >= offsetTop) {
  //             setActiveId(toc[i].id);
  //             break;
  //           }
  //         }
  //       }
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     handleScroll(); // Check on mount

  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [toc]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Offset for sticky header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="bg-background border border-foreground/10 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Table of Contents
        </h3>
        <ul
          role="list"
          className="list-disc space-y-1 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
        >
          {toc.map((item) => (
            <li key={item.id} className="ml-4 py-1">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "block rounded-md text-sm transition-colors hover:text-primary",
                  item.level === 1 && "font-semibold ",
                  item.level === 2 && "font-medium  ml-1",
                  item.level === 3 && "font-medium ml-2",
                  activeId === item.id ? "text-primary" : ""
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
