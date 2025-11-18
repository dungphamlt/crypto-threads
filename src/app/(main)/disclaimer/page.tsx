import Header from '@/components/header';
import { Footer } from '@/components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-semibold text-foreground">Disclaimer</h1>
        </section>
      </main>
      <Footer />
    </div>
  );
}

