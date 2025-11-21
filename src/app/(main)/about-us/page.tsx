import Header from '@/components/header';
import { Footer } from '@/components/footer';
import type { Metadata } from 'next';
import Link from 'next/link';
import { IntroImageSlider } from '@/components/about/intro-image-slider';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn more about Crypto Threads – our mission, team and how we empower the community with trustworthy crypto insights.',
};

const achievementsStats = [
  { value: '20+', label: 'Lorem ipsum' },
  { value: '60+', label: 'Lorem ipsum' },
  { value: '80%', label: 'Lorem ipsum' },
  { value: '99+', label: 'Lorem ipsum' },
];

const introImages = [
  {
    src: 'https://wallpapercave.com/wp/wp11456379.jpg',
    alt: 'Creative workspace with vibrant colors',
  },
  {
    src: 'https://img.freepik.com/premium-photo/engaging-team-collaboration-training-session-modern-office_1198884-13748.jpg',
    alt: 'Team collaboration session',
  },
  {
    src: 'https://thumbs.dreamstime.com/b/illustration-featuring-interconnected-laptops-digital-representations-cryptocurrency-data-platforms-visualizes-modern-372159319.jpg',
    alt: 'Modern blockchain data visualization',
  },
];

const partners = [
  {
    id: 1,
    name: 'Chainbase',
    logo:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'LumenPay',
    logo:
      'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'NordWare',
    logo:
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Atlas Node',
    logo:
      'https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Vector Labs',
    logo:
      'https://images.unsplash.com/photo-1421757350652-9f65a35effc7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    name: 'PrimeFi',
    logo:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 7,
    name: 'Archetype',
    logo:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 8,
    name: 'NovaVault',
    logo:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 9,
    name: 'Helix Studio',
    logo:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 10,
    name: 'Lumina',
    logo:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&q=80',
  }
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="flex-1">
        {/* HERO: About Crypto Threads */}
        <section className="container mx-auto px-4 pt-20 pb-24">
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.18em] uppercase my-12">
            About Crypto Threads
          </h1>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] items-start">
            <IntroImageSlider images={introImages} />

            <div className="space-y-5">
              <div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]">
                  About us
                </p>
                <h2 className="mt-1 text-xl sm:text-2axl font-bold uppercase">
                  We always make the best
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Crypto Threads is your go‑to platform for the latest news, insights, and analysis in
                the ever‑evolving world of cryptocurrency and blockchain technology. We cut through
                the noise to deliver clear, concise, and impactful content that keeps you informed
                and ahead of the curve.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                From breaking news to deep‑dive analysis, market trends, and educational resources,
                we empower crypto enthusiasts with the knowledge they need to navigate the digital
                asset space. Whether you&apos;re a seasoned expert or just starting your crypto
                journey, Crypto Threads is here to provide the most relevant and up‑to‑date
                information—all in one place.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Join us as we unravel the complexities of blockchain, one thread at a time!
              </p>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="container mx-auto px-4 py-20 border-t border-border/40">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] items-start">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold uppercase">
                Achievements
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Crypto Threads is your go‑to platform for the latest news, insights, and analysis in
                the ever‑evolving world of cryptocurrency and blockchain technology. We cut through
                the noise to deliver clear, concise, and impactful content that keeps you informed
                and ahead of the curve.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                From breaking news to deep‑dive analysis, market trends, and educational resources,
                we empower crypto enthusiasts with the knowledge they need to navigate the digital
                asset space. Whether you&apos;re a seasoned expert or just starting your crypto
                journey, Crypto Threads is here to provide the most relevant and up‑to‑date
                information—all in one place.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Join us as we unravel the complexities of blockchain, one thread at a time!
              </p>
            </div>

            {/* Right stats */}
            <div className="grid grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10 text-center place-items-center self-center">
              {achievementsStats.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold">{item.value}</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GET IN TOUCH */}
        <section className="w-full bg-muted/70 py-12 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden bg-background shadow-lg">
              <div
                className="w-full h-48 sm:h-60 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1200&q=80)',
                }}
              />
              <div className="px-6 sm:px-10 py-10 text-center space-y-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase">
                  Get in touch
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Crypto Threads is your go‑to platform for the latest news, insights, and analysis
                  in the ever‑evolving world of cryptocurrency and blockchain technology. We cut
                  through the noise to deliver clear, concise, and impactful content that keeps you
                  informed and ahead of the curve.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 py-2.5 text-xs sm:text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERS */}
        <section className="container mx-auto px-4 py-20 space-y-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold uppercase">Partners</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="aspect-[4/3] rounded-xl bg-muted/60 border border-border/40 flex items-center justify-center text-xs text-muted-foreground overflow-hidden"
                style={{
                  backgroundImage: `url(${partner.logo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <span className="sr-only">{partner.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* BRAND RESOURCES & GUIDELINE */}
        <section className="container mt-10 mx-auto px-4 pt-20 border-t border-border/40">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] items-start">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold uppercase">
                Brand resources & guideline
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Crypto Threads is your go‑to platform for the latest news, insights, and analysis in
                the ever‑evolving world of cryptocurrency and blockchain technology. We cut through
                the noise to deliver clear, concise, and impactful content that keeps you informed
                and ahead of the curve.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                From breaking news to deep‑dive analysis, market trends, and educational resources,
                we empower crypto enthusiasts with the knowledge they need to navigate the digital
                asset space. Whether you&apos;re a seasoned expert or just starting your crypto
                journey, Crypto Threads is here to provide the most relevant and up‑to‑date
                information—all in one place.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Join us as we unravel the complexities of blockchain, one thread at a time!
              </p>
            </div>

            {/* guideline card */}
            <div className="flex items-center justify-center self-center bg-gray-200 rounded-xl">
              <div className="w-full max-w-sm rounded-xl bg-muted px-8 py-10 text-center space-y-4">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em]">
                  Our guideline
                </p>
                <Link
                  href="/brand-guideline"
                  className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide hover:opacity-90 transition"
                >
                  Download PDF
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
