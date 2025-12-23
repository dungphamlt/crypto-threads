import Header from '@/components/header';
import { Footer } from '@/components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Author',
};

export default function AuthorPage() {
  return (
    <div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-semibold text-foreground">Author</h1>
        </section>
      </main>
      <Footer />
    </div>
  );
}

