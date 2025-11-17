import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

interface FeaturedPostsProps {
  posts: Post[];
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

export default async function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Featured News
      </h2>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <Link href={`/posts/${post.slug}`}>
              <div className="relative h-64">
                <Image
                  src={
                    isValidUrl(post.coverUrl)
                      ? post.coverUrl!
                      : "/default-cover.jpg"
                  }
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                    {post.category.key}
                  </span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(post.publishTime)}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.creator.penName}</span>
                  <span>{post.views} views</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
