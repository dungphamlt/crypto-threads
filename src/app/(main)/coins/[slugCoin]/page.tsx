import Header from "@/components/header";
import { Footer } from "@/components/footer";
import CoinSlider from "@/components/coins/coin-slider";
import { CoinAboutSection, CoinDetailHeader, CoinKeyMetrics, CoinListsSection, CoinPriceChart, MarketTable } from "@/components/coins";
import { fetchCoinDetail, fetchCoinMarketChart } from "@/services/coins-service";
import { ArticleListWithViewAll } from "@/components/articles/article-list-with-view-all";
import { postService } from "@/services/posts-service";

export default async function CoinPage({
    params,
}: {
    params: Promise<{ slugCoin: string }>;
}) {
    const { slugCoin } = await params;

    const coin = await fetchCoinDetail(slugCoin);
    const chartData = await fetchCoinMarketChart(slugCoin);
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
            <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
                <CoinSlider />
                <div className="mx-auto py-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <CoinDetailHeader coin={coin} />

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column - Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Price Chart */}
                                {chartData ? (
                                    <CoinPriceChart data={chartData} />
                                ) : (
                                    <div className="w-full h-96 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-center">
                                        <p className="text-muted-foreground">Chart data not available</p>
                                    </div>
                                )}

                                {/* About Section */}
                                <CoinAboutSection description={description} />

                                {/* List article */}
                                <ArticleListWithViewAll posts={posts} layout="list" />
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
                <CoinListsSection />
            </main>
            <Footer />
        </div>
    );
}
