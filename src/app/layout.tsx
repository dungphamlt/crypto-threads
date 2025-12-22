import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider";
import ReactQueryProvider from "./providers/react-query-provider";
import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
// import { GeistMono } from 'geist/font/mono';
// import { GeistSans } from 'geist/font/sans';
import { Funnel_Display, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-funnel-display",
});

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          montserrat.variable,
          montserrat.className,
          funnelDisplay.variable
        )}
      >
        <RootProvider>
          <ReactQueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ReactQueryProvider>
        </RootProvider>
      </body>
    </html>
  );
}
