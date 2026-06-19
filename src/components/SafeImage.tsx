import { useState } from "react";
import { ImageOff } from "lucide-react";
import { getRealImage } from "@/data/realImages";

/**
 * SafeImage renders an <img> with a 3-tier fallback:
 *   1. Try the provided `src`.
 *   2. If it fails (or is missing / a known-fake path), use the mapped
 *      real image looked up by `alt` (or an explicit `fallback`).
 *   3. If that also fails, render a friendly "image unavailable" tile.
 */

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Optional explicit fallback URL; otherwise looked up from `alt`. */
  fallback?: string;
}

type Stage = 0 | 1 | 2; // 0: original src, 1: mapped fallback, 2: placeholder tile

const isFakeSrc = (src: string) =>
  !src || src === "/placeholder.svg" || src.startsWith("/dest-");

const SafeImage = ({ fallback, alt, src, onError, className, ...rest }: Props) => {
  const [stage, setStage] = useState<Stage>(0);

  const srcStr = typeof src === "string" ? src : "";
  const altStr = (alt as string) || "";
  const mappedFallback = fallback || getRealImage(altStr);

  // Skip stage 0 if the provided src is obviously not a real image.
  const effectiveStage: Stage = stage === 0 && isFakeSrc(srcStr) ? 1 : stage;

  if (effectiveStage === 2) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-muted text-muted-foreground ${className ?? ""}`}
        role="img"
        aria-label={altStr || "Image unavailable"}
      >
        <ImageOff className="h-8 w-8 mb-2 opacity-60" />
        <span className="text-xs px-3 text-center line-clamp-2">
          {altStr || "Image unavailable"}
        </span>
      </div>
    );
  }

  const finalSrc = effectiveStage === 1 ? mappedFallback : srcStr;

  return (
    <img
      {...rest}
      className={className}
      alt={altStr}
      src={finalSrc}
      onError={(e) => {
        setStage((s) => (s < 2 ? ((s + 1) as Stage) : 2));
        onError?.(e);
      }}
    />
  );
};

export default SafeImage;
