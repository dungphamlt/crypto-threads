"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TwitterIcon from "@/assets/icons/X.svg";
import FacebookIcon from "@/assets/icons/Facebook.svg";
import TelegramIcon from "@/assets/icons/Telegram.svg";
import DiscordIcon from "@/assets/icons/Discord.svg";
import ThreadIcon from "@/assets/icons/Threads.svg";
import MessengerIcon from "@/assets/icons/Messenger.svg";

interface ShareSocialsProps {
  url?: string;
}

export function ShareSocials({ url }: ShareSocialsProps) {
  const [shareUrl, setShareUrl] = useState(url || "");

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [url]);
  const socials = [
    {
      name: "X",
      icon: <Image src={TwitterIcon} alt="X" width={20} height={20} />,
    },
    {
      name: "Telegram",
      icon: <Image src={TelegramIcon} alt="Telegram" width={20} height={20} />,
    },
    {
      name: "Facebook",
      icon: <Image src={FacebookIcon} alt="Facebook" width={20} height={20} />,
    },
    {
      name: "Threads",
      icon: <Image src={ThreadIcon} alt="Thread" width={20} height={20} />,
    },
    {
      name: "Discord",
      icon: <Image src={DiscordIcon} alt="Discord" width={20} height={20} />,
    },
    {
      name: "Messenger",
      icon: (
        <Image src={MessengerIcon} alt="Messenger" width={20} height={20} />
      ),
    },
  ];

  const handleShare = (social: string) => {
    if (!shareUrl) return;

    const encodedUrl = encodeURIComponent(shareUrl);

    switch (social) {
      case "X":
        window.open(
          `https://x.com/share?url=${encodedUrl}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "Facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "Threads":
        window.open(
          `https://threads.net/share?url=${encodedUrl}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "Telegram":
        window.open(
          `https://telegram.me/share/url?url=${encodedUrl}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "Discord":
        window.open(
          `https://discord.com/share?url=${encodedUrl}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "Messenger":
        window.open(
          `https://www.messenger.com/sharer/sharer.php?u=${encodedUrl}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="absolute top-60 bottom-0 left-[-60px]">
      <div className="flex flex-col items-center gap-2 sticky top-20">
        {socials.map((social) => (
          <button
            key={social.name}
            onClick={() => handleShare(social.name)}
            className="bg-gray-400 dark:bg-gray-700 rounded-lg p-2 cursor-pointer hover:bg-primary transition-all duration-300"
            aria-label={`Share on ${social.name}`}
          >
            {social.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
