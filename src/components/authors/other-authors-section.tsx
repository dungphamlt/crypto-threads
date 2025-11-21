import Image from "next/image";
import Link from "next/link";
import type { OtherAuthor } from "@/services/authors-service";

interface OtherAuthorsSectionProps {
  otherAuthors: OtherAuthor[];
}

export function OtherAuthorsSection({ otherAuthors }: OtherAuthorsSectionProps) {
  if (otherAuthors.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground uppercase">
        Others Authors
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {otherAuthors.map((author) => (
          <Link
            key={author.id}
            href={`/author/${author.id}`}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden group-hover:scale-105 transition-transform">
              {author.avatarUrl ? (
                <Image
                  src={author.avatarUrl}
                  alt={author.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  No Image
                </div>
              )}
            </div>
            <p className="text-sm md:text-base font-semibold uppercase text-foreground text-center">
              {author.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

