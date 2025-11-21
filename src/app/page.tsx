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
import { BreakStrip } from "@/components/break-strip";
import { BtnGoToTop } from "@/components/btn-go-to-top";

export default async function LandingPage() {
  return (
    <div className="container relative">
      <Header />
      <main className="space-y-12">
        <CoinSlider />
        <ArticleListSection mainPostLimit={1} sidePostsLimit={4} />
        <CoinListsSection />
        <BreakStrip />
        <ArticleCategoryColumnsSection />
        <HotTopicSection limit={3} />
        <ArticleListWithSidebar limit={10} />
      </main>
      <Footer />
      <BtnGoToTop />
    </div>
  );
}
