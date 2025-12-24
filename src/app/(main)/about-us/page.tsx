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
      <main className="flex-1 container mx-auto px-4 py-4 md:py-8">
        {/* HERO: About Crypto Threads - Mobile */}
        <section className="mx-auto py-4 md:hidden">
          <div className="bg-white dark:bg-gray-950/50 rounded-2xl border border-border/60 shadow-sm p-4 space-y-2">
            <h1 className="text-lg font-bold text-foreground text-center">
              About crypto threads
            </h1>

            <h2 className="text-2xl font-bold text-primary font-funnel text-center">
              We always make the best
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground font-regular">
              Crypto Threads is your go‑to platform for the latest news, insights, and analysis in
              the ever‑evolving world of cryptocurrency and blockchain technology. We cut through
              the noise to deliver clear, concise, and impactful content that keeps you informed
              and ahead of the curve.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground font-regular">
              From breaking news to deep‑dive analysis, market trends, and educational resources,
              we empower crypto enthusiasts with the knowledge they need to navigate the digital
              asset space. Whether you&apos;re a seasoned expert or just starting your crypto
              journey, Crypto Threads is here to provide the most relevant and up‑to‑date
              information—all in one place.
            </p>
            <p className="text-sm text-muted-foreground font-semibold">
              Join us as we unravel the complexities of blockchain, one thread at a time!
            </p>
          </div>
        </section>

        {/* HERO: About Crypto Threads - Desktop */}
        <section className="hidden md:block mx-auto py-6">
          <h1 className="text-center text-3xl md:text-5xl font-extrabold tracking-[0.18em] my-12 font-funnel">
            About Crypto Threads
          </h1>

          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="flex items-center h-full">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-primary">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-5">
                  <Logo className="w-40 h-40 md:h-48 md:w-48 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-xl font-bold font-funnel">
                  About us
                </p>
                <h2 className="mt-1 text-3xl font-bold font-funnel">
                  We always make the best
                </h2>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground font-medium">
                Crypto Threads is your go‑to platform for the latest news, insights, and analysis in
                the ever‑evolving world of cryptocurrency and blockchain technology. We cut through
                the noise to deliver clear, concise, and impactful content that keeps you informed
                and ahead of the curve.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground font-medium">
                From breaking news to deep‑dive analysis, market trends, and educational resources,
                we empower crypto enthusiasts with the knowledge they need to navigate the digital
                asset space. Whether you&apos;re a seasoned expert or just starting your crypto
                journey, Crypto Threads is here to provide the most relevant and up‑to‑date
                information—all in one place.
              </p>
              <p className="text-sm text-muted-foreground font-bold">
                Join us as we unravel the complexities of blockchain, one thread at a time!
              </p>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS - Mobile */}
        <section className="mx-auto py-4 md:hidden">
          <div className="bg-white dark:bg-gray-950/50 rounded-2xl border border-border/60 shadow-sm p-4 space-y-4">
            <h2 className="text-2xl font-bold text-foreground text-center font-funnel">
              Achievements
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground font-regular">
              Crypto Threads is your go‑to platform for the latest news, insights, and analysis in
              the ever‑evolving world of cryptocurrency and blockchain technology. We cut through
              the noise to deliver clear, concise, and impactful content that keeps you informed
              and ahead of the curve.
            </p>
            <p className="text-sm text-muted-foreground font-semibold">
              Join us as we unravel the complexities of blockchain, one thread at a time!
            </p>

            {/* Line Graph Chart */}
            <div className="mt-6">
              <div className="relative h-48 w-full">
                <svg
                  viewBox="0 0 400 200"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="achievementGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(251, 146, 60, 0.2)" />
                      <stop offset="100%" stopColor="rgba(251, 146, 60, 0)" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 50 150 L 150 120 L 250 80 L 350 40 L 350 200 L 50 200 Z"
                    fill="url(#achievementGradient)"
                  />

                  <path
                    d="M 50 150 L 150 120 L 250 80 L 350 40"
                    fill="none"
                    stroke="#fb923c"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {achievementsStats.map((item, index) => {
                    const x = 50 + (index * 100);
                    const heights = [150, 120, 80, 40];
                    const y = heights[index];

                    return (
                      <g key={item.label}>
                        <circle
                          cx={x}
                          cy={y}
                          r="6"
                          fill="#fb923c"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <text
                          x={x}
                          y={y - 15}
                          textAnchor="middle"
                          className="text-xs font-bold fill-foreground"
                          fontSize="14"
                        >
                          {item.value}
                        </text>
                        <text
                          x={x}
                          y={y + 35}
                          textAnchor="middle"
                          className="text-[10px] fill-muted-foreground uppercase"
                          fontSize="10"
                          fontWeight="600"
                        >
                          {item.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS - Desktop */}
        <section className="hidden md:block mx-auto py-8 md:py-20 border-t border-border/40">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                Achievements
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground font-medium">
                Crypto Threads is your go‑to platform for the latest news, insights, and analysis in
                the ever‑evolving world of cryptocurrency and blockchain technology. We cut through
                the noise to deliver clear, concise, and impactful content that keeps you informed
                and ahead of the curve.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground font-medium">
                From breaking news to deep‑dive analysis, market trends, and educational resources,
                we empower crypto enthusiasts with the knowledge they need to navigate the digital
                asset space. Whether you&apos;re a seasoned expert or just starting your crypto
                journey, Crypto Threads is here to provide the most relevant and up‑to‑date
                information—all in one place.
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                Join us as we unravel the complexities of blockchain, one thread at a time!
              </p>
            </div>

            {/* Right stats */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-10 place-items-center">
              {achievementsStats.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="text-6xl font-extrabold">{item.value}</div>
                  <div className="text-3xl font-semibold tracking-wide text-muted-foreground font-funnel">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GET IN TOUCH - Mobile */}
        <section className="w-full py-4 md:hidden">
          <div className="relative w-full rounded-2xl overflow-hidden bg-primary">
            <Image
              src={BgStripedGradient}
              alt="Get in touch background"
              fill
              className="object-cover opacity-90"
              priority
              sizes="100vw"
            />
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white gap-3 py-8 px-4">
              <h2 className="text-xl font-bold font-funnel uppercase">
                Get in touch
              </h2>
              <p className="text-xs leading-relaxed text-white/90 font-regular">
                Crypto Threads is your go-to platform for the latest news, insights, and analysis in
                the ever-evolving world of cryptocurrency and blockchain technology. We cut through
                the noise to deliver clear, concise, and impactful content that keeps you informed
                and ahead of the curve.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-white text-primary px-6 py-2 text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>

        {/* GET IN TOUCH - Desktop */}
        <section className="hidden md:block w-full py-12 md:py-16">
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
              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white gap-4 py-12 md:py-16 px-10">
                <h2 className="text-3xl md:text-4xl font-bold font-funnel">
                  Get in touch
                </h2>
                <p className="max-w-2xl text-sm md:text-[13px] leading-relaxed text-white/90 font-medium">
                  Crypto Threads is your go-to platform for the latest news, insights, and analysis in
                  the ever-evolving world of cryptocurrency and blockchain technology. We cut through
                  the noise to deliver clear, concise, and impactful content that keeps you informed
                  and ahead of the curve.
                </p>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-white text-primary px-8 py-2.5 text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERS - Mobile */}
        <section className="mx-auto py-4 md:hidden">
          <div className="bg-white dark:bg-gray-950/50 rounded-2xl border border-border/60 shadow-sm p-4 space-y-4">
            <h2 className="text-xl font-bold font-funnel text-foreground text-center">
              Partners
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {partners.slice(0, 12).map((partner) => (
                <div
                  key={partner.id}
                  className="aspect-square rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden"
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
          </div>
        </section>

        {/* PARTNERS - Desktop */}
        <section className="hidden md:block mx-auto py-2 md:py-6 space-y-5 md:space-y-10">
          <h2 className="text-2xl md:text-3xl font-semibold font-funnel">Partners</h2>
          <div className="grid grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
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

        {/* BRAND RESOURCES & GUIDELINE - Mobile */}
        <section className="mx-auto py-4 md:hidden">
          <div className="bg-white dark:bg-gray-950/50 rounded-2xl border border-border/60 shadow-sm p-4 space-y-4">
            <h2 className="text-lg font-bold font-funnel text-foreground text-center uppercase">
              Brand resources & guideline
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground font-regular">
              Crypto Threads is your go‑to platform for the latest news, insights, and analysis in
              the ever‑evolving world of cryptocurrency and blockchain technology. We cut through
              the noise to deliver clear, concise, and impactful content that keeps you informed
              and ahead of the curve.
            </p>
            <p className="text-xs text-muted-foreground font-semibold">
              Join us as we unravel the complexities of blockchain, one thread at a time!
            </p>

            {/* Guideline button */}
            <div className="pt-4">
              <div className="flex items-center justify-center self-center bg-primary rounded-xl">
                <div className="w-full max-w-sm rounded-xl bg-muted px-4 py-5 text-center space-y-4">
                  <p className="text-xl sm:text-2xl font-semibold text-white font-funnel">
                    Our guideline
                  </p>
                  <Link
                    href="/brand-guideline"
                    className="inline-flex items-center justify-center rounded-full bg-white text-primary px-6 py-2 text-xs sm:text-sm font-bold font-funnel tracking-wide hover:opacity-90 transition"
                  >
                    Download PDF
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND RESOURCES & GUIDELINE - Desktop */}
        <section className="hidden md:block mx-auto py-4 md:py-10 mt-4 border-t border-border/40">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold font-funnel">
                Brand resources & guideline
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Crypto Threads is your go‑to platform for the latest news, insights, and analysis in
                the ever‑evolving world of cryptocurrency and blockchain technology. We cut through
                the noise to deliver clear, concise, and impactful content that keeps you informed
                and ahead of the curve.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                From breaking news to deep‑dive analysis, market trends, and educational resources,
                we empower crypto enthusiasts with the knowledge they need to navigate the digital
                asset space. Whether you&apos;re a seasoned expert or just starting your crypto
                journey, Crypto Threads is here to provide the most relevant and up‑to‑date
                information—all in one place.
              </p>
              <p className="text-sm text-muted-foreground">
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
