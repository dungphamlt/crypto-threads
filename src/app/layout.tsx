import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactQueryProvider from "@/app/providers/react-query-provider";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import CoinSlider from "@/components/coin-slider";
import Navigation from "@/components/client/navigation";
import { ThemeProvider } from "@/context/theme-context";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Home | Crypto Threads",
  description: "cryptothreads.blog",
  keywords: "crypto, blockchain, news, insights, trading, learn",
  icons: {
    icon: "/image/logo.png",
  },
  openGraph: {
    title: "Home | Crypto Threads",
    description: "cryptothreads.blog",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Crypto Threads Open Graph Image",
      },
    ],
  },
  other: {
    "Content-Security-Policy": "img-src 'self' data: https:;",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-screen flex flex-col`}>
        <ReactQueryProvider>
          <ThemeProvider>
            <CoinSlider />
            <div className="container mx-auto">
              <Link href="/" className="flex items-center gap-4 py-4">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={60}
                  height={60}
                  className=""
                />
                <span className="text-3xl text-gray-900 dark:text-white transition-colors">
                  Crypto Threads
                </span>
              </Link>
            </div>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
