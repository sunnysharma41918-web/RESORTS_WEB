import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Compass,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  Mountain,
  Thermometer,
  ArrowRight,
  X,
  Sparkles,
  Navigation,
  CornerDownRight,
  Map,
  MessageCircle,
} from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';
import { RoyalOrnamentDivider, IndianJaaliBorder, RoyalBackgroundCurves } from '../../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../../components/common/IndianArtBackground';
import { getWhatsAppBookingUrl } from '../../../data/contact';

// 1. NORTH INDIA GRAND CIRCUIT (15 Destinations)
export const NORTH_INDIA_ROUTE = [
  {
    id: 1,
    name: 'MANALI',
    state: 'Himachal Pradesh',
    region: 'Himalayas',
    tagline: 'Chase the Mountains',
    stars: 5,
    elevation: '2,050 m',
    temp: '14°C',
    lat: 32.24,
    lng: 77.19,
    highlights: 'Solang Valley • Rohtang Pass • Pine Chalets',
    nearby: ['Solang Valley (14 km)', 'Rohtang Pass (51 km)', 'Kasol & Parvati Valley (75 km)', 'Kullu (40 km)'],
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=85',
    description: 'Breathtaking cedar valleys surrounded by towering snow peaks, mountain stream trails, and cozy stone-and-wood chalets.',
  },
  {
    id: 2,
    name: 'RISHIKESH',
    state: 'Uttarakhand',
    region: 'Spiritual',
    tagline: 'Find Your Inner Peace',
    stars: 5,
    elevation: '372 m',
    temp: '24°C',
    lat: 30.09,
    lng: 78.27,
    highlights: 'Triveni Ghat • Lakshman Jhula • Ganga Aarti',
    nearby: ['Haridwar (25 km)', 'Shivpuri Rafting (16 km)', 'Neelkanth Mahadev (30 km)', 'Dehradun (45 km)'],
    image: 'https://images.unsplash.com/photo-1650341259809-9314b0de9268?auto=format&fit=crop&w=800&q=90',
    description: 'World-renowned yoga haven nestled on sacred Ganges riverbanks, offering private ghat meditation and mountain wellness.',
  },
  {
    id: 3,
    name: 'SHIMLA',
    state: 'Himachal Pradesh',
    region: 'Himalayas',
    tagline: 'Colonial Charm in the Hills',
    stars: 4,
    elevation: '2,276 m',
    temp: '16°C',
    lat: 31.10,
    lng: 77.17,
    highlights: 'Christ Church • The Ridge • Mall Road Vista',
    nearby: ['Kufri (16 km)', 'Chail Palace (45 km)', 'Mashobra (10 km)', 'Narkanda (60 km)'],
    image: 'https://images.unsplash.com/photo-1562670652-e5947bddb335?auto=format&fit=crop&w=800&q=85',
    description: 'Timeless British colonial heritage, pine-scented promenades, and panoramic Himalayan mountain horizons.',
  },
  {
    id: 4,
    name: 'SRINAGAR',
    state: 'Jammu & Kashmir',
    region: 'Himalayas',
    tagline: 'Heaven on Earth',
    stars: 5,
    elevation: '1,585 m',
    temp: '18°C',
    lat: 34.08,
    lng: 74.80,
    highlights: 'Dal Lake Shikara • Mughal Gardens • Chinar Trees',
    nearby: ['Gulmarg (50 km)', 'Pahalgam (90 km)', 'Sonamarg (80 km)', 'Doodhpathri (42 km)'],
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=85',
    description: 'Floating cedar houseboats on mirror-like Dal Lake surrounded by snow-dusted Pir Panjal ranges and royal gardens.',
  },
  {
    id: 5,
    name: 'JAIPUR',
    state: 'Rajasthan',
    region: 'Heritage',
    tagline: 'Royal Heritage Awaits',
    stars: 5,
    elevation: '431 m',
    temp: '31°C',
    lat: 26.91,
    lng: 75.79,
    highlights: 'Hawa Mahal • Amber Fort • Pink City Bazaars',
    nearby: ['Amber Fort (11 km)', 'Nahargarh (15 km)', 'Pushkar (145 km)', 'Samode Palace (42 km)'],
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=85',
    description: 'Pink sandstone havelis, monumental hilltop forts, vibrant textile bazaars, and opulent royal Rajasthani courtyards.',
  },
  {
    id: 6,
    name: 'UDAIPUR',
    state: 'Rajasthan',
    region: 'Heritage',
    tagline: 'City of Lakes',
    stars: 5,
    elevation: '598 m',
    temp: '29°C',
    lat: 24.58,
    lng: 73.71,
    highlights: 'Lake Pichola • City Palace • Jag Mandir',
    nearby: ['Kumbhalgarh Fort (85 km)', 'Ranakpur Temples (93 km)', 'Mount Abu (160 km)', 'Chittorgarh (115 km)'],
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=85',
    description: 'Romantic marble palaces floating on shimmering lakes, sunset boat cruises, and aristocratic Rajput hospitality.',
  },
  {
    id: 7,
    name: 'MUSSOORIE',
    state: 'Uttarakhand',
    region: 'Himalayas',
    tagline: 'The Queen of Hills',
    stars: 4,
    elevation: '2,005 m',
    temp: '15°C',
    lat: 30.45,
    lng: 78.07,
    highlights: 'Gun Hill • Kempty Falls • Camel Back Road',
    nearby: ['Dhanaulti (32 km)', 'Landour (4 km)', 'George Everest Peak (6 km)', 'Kempty Falls (15 km)'],
    image: 'https://images.unsplash.com/photo-1605809798547-5374823db815?auto=format&fit=crop&w=800&q=85',
    description: 'Misty green ridges overlooking the Doon Valley, quiet forest trails, and heritage colonial estate stays.',
  },
  {
    id: 8,
    name: 'AMRITSAR',
    state: 'Punjab',
    region: 'Spiritual',
    tagline: 'A Divine Experience',
    stars: 5,
    elevation: '234 m',
    temp: '27°C',
    lat: 31.63,
    lng: 74.87,
    highlights: 'Golden Temple • Harmandir Sahib • Heritage Street',
    nearby: ['Wagah Border (28 km)', 'Tarn Taran Sahib (25 km)', 'Gobindgarh Fort (3 km)', 'Harike Wetland (55 km)'],
    image: 'https://images.unsplash.com/photo-1588096344356-9a4f6cfba4b8?auto=format&fit=crop&w=800&q=85',
    description: 'The golden jewel of Sikh spiritual devotion, illuminated holy sarovar waters, and rich Punjabi culinary heritage.',
  },
  {
    id: 9,
    name: 'AGRA',
    state: 'Uttar Pradesh',
    region: 'Heritage',
    tagline: 'Home to Timeless Love',
    stars: 5,
    elevation: '171 m',
    temp: '30°C',
    lat: 27.18,
    lng: 78.02,
    highlights: 'Taj Mahal • Agra Fort • Yamuna Riverfront',
    nearby: ['Fatehpur Sikri (36 km)', 'Mathura (55 km)', 'Vrindavan (70 km)', 'Bharatpur Bird Park (55 km)'],
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=85',
    description: 'The world-famous white marble Taj Mahal, Mughal imperial architecture, and royal heritage gardens.',
  },
  {
    id: 10,
    name: 'VRINDAVAN',
    state: 'Uttar Pradesh',
    region: 'Spiritual',
    tagline: 'Where Devotion Comes Alive',
    stars: 5,
    elevation: '170 m',
    temp: '28°C',
    lat: 27.58,
    lng: 77.70,
    highlights: 'Prem Mandir • Bankey Bihari • Yamuna Ghats',
    nearby: ['Mathura (12 km)', 'Govardhan Hill (25 km)', 'Barsana (45 km)', 'Gokul (20 km)'],
    image: 'https://cdn.pixabay.com/photo/2020/01/21/08/09/indian-temple-4782304_1280.jpg',
    description: 'Sacred holy groves, celestial temple aartis, and serene spiritual retreats along the Yamuna river.',
  },
  {
    id: 11,
    name: 'NAINITAL',
    state: 'Uttarakhand',
    region: 'Himalayas',
    tagline: 'Lakes & Lasting Memories',
    stars: 4,
    elevation: '2,084 m',
    temp: '17°C',
    lat: 29.39,
    lng: 79.46,
    highlights: 'Naini Lake Boating • Snow View Point • Mallital',
    nearby: ['Bhimtal (22 km)', 'Mukteshwar (50 km)', 'Pangot (15 km)', 'Jim Corbett Park (65 km)'],
    image: 'https://images.unsplash.com/photo-1588698504022-79e5257cb90c?auto=format&fit=crop&w=800&q=85',
    description: 'Emerald eye-shaped alpine lake enclosed by steep pine slopes, cozy lakeside promenade, and cool mountain breezes.',
  },
  {
    id: 12,
    name: 'GULMARG',
    state: 'Jammu & Kashmir',
    region: 'Himalayas',
    tagline: 'Snowy Escapes',
    stars: 5,
    elevation: '2,650 m',
    temp: '11°C',
    lat: 34.05,
    lng: 74.38,
    highlights: 'Gulmarg Gondola • Apharwat Peak • Powder Snow',
    nearby: ['Apharwat Peak (6 km)', 'Tangmarg (13 km)', 'Drung Waterfall (16 km)', 'Baba Reshi (5 km)'],
    image: 'https://images.unsplash.com/photo-1628172906109-1a76b92f7ea0?auto=format&fit=crop&w=800&q=85',
    description: 'Premier Asian powder ski paradise, world’s highest cable car gondola, and pristine alpine meadows.',
  },
  {
    id: 13,
    name: 'HARIDWAR',
    state: 'Uttarakhand',
    region: 'Spiritual',
    tagline: 'Faith Flows Here',
    stars: 4,
    elevation: '314 m',
    temp: '26°C',
    lat: 29.94,
    lng: 78.16,
    highlights: 'Har Ki Pauri • Mansa Devi • Evening Ganga Aarti',
    nearby: ['Rishikesh (25 km)', 'Rajaji National Park (18 km)', 'Mansa Devi (3 km)', 'Chandi Devi (4 km)'],
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443a91e?auto=format&fit=crop&w=800&q=85',
    description: 'Ancient sacred gateway where the holy Ganges emerges from the Himalayas, renowned for vibrant evening lamp ceremonies.',
  },
  {
    id: 14,
    name: 'LEH',
    state: 'Ladakh',
    region: 'Himalayas',
    tagline: 'Land of High Passes',
    stars: 5,
    elevation: '3,500 m',
    temp: '9°C',
    lat: 34.15,
    lng: 77.58,
    highlights: 'Pangong Tso • Khardung La • Shanti Stupa',
    nearby: ['Pangong Tso (150 km)', 'Nubra Valley & Hunder (120 km)', 'Khardung La (40 km)', 'Magnetic Hill (30 km)'],
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=85',
    description: 'Dramatic high-altitude moonscapes, pristine cobalt lakes, and cliffside ancient Tibetan Buddhist monasteries.',
  },
  {
    id: 15,
    name: 'VARANASI',
    state: 'Uttar Pradesh',
    region: 'Spiritual',
    tagline: 'Where Life Meets Divinity',
    stars: 5,
    elevation: '81 m',
    temp: '29°C',
    lat: 25.31,
    lng: 82.97,
    highlights: 'Dashashwamedh Ghat • Kashi Vishwanath • Sunrise Boats',
    nearby: ['Sarnath (10 km)', 'Ramnagar Fort (14 km)', 'Chunar Fort (40 km)', 'Vindhyachal (70 km)'],
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=85',
    description: 'The eternal spiritual capital of India with historic stone river steps, mystical evening aarti, and timeless culture.',
  },
];

