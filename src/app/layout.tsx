import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider';
import ReactQueryProvider from './providers/react-query-provider';
import './globals.css';

import { TooltipProvider } from '@/components/ui/tooltip';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { cn } from '@/lib/utils';

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(GeistSans.variable, GeistMono.variable)}>
        <RootProvider>
          <ReactQueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ReactQueryProvider>
        </RootProvider>
      </body>
    </html>
  );
}