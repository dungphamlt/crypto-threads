import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthorProfileHeader, AuthorBlogsSection, OtherAuthorsSection } from "@/components/authors";
import { authorService } from "@/services/authors-service";
import { notFound } from "next/navigation";

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;
  const data = await authorService.getAuthorById(id);

  if (!data) {
    notFound();
  }

  return (
    <div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <AuthorProfileHeader author={data.author} />
        <AuthorBlogsSection articles={data.articles} />
        <OtherAuthorsSection otherAuthors={data.otherAuthors} />
      </main>
      <Footer />
    </div>
  );
}