// 2. SOUTH INDIA GRAND CIRCUIT (15 Destinations)
export const SOUTH_INDIA_ROUTE = [
  {
    id: 1,
    name: 'MUNNAR',
    state: 'Kerala',
    region: 'Hills',
    tagline: 'Misty Tea Hills & Green Valleys',
    stars: 5,
    elevation: '1,532 m',
    temp: '19°C',
    lat: 10.09,
    lng: 77.06,
    highlights: 'Eravikulam National Park • Mattupetty Dam • Tea Estates',
    nearby: ['Anamudi Peak (15 km)', 'Chinnar Wildlife (48 km)', 'Thekkady (85 km)', 'Kolukkumalai (32 km)'],
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=85',
    description: 'Rolling carpet of emerald tea plantations shrouded in morning mist, cool mountain waterfalls, and private forest villas.',
  },
  {
    id: 2,
    name: 'ALLEPPEY',
    state: 'Kerala',
    region: 'Backwaters',
    tagline: 'Venice of the East & Backwaters',
    stars: 5,
    elevation: '1 m',
    temp: '29°C',
    lat: 9.49,
    lng: 76.33,
    highlights: 'Vembanad Lake • Houseboat Cruises • Marari Beach',
    nearby: ['Kumarakom (32 km)', 'Kochi Fort (53 km)', 'Mararikulam (14 km)', 'Pathiramanal (16 km)'],
    image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=800&q=85',
    description: 'Serene palm-fringed backwaters, traditional luxury thatched houseboats, and gentle tropical canal waterways.',
  },
  {
    id: 3,
    name: 'OOTY',
    state: 'Tamil Nadu',
    region: 'Hills',
    tagline: 'Queen of Nilgiri Hillstations',
    stars: 4,
    elevation: '2,240 m',
    temp: '15°C',
    lat: 11.41,
    lng: 76.70,
    highlights: 'Botanical Gardens • Nilgiri Toy Train • Doddabetta Peak',
    nearby: ['Coonoor (19 km)', 'Kotagiri (29 km)', 'Pykara Lake (21 km)', 'Avalanche Lake (26 km)'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
    description: 'Cool blue Nilgiri eucalyptus hills, heritage mountain toy train journeys, and lush botanical gardens.',
  },
  {
    id: 4,
    name: 'COORG (KODAGU)',
    state: 'Karnataka',
    region: 'Hills',
    tagline: 'Scotland of India & Coffee Country',
    stars: 5,
    elevation: '1,150 m',
    temp: '21°C',
    lat: 12.42,
    lng: 75.74,
    highlights: 'Abbey Falls • Coffee Plantations • Raja’s Seat',
    nearby: ['Dubare Elephant Camp (28 km)', 'Madikeri Fort (2 km)', 'Talakaveri (44 km)', 'Iruppu Falls (75 km)'],
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443a91e?auto=format&fit=crop&w=800&q=85',
    description: 'Aromatic coffee and spice estates, cascading jungle waterfalls, and warm Kodava hospitality in misty hills.',
  },
  {
    id: 5,
    name: 'WAYANAD',
    state: 'Kerala',
    region: 'Hills',
    tagline: 'Pristine Waterfalls & Spice Forests',
    stars: 5,
    elevation: '700 m',
    temp: '23°C',
    lat: 11.68,
    lng: 76.13,
    highlights: 'Banasura Sagar Dam • Chembra Peak • Edakkal Caves',
    nearby: ['Kuruva Island (30 km)', 'Muthanga Wildlife (38 km)', 'Meenmutty Falls (29 km)', 'Pookode Lake (15 km)'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85',
    description: 'Lush Western Ghats rainforests, heart-shaped alpine lakes, pre-historic rock caves, and luxury treetop retreats.',
  },
  {
    id: 6,
    name: 'HAMPI',
    state: 'Karnataka',
    region: 'Heritage',
    tagline: 'UNESCO Boulders & Vijayanagara Ruins',
    stars: 5,
    elevation: '467 m',
    temp: '31°C',
    lat: 15.34,
    lng: 76.46,
    highlights: 'Virupaksha Temple • Stone Chariot • Tungabhadra River',
    nearby: ['Anegundi (5 km)', 'Sanapur Lake (12 km)', 'Badami Caves (140 km)', 'Pattadakal (135 km)'],
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443a91e?auto=format&fit=crop&w=800&q=85',
    description: 'Surreal granite boulder landscapes, magnificent carved temple pavilions, and sunset vistas over the Tungabhadra river.',
  },
  {
    id: 7,
    name: 'PONDICHERRY',
    state: 'Puducherry',
    region: 'Coastal',
    tagline: 'French Quarters & Promenade Waves',
    stars: 4,
    elevation: '3 m',
    temp: '30°C',
    lat: 11.94,
    lng: 79.81,
    highlights: 'White Town Villas • Promenade Beach • Auroville',
    nearby: ['Auroville (12 km)', 'Paradise Beach (8 km)', 'Mahabalipuram (95 km)', 'Chidambaram (65 km)'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=85',
    description: 'Pastel French colonial boulevards, bougainvillea-framed cafes, serene ashrams, and refreshing Bay of Bengal shorelines.',
  },
  {
    id: 8,
    name: 'GOKARNA',
    state: 'Karnataka',
    region: 'Coastal',
    tagline: 'Om Beach & Sacred Coastal Cliffs',
    stars: 4,
    elevation: '10 m',
    temp: '28°C',
    lat: 14.55,
    lng: 74.32,
    highlights: 'Om Beach • Kudle Beach • Mahabaleshwar Temple',
    nearby: ['Yana Rocks (50 km)', 'Mirjan Fort (22 km)', 'Murudeshwar (78 km)', 'Karwar (60 km)'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=85',
    description: 'Untouched golden crescent beaches nestled beneath rocky cliffs, sacred coastal Shiva shrines, and oceanfront peace.',
  },
  {
    id: 9,
    name: 'KODAIKANAL',
    state: 'Tamil Nadu',
    region: 'Hills',
    tagline: 'Princess of Hill Stations',
    stars: 4,
    elevation: '2,133 m',
    temp: '16°C',
    lat: 10.23,
    lng: 77.48,
    highlights: 'Kodai Lake • Coaker’s Walk • Pillar Rocks',
    nearby: ['Berijam Lake (21 km)', 'Vattakanal (4 km)', 'Mannavanur (34 km)', 'Silver Cascade (8 km)'],
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=85',
    description: 'Star-shaped alpine lake, forested hiking trails, misty precipice viewpoints, and crisp mountain eucalyptus air.',
  },
  {
    id: 10,
    name: 'KANYAKUMARI',
    state: 'Tamil Nadu',
    region: 'Coastal',
    tagline: 'Where Three Oceans Converge',
    stars: 5,
    elevation: '0 m',
    temp: '29°C',
    lat: 8.08,
    lng: 77.54,
    highlights: 'Vivekananda Rock • Thiruvalluvar Statue • Sunset Point',
    nearby: ['Padmanabhapuram Palace (37 km)', 'Kovalam Beach (75 km)', 'Vattakottai Fort (7 km)', 'Suchindram (12 km)'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
    description: 'India’s southernmost cape where the Arabian Sea, Bay of Bengal, and Indian Ocean meet under dramatic sunrise skies.',
  },
  {
    id: 11,
    name: 'MADURAI',
    state: 'Tamil Nadu',
    region: 'Heritage',
    tagline: 'City of Temples & Sacred Towers',
    stars: 5,
    elevation: '101 m',
    temp: '32°C',
    lat: 9.92,
    lng: 78.11,
    highlights: 'Meenakshi Amman Temple • Thirumalai Nayak Palace • Jasmine Bazaars',
    nearby: ['Rameshwaram (170 km)', 'Kodaikanal (115 km)', 'Alagar Koyil (21 km)', 'Chettinad (90 km)'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=85',
    description: 'One of the world’s oldest continuously inhabited cities, crowned by the soaring sculpted gopurams of Meenakshi Temple.',
  },
  {
    id: 12,
    name: 'MYSORE',
    state: 'Karnataka',
    region: 'Heritage',
    tagline: 'Palace City & Royal Heritage',
    stars: 5,
    elevation: '763 m',
    temp: '27°C',
    lat: 12.30,
    lng: 76.64,
    highlights: 'Mysore Palace • Chamundi Hill • Brindavan Gardens',
    nearby: ['Srirangapatna (16 km)', 'Kabini Wildlife (60 km)', 'Bandipur Park (75 km)', 'Somnathpur (35 km)'],
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443a91e?auto=format&fit=crop&w=800&q=85',
    description: 'Illuminated golden royal palace, fragrant sandalwood markets, silk looms, and majestic historical charm.',
  },
  {
    id: 13,
    name: 'RAMESHWARAM',
    state: 'Tamil Nadu',
    region: 'Coastal',
    tagline: 'Dhanushkodi & Sacred Sea Temple',
    stars: 4,
    elevation: '10 m',
    temp: '30°C',
    lat: 9.28,
    lng: 79.31,
    highlights: 'Ramanathaswamy Temple • Dhanushkodi Beach • Pamban Sea Bridge',
    nearby: ['Dhanushkodi Ghost Town (18 km)', 'Pamban Island (12 km)', 'Devipattinam (70 km)', 'Mandapam (15 km)'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
    description: 'Sacred island temple with 1,000-pillar corridors, historic ocean railway bridge, and pristine turquoise sea edges.',
  },
  {
    id: 14,
    name: 'KABINI & NAGARHOLE',
    state: 'Karnataka',
    region: 'Wilderness',
    tagline: 'Jungle Wilderness & River Safaris',
    stars: 5,
    elevation: '700 m',
    temp: '26°C',
    lat: 11.95,
    lng: 76.27,
    highlights: 'Kabini River Safari • Black Panther Corridor • Wild Elephant Herds',
    nearby: ['Bandipur Tiger Reserve (55 km)', 'Wayanad (60 km)', 'Iruppu Falls (70 km)', 'Bylakuppe (65 km)'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85',
    description: 'Exclusive wildlife riverfront resorts along Kabini reservoir, famed for leopards, tigers, and magnificent elephant herds.',
  },
  {
    id: 15,
    name: 'CHIKMAGALUR',
    state: 'Karnataka',
    region: 'Hills',
    tagline: 'Mullayanagiri & Coffee Country',
    stars: 5,
    elevation: '1,090 m',
    temp: '22°C',
    lat: 13.31,
    lng: 75.77,
    highlights: 'Mullayanagiri Peak • Baba Budangiri • Hebbe Falls',
    nearby: ['Belur Temples (38 km)', 'Halebidu Hoysala (50 km)', 'Kudremukh (100 km)', 'Kemmangundi (55 km)'],
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=85',
    description: 'Birthplace of Indian coffee, highest mountain peak of Karnataka, and lush private estate heritage stays.',
  },
];

export default function DestinationSection() {
  const [selectedCircuit, setSelectedCircuit] = useState('north'); // 'north' | 'south'
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeModalPlace, setActiveModalPlace] = useState(null);
  const carouselRef = useRef(null);

  // Active dataset based on selected circuit
  const currentCircuitList = selectedCircuit === 'north' ? NORTH_INDIA_ROUTE : SOUTH_INDIA_ROUTE;

  const filteredPlaces = currentCircuitList.filter((place) => {
    if (activeFilter === 'all') return true;
    return place.region.toLowerCase() === activeFilter.toLowerCase();
  });

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleCircuitChange = (circuit) => {
    setSelectedCircuit(circuit);
    setActiveFilter('all');
  };

  return (
    <section className="relative bg-[#FAF6ED] dark:bg-[#0D0A07] text-[#241A12] dark:text-[#F5EFE6] py-20 sm:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden font-sans transition-colors duration-500 border-t border-[#B38738]/20 dark:border-[#B38738]/30">
      
      {/* Indian Palace Art & Arch Background */}
      <IndianArtBackground variant="full" opacity="opacity-[0.045] dark:opacity-[0.065]" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8 sm:space-y-10">

        {/* ========================================================================= */}
        {/* SECTION HEADER WITH ROYAL DIVIDER & CIRCUIT SWITCHER                     */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 font-sans">
          
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B38738]/10 dark:bg-[#B38738]/20 border border-[#B38738]/30 text-[#B38738] dark:text-[#E8C97E] text-[11px] sm:text-xs font-cinzel font-bold uppercase tracking-[0.22em] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B38738] dark:bg-[#E8C97E]" />
              <span>✦ PAN-INDIA ROYAL SANCTUARIES ✦</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-marcellus font-bold text-[#241A12] dark:text-[#F5EFE6] tracking-[0.02em] uppercase leading-tight">
              OUR DESTINATIONS
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <RoyalOrnamentDivider color="#B38738" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#635142] dark:text-[#BFB0A2] leading-relaxed font-sans font-light max-w-2xl mx-auto">
              From majestic Himalayan summits and royal desert forts to tranquil southern backwaters, explore 30+ handpicked sanctuaries curated for an unforgettable royal holiday.
            </p>
          </ScrollReveal>

          {/* Circuit Switcher & Explore All Page Link */}
          <ScrollReveal direction="up" delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3 font-sans">
              <div className="p-1 rounded-full bg-white/80 dark:bg-[#1A130D]/80 border border-[#B38738]/40 flex items-center gap-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => handleCircuitChange('north')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-cinzel font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCircuit === 'north'
                      ? 'bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] text-white font-bold shadow-md'
                      : 'text-[#635142] dark:text-[#BFB0A2] hover:text-[#B38738] dark:hover:text-white'
                  }`}
                >
                  🏔️ North Circuit (15)
                </button>
                <button
                  type="button"
                  onClick={() => handleCircuitChange('south')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-cinzel font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCircuit === 'south'
                      ? 'bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] text-white font-bold shadow-md'
                      : 'text-[#635142] dark:text-[#BFB0A2] hover:text-[#B38738] dark:hover:text-white'
                  }`}
                >
                  🌴 South Circuit (15)
                </button>
              </div>

              <Link
                to="/destinations"
                className="px-5 py-2 rounded-full border border-[#B38738]/50 hover:border-[#B38738] text-[#B38738] dark:text-[#E8C97E] hover:bg-[#B38738]/10 text-xs font-cinzel font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>View Full 30+ Directory →</span>
              </Link>

              {/* Carousel Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={scrollLeft}
                  className="w-9 h-9 rounded-full border border-[#B38738]/40 bg-white/80 dark:bg-[#1A130D]/80 flex items-center justify-center text-[#241A12] dark:text-[#F5EFE6] hover:bg-[#B38738] hover:text-white transition-colors shadow-sm cursor-pointer"
                  aria-label="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={scrollRight}
                  className="w-9 h-9 rounded-full border border-[#B38738]/40 bg-white/80 dark:bg-[#1A130D]/80 flex items-center justify-center text-[#241A12] dark:text-[#F5EFE6] hover:bg-[#B38738] hover:text-white transition-colors shadow-sm cursor-pointer"
                  aria-label="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </ScrollReveal>
        </div>


        {/* ========================================================================= */}
        {/* DESTINATION CARDS CAROUSEL                                                */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          
          {/* Category Filter Tabs depending on Circuit */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {(selectedCircuit === 'north'
              ? [
                  { key: 'all', label: 'All 15 North Sanctuaries' },
                  { key: 'Himalayas', label: 'Himalayas & Valleys' },
                  { key: 'Heritage', label: 'Royal Heritage' },
                  { key: 'Spiritual', label: 'Spiritual Ghats' },
                ]
              : [
                  { key: 'all', label: 'All 15 South Sanctuaries' },
                  { key: 'Hills', label: 'Western Ghats & Hills' },
                  { key: 'Backwaters', label: 'Backwaters & Canals' },
                  { key: 'Coastal', label: 'Ocean Beaches' },
                  { key: 'Heritage', label: 'Temples & Palaces' },
                ]
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                  activeFilter.toLowerCase() === tab.key.toLowerCase()
                    ? 'bg-[#F59E0B] text-black shadow-md'
                    : 'dark:bg-white/5 bg-black/5 dark:text-white/70 text-black/70 hover:dark:text-white border dark:border-white/10 border-black/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Horizontal Cards Scroller */}
          <div
            ref={carouselRef}
            className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredPlaces.map((place) => {
              return (
                <motion.div
                  key={`${selectedCircuit}-${place.id}`}
                  data-card-id={place.id}
                  whileHover={{ y: -6 }}
                  onClick={() => setActiveModalPlace(place)}
                  className="w-[270px] sm:w-[290px] lg:w-[310px] shrink-0 rounded-2xl bg-white dark:bg-[#141923] border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer flex flex-col justify-between transition-all duration-300"
                >
                  {/* Destination Photo (Top Rounded) */}
                  <div className="relative w-full aspect-[4/3] rounded-t-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Stop Number Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#F59E0B] text-xs font-mono font-bold flex items-center gap-1 border border-[#F59E0B]/40 shadow-md">
                      <span>Stop {place.id}</span>
                    </div>

                    {/* Climate Tag */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-mono border border-white/20">
                      {place.temp}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-2">
                      {/* Title & Altitude */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black uppercase text-[#0F172A] dark:text-white tracking-wide">
                          {place.name}
                        </h3>
                        <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                          {place.elevation}
                        </span>
                      </div>

                      {/* Tagline */}
                      <p className="text-xs font-semibold text-[#F59E0B] leading-tight">
                        "{place.tagline}"
                      </p>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 text-gray-900 dark:text-amber-400 pt-0.5">
                        {Array.from({ length: place.stars }).map((_, sIdx) => (
                          <Star
                            key={sIdx}
                            className="w-3.5 h-3.5 fill-current text-amber-400"
                          />
                        ))}
                      </div>

                      {/* State Location Subtitle */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#F59E0B]" />
                        <span>{place.state}, India</span>
                      </div>

                      {/* NEARBY LOCATIONS HIGHLIGHT BOX */}
                      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1 mb-1.5">
                          <CornerDownRight className="w-3 h-3 text-[#F59E0B]" />
                          Nearby Locations:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {place.nearby.slice(0, 3).map((near, nIdx) => (
                            <span
                              key={nIdx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                            >
                              {near}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* "Inquiry" WhatsApp Action Button */}
                    <div className="pt-2">
                      <a
                        href={getWhatsAppBookingUrl(`Hello Country Holidays Hotels & Resorts, I would like to make an inquiry about booking a stay in ${place.name} (${place.state}). Please share available packages and rates.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-2.5 px-4 rounded-lg border border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black dark:hover:text-black text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 group/btn"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Inquiry</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* DESTINATION SANCTUARY DETAILS & NEARBY MODAL                              */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {activeModalPlace && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
              onClick={() => setActiveModalPlace(null)}
            >
              <motion.div
                initial={{ scale: 0.92, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 20 }}
                className="relative w-full max-w-2xl bg-white dark:bg-[#121622] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Image Banner */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <img
                    src={activeModalPlace.image}
                    alt={activeModalPlace.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
                  <button
                    type="button"
                    onClick={() => setActiveModalPlace(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
                    aria-label="Close Modal"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F59E0B] text-black text-[10px] font-mono font-black uppercase">
                        Stop {activeModalPlace.id} of 15
                      </span>
                      <span className="text-xs font-mono text-white/80">
                        📍 {activeModalPlace.state}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wide">
                      {activeModalPlace.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F59E0B] font-semibold">
                      "{activeModalPlace.tagline}"
                    </p>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-8 space-y-5 max-h-[55vh] overflow-y-auto">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#F59E0B] font-bold mb-1">
                      Sanctuary Overview
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                      {activeModalPlace.description}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-center">
                      <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 block">Climate</span>
                      <span className="text-sm font-bold text-[#F59E0B]">{activeModalPlace.temp}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-center">
                      <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 block">Altitude</span>
                      <span className="text-sm font-bold dark:text-white text-gray-900">{activeModalPlace.elevation}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-center">
                      <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 block">Region</span>
                      <span className="text-sm font-bold text-blue-500">{activeModalPlace.region}</span>
                    </div>
                  </div>

                  {/* NEARBY EXCURSIONS & ATTRACTIONS LIST */}
                  <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#F59E0B] font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Nearby Connected Locations &amp; Day Trips:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalPlace.nearby.map((near, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-800 dark:text-gray-200"
                        >
                          <Navigation className="w-3 h-3 text-[#F59E0B] shrink-0" />
                          <span>{near}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking / Enquiry Footer */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      Highlights: {activeModalPlace.highlights}
                    </span>

                    <a
                      href={getWhatsAppBookingUrl(`Hello Country Holidays Hotels & Resorts, I would like to enquire about booking a stay in ${activeModalPlace.name} (${activeModalPlace.state}). Please share availability, luxury room options & tariff.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#22C55E] hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-green-500/20 cursor-pointer shrink-0"
                    >
                      <MessageCircle className="w-4 h-4 fill-white/20" />
                      <span>Inquiry on WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}