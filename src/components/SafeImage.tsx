import { useState } from "react";

const realImages: Record<string, string> = {
  "Goa Beaches": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Palolem_Beach%2C_South_Goa.jpg/1280px-Palolem_Beach%2C_South_Goa.jpg",
  "Kerala Backwaters": "https://upload.wikimedia.org/wikipedia/commons/e/ee/House_Boat_DSW.jpg",
  "Gokarna Beaches": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Delight_india.jpg",
  "Pondicherry French Quarter": "https://upload.wikimedia.org/wikipedia/commons/1/17/Pondicherry-French_Quarter-WUS02277.jpg",
  "Andaman Islands": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Radha_Nagar_beach%2C_Havelock_Island%2C_Andamn%2C_India-_Sun_set_view.jpg/1280px-Radha_Nagar_beach%2C_Havelock_Island%2C_Andamn%2C_India-_Sun_set_view.jpg",
  "Banarasi Silk Weaving": "https://upload.wikimedia.org/wikipedia/commons/4/4e/%27Sari%27_from_Varanasi_%28north-central_India%29%2C_silk_and_gold-wrapped_silk_yarn_with_supplementary_weft_brocade.jpg",
  "Channapatna Wooden Toys": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Wooden_toys.JPG",
  "Chikankari of Lucknow": "https://upload.wikimedia.org/wikipedia/commons/0/05/Chikankari_of_lucknow.jpg",
  "Kutch Craft Trail": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Ahir_Embroidery_From_Kutch.jpg",
  "Madhubani Art Trail": "https://upload.wikimedia.org/wikipedia/commons/6/67/Madhubani_Mahavidyas.jpg",
  "Pashmina Weaving": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Mandala_Chandar%2C_Kashmir_1840.jpg",
  "Phulkari of Punjab": "https://upload.wikimedia.org/wikipedia/commons/7/71/Contemporary_Phulkari_design.jpg",
  "Tanjore Painting": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Gajalakshmi_in_Tanjore_Painting.png",
  "Bihu Festival": "https://upload.wikimedia.org/wikipedia/commons/4/48/Bihu-Dance-assam.jpg",
  "Diwali in Jaipur": "https://upload.wikimedia.org/wikipedia/commons/9/99/The_Rangoli_of_Lights.jpg",
  "Durga Puja Festival": "https://upload.wikimedia.org/wikipedia/commons/e/e7/%E0%A6%AC%E0%A6%BE%E0%A6%97%E0%A6%AC%E0%A6%BE%E0%A6%9C%E0%A6%BE%E0%A6%B0_%E0%A6%B8%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AC%E0%A6%9C%E0%A6%A8%E0%A7%80%E0%A6%A8_%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A7%8B%E0%A7%8E%E0%A6%B8%E0%A6%AC_%E0%A7%A8%E0%A7%A6%E0%A7%A7%E0%A7%AE.jpg",
  "Ganesh Chaturthi": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Khairathabad_Vinayakudu_2021.jpg",
  "Holi Festival": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Lathmar_Holi_2022_in_Nandgaon%2C_Uttar_Pradesh_%28edited%29.jpg/1280px-Lathmar_Holi_2022_in_Nandgaon%2C_Uttar_Pradesh_%28edited%29.jpg",
  "Hornbill Festival": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Hornbill_Festival%2CNagaland_2.jpg",
  "Navratri in Gujarat": "https://upload.wikimedia.org/wikipedia/commons/3/39/Garba_%28dance%29.jpg",
  "Onam in Kerala": "https://upload.wikimedia.org/wikipedia/commons/8/87/Onapookkalam.jpg",
  "Pushkar Camel Fair": "https://upload.wikimedia.org/wikipedia/commons/b/b7/%28A%29_Camel_Pushkar_fair.jpg",
  "Pushkar Mela": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Pushkar_Fair.jpg/1280px-Pushkar_Fair.jpg",
};

function pickImage(title: string) {
  return realImages[title] || "/placeholder.svg";
}

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const SafeImage = ({ fallback, alt, src, onError, ...props }: Props) => {
  const [failed, setFailed] = useState(false);
  const srcStr = typeof src === "string" ? src : "";
  const altStr = (alt as string) || "";

  // Use a real photo if old fake /dest image is found
  const useLocal = failed || !srcStr || srcStr === "/placeholder.svg" || srcStr.startsWith("/dest-");
  const finalSrc = useLocal ? (fallback || pickImage(altStr)) : srcStr;

  return (
    <img
      {...props}
      alt={altStr}
      src={finalSrc}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
};

export default SafeImage;
