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
}

export function ArticleMeta({
  author,
  avatarUrl,
  authorId,
  isShowAvatar = true,
  date,
  orientation = "row",
  className,
}: ArticleMetaProps) {
  const router = useRouter();
  const dateValue =
    typeof date === "string" ? (date ? new Date(date) : undefined) : date;

  const layoutClasses =
    orientation === "column"
      ? "flex flex-col gap-1"
      : "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2";

  const getInitial = (name?: string) => {
    if (!name) return "?";
    return name.trim()[0].toUpperCase();
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (authorId) {
      router.push(`/author/${authorId}`);
    }
  };

  const AuthorContent = () => (
    <div className="flex items-center gap-2">
      {
        isShowAvatar && <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={author || ""}
              fill
              className="object-cover"
              sizes="24px"
            />
          ) : (
            <span className="text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300">
              {getInitial(author)}
            </span>
          )}
        </div>
      }
      <span className="text-muted-foreground/70">
        <span className="uppercase tracking-wide text-[10px] sm:text-[11px]">
          By{" "}
        </span>
        <span className="font-semibold text-foreground">{author}</span>
      </span>
    </div>
  );

  return (
    <div className={clsx(layoutClasses, "text-xs sm:text-sm", className)}>
      {author && (
        authorId ? (
          <a
            href={`/author/${authorId}`}
            onClick={handleAuthorClick}
            className="hover:opacity-80 transition-opacity inline-block cursor-pointer"
          >
            <AuthorContent />
          </a>
        ) : (
          <AuthorContent />
        )
      )}
      {dateValue && (
        <>
          {orientation === "row" && (
            <span className="hidden sm:inline text-muted-foreground/60">·</span>
          )}
          <span className="text-muted-foreground opacity-80">
            {formatDate(dateValue)}
          </span>
        </>
      )}
    </div>
  );
}


