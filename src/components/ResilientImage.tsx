import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src?: string;
  alt: string;
  titleFallback?: string;
  className?: string;
}

export function ResilientImage({
  src,
  alt,
  titleFallback,
  className = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/60 border border-slate-200/80 text-slate-500 p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Layers className="w-7 h-7 text-blue-900/60 mb-2" strokeWidth={1.5} />
        <span className="text-xs font-medium text-slate-600 text-center max-w-[220px]">
          {titleFallback || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
