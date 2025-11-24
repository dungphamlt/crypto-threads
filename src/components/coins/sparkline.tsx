"use client";

interface SparklineProps {
  data: number[];
  isPositive?: boolean;
  width?: number;
  height?: number;
}

export function Sparkline({ 
  data, 
  isPositive = true, 
  width = 100, 
  height = 30 
}: SparklineProps) {
  if (!data || data.length === 0) {
    return (
      <div 
        className="flex items-center justify-center text-gray-400 text-xs"
        style={{ width, height }}
      >
        -
      </div>
    );
  }

  // Normalize data to fit within the SVG viewBox
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1; // Avoid division by zero
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1 || 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  const strokeColor = isPositive ? "#22c55e" : "#ef4444"; // green-500 : red-500

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

