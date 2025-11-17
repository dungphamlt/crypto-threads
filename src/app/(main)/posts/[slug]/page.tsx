import { postService } from "@/services/posts-service";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, Eye } from "lucide-react";
import ViewCounter from "@/components/client/view-counter";

const isValidUrl = (url: string | undefined): boolean => {
  if (!url || url.trim() === "") return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await postService.getPostBySlug(slug);
  console.log("post", post, slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
            {post.category.key}
          </span>
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-3">
            {post.creator.avatarUrl && (
              <Image
                src={post.creator.avatarUrl}
                alt={post.creator.penName}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <span className="font-medium text-gray-900 dark:text-white block">
                {post.creator.penName}
              </span>
              <div className="flex items-center gap-3 text-sm mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(post.publishTime).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <ViewCounter postId={post.id} initialViews={post.views} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {post.coverUrl && isValidUrl(post.coverUrl) && (
          <div className="relative h-80 md:h-96 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </header>

      <div
        className="prose prose-lg max-w-none dark:prose-invert 
                   prose-headings:text-gray-900 dark:prose-headings:text-white 
                   prose-p:text-gray-700 dark:prose-p:text-gray-300 
                   prose-a:text-blue-600 dark:prose-a:text-blue-400
                   prose-strong:text-gray-900 dark:prose-strong:text-white
                   prose-li:text-gray-700 dark:prose-li:text-gray-300"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
