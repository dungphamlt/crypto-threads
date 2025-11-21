"use client";

import { useState } from "react";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Mail, Send, Youtube } from "lucide-react";
import type { Author } from "@/services/authors-service";

interface AuthorProfileHeaderProps {
  author: Author;
}

export function AuthorProfileHeader({ author }: AuthorProfileHeaderProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const designation = author.designations?.[0] || author.role || "AUTHOR";

  const description = author.description || "";
  const shouldTruncate = description.length > 150;

  const backgroundSrc = author.backgroundAvatarUrl ??
    "https://www.digitalsilk.com/wp-content/themes/digitalsilk/assets/_dist/images/men-bg.webp";
  const secondAvatar =
    author.secondaryAvatarUrl;

  return (
    <div className="w-full relative pt-20 md:pt-24 lg:pt-28 pb-8 mt-10">
      <div
        className="absolute left-1/2 transform -translate-x-1/2 top-0 w-full max-w-6xl rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800"
        style={{
          zIndex: 10,
          minHeight: 300,
        }}
      >
        {backgroundSrc && (
          <Image
            src={backgroundSrc}
            alt={author.penName ?? "author background"}
            fill
            className="object-cover object-center"
            priority
          />
        )}
      </div>

      <div className="relative mt-16 mx-auto px-2 z-20">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 transform -translate-y-6 md:-translate-y-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 lg:gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden border border-transparent">
                {author.avatarUrl ? (
                  <Image
                    src={author.avatarUrl}
                    alt={author.penName ?? author.username ?? "avatar"}
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    role="img"
                    aria-label={
                      author.penName ? `${author.penName} avatar placeholder` : "avatar placeholder"
                    }
                  />
                )}
              </div>
            </div>

            {/* Author Info */}
            <div className="flex-1 text-center md:text-left min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold uppercase mb-1 sm:mb-2 tracking-tight text-foreground break-words">
                AUTHOR: {author.penName?.toUpperCase() || author.username?.toUpperCase()}
              </h1>

              <p className="text-xs sm:text-sm md:text-base lg:text-lg uppercase font-semibold mb-3 text-foreground">
                {designation.toUpperCase()}
              </p>

              {description && (
                <div className="mb-3 max-w-2xl mx-auto md:mx-0">
                  <p
                    className={`text-sm sm:text-base md:text-base text-muted-foreground leading-relaxed ${!isDescriptionExpanded && shouldTruncate ? "line-clamp-3" : ""
                      }`}
                  >
                    {description}
                  </p>
                  {shouldTruncate && (
                    <button
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                      className="text-sm sm:text-base text-primary hover:underline mt-2 font-medium"
                      aria-expanded={isDescriptionExpanded}
                    >
                      {isDescriptionExpanded ? "…less" : "…more"}
                    </button>
                  )}
                </div>
              )}

              {/* Social Media Icons */}
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3">
                {!!author.socials?.facebook &&
                  <a
                    href={author.socials?.facebook || "#"}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 text-foreground" />
                  </a>
                }
                {!!author.socials?.x &&
                  <a
                    href={author.socials?.twitter || "#"}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4 text-foreground" />
                  </a>
                }
                {!!author.socials?.instagram &&
                  <a
                    href={author.socials?.instagram || "#"}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 text-foreground" />
                  </a>
                }
                {!!author.socials?.telegram &&
                  <a
                    href={author.socials?.telegram || "#"}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Telegram"
                  >
                    <Send className="w-4 h-4 text-foreground" />
                  </a>
                }
                {!!author.socials?.youtube &&
                  <a
                    href={author.socials?.youtube || "#"}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4 text-foreground" />
                  </a>
                }
                {!!author.email &&
                  <a
                    href={author.email ? `mailto:${author.email}` : "#"}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4 text-foreground" />
                  </a>
                }
              </div>
            </div>

            {/* Logo - Right (hidden on small screens) */}
            {
              secondAvatar &&
              <div className="flex-shrink-0 hidden md:block">
                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Image
                    src={author.avatarUrl}
                    alt={author.penName ?? author.username ?? "avatar"}
                    className="w-14 h-14 md:w-16 md:h-16 text-foreground object-cover"
                  />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
