"use client";

import { useEffect, useRef, memo } from "react";

interface TradingViewChartProps {
  symbol: string;
  coinName: string;
  height?: number;
}

// Map coin symbols to TradingView format
// TradingView uses format like "BINANCE:BTCUSDT" or "COINBASE:BTCUSD"
function getTradingViewSymbol(coinSymbol: string): string {
  const symbolUpper = coinSymbol.toUpperCase();
  
  // Common mappings for major exchanges
  const symbolMap: Record<string, string> = {
    BTC: "BINANCE:BTCUSDT",
    ETH: "BINANCE:ETHUSDT",
    BNB: "BINANCE:BNBUSDT",
    SOL: "BINANCE:SOLUSDT",
    XRP: "BINANCE:XRPUSDT",
    USDT: "BINANCE:USDCUSDT_PREMIUM",
    USDC: "BINANCE:USDCUSDT",
    ADA: "BINANCE:ADAUSDT",
    DOGE: "BINANCE:DOGEUSDT",
    TRX: "BINANCE:TRXUSDT",
    AVAX: "BINANCE:AVAXUSDT",
    MATIC: "BINANCE:MATICUSDT",
    DOT: "BINANCE:DOTUSDT",
    LTC: "BINANCE:LTCUSDT",
    LINK: "BINANCE:LINKUSDT",
    ATOM: "BINANCE:ATOMUSDT",
    UNI: "BINANCE:UNIUSDT",
    ETC: "BINANCE:ETCUSDT",
    XLM: "BINANCE:XLMUSDT",
    FIL: "BINANCE:FILUSDT",
    AAVE: "BINANCE:AAVEUSDT",
    ALGO: "BINANCE:ALGOUSDT",
    VET: "BINANCE:VETUSDT",
    ICP: "BINANCE:ICPUSDT",
    THETA: "BINANCE:THETAUSDT",
    EOS: "BINANCE:EOSUSDT",
    XMR: "BINANCE:XMRUSDT",
    SAND: "BINANCE:SANDUSDT",
    MANA: "BINANCE:MANAUSDT",
    AXS: "BINANCE:AXSUSDT",
    SXP: "BINANCE:SXPUSDT",
    COMP: "BINANCE:COMPUSDT",
    MKR: "BINANCE:MKRUSDT",
    YFI: "BINANCE:YFIUSDT",
    SNX: "BINANCE:SNXUSDT",
    CRV: "BINANCE:CRVUSDT",
    SUSHI: "BINANCE:SUSHIUSDT",
    GRT: "BINANCE:GRTUSDT",
    NEAR: "BINANCE:NEARUSDT",
    FTM: "BINANCE:FTMUSDT",
    ONE: "BINANCE:ONEUSDT",
    ZEC: "BINANCE:ZECUSDT",
    DASH: "BINANCE:DASHUSDT",
    ZIL: "BINANCE:ZILUSDT",
    ENJ: "BINANCE:ENJUSDT",
    CHZ: "BINANCE:CHZUSDT",
    BAT: "BINANCE:BATUSDT",
    ZRX: "BINANCE:ZRXUSDT",
    IOTA: "BINANCE:IOTAUSDT",
    QTUM: "BINANCE:QTUMUSDT",
    WAVES: "BINANCE:WAVESUSDT",
    OMG: "BINANCE:OMGUSDT",
    KNC: "BINANCE:KNCUSDT",
    LRC: "BINANCE:LRCUSDT",
    STORJ: "BINANCE:STORJUSDT",
    REN: "BINANCE:RENUSDT",
    CVC: "BINANCE:CVCUSDT",
    DNT: "BINANCE:DNTUSDT",
    GNT: "BINANCE:GNTUSDT",
    LOOM: "BINANCE:LOOMUSDT",
    FUN: "BINANCE:FUNUSDT",
    ZEN: "BINANCE:ZENUSDT",
    SKL: "BINANCE:SKLUSDT",
    ANKR: "BINANCE:ANKRUSDT",
    BAND: "BINANCE:BANDUSDT",
    BLZ: "BINANCE:BLZUSDT",
    CTK: "BINANCE:CTKUSDT",
    DENT: "BINANCE:DENTUSDT",
    DOCK: "BINANCE:DOCKUSDT",
    FLM: "BINANCE:FLMUSDT",
    HARD: "BINANCE:HARDUSDT",
    KAVA: "BINANCE:KAVAUSDT",
    LIT: "BINANCE:LITUSDT",
    LUNA: "BINANCE:LUNAUSDT",
    NBS: "BINANCE:NBSUSDT",
    OCEAN: "BINANCE:OCEANUSDT",
    PERP: "BINANCE:PERPUSDT",
    REEF: "BINANCE:REEFUSDT",
    SFP: "BINANCE:SFPUSDT",
    STRAX: "BINANCE:STRAXUSDT",
    UNFI: "BINANCE:UNFIUSDT",
    WING: "BINANCE:WINGUSDT",
    YFII: "BINANCE:YFIIUSDT",
    STETH: "OKX:STETHUSD"
  };


  // Return mapped symbol or default to BINANCE format
  if (symbolMap[symbolUpper]) {
    return symbolMap[symbolUpper];
  }

  // Default: try BINANCE format
  return `BINANCE:${symbolUpper}USDT`;
}

export const TradingViewChart = memo(function TradingViewChart({
  symbol,
  coinName,
  height = 500,
}: TradingViewChartProps) {
  const container = useRef<HTMLDivElement>(null);
  const tradingViewSymbol = getTradingViewSymbol(symbol);
  useEffect(() => {
    if (!container.current) return;

    // Clear any existing script
    const existingScript = container.current.querySelector("script");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      allow_symbol_change: true,
      calendar: false,
      details: false,
      hide_side_toolbar: true,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_volume: false,
      hotlist: false,
      interval: "D",
      locale: "en",
      save_image: true,
      style: "1", // Candlestick chart
      symbol: tradingViewSymbol,
      theme: "light",
      timezone: "Etc/UTC",
      backgroundColor: "#ffffff",
      gridColor: "rgba(46, 46, 46, 0.06)",
      watchlist: [],
      withdateranges: false,
      compareSymbols: [],
      studies: [],
      autosize: false,
      width: "100%",
      height: height,
    });

    container.current.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (container.current) {
        const scriptToRemove = container.current.querySelector("script");
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      }
    };
  }, [tradingViewSymbol, height]);

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ height: `${height}px`, width: "100%" }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "calc(100% - 32px)", width: "100%" }}
        ></div>
        <div className="tradingview-widget-copyright">
          <a
            href={`https://www.tradingview.com/symbols/${tradingViewSymbol.replace(":", "-")}/`}
            rel="noopener nofollow"
            target="_blank"
            className="text-xs text-muted-foreground hover:text-primary"
          >
            <span className="text-primary">{coinName} chart</span>
          </a>
          <span className="text-xs text-muted-foreground"> by TradingView</span>
        </div>
      </div>
    </div>
  );
});

