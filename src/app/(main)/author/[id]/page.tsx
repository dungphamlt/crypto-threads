import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthorProfileHeader, AuthorBlogsSection, OtherAuthorsSection } from "@/components/authors";
import { authorService } from "@/services/authors-service";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await authorService.getAuthorById(id);

  if (!data) {
    return {
      title: "Author Not Found",
    };
  }

  const authorName = data.author.penName || data.author.username;
  return {
    title: `Author: ${authorName}`,
    description: data.author.description || `Articles by ${authorName}`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;
  const data = await authorService.getAuthorById(id);

  if (!data) {
    notFound();
  }

  return (
    <div className="container">
      <Header />
      <main className="flex-1">
        <AuthorProfileHeader author={data.author} />
        <AuthorBlogsSection articles={data.articles} />
        <OtherAuthorsSection otherAuthors={data.otherAuthors} />
      </main>
      <Footer />
    </div>
  );
}

