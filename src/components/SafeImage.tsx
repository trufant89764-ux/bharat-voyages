import { useState } from "react";

const realImages: Record<string, string> = {
  "Goa Beaches": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Palolem_Beach%2C_South_Goa.jpg/1280px-Palolem_Beach%2C_South_Goa.jpg",
  "Kerala Backwaters": "https://upload.wikimedia.org/wikipedia/commons/e/ee/House_Boat_DSW.jpg",
  "Gokarna Beaches": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Delight_india.jpg",
  "Pondicherry French Quarter": "https://upload.wikimedia.org/wikipedia/commons/1/17/Pondicherry-French_Quarter-WUS02277.jpg",
  "Pondicherry Heritage": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Pondicherry-French_Quarter-WUS02279.jpg",
  "Andaman Islands": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Radha_Nagar_beach%2C_Havelock_Island%2C_Andamn%2C_India-_Sun_set_view.jpg/1280px-Radha_Nagar_beach%2C_Havelock_Island%2C_Andamn%2C_India-_Sun_set_view.jpg",
  "Kashmir Valley": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/1280px-Dal_Lake_Hazratbal_Srinagar.jpg",
  "Ladakh Adventure": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Leh_City_seen_from_Shanti_Stupa.JPG/1280px-Leh_City_seen_from_Shanti_Stupa.JPG",
  "Manali Valley": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Solang_Valley_%2CManali%2C_Himachal_Pardes%2C_India.JPG/1280px-Solang_Valley_%2CManali%2C_Himachal_Pardes%2C_India.JPG",
  "Darjeeling Hills": "https://upload.wikimedia.org/wikipedia/commons/9/96/DarjeelingTrainFruitshop_%282%29.jpg",
  "Meghalaya Cloud Forests": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg/1280px-Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg",
  "Coorg Coffee Estates": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Tadiandamol_Valley%2C_Western_Ghats.jpg/1280px-Tadiandamol_Valley%2C_Western_Ghats.jpg",
  "Munnar Tea Gardens": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/1280px-Munnar_Overview.jpg",
  "Spiti Valley": "https://upload.wikimedia.org/wikipedia/commons/f/f5/Kee_monastery_Spiti_Valley_%28edited%29.jpg",
  "Ajanta & Ellora Caves": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Ajanta_%2863%29.jpg",
  "Hampi Heritage": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg/1280px-Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg",
  "Jaipur Royal Heritage": "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
  "Konark Sun Temple": "https://upload.wikimedia.org/wikipedia/commons/4/47/Konarka_Temple.jpg",
  "Mysore Palace City": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/1280px-Mysore_Palace_Morning.jpg",
  "Rann of Kutch": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Rann_of_Kutch_-_White_Desert.jpg",
  "Bodh Gaya": "https://upload.wikimedia.org/wikipedia/commons/d/dc/Mahabodhi_Temple_South_Wall_%282%29.jpg",
  "Tirupati Balaji": "https://upload.wikimedia.org/wikipedia/commons/2/2a/A_View_of_Tirumala_Venkateswara_Temple.JPG",
  "Varanasi Spiritual": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/1280px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg",
  "Bandhavgarh Tiger Reserve": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Bengal_tiger_in_Bandhavgarh_National_Park_01.jpg",
  "Jim Corbett Safari": "https://upload.wikimedia.org/wikipedia/commons/7/78/Bengal-Tiger_Corbett_Uttarakhand_Dec-2013.jpg",
  "Kaziranga Wildlife": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Beauty_of_Kaziranga_National_Park.jpg",
  "Periyar Wildlife": "https://upload.wikimedia.org/wikipedia/commons/6/66/Periyar_National_Park.JPG",
  "Ranthambore Wildlife": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Ranthambore_National_Park.JPG",
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

function oldImageIsFake(src: string) {
  return src === "/placeholder.svg" || src.startsWith("/dest-");
}

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const SafeImage = ({ fallback, alt, src, onError, ...props }: Props) => {
  const [failed, setFailed] = useState(false);
  const srcStr = typeof src === "string" ? src : "";
  const altStr = (alt as string) || "";

  const useLocal = failed || !srcStr || oldImageIsFake(srcStr);
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
