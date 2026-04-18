import { useState, useMemo } from "react";

const buildUrl = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

// Title-specific high-quality Indian tourism images (verified Unsplash IDs)
const TITLE_MAP: Record<string, string> = {
  // Festivals
  "diwali": "photo-1605302329851-6d44a3df1cf2", // Diwali diyas/lamps
  "holi": "photo-1617526715998-19fab8be35a6", // Holi colors
  "navratri": "photo-1601132359864-c974e79890ac", // Garba dance
  "durga puja": "photo-1604608672516-f1b9b1d2f7e7", // Durga idol
  "onam": "photo-1602216056096-3b40cc0c9944", // Kerala flowers
  "kumbh": "photo-1567604130959-7ea7ab2a7f10", // Ganges/pilgrims
  "rann utsav": "photo-1609766857041-ed402ea8069a", // White desert Kutch

  // Mountains / Heritage
  "ladakh": "photo-1589308078055-3df265d28b8a", // Pangong/Ladakh
  "kashmir": "photo-1566837945700-30057527ade0", // Dal lake shikara
  "sikkim": "photo-1626621341517-bbf3d9990a23", // Sikkim mountains
  "darjeeling": "photo-1544634076-a90160ddf44c", // Darjeeling tea
  "meghalaya": "photo-1626714932503-a6e6e9f00c81", // Living root bridge
  "shimla": "photo-1626714932503-a6e6e9f00c81",
  "manali": "photo-1626621341517-bbf3d9990a23",

  // Heritage
  "taj mahal": "photo-1564507592333-c60657eea523", // Taj Mahal
  "jaipur": "photo-1599661046289-e31897846e41", // Hawa Mahal
  "udaipur": "photo-1568732417863-13668e4ca2f2", // Udaipur palace
  "khajuraho": "photo-1604089890024-e9e5c11e3469", // Khajuraho
  "mysore palace": "photo-1600081760099-3b8e1d3c7d6e", // Mysore palace
  "hampi": "photo-1600100397927-b4cc9b40072e", // Hampi ruins
  "rajasthan": "photo-1599661046289-e31897846e41",

  // Beaches
  "goa": "photo-1512343879784-a960bf40e7f2", // Goa beach
  "andaman": "photo-1583212292454-1fe6229603b7", // Andaman water
  "lakshadweep": "photo-1544551763-46a013bb70d5", // Tropical beach
  "kerala": "photo-1602216056096-3b40cc0c9944", // Kerala backwaters

  // Spiritual
  "varanasi": "photo-1561361513-2d000a50f0dc", // Varanasi ghats
  "rishikesh": "photo-1591018653829-1ae46fa9adda", // Rishikesh ganga
  "golden temple": "photo-1588096344356-9b497e3d99c6", // Golden Temple
  "tirupati": "photo-1582510003544-4d00b7f74220",

  // Wildlife
  "corbett": "photo-1605552055839-15ce2e44a6e5", // Tiger
  "ranthambore": "photo-1605552055839-15ce2e44a6e5",
  "kaziranga": "photo-1564349683136-77e08dba1ef7", // Rhino
  "gir": "photo-1605552055839-15ce2e44a6e5", // Lion

  // Crafts
  "madhubani": "photo-1582555172866-f73bb12a2ab3", // Madhubani art
  "pashmina": "photo-1583309217394-d586f4d9e8b7", // Textile
  "blue pottery": "photo-1607644536940-6c4ce21d2737", // Pottery
  "channapatna": "photo-1607644536940-6c4ce21d2737",
  "phulkari": "photo-1583309217394-d586f4d9e8b7",
  "warli": "photo-1582555172866-f73bb12a2ab3",
};

// Category fallbacks
const CATEGORY_MAP: Record<string, string> = {
  "festivals": "photo-1605302329851-6d44a3df1cf2",
  "festival": "photo-1605302329851-6d44a3df1cf2",
  "mountains": "photo-1589308078055-3df265d28b8a",
  "heritage": "photo-1564507592333-c60657eea523",
  "beaches": "photo-1512343879784-a960bf40e7f2",
  "spiritual": "photo-1561361513-2d000a50f0dc",
  "wildlife": "photo-1605552055839-15ce2e44a6e5",
  "craft": "photo-1582555172866-f73bb12a2ab3",
  "crafts": "photo-1582555172866-f73bb12a2ab3",
};

const DEFAULT_IMG = "photo-1524492412937-b28074a5d7da"; // Taj Mahal

const pickImage = (alt: string, src: string): string => {
  const text = `${alt} ${src}`.toLowerCase();
  // Title keyword match (longest match wins)
  const sortedKeys = Object.keys(TITLE_MAP).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (text.includes(key)) return buildUrl(TITLE_MAP[key]);
  }
  for (const key of Object.keys(CATEGORY_MAP)) {
    if (text.includes(key)) return buildUrl(CATEGORY_MAP[key]);
  }
  return buildUrl(DEFAULT_IMG);
};

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const SafeImage = ({ fallback, onError, className, alt, src, ...props }: SafeImageProps) => {
  const [failed, setFailed] = useState(false);

  const computedFallback = useMemo(
    () => fallback || pickImage((alt as string) || "", (src as string) || ""),
    [alt, src, fallback]
  );

  const srcStr = typeof src === "string" ? src : "";
  const isLikelyMissing =
    srcStr.startsWith("/dest-") || srcStr === "" || srcStr === "/placeholder.svg";
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
