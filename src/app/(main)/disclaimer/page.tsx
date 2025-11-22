import Header from '@/components/header';
import { Footer } from '@/components/footer';
import type { Metadata } from 'next';
import { Logo } from '@/components/logo';
import { StudioIntroSlider } from '@/components/studio/studio-intro-slider';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer and terms of use for Crypto Threads',
};

const studioIntroImages = [
  {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    alt: 'Studio workspace',
  },
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Studio equipment',
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    alt: 'Studio setup',
  },
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    alt: 'Studio collaboration',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Studio team',
  },
];

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="flex-1">
        <section className="mx-auto px-4 pt-12 sm:pt-20 lg:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 mb-12">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-foreground">
                DISCLAIMER
              </h1>
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Crypto Threads is a news and media platform dedicated to providing information, analysis, and updates on cryptocurrency and blockchain technology. While we strive for accuracy and reliability, all content on our platform is provided for informational purposes only.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Crypto Threads does not guarantee the completeness, timeliness, or accuracy of the information published. Readers are advised to independently verify any data before making decisions based on our content. Crypto Threads is not responsible for any errors, omissions, or any actions taken based on the information provided on this platform. By accessing and using Crypto Threads, you acknowledge and agree to these disclaimers.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  By accessing and using Crypto Threads, you acknowledge and agree to these disclaimers.
                </p>
              </div>
            </div>

            {/* logo */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm aspect-square rounded-xl bg-muted flex items-center justify-center">
                <Logo className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 text-foreground" />
              </div>
            </div>
          </div>

          {/* Privacy Policy link */}
          <div className="mb-12">
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-foreground font-semibold uppercase"
            >
              PRIVACY POLICY
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Studio Intro Slider */}
          <div className="w-full">
            <StudioIntroSlider images={studioIntroImages} autoPlay={true} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
