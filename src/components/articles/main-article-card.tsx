import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types";
import { ArticleMeta } from "./article-meta";

interface MainArticleCardProps {
  post: Post;
  isHotTopic?: boolean;
}

export function MainArticleCard({
  post,
  isHotTopic = false,
}: MainArticleCardProps) {
  const publishDate = post.publishTime || post.createdAt;

  return (
    <article className="group">
      <Link href={`/article/${post.slug}`} className="block">
        {/* Image */}
        <div
          className={`relative w-full  rounded-lg overflow-hidden mb-4 ${
            isHotTopic ? "aspect-[3/2]" : "aspect-video"
          }`}
        >
          {post.coverUrl ? (
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative">
          {/* Title */}
          <h2
            className={`text-base md:text-lg font-bold min-h-[48px] md:min-h-[56px] ${
              isHotTopic
                ? "text-white group-hover:text-black"
                : "text-foreground group-hover:text-primary"
            } mb-4  transition-colors line-clamp-2`}
          >
            {post.title}
          </h2>

          {/* Author Info */}
          <ArticleMeta
            author={post.creator?.penName}
            avatarUrl={post.creator?.avatarUrl}
            authorId={post.creator?.id}
            date={publishDate}
            isShowAvatar={true}
            isHotTopic={isHotTopic}
          />
        </div>
      </Link>
    </article>
  );
}
