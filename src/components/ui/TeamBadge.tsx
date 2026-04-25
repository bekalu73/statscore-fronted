const FALLBACK_BADGE =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#1E2240" stroke="#2A2E4A" stroke-width="2"/><text x="20" y="24" text-anchor="middle" fill="#5A5E75" font-size="14" font-family="sans-serif">⚽</text></svg>',
  );

interface TeamBadgeProps {
  src: string | null;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-14 h-14 md:w-16 md:h-16",
};

export default function TeamBadge({
  src,
  alt,
  size = "sm",
  className = "",
}: TeamBadgeProps) {
  return (
    <img
      src={src || FALLBACK_BADGE}
      alt={alt}
      className={`${sizeClasses[size]} object-contain shrink-0 ${className}`}
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).src = FALLBACK_BADGE;
      }}
    />
  );
}
