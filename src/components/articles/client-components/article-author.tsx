import { postService } from "@/services/posts-service";
import { ArticleAuthorCard } from "./article-author-card";
import { ArticleAuthorSlider } from "./article-author-slider";

export async function ArticleAuthor({ author_id }: { author_id: string }) {
  const posts = await postService.getPostsByAuthor(author_id, 10);
  if (posts.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 hidden md:grid">
        {posts.slice(0, 3).map((post) => (
          <ArticleAuthorCard key={post._id || post.id} post={post} />
        ))}
      </div>
      <div className="block md:hidden mt-4 mb-8">
        <ArticleAuthorSlider posts={posts} />
      </div>
    </section>
  );
}
