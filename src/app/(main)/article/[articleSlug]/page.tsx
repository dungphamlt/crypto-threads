import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { postService } from "@/services/posts-service";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BtnGoToTop } from "@/components/btn-go-to-top";
import { ArticleSidebar } from "@/components/articles/server-components/article-sidebar";
import { AuthorFollow } from "@/components/authors/author-follow";
import { ArticleAuthor } from "@/components/articles/client-components/article-author";
import { ShareSocials } from "@/components/articles/share-socials";
import Head from "next/head";
import CoinSlider from "@/components/coins/coin-slider";
import { TableContent } from "@/components/articles/table-content";
import { HotTopicSection } from "@/components/articles/hot-topic-section";
import { ArticleListWithSidebar } from "@/components/articles/article-list-with-sidebar";

export default async function Page({
  params,
}: {
  params: Promise<{ articleSlug: string }>;
}) {
  const { articleSlug } = await params;
  const post = await postService.getPostBySlug(articleSlug);

  if (!post) {
    notFound();
  }

  const metadata = {
    title: `${post.title} - Crypto Threads`,
    description: post.metaDescription,
    images: post.coverUrl,
  };
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:image" content={metadata.images} />
      </Head>
      <Header />

      <main className="container relative">
        <CoinSlider />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 md:py-8">
          <article className="md:col-span-2 relative">
            <h3 className="font-bold text-primary mb-2 md:mb-4">
              {post.category.key}
            </h3>
            <h1 className="text-xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <p className="text-muted-foreground mb-4 hidden md:block">
              {post.excerpt}.
            </p>
            <div className="flex gap-3 mb-8">
              {post.creator.avatarUrl ? (
                <Image
                  src={post.creator.avatarUrl}
                  alt={post.creator.penName}
                  width={32}
                  height={32}
                  className="rounded-full object-cover w-12 h-12 shrink-0 shadow-sm"
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
            {/* image cover */}
            {post.coverUrl && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
                <Image
                  src={post.coverUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="content-post mt-8">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            <div className="flex items-center flex-wrap gap-4 mt-8">
              {post.tags.map((tag) => (
                <div
                  key={tag}
                  className="text-sm font-medium text-primary bg-primary/20 dark:bg-gray-700 rounded-full px-6 py-1.5"
                >
                  {tag}
                </div>
              ))}
            </div>
            <ShareSocials />
          </article>
          <div className="md:col-span-1 hidden md:block">
            <div className="sticky top-8 space-y-6">
              <TableContent content={post.content} />
              <ArticleSidebar />
            </div>
          </div>
        </div>
        <AuthorFollow author_id={post.creator.id} />
        <div className="py-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-gray-600 dark:text-gray-400">
              More articles by
            </h2>
            <h2 className="text-lg font-bold text-foreground uppercase">
              {post.creator.penName}
            </h2>
          </div>
          <ArticleAuthor author_id={post.creator.id} />
          {/* <ArticleListMore /> */}
          <HotTopicSection limit={3} />
          <ArticleListWithSidebar limit={10} />
        </div>
      </main>
      <Footer />
      <BtnGoToTop />
    </>
  );
}
