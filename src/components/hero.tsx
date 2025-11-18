import { cn } from "@/lib/utils";

export function HeroContainer({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}): React.ReactElement {
  return (
    <section className={cn('radial-gradient overflow-hidden relative')}>
      <div className={cn('relative z-10', className)}>{children}</div>

      {/* Shadow bottom */}
      <div className="w-full absolute bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}