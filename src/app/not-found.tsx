import { Footer } from '@/components/footer';
import { HeroContainer } from '@/components/hero';
import Navbar from '@/components/header';
import type { ReactNode } from 'react';

export default function NotFound({
    children,
}: {
    children: ReactNode;
}): React.ReactElement {
    return (
        <div className="container mx-auto px-4 py-8">
            <Navbar />
            <HeroContainer className="h-screen flex items-center justify-center">
                <div className="relative z-10 col gap-2">
                    <div className="text-[150px] font-mono font-bold opacity-5 -mb-4">404</div>
                    <h1 className="text-6xl font-bold">Not Found</h1>
                    <p className="text-xl text-muted-foreground">
                        We couldn&apos;t find what you were looking for.
                    </p>
                </div>
            </HeroContainer>
            <Footer />
        </div>
    );
}