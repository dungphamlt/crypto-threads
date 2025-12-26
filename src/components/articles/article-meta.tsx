"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import clsx from "clsx";

interface ArticleMetaProps {
  author?: string;
  avatarUrl?: string;
  authorId?: string;
  isShowAvatar?: boolean;
  date?: Date | string;
  orientation?: "row" | "column";
  className?: string;
  isHotTopic?: boolean;
}

export function ArticleMeta({
  author,
  avatarUrl,
  authorId,
  isShowAvatar = true,
  date,
  orientation = "row",
  className,
  isHotTopic = false,
}: ArticleMetaProps) {
  const router = useRouter();
  const dateValue =
    typeof date === "string" ? (date ? new Date(date) : undefined) : date;

  const layoutClasses =
    orientation === "column"
      ? "flex flex-col gap-1 leading-none"
      : "flex items-center gap-1 sm:gap-2 leading-none";

  const getInitial = (name?: string) => {
    if (!name) return "?";
    return name.trim()[0].toUpperCase();
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (authorId) {
      router.push(`/author/${authorId}`);
    }
  };

  const AuthorContent = () => (
    <div className="flex items-center gap-2 leading-none">
      {isShowAvatar && (
        <div className="relative w-6 h-6 md:w-8 md:h-8 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={author || ""}
              fill
              className="object-cover"
              sizes="32px"
            />
          ) : (
            <span className="text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300">
              {getInitial(author)}
            </span>
          )}
        </div>
      )}
      <span className="text-muted-foreground/70 leading-none flex items-center gap-1">
        <span className="uppercase tracking-wide text-[10px] sm:text-[11px] leading-none">
          By{" "}
        </span>
        <span
          className={`text-[10px] sm:text-[11px] font-semibold ${
            isHotTopic ? "text-white" : "text-foreground"
          } leading-none`}
        >
          {author}
        </span>
      </span>
    </div>
  );

  return (
    <div className={clsx(layoutClasses, "text-xs sm:text-sm", className)}>
      {author &&
        (authorId ? (
          <div
            onClick={handleAuthorClick}
            className="hover:opacity-80 transition-opacity inline-block cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleAuthorClick(
                  e as unknown as React.MouseEvent<HTMLDivElement>
                );
              }
            }}
          >
            <AuthorContent />
          </div>
        ) : (
          <AuthorContent />
        ))}
      {dateValue && (
        <>
          {orientation === "row" && (
            <span className="hidden sm:inline text-muted-foreground/60">·</span>
          )}
          <span className="text-[10px] sm:text-[11px] text-muted-foreground opacity-80 leading-none flex items-center">
            {formatDate(dateValue)}
          </span>
        </>
      )}
    </div>
  );
}
