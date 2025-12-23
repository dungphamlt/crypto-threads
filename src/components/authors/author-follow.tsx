import React from "react";
import { authorService } from "@/services/authors-service";
import Image from "next/image";
import TelegramIcon from "@/assets/icons/Telegram.svg";
import XIcon from "@/assets/icons/X.svg";
import FacebookIcon from "@/assets/icons/Facebook.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import Link from "next/link";

export async function AuthorFollow({ author_id }: { author_id: string }) {
  const author = await authorService.getAuthorById(author_id);
  if (!author) {
    return null;
  }

  const SOCIAL_ICONS: Record<string, React.ReactNode> = {
    telegram: (
      <Image src={TelegramIcon} alt="Telegram" width={24} height={24} />
    ),
    x: <Image src={XIcon} alt="X" width={24} height={24} />,
    facebook: (
      <Image src={FacebookIcon} alt="Facebook" width={24} height={24} />
    ),
    instagram: (
      <Image src={InstagramIcon} alt="Instagram" width={24} height={24} />
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
    <div className="flex gap-8 justify-between py-8 my-8 border-y border-gray-300 dark:border-gray-400">
      <div className="flex gap-4 w-full md:w-3/4">
        {author.author.avatarUrl ? (
          <Image
            src={author.author.avatarUrl}
            alt={author.author.penName}
            width={144}
            height={144}
            className="object-cover w-36 h-36 shrink-0 shadow-sm rounded-lg"
          />
        ) : (
          <div className="w-36 h-36 shrink-0 rounded-lg bg-gray-200 dark:bg-gray-500 flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground uppercase">
              {author.author.penName.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-medium text-gray-600 dark:text-gray-400">
            WRITTEN BY
          </span>
          <span className="text-lg text-foreground font-semibold">
            {author.author.penName}
          </span>
          <span className="text-muted-foreground text-justify">
            {author.author.description}
          </span>
        </div>
      </div>
      <div className="flex flex-col shrink-0 w-full md:w-1/4">
        <span className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-1">
          FOLLOW
        </span>
        <span className="text-lg text-foreground font-semibold mb-3">
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
