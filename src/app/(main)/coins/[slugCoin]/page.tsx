import Header from "@/components/header";
import { Footer } from "@/components/footer";
import CoinSlider from "@/components/coins/coin-slider";
import { CoinAboutSection, CoinDetailHeader, CoinKeyMetrics, TradingViewChart, MarketTable, CoinFAQSection, CoinMarketNews } from "@/components/coins";
import { fetchCoinDetail } from "@/services/coins-service";
import { postService } from "@/services/posts-service";

export default async function CoinPage({
    params,
    searchParams,
}: {
    params: Promise<{ slugCoin: string }>;
    searchParams: Promise<{ price?: string; change?: string }>;
}) {
    const { slugCoin } = await params;
    const { price, change } = await searchParams;

    const coin = await fetchCoinDetail(slugCoin, {
        price: price ? parseFloat(price) : undefined,
        price_change_percentage_24h: change ? parseFloat(change) : undefined,
    });
    const posts = await postService.getLatestPosts(10);

    if (!coin) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                        <p className="text-red-600 dark:text-red-400">
                            Failed to load coin data. Please try again later.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const description = coin.about || "No description available.";

    return (
        <div>
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 space-y-2">
                <CoinSlider />
                <div className="mx-auto py-8">
                    <div className="mx-auto">
                        {/* Header */}
                        <CoinDetailHeader coin={coin} />

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column - Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Price Chart */}
                                <TradingViewChart
                                    symbol={coin.symbol || slugCoin}
                                    coinName={coin.name || slugCoin}
                                    height={570}
                                />

                                {/* About Section */}
                                <CoinAboutSection description={description} />

                                {/* Coin Market News */}
                                <CoinMarketNews
                                    coinName={coin.name}
                                    coinSymbol={coin.symbol}
                                    posts={posts}
                                />
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <CoinKeyMetrics coin={coin} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Market */}
                <MarketTable />

                {/* Section */}
                {/* <CoinListsSection /> */}

                {/* FAQ Section */}
                <CoinFAQSection />
            </main>
            <Footer />
        </div>
    );
}
