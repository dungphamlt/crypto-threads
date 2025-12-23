"use client";

import { useState } from "react";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Mail, Send, Youtube } from "lucide-react";
import type { Author } from "@/services/authors-service";
import BgLoopLogo from "@/assets/images/bg-loop-logo.png";
import { Logo } from "../logo";

interface AuthorProfileHeaderProps {
  author: Author;
}

export function AuthorProfileHeader({ author }: AuthorProfileHeaderProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const designation = author.designations?.[0] || author.role || "AUTHOR";

  const description = author.description || "";
  const shouldTruncate = description.length > 150;

  const backgroundSrc = author.backgroundAvatarUrl ?? BgLoopLogo;
  // const secondAvatar =
  //   author.secondaryAvatarUrl;

  return (
    <div className="w-full relative pt-10 md:pt-20 lg:pt-24 pb-8 mt-6 md:mt-10">
      <div
        className="absolute left-1/2 transform -translate-x-1/2 top-0 w-full max-w-6xl rounded-xl overflow-hidden h-[160px] sm:h-[180px] md:h-[220px] lg:h-[240px]"
        style={{
          zIndex: 10,
        }}
      >
        <Image
          src={backgroundSrc}
          alt={author.penName ?? "author background"}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="relative mt-2 sm:mt-4 mx-auto px-4 sm:px-6 z-20">
        <div className="max-w-4xl mx-auto bg-primary border border-white/80 rounded-xl shadow-lg p-4 sm:p-5 md:p-6 transform -translate-y-6 md:-translate-y-8 min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
          <div className="flex flex-row flex-wrap items-center justify-center md:justify-between gap-4 md:gap-6 lg:gap-8 text-white">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl bg-white/10 overflow-hidden border border-white/40">
                {author.avatarUrl ? (
                  <Image
                    src={author.avatarUrl}
                    alt={author.penName ?? author.username ?? "avatar"}
                    width={275}
                    height={275}
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
            <div className="flex-1 min-w-[180px] text-left">
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-white font-funnel break-words">
                Author: {author.penName || author.username}
              </h1>

              <p className="text-xs sm:text-sm md:text-base mb-2 text-white font-funnel">
                {designation}
              </p>

              {description && (
                <div className="mb-3 max-w-xl">
                  <p
                    className={`text-white text-sm sm:text-base leading-relaxed ${!isDescriptionExpanded && shouldTruncate ? "line-clamp-2" : ""
                      }`}
                  >
                    {description}
                  </p>
                  {shouldTruncate && (
                    <button
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                      className="text-sm sm:text-base hover:underline mt-2 font-medium"
                      aria-expanded={isDescriptionExpanded}
                    >
                      {isDescriptionExpanded ? "…less" : "…more"}
                    </button>
                  )}
                </div>
              )}

              {/* Social Media Icons */}
              <div className="flex items-center justify-start gap-2 sm:gap-3">
                {!!author.socials?.facebook &&
                  <a
                    href={author.socials?.facebook || "#"}
                    className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:bg-white/90 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                }
                {!!author.socials?.x &&
                  <a
                    href={author.socials?.twitter || "#"}
                    className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:bg-white/90 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                }
                {!!author.socials?.instagram &&
                  <a
                    href={author.socials?.instagram || "#"}
                    className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:bg-white/90 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                }
                {!!author.socials?.telegram &&
                  <a
                    href={author.socials?.telegram || "#"}
                    className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:bg-white/90 transition-colors"
                    aria-label="Telegram"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                }
                {!!author.socials?.youtube &&
                  <a
                    href={author.socials?.youtube || "#"}
                    className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:bg-white/90 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                }
                {!!author.email &&
                  <a
                    href={author.email ? `mailto:${author.email}` : "#"}
                    className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:bg-white/90 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                }
              </div>
            </div>

            <div className="flex-shrink-0 hidden sm:flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl flex items-center justify-center">
                <Logo className="w-20 h-20 md:w-28 md:h-28 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
