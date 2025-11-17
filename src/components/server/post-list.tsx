import { Post } from "@/types";
import PostCard from "./post-card";

interface PostListProps {
  posts: Post[];
  title?: string;
}

export default function PostList({ posts, title }: PostListProps) {
  return (
    <section>
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
