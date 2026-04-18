import { useState, useMemo } from "react";

// Local AI-generated tourism images — guaranteed to load and contextually accurate
import imgTaj from "@/assets/img-taj.jpg";
import imgJaipur from "@/assets/img-jaipur.jpg";
import imgLadakh from "@/assets/img-ladakh.jpg";
import imgKashmir from "@/assets/img-kashmir.jpg";
import imgKerala from "@/assets/img-kerala.jpg";
import imgGoa from "@/assets/img-goa.jpg";
import imgAndaman from "@/assets/img-andaman.jpg";
import imgVaranasi from "@/assets/img-varanasi.jpg";
import imgGoldenTemple from "@/assets/img-golden-temple.jpg";
import imgTiger from "@/assets/img-tiger.jpg";
import imgMountains from "@/assets/img-mountains.jpg";
import imgHampi from "@/assets/img-hampi.jpg";
import imgMysore from "@/assets/img-mysore.jpg";
import imgKhajuraho from "@/assets/img-khajuraho.jpg";
import imgDarjeeling from "@/assets/img-darjeeling.jpg";
import imgMeghalaya from "@/assets/img-meghalaya.jpg";
import imgRishikesh from "@/assets/img-rishikesh.jpg";
import imgRhino from "@/assets/img-rhino.jpg";
import imgRann from "@/assets/img-rann.jpg";
import imgKumbh from "@/assets/img-kumbh.jpg";
import imgLakshadweep from "@/assets/img-lakshadweep.jpg";
import imgSikkim from "@/assets/img-sikkim.jpg";
import imgDiwali from "@/assets/img-diwali.jpg";
import imgHoli from "@/assets/img-holi.jpg";
import imgNavratri from "@/assets/img-navratri.jpg";
import imgDurga from "@/assets/img-durga.jpg";
import imgOnam from "@/assets/img-onam.jpg";
import imgMadhubani from "@/assets/img-madhubani.jpg";
import imgPashmina from "@/assets/img-pashmina.jpg";
import imgBanarasi from "@/assets/img-banarasi.jpg";
import imgPottery from "@/assets/img-pottery.jpg";
import imgKutch from "@/assets/img-kutch.jpg";

// Map keywords (in priority order — most specific first) to relevant images
const KEYWORD_MAP: Array<{ match: RegExp; img: string }> = [
  // Festivals — specific
  { match: /diwali/i, img: imgDiwali },
  { match: /holi/i, img: imgHoli },
  { match: /navratri|garba/i, img: imgNavratri },
  { match: /durga\s*puja/i, img: imgDurga },
  { match: /onam/i, img: imgOnam },
  { match: /kumbh/i, img: imgKumbh },
  { match: /rann\s*utsav/i, img: imgRann },
  { match: /pushkar/i, img: imgJaipur },

  // Heritage / cities (specific)
  { match: /taj\s*mahal|agra/i, img: imgTaj },
  { match: /jaipur|hawa\s*mahal|pink\s*city/i, img: imgJaipur },
  { match: /udaipur|jodhpur|jaisalmer|rajasthan/i, img: imgJaipur },
  { match: /khajuraho/i, img: imgKhajuraho },
  { match: /mysore/i, img: imgMysore },
  { match: /hampi/i, img: imgHampi },

  // Mountains
  { match: /ladakh|leh/i, img: imgLadakh },
  { match: /kashmir|srinagar|dal\s*lake/i, img: imgKashmir },
  { match: /sikkim|gangtok|kanchenjunga/i, img: imgSikkim },
  { match: /darjeeling|tea/i, img: imgDarjeeling },
  { match: /meghalaya|shillong|cherrapunji/i, img: imgMeghalaya },
  { match: /shimla|manali|himachal|mussoorie|nainital/i, img: imgMountains },

  // Beaches
  { match: /goa/i, img: imgGoa },
  { match: /andaman|nicobar/i, img: imgAndaman },
  { match: /lakshadweep/i, img: imgLakshadweep },
  { match: /kerala|alleppey|backwater|kovalam/i, img: imgKerala },

  // Spiritual
  { match: /varanasi|kashi|ganges|ghat/i, img: imgVaranasi },
  { match: /rishikesh|haridwar/i, img: imgRishikesh },
  { match: /golden\s*temple|amritsar/i, img: imgGoldenTemple },
  { match: /tirupati|tirumala/i, img: imgGoldenTemple },

  // Wildlife
  { match: /corbett|ranthambore|tiger|bandhavgarh/i, img: imgTiger },
  { match: /kaziranga|rhino/i, img: imgRhino },
  { match: /gir|lion/i, img: imgTiger },

  // Crafts — specific
  { match: /madhubani/i, img: imgMadhubani },
  { match: /pashmina/i, img: imgPashmina },
  { match: /blue\s*pottery/i, img: imgPottery },
  { match: /banarasi|silk|saree/i, img: imgBanarasi },
  { match: /kutch|bandhani|mirror\s*work/i, img: imgKutch },
  { match: /channapatna|wooden\s*toy/i, img: imgPottery },
  { match: /phulkari/i, img: imgKutch },
  { match: /warli/i, img: imgMadhubani },
  { match: /chikankari|lucknow/i, img: imgPashmina },
  { match: /craft|handicraft|weav|embroider/i, img: imgMadhubani },

  // Category-level fallbacks
  { match: /festival/i, img: imgDiwali },
  { match: /mountain/i, img: imgMountains },
  { match: /heritage/i, img: imgTaj },
  { match: /beach/i, img: imgGoa },
  { match: /spiritual/i, img: imgVaranasi },
  { match: /wildlife/i, img: imgTiger },
];

const DEFAULT_IMG = imgTaj;

const pickImage = (alt: string, src: string): string => {
  const text = `${alt} ${src}`;
  for (const { match, img } of KEYWORD_MAP) {
    if (match.test(text)) return img;
  }
  return DEFAULT_IMG;
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
  // Always use our curated local images for destination cards (DB paths are unreliable)
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
