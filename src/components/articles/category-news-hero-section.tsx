import type { Post } from "@/types";
import { MainArticleCard } from "./main-article-card";

interface CategoryNewsHeroSectionProps {
  featuredPost: Post | null;
  category: {
    title: string;
    description: string;
  };
}

export function CategoryNewsHeroSection({
  featuredPost,
  category,
}: CategoryNewsHeroSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 mb-12">
      {/* Featured Article */}
      <div>
        {featuredPost ? (
          <MainArticleCard post={featuredPost} />
        ) : (
          <div className="w-full aspect-video rounded-lg bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No featured article</p>
          </div>
        )}
      </div>

      {/* Category Info */}
      <div className="flex flex-col justify-center">
        <div className="bg-muted rounded-lg p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-foreground mb-4">
            {category.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>
    </div>
  );
}

