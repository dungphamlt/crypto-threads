import { postService } from "@/services/posts-service";
import { Post } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export async function ArticleAuthor({ author_id }: { author_id: string }) {
  const posts = await postService.getPostsByAuthor(author_id, 3);
  if (posts.length === 0) {
    return null;
  }

  const ArticleCard = ({ post }: { post: Post }) => {
    return (
      <Link href={`/article/${post.slug}`}>
        <div className="cursor-pointer group">
          <div className="flex flex-col gap-3">
            {post.coverUrl ? (
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={post.coverUrl}
                  alt={post.title}
                  fill
                  className="w-full h-full object-cover rounded-lg dark:shadow-sm flex-shrink-0"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-xs text-gray-400">
                No Image
              </div>
            )}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <h3 className="font-semibold text-foreground line-clamp-2 min-h-12 group-hover:text-primary transition-all duration-300">
                {post.title}
              </h3>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground group-hover:text-primary transition-all duration-300">
                <span>By {post.creator.penName}</span>
                <span>•</span>
                <span>{formatDate(new Date(post.createdAt))}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {posts.map((post) => (
          <ArticleCard key={post._id || post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
