import CoinSlider from "@/components/coins/coin-slider";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import {
  ArticleListSection,
  ArticleCategoryColumnsSection,
  HotTopicSection,
  ArticleListWithSidebar,
} from "@/components/articles";
import { CoinListsSection } from "@/components/coins";
// import { BreakStrip } from "@/components/break-strip";
import { BtnGoToTop } from "@/components/btn-go-to-top";
import Image from "next/image";
import StayImage from "@/assets/images/stay.png";
import StayImageMobile from "@/assets/images/stay-mb.png";

export default async function LandingPage() {
  return (
    <div className="relative">
      <Header />
      <main className="md:space-y-12 container">
        <CoinSlider />
        <ArticleListSection mainPostLimit={1} sidePostsLimit={4} />
        <CoinListsSection />
        {/* <BreakStrip /> */}
        <div className="my-14 hidden md:block">
          <Image
            src={StayImage}
            alt="Break Strip"
            width={1000}
            height={1000}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="mb-8 block md:hidden">
          <Image
            src={StayImageMobile}
            alt="Break Strip"
            width={375}
            height={375}
            className="w-full h-auto object-cover"
          />
        </div>
        <ArticleCategoryColumnsSection />
        <HotTopicSection limit={3} />
        <ArticleListWithSidebar limit={10} />
      </main>
      <Footer />
      <BtnGoToTop />
    </div>
  );
}
