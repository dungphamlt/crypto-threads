"use client";

import { useEffect, useRef, useState } from "react";
import type { MarketChartData } from "@/services/coins-service";
import { formatCoinPrice } from "@/lib/utils";

interface CoinPriceChartProps {
  data: MarketChartData;
  width?: number;
  height?: number;
}

interface PricePoint {
  time: number;
  price: number;
}

export function CoinPriceChart({
  data,
  width = 800,
  height = 400,
}: CoinPriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    date: string;
    price: string;
  } | null>(null);

  // Validate data
  if (!data || !data.prices || !Array.isArray(data.prices) || data.prices.length === 0) {
    return (
      <div className="w-full h-96 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-center">
        <p className="text-muted-foreground">No chart data available</p>
      </div>
    );
  }

  // Convert price data to points for smooth line chart
  const convertToPricePoints = (prices: [number, number][]): PricePoint[] => {
    if (!prices || prices.length === 0) return [];

    return prices
      .filter((point) => point && point.length >= 2 && typeof point[0] === "number" && typeof point[1] === "number")
      .map(([time, price]) => ({
        time,
        price: typeof price === "number" && !isNaN(price) ? price : 0,
      }))
      .filter((point) => point.time && !isNaN(point.time) && point.price > 0);
  };

  const pricePoints = convertToPricePoints(data.prices);

  // Helper function to create smooth curve using quadratic curves
  const drawSmoothLine = (
    ctx: CanvasRenderingContext2D,
    points: { x: number; y: number }[]
  ) => {
    if (points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      // Calculate control point for smooth curve
      const cpX = (current.x + next.x) / 2;
      const cpY = (current.y + next.y) / 2;
      
      if (i === 0) {
        ctx.quadraticCurveTo(cpX, cpY, next.x, next.y);
      } else {
        const prev = points[i - 1];
        const cp1X = (prev.x + current.x) / 2;
        const cp1Y = (prev.y + current.y) / 2;
        ctx.quadraticCurveTo(cp1X, cp1Y, current.x, current.y);
        ctx.quadraticCurveTo(cpX, cpY, next.x, next.y);
      }
    }

    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || pricePoints.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Clear canvas with light background
    ctx.fillStyle = "#f0fdf4"; // light green background
    ctx.fillRect(0, 0, width, height);

    // Calculate dimensions
    const padding = { top: 30, right: 30, bottom: 50, left: 80 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Find price range
    const prices = pricePoints.map((p) => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;
    
    // Add some padding to price range for better visualization
    const pricePadding = priceRange * 0.1;
    const adjustedMinPrice = minPrice - pricePadding;
    const adjustedMaxPrice = maxPrice + pricePadding;
    const adjustedPriceRange = adjustedMaxPrice - adjustedMinPrice;

    // Convert price points to canvas coordinates
    const chartPoints = pricePoints.map((point, index) => ({
      x: padding.left + (index / (pricePoints.length - 1 || 1)) * chartWidth,
      y: padding.top + chartHeight - ((point.price - adjustedMinPrice) / adjustedPriceRange) * chartHeight,
      price: point.price,
      time: point.time,
    }));

    // Draw smooth wave line
    ctx.strokeStyle = "#22c55e"; // green-500
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    drawSmoothLine(ctx, chartPoints);

    // Draw price labels on left (Y-axis)
    ctx.fillStyle = "#6b7280";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "right";
    const labelCount = 6;
    for (let i = 0; i <= labelCount; i++) {
      const price = adjustedMaxPrice - (adjustedPriceRange * i) / labelCount;
      const y = padding.top + (chartHeight * i) / labelCount;
      ctx.fillText(formatPrice(price), padding.left - 10, y + 4);
    }

    // Draw date labels on bottom (X-axis)
    ctx.textAlign = "center";
    ctx.font = "11px sans-serif";
    const dateLabelCount = Math.min(5, pricePoints.length);
    if (dateLabelCount > 0 && pricePoints.length > 0) {
      for (let i = 0; i < dateLabelCount; i++) {
        const index = Math.floor((pricePoints.length - 1) * (i / Math.max(1, dateLabelCount - 1)));
        const point = pricePoints[index];
        if (!point || !point.time) continue;

        const x = padding.left + (index / (pricePoints.length - 1 || 1)) * chartWidth;
        const date = new Date(point.time);
        if (!isNaN(date.getTime())) {
          ctx.fillText(formatDate(date), x, height - padding.bottom + 20);
        }
      }
    }

    // Draw key data points (first, last, min, max)
    const firstPoint = chartPoints[0];
    const lastPoint = chartPoints[chartPoints.length - 1];
    const minPoint = chartPoints.reduce((min, p) => 
      p.price < min.price ? p : min
    );
    const maxPoint = chartPoints.reduce((max, p) => 
      p.price > max.price ? p : max
    );

    const keyPoints = [
      { point: firstPoint, label: "Start" },
      { point: lastPoint, label: "Current" },
      { point: minPoint, label: "Low" },
      { point: maxPoint, label: "High" },
    ];

    // Draw dots and labels for key points
    keyPoints.forEach(({ point, label }) => {
      // Draw dot
      ctx.fillStyle = "#22c55e";
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw price label
      ctx.fillStyle = "#1f2937";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      const labelY = point.y - 12;
      ctx.fillText(formatPrice(point.price), point.x, labelY);
    });
  }, [pricePoints, width, height]);

  const formatPrice = (price: number): string => {
    return formatCoinPrice(price);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || pricePoints.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padding = { top: 30, right: 30, bottom: 50, left: 80 };
    const chartWidth = width - padding.left - padding.right;
    
    if (chartWidth <= 0) return;

    const relativeX = x - padding.left;
    const index = Math.round((relativeX / chartWidth) * (pricePoints.length - 1));
    
    if (index >= 0 && index < pricePoints.length) {
      const point = pricePoints[index];
      if (point && point.time && !isNaN(point.time)) {
        const date = new Date(point.time);
        if (!isNaN(date.getTime())) {
          setTooltip({
            x: e.clientX,
            y: e.clientY,
            date: formatDate(date),
            price: formatPrice(point.price),
          });
        }
      }
    } else {
      setTooltip(null);
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  if (pricePoints.length === 0) {
    return (
      <div className="w-full h-96 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-center">
        <p className="text-muted-foreground">No chart data available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {tooltip && (
        <div
          className="absolute bg-gray-900 dark:bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg pointer-events-none z-10"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 40}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div>{tooltip.date}</div>
          <div className="font-semibold">{tooltip.price}</div>
        </div>
      )}
    </div>
  );
}
