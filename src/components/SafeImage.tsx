import { useState, useMemo } from "react";

// Map destination keywords → Unsplash search keywords for relevant images
// Uses source.unsplash.com which always returns a working image matching keywords
const KEYWORD_MAP: Array<{ match: RegExp; keywords: string }> = [
  // Festivals — specific
  { match: /diwali/i, keywords: "diwali,diya,lamps,india" },
  { match: /holi/i, keywords: "holi,colors,india,festival" },
  { match: /navratri|garba/i, keywords: "garba,navratri,gujarat,dance" },
  { match: /durga\s*puja/i, keywords: "durga,puja,kolkata,goddess" },
  { match: /onam/i, keywords: "onam,kerala,flowers,pookalam" },
  { match: /kumbh/i, keywords: "kumbh,mela,ganges,pilgrims" },
  { match: /rann\s*utsav/i, keywords: "kutch,rann,white,desert" },
  { match: /pushkar/i, keywords: "pushkar,camel,fair,rajasthan" },

  // Mountains
  { match: /ladakh/i, keywords: "ladakh,himalayas,monastery" },
  { match: /kashmir/i, keywords: "kashmir,dal,lake,shikara" },
  { match: /sikkim/i, keywords: "sikkim,himalayas,gangtok" },
  { match: /darjeeling/i, keywords: "darjeeling,tea,plantation" },
  { match: /meghalaya|shillong/i, keywords: "meghalaya,living,root,bridge" },
  { match: /shimla|manali|himachal/i, keywords: "himachal,mountains,snow" },

  // Heritage
  { match: /taj\s*mahal/i, keywords: "taj,mahal,agra,india" },
  { match: /jaipur|hawa\s*mahal/i, keywords: "jaipur,hawa,mahal,pink" },
  { match: /udaipur/i, keywords: "udaipur,palace,lake,rajasthan" },
  { match: /khajuraho/i, keywords: "khajuraho,temple,sculpture" },
  { match: /mysore/i, keywords: "mysore,palace,karnataka" },
  { match: /hampi/i, keywords: "hampi,ruins,karnataka,stone" },
  { match: /rajasthan/i, keywords: "rajasthan,palace,fort,india" },

  // Beaches
  { match: /goa/i, keywords: "goa,beach,palm,india" },
  { match: /andaman/i, keywords: "andaman,beach,turquoise,island" },
  { match: /lakshadweep/i, keywords: "lakshadweep,island,lagoon" },
  { match: /kerala|backwater/i, keywords: "kerala,backwaters,houseboat" },

  // Spiritual
  { match: /varanasi|ganges|ghat/i, keywords: "varanasi,ghats,ganges" },
  { match: /rishikesh/i, keywords: "rishikesh,ganga,yoga" },
  { match: /golden\s*temple|amritsar/i, keywords: "golden,temple,amritsar,sikh" },
  { match: /tirupati|tirumala/i, keywords: "tirupati,temple,india" },

  // Wildlife
  { match: /corbett|ranthambore|tiger/i, keywords: "tiger,jungle,india,wildlife" },
  { match: /kaziranga|rhino/i, keywords: "rhino,kaziranga,assam" },
  { match: /gir|lion/i, keywords: "lion,gir,gujarat,wildlife" },

  // Crafts
  { match: /madhubani/i, keywords: "madhubani,painting,bihar,art" },
  { match: /pashmina/i, keywords: "pashmina,shawl,kashmir,textile" },
  { match: /blue\s*pottery/i, keywords: "blue,pottery,jaipur,ceramic" },
  { match: /channapatna/i, keywords: "wooden,toys,handicraft,india" },
  { match: /phulkari/i, keywords: "phulkari,embroidery,punjab,textile" },
  { match: /warli/i, keywords: "warli,painting,tribal,art" },
  { match: /chikankari|lucknow/i, keywords: "chikankari,embroidery,lucknow" },
  { match: /banarasi|silk/i, keywords: "banarasi,silk,saree,weaving" },
  { match: /craft|handicraft|weav/i, keywords: "indian,handicraft,traditional,art" },

  // Category-level fallbacks
  { match: /festival/i, keywords: "indian,festival,celebration,colorful" },
  { match: /mountain/i, keywords: "himalayas,india,mountains" },
  { match: /heritage/i, keywords: "india,heritage,monument,palace" },
  { match: /beach/i, keywords: "india,beach,tropical,coast" },
  { match: /spiritual/i, keywords: "india,temple,spiritual" },
  { match: /wildlife/i, keywords: "india,wildlife,jungle,safari" },
];

const DEFAULT_KEYWORDS = "incredible,india,tourism";

const buildUrl = (keywords: string, w = 800, h = 600, seed = "") => {
  // source.unsplash.com always returns a real image matching keywords
  // Adding seed makes the same input → same image (deterministic)
  const seedSuffix = seed ? `&sig=${encodeURIComponent(seed).slice(0, 20)}` : "";
  return `https://source.unsplash.com/${w}x${h}/?${encodeURIComponent(keywords)}${seedSuffix}`;
};

const pickImage = (alt: string, src: string): string => {
  const text = `${alt} ${src}`;
  for (const { match, keywords } of KEYWORD_MAP) {
    if (match.test(text)) return buildUrl(keywords, 800, 600, alt);
  }
  return buildUrl(DEFAULT_KEYWORDS, 800, 600, alt);
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
