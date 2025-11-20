import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

const currencyFormatterCache = new Map<string, Intl.NumberFormat>();

function getCurrencyFormatter(
  currency: string,
  minimumFractionDigits: number,
  maximumFractionDigits: number
) {
  const key = `${currency}-${minimumFractionDigits}-${maximumFractionDigits}`;
  if (!currencyFormatterCache.has(key)) {
    currencyFormatterCache.set(
      key,
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
      })
    );
  }
  return currencyFormatterCache.get(key)!;
}

export function formatCoinPrice(price: number, currency: string = "USD") {
  if (!Number.isFinite(price)) {
    return "-";
  }

  const absPrice = Math.abs(price);
  let minDigits = 2;
  let maxDigits = 2;

  if (absPrice < 0.0001) {
    minDigits = maxDigits = 10;
  } else if (absPrice < 0.01) {
    minDigits = maxDigits = 8;
  } else if (absPrice < 0.1) {
    minDigits = maxDigits = 6;
  } else if (absPrice < 1) {
    minDigits = maxDigits = 4;
  }

  const formatter = getCurrencyFormatter(currency, minDigits, maxDigits);
  return formatter.format(price);
}