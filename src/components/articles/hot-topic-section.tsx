import { postService } from "@/services/posts-service";
import { MainArticleCard } from "./main-article-card";
import { HotTopicSlider } from "./hot-topic-slider";

interface HotTopicSectionProps {
  limit?: number;
}

export async function HotTopicSection({ limit = 3 }: HotTopicSectionProps) {
  const posts = await postService.getPopularPosts(limit);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 my-20">
      <h2 className="text-2xl font-bold uppercase text-foreground">
        HOT TOPIC
      </h2>
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <MainArticleCard key={post._id || post.id} post={post} />
        ))}
      </div>
      <HotTopicSlider posts={posts} />
    </section>
  );
}

