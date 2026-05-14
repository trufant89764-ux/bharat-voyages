import { useState } from "react";
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
const MAP = [
  [/diwali/i, imgDiwali],
  [/holi/i, imgHoli],
  [/navratri|garba/i, imgNavratri],
  [/durga/i, imgDurga],
  [/onam/i, imgOnam],
  [/kumbh/i, imgKumbh],
  [/rann/i, imgRann],
  [/taj|agra/i, imgTaj],
  [/jaipur|udaipur|jodhpur|rajasthan/i, imgJaipur],
  [/khajuraho|ajanta|ellora|konark/i, imgKhajuraho],
  [/mysore/i, imgMysore],
  [/hampi/i, imgHampi],
  [/ladakh|leh/i, imgLadakh],
  [/kashmir|srinagar/i, imgKashmir],
  [/sikkim/i, imgSikkim],
  [/darjeeling/i, imgDarjeeling],
  [/meghalaya|shillong/i, imgMeghalaya],
  [/shimla|manali|himachal|mountain/i, imgMountains],
  [/goa/i, imgGoa],
  [/andaman/i, imgAndaman],
  [/lakshadweep/i, imgLakshadweep],
  [/kerala|backwater/i, imgKerala],
  [/varanasi|ganges|ghat/i, imgVaranasi],
  [/rishikesh|haridwar/i, imgRishikesh],
  [/golden temple|amritsar|tirupati/i, imgGoldenTemple],
  [/tiger|corbett|ranthambore|gir/i, imgTiger],
  [/kaziranga|rhino/i, imgRhino],
  [/madhubani|warli/i, imgMadhubani],
  [/pashmina|chikankari/i, imgPashmina],
  [/pottery|channapatna/i, imgPottery],
  [/banarasi|silk|saree/i, imgBanarasi],
  [/kutch|bandhani|phulkari/i, imgKutch],
  [/festival/i, imgDiwali],
  [/heritage/i, imgTaj],
  [/beach/i, imgGoa],
  [/spiritual/i, imgVaranasi],
  [/wildlife/i, imgTiger],
  [/craft/i, imgMadhubani]
];
function pickImage(text) {
  for (const [re, img] of MAP) if (re.test(text)) return img;
  return imgTaj;
}
const SafeImage = ({ fallback, alt, src, onError, ...props }) => {
  const [failed, setFailed] = useState(false);
  const srcStr = typeof src === "string" ? src : "";
  const altStr = alt || "";
  const useLocal = failed || !srcStr || srcStr === "/placeholder.svg" || srcStr.startsWith("/dest-");
  const finalSrc = useLocal ? fallback || pickImage(`${altStr} ${srcStr}`) : srcStr;
  return <img
    {...props}
    alt={altStr}
    src={finalSrc}
    onError={(e) => {
      setFailed(true);
      onError?.(e);
    }}
  />;
};
var stdin_default = SafeImage;
export {
  stdin_default as default
};
