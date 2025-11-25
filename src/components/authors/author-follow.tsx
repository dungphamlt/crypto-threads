import { authorService } from "@/services/authors-service";
import Image from "next/image";
import TelegramIcon from "@/assets/icons/telegram-2.svg";
import XIcon from "@/assets/icons/x.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import { Link2 } from "lucide-react";

export async function AuthorFollow({ author_id }: { author_id: string }) {
  const author = await authorService.getAuthorById(author_id);
  if (!author) {
    return null;
  }

  console.log("author11", author);

  const SOCIAL_TYPE_OPTIONS = [
    {
      value: "telegram",
      label: "Telegram",
      icon: <Image src={TelegramIcon} alt="Telegram" width={40} height={40} />,
    },
    {
      value: "x",
      label: "X (Twitter)",
      icon: <Image src={XIcon} alt="X" width={40} height={40} />,
    },
    {
      value: "facebook",
      label: "Facebook",
      icon: <Image src={FacebookIcon} alt="Facebook" width={40} height={40} />,
    },
    {
      value: "instagram",
      label: "Instagram",
      icon: (
        <Image src={InstagramIcon} alt="Instagram" width={40} height={40} />
      ),
    },
    { value: "other", label: "Other", icon: <Link2 className="w-4 h-4" /> },
  ];

  const getSocialIcon = (platform: string) => {
    const option = SOCIAL_TYPE_OPTIONS.find((opt) => opt.value === platform);
    return option?.icon || <Link2 className="w-4 h-4" />;
  };

  return (
    <div className="flex gap-6 justify-between py-8 my-8 border-y border-gray-300 dark:border-gray-400">
      <div className="flex gap-4">
        {author.author.avatarUrl ? (
          <Image
            src={author.author.avatarUrl}
            alt={author.author.penName}
            width={144}
            height={144}
            className="object-cover w-36 h-36 flex-shrink-0 shadow-sm rounded-lg"
          />
        ) : (
          <span className="text-lg font-bold text-muted-foreground uppercase bg-gray-200 dark:bg-gray-500 rounded-full  w-12 h-12 flex items-center justify-center">
            {author.author.penName.charAt(0)}
          </span>
        )}
        <div className="flex flex-col">
          <span className="font-medium text-gray-600 dark:text-gray-400">
            WRITTEN BY
          </span>
          <span className="text-lg text-foreground font-semibold">
            {author.author.penName}
          </span>
          <span className="text-muted-foreground">
            {author.author.description}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-shrink-0">
        <span className="font-medium text-sm text-gray-600 dark:text-gray-400">
          FOLLOW
        </span>
        <span className="text-lg text-foreground font-semibold">
          {author.author.penName}
        </span>
        <div className="flex items-center gap-2">
          {author.author.socials &&
          (Array.isArray(author.author.socials)
            ? author.author.socials.length > 0
            : Object.keys(author.author.socials).length > 0) ? (
            Array.isArray(author.author.socials) ? (
              // Handle array format
              author.author.socials.map(
                (social: Record<string, string>, index) => {
                  let key, value;
                  if (social.key && social.value) {
                    key = social.key;
                    value = social.value;
                  } else {
                    key = Object.keys(social)[0];
                    value = Object.values(social)[0];
                  }
                  return (
                    <a
                      key={index}
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50"
                    >
                      {getSocialIcon(key)}
                      <span className="font-medium">{key}:</span>
                      <span className="ml-1">{value}</span>
                    </a>
                  );
                }
              )
            ) : (
              // Handle object format
              <div className="flex items-center gap-4">
                {Object.entries(
                  author.author.socials as Record<string, string>
                ).map(([key, value]) => (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50"
                  >
                    {getSocialIcon(key)}
                  </a>
                ))}
              </div>
            )
          ) : (
            <p className="text-gray-500 text-sm">No social links added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
