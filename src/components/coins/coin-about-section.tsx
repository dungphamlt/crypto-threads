"use client";

import { useState } from "react";

interface CoinAboutSectionProps {
  description: string;
}

const MAX_LENGTH = 300; // Maximum characters to show before "more"

export function CoinAboutSection({ description }: CoinAboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Clean HTML description and extract text
  const cleanDescription = description
    ? description.replace(/<[^>]*>/g, "").trim()
    : "No description available.";

  const shouldTruncate = cleanDescription.length > MAX_LENGTH;
  const displayText = isExpanded || !shouldTruncate
    ? cleanDescription
    : `${cleanDescription.slice(0, MAX_LENGTH)}...`;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4 font-funnel">
        About
      </h2>
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p className="text-muted-foreground font-medium text-sm md:text-base leading-relaxed whitespace-pre-line">
          {displayText}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
}
