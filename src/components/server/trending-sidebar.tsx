import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Clock, TrendingUp } from "lucide-react";

interface TrendingSidebarProps {
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

export default function TrendingSidebar({ posts }: TrendingSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Trending Now
        </h2>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/news/${post.slug}`}
            className="group block rounded-lg border bg-white/80 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:bg-white/90 dark:hover:bg-gray-900/70 cursor-pointer shadow-sm"
          >
            <div className="p-2">
              <div className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={
                      isValidUrl(post.coverUrl)
                        ? post.coverUrl!
                        : "/default-cover.jpg"
                    }
                    alt={post.title}
                    fill
                    className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <div className="flex items-center text-gray-600 dark:text-gray-500 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDate(post.publishTime)}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
