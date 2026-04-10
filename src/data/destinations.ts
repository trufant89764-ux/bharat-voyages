import goaImg from "@/assets/dest-goa-beach.jpg";
import kashmirImg from "@/assets/dest-kashmir.jpg";
import hampiImg from "@/assets/dest-hampi.jpg";
import festivalImg from "@/assets/dest-festival.jpg";
import keralaImg from "@/assets/dest-kerala.jpg";
import wildlifeImg from "@/assets/dest-wildlife.jpg";
import varanasiImg from "@/assets/dest-varanasi.jpg";
import craftImg from "@/assets/dest-craft.jpg";

export type Category = "Beaches" | "Mountains" | "Heritage" | "Wildlife" | "Spiritual" | "Festivals" | "Craft";

export interface Destination {
  id: string;
  title: string;
  state: string;
  category: Category;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  shortDesc: string;
  description: string;
  highlights: string[];
  itinerary: string[];
  gallery: string[];
  lat: number;
  lng: number;
}

export const destinations: Destination[] = [
  {
    id: "goa-beaches",
    title: "Goa Beaches",
    state: "Goa",
    category: "Beaches",
    image: goaImg,
    price: 8999,
    rating: 4.7,
    reviews: 2340,
    shortDesc: "Sun-kissed shores and vibrant nightlife on India's western coast.",
    description: "Goa is India's smallest state but one of the most popular destinations. Known for its pristine beaches, Portuguese heritage architecture, vibrant nightlife, and delectable seafood cuisine. From the bustling shores of Baga and Calangute to the serene sands of Palolem and Agonda, Goa offers something for every traveler.",
    highlights: ["Baga & Calangute Beaches", "Old Goa Churches (UNESCO)", "Dudhsagar Waterfalls", "Spice Plantations", "Night Markets"],
    itinerary: ["Day 1: Arrive in Goa, check-in, explore Calangute Beach", "Day 2: Visit Old Goa churches and Fontainhas Latin Quarter", "Day 3: Dudhsagar Falls excursion and spice plantation", "Day 4: South Goa beaches – Palolem & Agonda", "Day 5: Water sports, shopping, departure"],
    gallery: [goaImg, keralaImg],
    lat: 15.2993,
    lng: 74.124,
  },
  {
    id: "kashmir-valley",
    title: "Kashmir Valley",
    state: "Jammu & Kashmir",
    category: "Mountains",
    image: kashmirImg,
    price: 15999,
    rating: 4.9,
    reviews: 3120,
    shortDesc: "Paradise on Earth — snow-capped peaks, emerald valleys, and serene lakes.",
    description: "Kashmir, often called 'Paradise on Earth,' is a breathtaking valley nestled in the Himalayas. From the iconic Dal Lake houseboats to the flower-filled Mughal Gardens, from the ski slopes of Gulmarg to the meadows of Pahalgam, Kashmir offers an unparalleled experience of natural beauty and warm Kashmiri hospitality.",
    highlights: ["Dal Lake Shikara Ride", "Mughal Gardens", "Gulmarg Gondola", "Pahalgam Valley", "Kashmiri Cuisine & Wazwan"],
    itinerary: ["Day 1: Arrive Srinagar, Dal Lake shikara ride", "Day 2: Mughal Gardens – Shalimar, Nishat, Chashme Shahi", "Day 3: Day trip to Gulmarg, gondola ride", "Day 4: Pahalgam – Betaab Valley, Aru Valley", "Day 5: Local handicraft shopping, departure"],
    gallery: [kashmirImg],
    lat: 34.0837,
    lng: 74.7973,
  },
  {
    id: "hampi-heritage",
    title: "Hampi Ruins",
    state: "Karnataka",
    category: "Heritage",
    image: hampiImg,
    price: 6499,
    rating: 4.6,
    reviews: 1890,
    shortDesc: "Ancient Vijayanagara Empire ruins set among surreal boulder landscapes.",
    description: "Hampi, a UNESCO World Heritage Site, is the ruins of the magnificent Vijayanagara Empire. Set in a surreal landscape of giant boulders and banana plantations, Hampi's temples, royal enclosures, and ancient marketplaces transport you back to the 14th century. The Vittala Temple with its iconic stone chariot is a masterpiece of Dravidian architecture.",
    highlights: ["Vittala Temple & Stone Chariot", "Virupaksha Temple", "Royal Enclosure", "Tungabhadra River Coracle Ride", "Sunset at Matanga Hill"],
    itinerary: ["Day 1: Arrive Hampi, Virupaksha Temple, Hampi Bazaar", "Day 2: Royal Enclosure, Queen's Bath, Elephant Stables", "Day 3: Vittala Temple, coracle ride, Matanga Hill sunset"],
    gallery: [hampiImg],
    lat: 15.335,
    lng: 76.46,
  },
  {
    id: "ranthambore-wildlife",
    title: "Ranthambore Safari",
    state: "Rajasthan",
    category: "Wildlife",
    image: wildlifeImg,
    price: 12999,
    rating: 4.5,
    reviews: 1560,
    shortDesc: "Track the majestic Royal Bengal Tiger in ancient fortress jungles.",
    description: "Ranthambore National Park is one of India's finest tiger reserves. The park is unique for its ancient fort ruins that dot the landscape, creating a dramatic backdrop for wildlife sightings. Besides tigers, the park is home to leopards, sloth bears, crocodiles, and over 300 bird species.",
    highlights: ["Tiger Safari (Jeep & Canter)", "Ranthambore Fort (UNESCO)", "Padam Talao Lake", "Bird Watching", "Rajasthani Village Visit"],
    itinerary: ["Day 1: Arrive Sawai Madhopur, evening jungle drive", "Day 2: Morning & afternoon safaris", "Day 3: Fort visit, village tour, departure"],
    gallery: [wildlifeImg],
    lat: 26.0173,
    lng: 76.5026,
  },
  {
    id: "varanasi-spiritual",
    title: "Varanasi Ghats",
    state: "Uttar Pradesh",
    category: "Spiritual",
    image: varanasiImg,
    price: 5999,
    rating: 4.8,
    reviews: 4200,
    shortDesc: "The eternal city — witness the sacred Ganga Aarti on ancient ghats.",
    description: "Varanasi, one of the world's oldest continuously inhabited cities, is the spiritual capital of India. The city's 87 ghats along the Ganges are the setting for the most profound rituals of life and death. The evening Ganga Aarti ceremony is a mesmerizing spectacle of fire, chants, and devotion that has continued for thousands of years.",
    highlights: ["Ganga Aarti Ceremony", "Sunrise Boat Ride", "Kashi Vishwanath Temple", "Sarnath (Buddhist Site)", "Banarasi Silk Weaving"],
    itinerary: ["Day 1: Arrive Varanasi, evening Ganga Aarti at Dashashwamedh Ghat", "Day 2: Sunrise boat ride, temple visits, silk weaving workshop", "Day 3: Sarnath day trip, local food tour, departure"],
    gallery: [varanasiImg],
    lat: 25.3176,
    lng: 83.0068,
  },
  {
    id: "kerala-backwaters",
    title: "Kerala Backwaters",
    state: "Kerala",
    category: "Beaches",
    image: keralaImg,
    price: 11499,
    rating: 4.8,
    reviews: 2780,
    shortDesc: "Cruise through tranquil palm-fringed canals on a traditional houseboat.",
    description: "Kerala's backwaters are a network of interconnected canals, rivers, lakes, and inlets formed by more than 900 km of waterways. A houseboat cruise through Alleppey is one of India's most iconic travel experiences — gliding past rice paddies, coconut groves, and village life at a pace that lets you truly absorb the beauty of 'God's Own Country.'",
    highlights: ["Alleppey Houseboat Cruise", "Munnar Tea Plantations", "Kathakali Dance Performance", "Ayurvedic Spa Treatment", "Kerala Cuisine Cooking Class"],
    itinerary: ["Day 1: Arrive Kochi, Fort Kochi exploration", "Day 2: Drive to Munnar, tea plantation visit", "Day 3: Alleppey houseboat overnight cruise", "Day 4: Kumarakom bird sanctuary, Kathakali show", "Day 5: Ayurvedic spa, departure"],
    gallery: [keralaImg, goaImg],
    lat: 9.4981,
    lng: 76.3388,
  },
  {
    id: "holi-festival",
    title: "Holi Festival",
    state: "Uttar Pradesh",
    category: "Festivals",
    image: festivalImg,
    price: 7499,
    rating: 4.9,
    reviews: 1950,
    shortDesc: "Experience the world's most colorful festival in Mathura & Vrindavan.",
    description: "Holi, the Festival of Colors, is India's most vibrant celebration. In Mathura and Vrindavan — the birthplace and childhood home of Lord Krishna — Holi celebrations begin weeks in advance with Lathmar Holi, flower Holi, and the grand color play. It's an explosion of color, music, dance, and pure joy that breaks all social barriers.",
    highlights: ["Lathmar Holi in Barsana", "Color play in Vrindavan temples", "Traditional Holi sweets (Gujiya)", "Folk music & dance", "Holika Dahan bonfire"],
    itinerary: ["Day 1: Arrive Mathura, visit Krishna Janmabhoomi", "Day 2: Lathmar Holi in Barsana", "Day 3: Grand Holi celebrations in Vrindavan", "Day 4: Mathura Holi, evening departure"],
    gallery: [festivalImg],
    lat: 27.4924,
    lng: 77.6737,
  },
  {
    id: "rajasthan-craft",
    title: "Rajasthan Craft Trail",
    state: "Rajasthan",
    category: "Craft",
    image: craftImg,
    price: 9999,
    rating: 4.6,
    reviews: 890,
    shortDesc: "Discover centuries-old block printing, pottery, and textile traditions.",
    description: "Rajasthan's craft trail takes you through the colorful villages and bustling bazaars where artisans have practiced their craft for generations. From the blue pottery of Jaipur to the block printing of Sanganer, from the intricate miniature paintings of Udaipur to the leatherwork of Jodhpur, this trail is a journey through India's living artistic heritage.",
    highlights: ["Block Printing Workshop", "Blue Pottery Making", "Miniature Painting Class", "Textile Market Tour", "Artisan Village Visits"],
    itinerary: ["Day 1: Arrive Jaipur, Hawa Mahal, textile market tour", "Day 2: Sanganer block printing, blue pottery workshop", "Day 3: Drive to Udaipur, miniature painting class", "Day 4: Jodhpur leather craft, departure"],
    gallery: [craftImg],
    lat: 26.9124,
    lng: 75.7873,
  },
];

export const categories: { name: Category; icon: string; count: number }[] = [
  { name: "Beaches", icon: "🏖️", count: 2 },
  { name: "Mountains", icon: "🏔️", count: 1 },
  { name: "Heritage", icon: "🏛️", count: 1 },
  { name: "Wildlife", icon: "🐅", count: 1 },
  { name: "Spiritual", icon: "🕉️", count: 1 },
  { name: "Festivals", icon: "🎨", count: 1 },
  { name: "Craft", icon: "🏺", count: 1 },
];

export const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "Our Kashmir trip was absolutely magical! The houseboat on Dal Lake and the Gulmarg gondola ride were experiences of a lifetime. Explore Bharat made everything seamless.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Rahul Verma",
    location: "Delhi",
    text: "The Rajasthan craft trail opened my eyes to India's incredible artistic heritage. Watching artisans create block prints and blue pottery was deeply moving.",
    rating: 5,
    avatar: "RV",
  },
  {
    name: "Ananya Iyer",
    location: "Bangalore",
    text: "Kerala backwaters houseboat cruise was pure bliss. The Ayurvedic spa, the food, the scenery — everything was perfect. Can't wait to book again!",
    rating: 5,
    avatar: "AI",
  },
];
