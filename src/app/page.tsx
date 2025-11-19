import CoinSlider from "@/components/coin-slider";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
export default async function LandingPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main>
        <CoinSlider />
      </main>
      <Footer />
    </div>
  );
}
