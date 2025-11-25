import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { postService } from "@/services/posts-service";
import { notFound } from "next/navigation";
// import Script from "next/script";
import Image from "next/image";
import { BtnGoToTop } from "@/components/btn-go-to-top";
import { ArticleSidebar } from "@/components/articles/server-components/article-sidebar";
import { AuthorFollow } from "@/components/authors/author-follow";
import { ArticleAuthor } from "@/components/articles/article-author";
import { ArticleListMore } from "@/components/articles/server-components/article-list-more";

export default async function Page({
  params,
}: {
  params: Promise<{ articleSlug: string }>;
}) {
  const { articleSlug } = await params;
  const post = await postService.getPostBySlug(articleSlug);
  console.log("post", post, articleSlug);

  if (!post) {
    notFound();
  }
  console.log("post11111", post.creator.id);

  return (
    <div className="container">
      {/* <Script
        strategy="beforeInteractive"
        id="article-schema"
        type="application/ld+json"
        // dangerouslySetInnerHTML={{ __html: JSON.stringify(post) }}
      /> */}
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        <article className="md:col-span-2">
          <h3 className="font-semibold text-primary/70 uppercase mb-4">
            {post.category.key}
          </h3>
          <h1 className="text-4xl font-semibold text-foreground mb-8">
            {post.title}
          </h1>
          <div className="flex gap-3 mb-8">
            {post.creator.avatarUrl ? (
              <Image
                src={post.creator.avatarUrl}
                alt={post.creator.penName}
                width={32}
                height={32}
                className="rounded-full object-cover w-12 h-12 flex-shrink-0 shadow-sm"
              />
            ) : (
              <span className="text-lg font-bold text-muted-foreground uppercase bg-gray-200 dark:bg-gray-500 rounded-full  w-12 h-12 flex items-center justify-center">
                {post.creator.penName.charAt(0)}
              </span>
            )}
            <div className="flex flex-col">
              <span className="font-medium text-foreground">
                {post.creator.penName}
              </span>
              <span className="text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            {post.subCategory?.key && (
              <div className="flex gap-2 ml-4">
                <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                <h4 className="text-md font-semibold text-muted-foreground">
                  {post.subCategory.key}
                </h4>
              </div>
            )}
          </div>
          <div className="flex-col-reverse col md:row gap-8">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          <div className="flex items-center flex-wrap gap-4 mt-8">
            {post.tags.map((tag) => (
              <div
                key={tag}
                className="text-sm font-medium text-muted-foreground bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2"
              >
                {tag}
              </div>
            ))}
          </div>
        </article>
        <div className="md:col-span-1 hidden md:block">
          <ArticleSidebar />
        </div>
      </div>
      <AuthorFollow author_id={post.creator.id} />
      <div className="py-8">
        <div className="flex items-center gap-4">
          <h2 className="text-lg uppercase font-semibold text-gray-600 dark:text-gray-400">
            More articles by
          </h2>
          <h2 className="text-lg font-semibold text-foreground uppercase">
            {post.creator.penName}
          </h2>
        </div>
        <ArticleAuthor author_id={post.creator.id} />
        <ArticleListMore />
      </div>
      <Footer />
      <BtnGoToTop />
    </div>
  );
}
