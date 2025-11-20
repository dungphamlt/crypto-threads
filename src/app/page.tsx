import CoinSlider from "@/components/coins/coin-slider";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import {
  ArticleListSection,
  ArticleCategoryColumnsSection,
} from "@/components/articles";
import { CoinListsSection } from "@/components/coins";
import { BreakStrip } from "@/components/break-strip";

export default async function LandingPage() {
  return (
    <div className="container">
      <Header />
      <main className="space-y-12">
        <CoinSlider />
        <ArticleListSection mainPostLimit={1} sidePostsLimit={4} />
        <CoinListsSection />
        <BreakStrip />
        <ArticleCategoryColumnsSection />
      </main>
      <Footer />
    </div>
  );
}
