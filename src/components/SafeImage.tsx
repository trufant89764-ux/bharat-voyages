import { useState, useMemo } from "react";

// Only verified working Unsplash photo IDs (tested 200 OK)
const buildUrl = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

// Verified working IDs
const IMG = {
  taj: "photo-1564507592333-c60657eea523",
  taj2: "photo-1524492412937-b28074a5d7da",
  india: "photo-1587474260584-136574528ed5",
  kerala: "photo-1602216056096-3b40cc0c9944",
  kerala2: "photo-1514222709107-a180c68d72b4",
  garba: "photo-1601132359864-c974e79890ac",
  ladakh: "photo-1477587458883-47145ed94245",
  jaipur: "photo-1518002171953-a080ee817e1f",
  hawamahal: "photo-1599661046289-e31897846e41",
  varanasi: "photo-1561361513-2d000a50f0dc",
  temple: "photo-1512343879784-a960bf40e7f2",
  goa: "photo-1532375810709-75b1da00537c",
  mountains: "photo-1469474968028-56623f02e42e",
  landscape: "photo-1506905925346-21bda4d32df4",
  rajasthan: "photo-1548013146-72479768bada",
  hampi: "photo-1582510003544-4d00b7f74220",
  kashmir: "photo-1566837945700-30057527ade0",
  rhino: "photo-1564349683136-77e08dba1ef7",
  andaman: "photo-1583212292454-1fe6229603b7",
  festival: "photo-1623059508779-2542c6e83753",
  kutch: "photo-1609766857041-ed402ea8069a",
  sikkim: "photo-1626621341517-bbf3d9990a23",
  darjeeling: "photo-1544634076-a90160ddf44c",
  lakshadweep: "photo-1544551763-46a013bb70d5",
  madhubani: "photo-1582555172866-f73bb12a2ab3",
};

// Map keywords → relevant verified image (best available for the topic)
const KEYWORD_MAP: Array<{ match: RegExp; img: string }> = [
  // Festivals
  { match: /diwali/i, img: IMG.festival }, // colorful celebration
  { match: /holi/i, img: IMG.garba }, // colorful crowd dance
  { match: /navratri|garba/i, img: IMG.garba },
  { match: /durga\s*puja/i, img: IMG.varanasi }, // bengal/devotional
  { match: /onam/i, img: IMG.kerala },
  { match: /kumbh/i, img: IMG.varanasi },
  { match: /rann\s*utsav|kutch/i, img: IMG.kutch },
  { match: /pushkar/i, img: IMG.rajasthan },

  // Mountains
  { match: /ladakh/i, img: IMG.ladakh },
  { match: /kashmir/i, img: IMG.kashmir },
  { match: /sikkim/i, img: IMG.sikkim },
  { match: /darjeeling/i, img: IMG.darjeeling },
  { match: /meghalaya|shillong/i, img: IMG.sikkim },
  { match: /shimla|manali|himachal/i, img: IMG.mountains },

  // Heritage
  { match: /taj\s*mahal/i, img: IMG.taj },
  { match: /jaipur|hawa\s*mahal/i, img: IMG.hawamahal },
  { match: /udaipur/i, img: IMG.rajasthan },
  { match: /khajuraho/i, img: IMG.temple },
  { match: /mysore/i, img: IMG.hawamahal },
  { match: /hampi/i, img: IMG.hampi },
  { match: /rajasthan/i, img: IMG.rajasthan },

  // Beaches
  { match: /goa/i, img: IMG.goa },
  { match: /andaman/i, img: IMG.andaman },
  { match: /lakshadweep/i, img: IMG.lakshadweep },
  { match: /kerala|backwater/i, img: IMG.kerala2 },

  // Spiritual
  { match: /varanasi|ganges|ghat/i, img: IMG.varanasi },
  { match: /rishikesh/i, img: IMG.varanasi },
  { match: /golden\s*temple|amritsar/i, img: IMG.temple },
  { match: /tirupati|tirumala/i, img: IMG.temple },

  // Wildlife
  { match: /corbett|ranthambore|tiger/i, img: IMG.rhino },
  { match: /kaziranga|rhino/i, img: IMG.rhino },
  { match: /gir|lion/i, img: IMG.rhino },

  // Crafts
  { match: /madhubani/i, img: IMG.madhubani },
  { match: /pashmina/i, img: IMG.kashmir },
  { match: /blue\s*pottery|jaipur/i, img: IMG.jaipur },
  { match: /channapatna/i, img: IMG.madhubani },
  { match: /phulkari/i, img: IMG.madhubani },
  { match: /warli/i, img: IMG.madhubani },
  { match: /chikankari|lucknow/i, img: IMG.madhubani },
  { match: /banarasi|silk|saree|weav/i, img: IMG.madhubani },
  { match: /craft|handicraft/i, img: IMG.madhubani },

  // Category fallbacks
  { match: /festival/i, img: IMG.festival },
  { match: /mountain/i, img: IMG.mountains },
  { match: /heritage/i, img: IMG.taj2 },
  { match: /beach/i, img: IMG.goa },
  { match: /spiritual/i, img: IMG.temple },
  { match: /wildlife/i, img: IMG.rhino },
];

const DEFAULT_IMG = IMG.india;

const pickImage = (alt: string, src: string): string => {
  const text = `${alt} ${src}`;
  for (const { match, img } of KEYWORD_MAP) {
    if (match.test(text)) return buildUrl(img);
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
