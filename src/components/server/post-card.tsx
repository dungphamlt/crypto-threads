import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

interface PostCardProps {
  post: Post;
}

const isValidUrl = (url: string | undefined): boolean => {
  if (!url || url.trim() === "") return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/posts/${post.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={
              isValidUrl(post.coverUrl) ? post.coverUrl! : "/default-cover.jpg"
            }
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
              {post.category.key}
            </span>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {formatDate(post.publishTime)}
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
            <span>{post.creator.penName}</span>
            <span>{post.views} views</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
