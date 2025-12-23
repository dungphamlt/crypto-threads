import Header from "@/components/header";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import Image from "next/image";
import banner from "@/assets/images/disclaimer-banner.jpg";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer and terms of use for Crypto Threads",
};

export default function DisclaimerPage() {
  return (
    <div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mx-auto px-4 pt-12 sm:pt-20 lg:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-30 mb-12">
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-funnel">
                Disclaimer
              </h1>
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Crypto Threads is a news and media platform dedicated to
                  providing information, analysis, and updates on cryptocurrency
                  and blockchain technology. While we strive for accuracy and
                  reliability, all content on our platform is provided for
                  informational purposes only.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Crypto Threads does not guarantee the completeness,
                  timeliness, or accuracy of the information published. Readers
                  are advised to independently verify any data before making
                  decisions based on our content. Crypto Threads is not
                  responsible for any errors, omissions, or any actions taken
                  based on the information provided on this platform. By
                  accessing and using Crypto Threads, you acknowledge and agree
                  to these disclaimers.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  By accessing and using Crypto Threads, you acknowledge and
                  agree to these disclaimers.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-funnel">
                Disclosure
              </h1>
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Crypto Threads is a news and media platform dedicated to
                  providing information, analysis, and updates on cryptocurrency
                  and blockchain technology. While we strive for accuracy and
                  reliability, all content on our platform is provided for
                  informational purposes only.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Crypto Threads does not guarantee the completeness,
                  timeliness, or accuracy of the information published. Readers
                  are advised to independently verify any data before making
                  decisions based on our content. Crypto Threads is not
                  responsible for any errors, omissions, or any actions taken
                  based on the information provided on this platform. By
                  accessing and using Crypto Threads, you acknowledge and agree
                  to these disclaimers.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  By accessing and using Crypto Threads, you acknowledge and
                  agree to these disclaimers.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Policy link */}
          {/* <div className="mb-12">
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-foreground font-semibold uppercase"
            >
              PRIVACY POLICY
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div> */}

          <div className="relative w-full aspect-[16/7] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={banner}
              alt="Crypto Threads disclaimer banner"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
