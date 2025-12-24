"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "WHAT IS THE CMC FEAR AND GREED INDEX?",
    answer:
      "The CMC Fear and Greed Index is a proprietary tool developed by CoinMarketCap that measures the prevailing sentiment in the cryptocurrency market. This index ranges from 0 to 100, where a lower value indicates extreme fear, and a higher value indicates extreme greed. It helps investors understand the emotional state of the market, which can influence buying and selling behaviors. The index provides insights into whether the market may be undervalued (extreme fear) or overvalued (extreme greed).",
  },
  {
    question: "HOW CAN I USE THIS INDEX?",
    answer:
      "You can use the Fear and Greed Index as a contrarian indicator. When the index shows extreme fear (low values), it might indicate a potential buying opportunity as markets may be oversold. Conversely, when the index shows extreme greed (high values), it might suggest the market is overbought and could be due for a correction. However, it's important to use this index in conjunction with other technical and fundamental analysis tools rather than relying on it alone.",
  },
  {
    question: "HOW IS THIS INDEX CALCULATED?",
    answer:
      "The Fear and Greed Index is calculated using multiple data sources including volatility, market momentum/volume, social media sentiment, surveys, Bitcoin dominance, and Google Trends. These factors are weighted and combined to produce a single number between 0 and 100. The calculation methodology is proprietary to CoinMarketCap, but it aggregates various market signals to gauge overall market sentiment.",
  },
  {
    question: "CAN I GET THIS DATA THROUGH AN API?",
    answer:
      "Yes, CoinMarketCap provides API access to the Fear and Greed Index data. You can integrate this data into your applications, trading bots, or analysis tools. The API typically requires an API key which you can obtain by signing up for a CoinMarketCap account. Check CoinMarketCap's official API documentation for the most up-to-date information on endpoints, rate limits, and authentication requirements.",
  },
];

export function CoinFAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 shadow-sm mt-4 md:mt-8">
      <div>
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-8 font-funnel">
            Frequently Asked Questions (FAQ)
          </h2>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-primary/20 hover:bg-primary/80 rounded-xl border border-primary/20 dark:border-primary/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-primary/60 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium text-foreground uppercase text-sm md:text-base pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

