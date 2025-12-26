import { cn } from "@/lib/utils";

interface PlayIconProps {
  className?: string;
  color?: string;
  size?: number;
}

/**
 * Play icon component with rounded triangle shape pointing right
 * Can be customized with className or color prop
 */
export function PlayIcon({
  className,
  color = "currentColor",
  size = 24,
}: PlayIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-transform duration-300", className)}
    >
      {/* Rounded triangle play icon pointing right */}
      {/* Triangle: top-left (9,6), right (18,12), bottom-left (9,18) with rounded corners */}
      <path
        d="M9.5 6C8.67157 6 8 6.67157 8 7.5V16.5C8 17.3284 8.67157 18 9.5 18L17.5 12L9.5 6Z"
        fill={color}
        stroke={color}
        strokeWidth="0.1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
