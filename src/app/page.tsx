import FeaturedPost from "@/components/server/featured-posts";
import PostList from "@/components/server/post-list";
import { postService } from "@/services/posts-service";

export default async function HomePage() {
  const posts = await postService.getPosts();
  console.log("posts", posts);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Posts */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Tin nổi bật</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {posts?.data?.map((post) => (
            <FeaturedPost key={post.id} posts={[post]} />
          ))}
        </div>
      </section>
    </div>
  );
}
