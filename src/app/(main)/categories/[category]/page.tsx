import { postService } from "@/services/posts-service";
import { categoryService } from "@/services/categories-service";
import { notFound } from "next/navigation";
import PostList from "@/components/server/post-list";

interface PageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const [category, posts] = await Promise.all([
    categoryService.getCategoryByKey(params.category),
    postService.getPostsByCategory(params.category, 12),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-gray-600 dark:text-gray-300">
            {category.description}
          </p>
        )}
      </div>

      <PostList posts={posts} />
    </div>
  );
}
