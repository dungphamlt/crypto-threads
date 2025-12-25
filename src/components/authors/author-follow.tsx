import React from "react";
import { authorService } from "@/services/authors-service";
import Image from "next/image";
import Telegram from "@/assets/icons/Telegram1.svg";
import X from "@/assets/icons/X1.svg";
import Facebook from "@/assets/icons/Facebook1.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import Link from "next/link";

export async function AuthorFollow({ author_id }: { author_id: string }) {
  const author = await authorService.getAuthorById(author_id);
  if (!author) {
    return null;
  }

  const SOCIAL_ICONS: Record<string, React.ReactNode> = {
    telegram: (
      <Image
        src={Telegram}
        alt="Telegram"
        width={24}
        height={24}
        className="w-5 h-5 md:w-8 md:h-8"
      />
    ),
    x: (
      <Image
        src={X}
        alt="X"
        width={24}
        height={24}
        className="w-5 h-5 md:w-8 md:h-8"
      />
    ),
    facebook: (
      <Image
        src={Facebook}
        alt="Facebook"
        width={24}
        height={24}
        className="w-5 h-5 md:w-8 md:h-8"
      />
    ),
    instagram: (
      <Image
        src={InstagramIcon}
        alt="Instagram"
        width={24}
        height={24}
        className="w-5 h-5 md:w-8 md:h-8"
      />
    ),
  };

  const getSocialLinks = () => {
    if (!author.author.socials) return [];

    // Handle object format
    if (
      typeof author.author.socials === "object" &&
      !Array.isArray(author.author.socials)
    ) {
      return Object.entries(author.author.socials as Record<string, string>)
        .filter(([, url]) => url && url !== "#")
        .map(([platform, url]) => ({
          platform: platform.toLowerCase(),
          url,
        }));
    }

    return [];
  };

  const socialLinks = getSocialLinks();

  return (
    <div className="flex gap-4 md:gap-8 justify-between py-4 md:py-8 my-4 md:my-8 border-y border-gray-300 dark:border-gray-400">
      <div className="flex gap-4 flex-1 ">
        {author.author.avatarUrl ? (
          <Link
            href={`/author/${author.author.id}`}
            className="cursor-pointer flex-shrink-0 w-14 h-14 md:w-36 md:h-36"
          >
            <Image
              src={author.author.avatarUrl}
              alt={author.author.penName}
              width={144}
              height={144}
              className="object-cover w-full h-full shrink-0 shadow-sm rounded-full"
            />
          </Link>
        ) : (
          <div className="w-36 h-36 shrink-0 rounded-lg bg-gray-200 dark:bg-gray-500 flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground uppercase">
              {author.author.penName.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-medium text-sm md:text-base text-gray-600 dark:text-gray-400">
            WRITTEN BY
          </span>
          <span className="text-base md:text-xl text-foreground font-semibold">
            {author.author.penName}
          </span>
          <span className="text-muted-foreground text-sm md:text-base line-clamp-5">
            {author.author.description}
          </span>
        </div>
      </div>
      <div className="flex flex-col shrink-0">
        <span className="font-medium text-sm md:text-base text-gray-600 dark:text-gray-400 mb-1">
          FOLLOW
        </span>
        <span className="text-base md:text-xl text-foreground font-semibold mb-3">
          {author.author.penName}
        </span>
        <div className="flex items-center gap-2">
          {socialLinks.length > 0 ? (
            <div className="flex items-center gap-2">
              {socialLinks.map(({ platform, url }) => (
                <Link
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary hover:bg-primary/80 transition-colors"
                  aria-label={`Follow on ${platform}`}
                >
                  {SOCIAL_ICONS[platform] || null}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No social links available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
