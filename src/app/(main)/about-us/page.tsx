import Header from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import Image from 'next/image';
import BgStripedGradient from '@/assets/images/bg-striped-gradient.png';
import { Logo } from '@/components/logo';
// import { IntroImageSlider } from '@/components/about/intro-image-slider';

const achievementsStats = [
  { value: '20+', label: 'lorem ipsum' },
  { value: '60+', label: 'lorem ipsum' },
  { value: '80%', label: 'lorem ipsum' },
  { value: '99+', label: 'lorem ipsum' },
];

// const introImages = [
//   {
//     src: 'https://wallpapercave.com/wp/wp11456379.jpg',
//     alt: 'Creative workspace with vibrant colors',
//   },
//   {
//     src: 'https://img.freepik.com/premium-photo/engaging-team-collaboration-training-session-modern-office_1198884-13748.jpg',
//     alt: 'Team collaboration session',
//   },
//   {
//     src: 'https://thumbs.dreamstime.com/b/illustration-featuring-interconnected-laptops-digital-representations-cryptocurrency-data-platforms-visualizes-modern-372159319.jpg',
//     alt: 'Modern blockchain data visualization',
//   },
// ];

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
    <div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* HERO: About Crypto Threads */}
        <section className="mx-auto py-6">
          <h1 className="text-center text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-[0.18em] my-12 font-funnel">
            About Crypto Threads
          </h1>

          <div className="grid gap-10 lg:grid-cols-2 items-center ">
            {/* <IntroImageSlider images={introImages} /> */}
            <div className="flex items-center h-full order-2 lg:order-none">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-primary">
                {/* <Image
                              src={BgStripedGradient}
                              alt="Crypto Threads background"
                              fill
                              className="object-cover"
                              priority
                              sizes="(max-width: 640px) 360px, 420px"
                            /> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-5">
                  <Logo className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-white" />
                  {/* <span className="text-2xl sm:text-3xl md:text-4xl font-semibold font-funnel tracking-tight text-center">
                    Crypto Threads
                  </span> */}
                </div>
              </div>
            </div>

            <div className="space-y-5 order-1 lg:order-none">
              <div>
                <p className="text-xs sm:text-xl font-bold font-funnel">
                  About us
                </p>
                <h2 className="mt-1 text-xl sm:text-3xl font-bold font-funnel">
                  We always make the best
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-medium">
                Crypto Threads is your go‑to platform for the latest news, insights, and analysis in
                the ever‑evolving world of cryptocurrency and blockchain technology. We cut through
                the noise to deliver clear, concise, and impactful content that keeps you informed
                and ahead of the curve.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-medium">
                From breaking news to deep‑dive analysis, market trends, and educational resources,
                we empower crypto enthusiasts with the knowledge they need to navigate the digital
                asset space. Whether you&apos;re a seasoned expert or just starting your crypto
                journey, Crypto Threads is here to provide the most relevant and up‑to‑date
                information—all in one place.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground font-bold">
                Join us as we unravel the complexities of blockchain, one thread at a time!
              </p>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="mx-auto py-8 md:py-20 border-t border-border/40">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Achievements
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-medium">
                Crypto Threads is your go‑to platform for the latest news, insights, and analysis in
                the ever‑evolving world of cryptocurrency and blockchain technology. We cut through
                the noise to deliver clear, concise, and impactful content that keeps you informed
                and ahead of the curve.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-medium">
                From breaking news to deep‑dive analysis, market trends, and educational resources,
                we empower crypto enthusiasts with the knowledge they need to navigate the digital
                asset space. Whether you&apos;re a seasoned expert or just starting your crypto
                journey, Crypto Threads is here to provide the most relevant and up‑to‑date
                information—all in one place.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                Join us as we unravel the complexities of blockchain, one thread at a time!
              </p>
            </div>

            {/* Right stats */}
            <div className="grid grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10 place-items-center ">
              {achievementsStats.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="text-3xl sm:text-6xl font-extrabold">{item.value}</div>
                  <div className="text-xl sm:text-3xl font-semibold tracking-wide text-muted-foreground font-funnel">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GET IN TOUCH */}
        <section className="w-full py-12 md:py-16">
          <div className="mx-auto">
            <div className="relative w-full rounded-3xl overflow-hidden">
              <Image
                src={BgStripedGradient}
                alt="Get in touch background"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 960px"
              />
              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white gap-4 py-10 sm:py-12 md:py-16 px-6 sm:px-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-funnel">
                  Get in touch
                </h2>
                <p className="max-w-2xl text-xs sm:text-sm md:text-[13px] leading-relaxed text-white/90 font-medium">
                  Crypto Threads is your go-to platform for the latest news, insights, and analysis in
                  the ever-evolving world of cryptocurrency and blockchain technology. We cut through
                  the noise to deliver clear, concise, and impactful content that keeps you informed
                  and ahead of the curve.
                </p>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-white text-primary px-8 py-2.5 text-xs sm:text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERS */}
        <section className="mx-auto py-2 md:py-6  space-y-5 md:space-y-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold font-funnel">Partners</h2>
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
        <section className="mx-auto py-4 md:py-10 mt-4 border-t border-border/40">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold font-funnel">
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
            <div className="flex items-center justify-center self-center bg-primary rounded-xl">
              <div className="w-full max-w-sm rounded-xl bg-muted px-8 py-10 text-center space-y-4">
                <p className="text-xl sm:text-2xl font-semibold text-white font-funnel">
                  Our guideline
                </p>
                <Link
                  href="/brand-guideline"
                  className="inline-flex items-center justify-center rounded-lg bg-white text-black px-6 py-2 text-xs sm:text-sm font-bold font-funnel tracking-wide hover:opacity-90 transition"
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
