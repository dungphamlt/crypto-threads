import { Footer } from "@/components/footer";
import { HeroContainer } from "@/components/hero";
import Navbar from "@/components/header";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="container">
        <HeroContainer className="h-[500px] flex items-center justify-center">
          <div className="relative z-10 col gap-2">
            <div className="text-[150px] font-mono font-bold opacity-5 -mb-4">
              404
            </div>
            <h1 className="text-6xl font-bold">Not Found</h1>
            <p className="text-xl text-muted-foreground">
              We couldn&apos;t find what you were looking for.
            </p>
          </div>
        </HeroContainer>
      </main>
      <Footer />
    </>
  );
}
