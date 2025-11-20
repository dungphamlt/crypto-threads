interface StudioIntroCardProps {
  className?: string;
  title?: string;
  content?: React.ReactNode;
}

export function StudioIntroCard({
  className,
  title = "INTRODUCE ABOUT STUDIO",
  content,
}: StudioIntroCardProps) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-white dark:bg-gray-950/50 p-6 shadow-sm ${className || ""}`}>
      <h3 className="text-lg font-bold uppercase text-foreground mb-4">
        {title}
      </h3>
      <div className="text-sm text-muted-foreground">
        {content || (
          <p className="text-muted-foreground/60 italic">
            Content coming soon...
          </p>
        )}
      </div>
    </div>
  );
}

