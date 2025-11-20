import { cn } from '@/lib/utils';

export function SimpleLine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-px w-full bg-border/60 my-4',
        className,
      )}
    />
  );
}