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
  "Pongal Harvest Festival": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/A_girl_performing_a_Bharatanatyam_dance_at_a_Pongal_Festival_in_Namakkal%2C_Tamil_Nadu%2C_India.jpg/1280px-A_girl_performing_a_Bharatanatyam_dance_at_a_Pongal_Festival_in_Namakkal%2C_Tamil_Nadu%2C_India.jpg",
  "Rath Yatra Puri": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Jagannath_Rath_Yatra_Puri_Odisha.jpg",
  "Thrissur Pooram": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Aanas_at_Thrissur_Pooram.jpg/1280px-Aanas_at_Thrissur_Pooram.jpg",
  "Kumbh Mela Prayagraj": "https://upload.wikimedia.org/wikipedia/commons/4/42/Crowd_in_2025_Prayag_Maha_kumbh_mela.jpg",
  "Hemis Festival Ladakh": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Hemis_monastery_festival_II.jpg/1280px-Hemis_monastery_festival_II.jpg",
  "Losar Tibetan New Year": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Monk_Dancing_at_the_Tibetan_Losar_%28New_Year%29.jpg",
  "Pattachitra of Odisha": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Artist_with_Odisha_Pattachitra_DSCN1052_01.jpg/1280px-Artist_with_Odisha_Pattachitra_DSCN1052_01.jpg",
  "Bidriware of Bidar": "https://upload.wikimedia.org/wikipedia/commons/c/c0/Bidriware_%28Bidri_craft%29_ewer_%28also_lid_jug%29_17th_century%2C_Hyderabad_Deccan._now_displayed_at_Victoria_%26_Albert_Museum%2C_London.jpg",
  "Dhokra Metal Craft": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Tribal_Anklets_called_Andu_made_of_Bell_Metal_using_Dhokra_Craft_Technique%2C_Orissa.jpg",
  "Jaipur Blue Pottery": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Blue_Pottery%2C_Jaipur_School_of_Art.jpg/1280px-Blue_Pottery%2C_Jaipur_School_of_Art.jpg",
  "Warli Painting Trail": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Warli_art_at_Borivali_Stn_01.jpg/1280px-Warli_art_at_Borivali_Stn_01.jpg",
  "Kalamkari of Andhra": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Dashavatara_de_kalamkari%2C_British_Museum.jpg/1280px-Dashavatara_de_kalamkari%2C_British_Museum.jpg",
  "Khajuraho Temples": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Khajuraho_Dulhadeo_2010.jpg/1280px-Khajuraho_Dulhadeo_2010.jpg",
  "Ajmer Sharif Dargah": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Night_View_of_Ajmer_Sharif_Dargah.jpg/1280px-Night_View_of_Ajmer_Sharif_Dargah.jpg",
  "Sundarbans Mangroves": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sundarban_Landscape_during_monsoon_17.jpg/1280px-Sundarban_Landscape_during_monsoon_17.jpg",
  "Valley of Flowers": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Valley_of_flowers_national_park%2C_Uttarakhand%2C_India_01.jpg/1280px-Valley_of_flowers_national_park%2C_Uttarakhand%2C_India_01.jpg",
  "Rishikesh Adventure": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Ganga_Arti_at_Rishikesh.jpg/1280px-Ganga_Arti_at_Rishikesh.jpg",
  "Dudhsagar Falls": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Dudhsagar_Waterfall_%283231771809%29.jpg/1280px-Dudhsagar_Waterfall_%283231771809%29.jpg",
  "Varkala Cliff Beach": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Varkala_beach_view.jpg/1280px-Varkala_beach_view.jpg",
  "Marari Beach": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Mararikulam_Beach_2.jpg/1280px-Mararikulam_Beach_2.jpg",
  "Diu Island Beaches": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Nagoa_Beach_Diu.jpg/1280px-Nagoa_Beach_Diu.jpg",
  "Mahabalipuram Shore Temple": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Shore_Temple_Group_of_monuments_at_Mahabalipuram_April_2019.jpg/1280px-Shore_Temple_Group_of_monuments_at_Mahabalipuram_April_2019.jpg",
  "Fatehpur Sikri": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Fatehpur_Sikri-_Buland_Darwaza_gate_seen_from_outside_05.jpg/1280px-Fatehpur_Sikri-_Buland_Darwaza_gate_seen_from_outside_05.jpg",
  "Golden Temple Amritsar": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Golden_Temple_-Amritsar%2C_Punjab%2C_India_-_panoramio.jpg/1280px-The_Golden_Temple_-Amritsar%2C_Punjab%2C_India_-_panoramio.jpg",
  "Rameshwaram Temple": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Rameshwaram_temple_%2811%29.jpg/1280px-Rameshwaram_temple_%2811%29.jpg",
  "Gir National Park": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Lion_waiting_in_Namibia.jpg/1280px-Lion_waiting_in_Namibia.jpg",
  "Sariska Tiger Reserve": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Tiger_in_Ranthambhore.jpg/1280px-Tiger_in_Ranthambhore.jpg",
  "Auli Skiing": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Snow_in_Auli_03.jpg/1280px-Snow_in_Auli_03.jpg",
  "Tawang Monastery": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Tawang_Monastery_in_Arunachal_Pradesh.jpg/1280px-Tawang_Monastery_in_Arunachal_Pradesh.jpg",
  "Pichwai Painting of Nathdwara": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pichwai_painting_of_Shrinathji.jpg/1280px-Pichwai_painting_of_Shrinathji.jpg",
  "Gond Tribal Art": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Gond_Painting_by_Ranveer_Singh_Shyam_at_Kamalanga.jpg/1280px-Gond_Painting_by_Ranveer_Singh_Shyam_at_Kamalanga.jpg",
  "Hornbill Festival Nagaland": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Hornbill_Festival_2016.jpg/1280px-Hornbill_Festival_2016.jpg",
  "Kerala Boat Race": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Nehru_trophy_boat_race_2010.jpg/1280px-Nehru_trophy_boat_race_2010.jpg",
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
