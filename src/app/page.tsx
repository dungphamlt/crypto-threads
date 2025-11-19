import CoinSlider from "@/components/coin-slider";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { ArticleListSection } from "@/components/articles";

export default async function LandingPage() {
  return (
    <div className="container">
      <Header />
      <main className="space-y-12">
        <CoinSlider />
        <ArticleListSection mainPostLimit={1} sidePostsLimit={4} />
      </main>
      <Footer />
    </div>
  );
}
