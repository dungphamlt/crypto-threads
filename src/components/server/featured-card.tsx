import { Clock, TrendingUp } from "lucide-react";

export default function FeatureCards() {
  const features = [
    {
      title: "Market Analysis",
      description:
        "Deep insights into crypto market trends, price movements, and institutional adoption patterns.",
      icon: TrendingUp,
      gradient:
        "from-blue-50 to-blue-100 dark:from-blue-600/10 dark:to-blue-800/10",
      border:
        "border-blue-200 dark:border-blue-800/30 hover:border-blue-300 dark:hover:border-blue-700/50",
      iconBg:
        "bg-blue-100 dark:bg-blue-600/20 group-hover:bg-blue-200 dark:group-hover:bg-blue-600/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Daily Updates",
      description:
        "Stay current with breaking news, regulatory changes, and major developments in the crypto space.",
      icon: Clock,
      gradient:
        "from-purple-50 to-purple-100 dark:from-purple-600/10 dark:to-purple-800/10",
      border:
        "border-purple-200 dark:border-purple-800/30 hover:border-purple-300 dark:hover:border-purple-700/50",
      iconBg:
        "bg-purple-100 dark:bg-purple-600/20 group-hover:bg-purple-200 dark:group-hover:bg-purple-600/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Trading Insights",
      description:
        "Expert analysis, technical indicators, and strategic guidance for crypto trading success.",
      icon: TrendingUp,
      gradient:
        "from-green-50 to-green-100 dark:from-green-600/10 dark:to-green-800/10",
      border:
        "border-green-200 dark:border-green-800/30 hover:border-green-300 dark:hover:border-green-700/50",
      iconBg:
        "bg-green-100 dark:bg-green-600/20 group-hover:bg-green-200 dark:group-hover:bg-green-600/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Education",
      description:
        "Learn blockchain fundamentals, DeFi protocols, and advanced crypto concepts from industry experts.",
      icon: Clock,
      gradient:
        "from-orange-50 to-orange-100 dark:from-orange-600/10 dark:to-orange-800/10",
      border:
        "border-orange-200 dark:border-orange-800/30 hover:border-orange-300 dark:hover:border-orange-700/50",
      iconBg:
        "bg-orange-100 dark:bg-orange-600/20 group-hover:bg-orange-200 dark:group-hover:bg-orange-600/30",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <section className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`rounded-lg border bg-gradient-to-br ${feature.gradient} ${feature.border} transition-all duration-300 group cursor-pointer shadow-sm`}
          >
            <div className="p-6">
              <div
                className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center mb-4 transition-colors`}
              >
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
