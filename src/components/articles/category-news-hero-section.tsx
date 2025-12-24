import type { Post } from "@/types";
// import { MainArticleCard } from "./main-article-card";
import { Category } from "@/services/categories-service";
import Image from "next/image";
import Link from "next/link";
import { ArticleMeta } from "./article-meta";

interface CategoryNewsHeroSectionProps {
  featuredPost: Post | null;
  category: Category;
}

export function CategoryNewsHeroSection({
  featuredPost,
  category,
}: CategoryNewsHeroSectionProps) {
  console.log(category, "category");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <div className="relative w-full aspect-[1/1]">
        <Image
          src={category.imageUrl || "/default.jpg"}
          alt={category.key}
          fill
          className="object-cover rounded-lg"
        />
        <h2 className="absolute left-4 top-4 text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-white text-shadow-lg">
          {category.key}
        </h2>
      </div>
      <div className="h-full">
        {/* Featured Article */}

        {featuredPost ? (
          <Link
            href={`/article/${featuredPost.slug}`}
            className="flex flex-col gap-4 h-full"
          >
            {/* Image */}
            <div className="flex-1 w-full rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
              {featuredPost.coverUrl ? (
                <Image
                  src={featuredPost.coverUrl}
                  alt={featuredPost.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="">
              {/* Title */}
              <h2 className="text-2xl sm:text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                {featuredPost.title}
              </h2>

              {/* Author Info */}
              <ArticleMeta
                author={featuredPost.creator?.penName}
                avatarUrl={featuredPost.creator?.avatarUrl}
                authorId={featuredPost.creator?.id}
                date={featuredPost.publishTime || featuredPost.createdAt}
                isShowAvatar={true}
              />
            </div>
          </Link>
        ) : (
          <div className="w-full aspect-video rounded-lg bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No featured article</p>
          </div>
        )}
      </div>
    </div>
  );
}
