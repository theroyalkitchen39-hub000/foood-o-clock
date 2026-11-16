import { useState } from 'react';
import { Utensils } from 'lucide-react';

interface SafeFoodImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function SafeFoodImage({
  src,
  alt,
  className = '',
  priority = false,
}: SafeFoodImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#151515] text-[#BDBDBD] p-6 text-center ${className}`}
      >
        <Utensils className="w-8 h-8 text-[#FFC400]/70 mb-3" strokeWidth={1.5} />
        <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
          FOOD O&apos;CLOCK
        </span>
        <span className="text-xs text-[#BDBDBD] mt-1 max-w-[22ch] line-clamp-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
