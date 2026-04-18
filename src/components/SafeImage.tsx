import { useState, useMemo } from "react";

// Curated tourism-themed Unsplash images (verified working IDs)
const FALLBACK_POOL = [
  "photo-1524492412937-b28074a5d7da", // Taj Mahal
  "photo-1514222709107-a180c68d72b4", // Kerala backwaters
  "photo-1477587458883-47145ed94245", // Ladakh mountains
  "photo-1587474260584-136574528ed5", // India street
  "photo-1518002171953-a080ee817e1f", // Jaipur palace
  "photo-1561361513-2d000a50f0dc", // Varanasi ghats
  "photo-1512343879784-a960bf40e7f2", // Indian temple
  "photo-1532375810709-75b1da00537c", // Goa beach
  "photo-1469474968028-56623f02e42e", // Mountains
  "photo-1506905925346-21bda4d32df4", // Generic landscape
  "photo-1601999719811-c0263d97c326", // Holi festival
  "photo-1604608672516-f1b9b1d2f7e7", // Diwali lights
  "photo-1583309217394-d586f4d9e8b7", // Indian craft
  "photo-1564507592333-c60657eea523", // Andaman beach
  "photo-1517824806704-9040b037703b", // Kashmir
  "photo-1548013146-72479768bada", // Rajasthan
  "photo-1570168007204-dfb528c6958f", // Mysore palace
  "photo-1582510003544-4d00b7f74220", // Hampi
  "photo-1596402184320-417e7178b2cd", // Indian wildlife tiger
  "photo-1623059508779-2542c6e83753", // Indian festival
];

const buildUrl = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

// Deterministic hash from a string → index in the pool
const hashString = (str: string) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
};

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const SafeImage = ({ fallback, onError, className, alt, src, ...props }: SafeImageProps) => {
  const [failed, setFailed] = useState(false);

  // Pick a unique, deterministic fallback per item based on alt text
  const computedFallback = useMemo(() => {
    if (fallback) return fallback;
    const key = (alt as string) || (src as string) || "default";
    const idx = hashString(key) % FALLBACK_POOL.length;
    return buildUrl(FALLBACK_POOL[idx]);
  }, [alt, src, fallback]);

  // If src is a local path that likely won't exist (starts with /dest- etc.), use fallback immediately
  const srcStr = typeof src === "string" ? src : "";
  const isLikelyMissing = srcStr.startsWith("/dest-") || srcStr === "" || srcStr === "/placeholder.svg";
  const finalSrc = failed || isLikelyMissing ? computedFallback : srcStr;

  return (
    <img
      {...props}
      alt={alt}
      src={finalSrc}
      className={className}
      onError={(e) => {
        if (!failed) setFailed(true);
        onError?.(e);
      }}
    />
  );
};

export default SafeImage;
