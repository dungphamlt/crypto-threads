"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Post } from "@/types";
import { postService } from "@/services/posts-service";
import Image from "next/image";

interface SearchProps {
  onSearch?: () => void;
  className?: string;
  placeholder?: string;
  variant?: "desktop" | "mobile";
}

export function Search({
  onSearch,
  className = "",
  placeholder = "Search",
  variant = "desktop",
}: SearchProps) {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = variant === "mobile";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (isMobile) {
          setIsInputOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  useEffect(() => {
    const trimmedQuery = query.trim();

    // Clear results if query is too short
    if (trimmedQuery.length < 3) {
      setPosts([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsOpen(true);

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        const results = await postService.searchPosts(trimmedQuery, 10);
        setPosts(results);
      } catch (error) {
        console.error("Error searching posts:", error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      setIsLoading(false);
    };
  }, [query]);

  const handleSelectPost = () => {
    setIsOpen(false);
    setQuery("");
    if (isMobile) {
      setIsInputOpen(false);
    }
    onSearch?.();
  };

  const handleOpenInput = () => {
    setIsInputOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  //   const handleCloseInput = () => {
  //     setIsInputOpen(false);
  //     setQuery("");
  //     setIsOpen(false);
  //   };

  const showDropdown = isOpen && query.trim().length >= 2;

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      {/* Mobile: Icon button */}
      {isMobile && (
        <button
          onClick={handleOpenInput}
          className="p-2 rounded-lg hover:bg-background-dark transition-colors"
          aria-label="Search"
        >
          <SearchIcon className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Mobile: Input with absolute position */}
      {isMobile && isInputOpen && (
        <>
          {/* Input container */}
          <div className="fixed top-[78px] bg-white left-4 right-4 z-50 border-2 mt-2 border-primary rounded-full">
            <div className="relative">
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60 animate-spin" />
              )}
              <input
                ref={inputRef}
                type="text"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
                placeholder={placeholder}
                className="w-full px-3 text-sm text-primary rounded-full py-2 bg-background focus:outline-none"
              />
            </div>

            {/* Dropdown Results for Mobile */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-foreground/10 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {isLoading ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Searching...
                  </div>
                ) : posts.length > 0 ? (
                  <div className="py-2">
                    {posts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/article/${post.slug}`}
                        onClick={handleSelectPost}
                        className="flex gap-2 px-4 py-2 text-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        <Image
                          src={post.coverUrl ?? ""}
                          alt={post.title}
                          width={100}
                          height={100}
                          className="w-20 h-auto object-cover rounded-md"
                        />

                        <div className="pt-1">
                          <div className="font-medium line-clamp-1">
                            {post.title}
                          </div>
                          {post.excerpt && (
                            <div className="text-xs text-muted-foreground line-clamp-1 mt-1">
                              {post.excerpt}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Desktop: Normal input */}
      {!isMobile && (
        <div className="relative">
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60 animate-spin" />
          )}
          <input
            ref={inputRef}
            type="text"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
            placeholder={placeholder}
            className="w-full px-4 text-sm rounded-full py-1.5 bg-white border border-foreground/10 focus:outline-none focus:ring-1 focus:ring-foreground/20"
          />
        </div>
      )}

      {/* Dropdown Results for Desktop */}
      {!isMobile && showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-foreground/10 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          ) : posts.length > 0 ? (
            <div className="py-2">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/article/${post.slug}`}
                  onClick={handleSelectPost}
                  className="flex gap-2 px-4 py-2 text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <Image
                    src={post.coverUrl ?? ""}
                    alt={post.title}
                    width={100}
                    height={100}
                    className="w-32 h-auto object-cover rounded-md"
                  />

                  <div className="pt-1">
                    <div className="font-medium line-clamp-1">{post.title}</div>
                    {post.excerpt && (
                      <div className="text-xs text-muted-foreground line-clamp-1 mt-1">
                        {post.excerpt}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
