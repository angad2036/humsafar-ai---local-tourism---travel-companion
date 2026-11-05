import { Destination, LocalGuide, GroupExperience, ItineraryDay } from '../types/travel';

// Curated authentic destinations for Haryana & nearby cultural belts
export const DESTINATIONS: Destination[] = [
  {
    id: 'kurukshetra',
    name: 'Kurukshetra',
    tagline: 'The Cradle of the Bhagavad Gita & 48 Kos Pilgrimage',
    region: 'North Haryana',
    district: 'Kurukshetra',
    state: 'Haryana',
    coordinates: [29.9695, 76.8783],
    heroImage: '/src/assets/images/humsafar_hero_kurukshetra_1793858972455.jpg',
    galleryImages: [
      '/src/assets/images/humsafar_hero_kurukshetra_1793858972455.jpg',
      '/src/assets/images/humsafar_sheikh_chilli_1793858974818.jpg',
    ],
    description:
      'Kurukshetra is one of the world’s most venerable cultural and philosophical landscapes. Mentioned in the opening verse of the Mahabharata as "Dharmakshetra", it encompasses majestic sacred water bodies, millennium-old archaeological mounds, Mughal-era monuments, and peaceful pilgrim avenues.',
    history:
      'According to ancient texts and archaeological excavations, Kurukshetra was inhabited since the pre-Harappan period. It served as the battlefield of the great Kurukshetra War described in the Mahabharata and is the revered site where Lord Krishna delivered the sermon of the Bhagavad Gita to Arjuna beneath the sacred banyan tree at Jyotisar.',
    significance:
      'World heritage spiritual crossroad, epicenter of Vedic and Harappan cultural evolution, and home to the 48 Kos Tirtha heritage circuit encompassing over 134 sacred sites.',
    whyVisit:
      'Experience the immense peace of evening aarti at Brahma Sarovar, study 5,000-year-old relics at Krishna Museum, and walk through Mughal gardens at Sheikh Chilli’s Tomb.',
    category: 'spiritual',
    bestTimeToVisit: 'October to March (pleasant winter climate and vibrant festivals)',
    recommendedDuration: '2 to 3 Days',
    distanceFromDelhiKm: 155,
    distanceFromChandigarhKm: 95,
    famousAttractions: [
      {
        name: 'Brahma Sarovar',
        description: 'One of the largest man-made sacred water tanks in Asia (1,800m by 1,400m), mentioned in Al-Biruni’s memoirs.',
        type: 'spiritual',
        timing: '05:00 AM - 10:00 PM',
        entryFee: 'Free entry',
      },
      {
        name: 'Sheikh Chilli’s Tomb & Madrasa',
        description: 'Exquisite 17th-century Mughal mausoleum built of pure white marble with lush quadrangular gardens and terracotta jalis.',
        type: 'monument',
        timing: '09:00 AM - 05:00 PM',
        entryFee: '₹25 per person (ASI site)',
      },
      {
        name: 'Jyotisar Tirtha',
        description: 'The sacred birthplace of the Bhagavad Gita, marked by an immortal banyan tree (Akshaya Vat) and laser light & sound show.',
        type: 'spiritual',
        timing: '06:00 AM - 08:30 PM',
        entryFee: 'Free entry',
      },
      {
        name: 'Kurukshetra Panorama and Science Centre',
        description: 'Dramatic cylindrical hall featuring a 3D animated depiction of the battle of Kurukshetra accompanied by realistic soundscapes.',
        type: 'museum',
        timing: '10:00 AM - 05:30 PM',
        entryFee: '₹40 per person',
      },
      {
        name: 'Sri Krishna Museum',
        description: 'A world-class repository housing rare sculptures, palm-leaf manuscripts, Mughal and Rajasthani miniature paintings depicting Krishna lore.',
        type: 'museum',
        timing: '10:00 AM - 05:00 PM (Closed Mondays)',
        entryFee: '₹30 per person',
      },
    ],
    hiddenGems: [
      {
        name: 'Bhadrakali Shaktipeeth (Savitri Peeth)',
        description: 'One of the revered 52 Shaktipeeths of India, where it is believed the ankle of Sati fell; pilgrims traditionally offer clay or brass horses.',
        locationNote: 'Near Jhansa Road, 2 km from Brahma Sarovar',
      },
      {
        name: 'Harsh Ka Tila Mound',
        description: 'Archaeological mound revealing continuous habitation from the 1st millennium BCE Kushan era up to the Mughal period.',
        locationNote: 'Adjacent to Sheikh Chilli Tomb complex',
      },
      {
        name: 'Nabhi Kamal Tirtha',
        description: 'Quiet sacred pond dedicated to Lord Brahma, nestled inside ancient village alleys with rare medieval stone carving relics.',
        locationNote: 'Thanesar old township',
      },
    ],
    localDelicacies: [
      {
        name: 'Desi Ghee Bajra Khichri & Kadhi',
        description: 'Slow-simmered winter pearl millet served with freshly churned white butter (makhan), jaggery (gud), and tangy curd kadhi.',
        mustTryAt: 'Local Thali outlets near Railway Road',
      },
      {
        name: 'Kurukshetra Kulhad Rabri-Jalebi',
        description: 'Crisp hot saffron jalebis drenched in chilled thickened condensed milk rabri, sprinkled with pistachios.',
        mustTryAt: 'Old Thanesar Bazaar Sweetmakers',
      },
      {
        name: 'Alloo-Kachori with Methi Chutney',
        description: 'Puffed golden kachoris stuffed with spiced lentils and accompanied by hot potato curry and sweet fenugreek dip.',
        mustTryAt: 'Ghat Street stalls near Sannihit Sarovar',
      },
    ],
    travelTips: [
      'Attend the grand evening Maha Aarti at Brahma Sarovar around 6:30 PM for a serene spiritual spectacle.',
      'Electric e-rickshaws are cheap and ubiquitous; negotiate ₹300-₹400 for a 4-hour local sightseeing circuit.',
      'Wear comfortable slip-on footwear as shoes must be removed when entering temple ghats and shrines.',
    ],
    estimatedDailyBudgetPerPerson: {
      travelCost: 600,
      accommodationCost: 1400,
      foodCost: 650,
      localTransportCost: 350,
      activityCost: 200,
      totalEstimatedCost: 3200,
    },
  },
  {
    id: 'morni-hills',
    name: 'Morni Hills & Tikkar Taal',
    tagline: 'Haryana’s Only Hill Retreat in the Shivalik Ranges',
    region: 'Panchkula / Foothills',
    district: 'Panchkula',
    state: 'Haryana',
    coordinates: [30.6975, 77.0864],
    heroImage: '/src/assets/images/humsafar_morni_hills_1793858972974.jpg',
    galleryImages: [
      '/src/assets/images/humsafar_morni_hills_1793858972974.jpg',
      '/src/assets/images/humsafar_pinjore_gardens_1793858973138.jpg',
    ],
    description:
      'Nestled at an elevation of 1,220 meters in the outer Shivalik foothills, Morni Hills is a serene sanctuary of pine forests, rolling green ridges, tranquil twin lakes called Tikkar Taal, and historic hill fort ruins.',
    history:
      'Ruled by local Mir chiefs and later associated with Raja of Kotaha in the medieval era. The ruined Morni Fort atop the highest ridge offers sweeping 360-degree vistas across Haryana and Himachal Pradesh borders.',
    significance:
      'Premier eco-tourism and birdwatching destination harboring barking deer, sambar, grey francolin, wallcreepers, and rare Himalayan migratory birds.',
    whyVisit:
      'Escape city noise with lakeside boating at Tikkar Taal, gentle forest trekking, adventure camping, and exploring the 17th-century hill fortress.',
    category: 'nature',
    bestTimeToVisit: 'September to April for crisp mountain breezes; July-August for lush monsoon mist',
    recommendedDuration: '1 to 2 Days',
    distanceFromDelhiKm: 260,
    distanceFromChandigarhKm: 45,
    famousAttractions: [
      {
        name: 'Tikkar Taal (Bada Taal & Chhota Taal)',
        description: 'Interconnected natural hill lakes flanked by pine forests, offering pedal boating, kayaking, and serene water reflections.',
        type: 'nature',
        timing: '07:00 AM - 06:30 PM',
        entryFee: '₹50 per vehicle',
      },
      {
        name: 'Morni Hill Fort',
        description: 'Perched on a vantage peak, this historic stone citadel has been renovated with museum displays of local flora and heritage.',
        type: 'monument',
        timing: '09:00 AM - 05:00 PM',
        entryFee: '₹20 per person',
      },
      {
        name: 'Adventure Park Morni',
        description: 'Thrilling outdoor facility with ziplining, rope climbing, Burma bridge, and kids treehouses amidst pine trees.',
        type: 'nature',
        timing: '09:30 AM - 05:30 PM',
        entryFee: '₹100 entry + activity charges',
      },
    ],
    hiddenGems: [
      {
        name: 'Ghagar River Pine Valley Trail',
        description: 'An unpaved 4 km forest walking trail through fragrant chir pine groves leading down to pebble riverbeds.',
        locationNote: 'Near Forest Rest House trail markers',
      },
      {
        name: 'Kotaha Valley Sunset Rock',
        description: 'A secluded ridge overlook that offers magnificent sunset panoramas over the Shivalik foothills.',
        locationNote: '2 km past Morni village toward Tikkar Taal',
      },
    ],
    localDelicacies: [
      {
        name: 'Himalayan Herbal Chai & Corn Pakoras',
        description: 'Fragrant tea spiced with local lemongrass and holy basil, accompanied by steaming sweet-corn and onion fritters.',
        mustTryAt: 'Hillside cafes near Tikkar Taal',
      },
      {
        name: 'Shivalik Pahaadi Kadi & Rice',
        description: 'Tempered buttermilk curry flavored with wild coriander seeds and served over steaming Basmati rice.',
        mustTryAt: 'Forest eco-lodges in Morni village',
      },
    ],
    travelTips: [
      'Fill your fuel tank at Panchkula or Raipur Rani as mountain fuel pumps are limited on the ascent.',
      'Pack light woolens or a jacket even in late spring and autumn, as mountain breezes turn chilly after sundown.',
    ],
    estimatedDailyBudgetPerPerson: {
      travelCost: 900,
      accommodationCost: 1600,
      foodCost: 700,
      localTransportCost: 450,
      activityCost: 350,
      totalEstimatedCost: 4000,
    },
  },
  {
    id: 'pinjore-gardens',
    name: 'Pinjore & Yadavindra Gardens',
    tagline: 'Terraced Mughal Splendor at the Foothills of Kalka',
    region: 'Panchkula / Kalka',
    district: 'Panchkula',
    state: 'Haryana',
    coordinates: [30.7963, 76.9156],
    heroImage: '/src/assets/images/humsafar_pinjore_gardens_1793858973138.jpg',
    galleryImages: [
      '/src/assets/images/humsafar_pinjore_gardens_1793858973138.jpg',
      '/src/assets/images/humsafar_morni_hills_1793858972974.jpg',
    ],
    description:
      'Pinjore Gardens (also known as Yadavindra Gardens) is an extraordinary 17th-century Charbagh terraced garden masterpiece. Designed in seven descending levels, it features cascading water courses, sparkling fountains, heritage pavilions, and lush fruit orchards.',
    history:
      'Conceived and designed in the 17th century by Nawab Fidai Khan, architect of the Badshahi Mosque in Lahore and foster brother of Mughal Emperor Aurangzeb. It was later patronized by the Maharaja of Patiala, Sir Yadavindra Singh.',
    significance:
      'One of the finest surviving examples of Mughal classical terraced hydraulic garden design in Northern India, host to the annual Mango Festival and heritage Baisakhi celebrations.',
    whyVisit:
      'Admire the illuminated fountains at dusk, photograph Mughal pavilions like Shish Mahal and Jal Mahal, and explore the nearby gateway to the UNESCO Kalka-Shimla Toy Train.',
    category: 'historical',
    bestTimeToVisit: 'October to April; July for the world-famous Pinjore Mango Mela',
    recommendedDuration: '1 Day',
    distanceFromDelhiKm: 250,
    distanceFromChandigarhKm: 22,
    famousAttractions: [
      {
        name: 'Seven Terraced Garden Levels',
        description: 'Stepped terraces showcasing Shish Mahal on the first terrace, Hawa Mahal on the second, and Jal Mahal surrounded by fountains.',
        type: 'monument',
        timing: '07:00 AM - 10:00 PM',
        entryFee: '₹25 per person',
      },
      {
        name: 'Shish Mahal & Rang Mahal',
        description: 'Intricately stuccoed glasswork palace with arched balconies that overlook fountains and cypress tree boulevards.',
        type: 'monument',
        timing: '09:00 AM - 06:00 PM',
        entryFee: 'Included in garden entry',
      },
      {
        name: 'Heritage Kalka Railway Station',
        description: 'Just 5 km away, the historic terminus of the UNESCO World Heritage Kalka-Shimla mountain railway route built in 1903.',
        type: 'monument',
        timing: 'All day',
        entryFee: 'Free platform viewing',
      },
    ],
    hiddenGems: [
      {
        name: 'Bhima Devi Temple Complex (Khajuraho of North India)',
        description: 'Excavated 8th to 11th-century Gurjara-Pratihara stone temple ruins displaying intricate sculptures of Hindu deities.',
        locationNote: 'Only 600m from the Pinjore Gardens main gate',
      },
      {
        name: 'Kaushalya River Dam Viewpoint',
        description: 'Scenic earthen dam reservoir with peaceful water views and migratory cranes during early morning hours.',
        locationNote: '3 km south towards Pinjore bypass',
      },
    ],
    localDelicacies: [
      {
        name: 'Pinjore Mango Coolers & Aam Panna',
        description: 'Tangy roasted green mango cooler with roasted cumin, black salt, and fresh mint leaves.',
        mustTryAt: 'Garden refreshment verandas',
      },
      {
        name: 'Punjabi Dhabha Stuffed Paneer Parathas',
        description: 'Crispy butter-topped parathas served with thick homemade dahi and mixed spicy pickle.',
        mustTryAt: 'Old Kalka Highway Dhabas',
      },
    ],
    travelTips: [
      'Visit between 5:00 PM and 8:00 PM to witness the magical transition when the heritage fountain lights turn on.',
      'Combine Pinjore Gardens with a morning visit to the nearby Bhima Devi Temple ruins for an enriching day trip.',
    ],
    estimatedDailyBudgetPerPerson: {
      travelCost: 750,
      accommodationCost: 1500,
      foodCost: 600,
      localTransportCost: 300,
      activityCost: 150,
      totalEstimatedCost: 3300,
    },
  },
  {
    id: 'rakhigarhi',
    name: 'Rakhigarhi Heritage Site',
    tagline: 'The Largest City of the Indus Valley Harappan Civilization',
    region: 'Hisar District',
    district: 'Hisar',
    state: 'Haryana',
    coordinates: [29.2889, 76.1158],
    heroImage: '/src/assets/images/humsafar_rakhigarhi_heritage_1793858973939.jpg',
    galleryImages: [
      '/src/assets/images/humsafar_rakhigarhi_heritage_1793858973939.jpg',
      '/src/assets/images/humsafar_sheikh_chilli_1793858974818.jpg',
    ],
    description:
      'Spread over 350 hectares in Hisar district along the ancient dried bed of the Saraswati-Drishadvati rivers, Rakhigarhi is recognized as the largest known metropolis of the Indus Valley Civilization—surpassing Mohenjo-Daro and Harappa in territorial scale.',
    history:
      'Excavations by the Archaeological Survey of India (ASI) have unveiled pre-Harappan and mature Harappan layers dating back to 6500 BCE. Findings include sophisticated drainage systems, multi-room baked brick houses, lapidary workshops, steatite seals, and sacred fire altars.',
    significance:
      'Global archaeological landmark providing groundbreaking genetic and urban planning evidence regarding the origin, continuity, and craftsmanship of South Asian civilization.',
    whyVisit:
      'Walk alongside actual archaeological excavation trenches, explore the newly curated state-of-the-art on-site museum, and touch history spanning over 7,000 years.',
    category: 'historical',
    bestTimeToVisit: 'November to February (mild winter sunshine and clear skies for field walking)',
    recommendedDuration: '1 to 2 Days',
    distanceFromDelhiKm: 150,
    distanceFromChandigarhKm: 190,
    famousAttractions: [
      {
        name: 'ASI Excavation Mounds 1 to 7',
        description: 'Exposed urban complexes revealing Harappan planned streets, terracotta drainage channels, and residential baked-brick walls.',
        type: 'monument',
        timing: '09:00 AM - 05:00 PM',
        entryFee: 'Free entry (accompanied by local community guides)',
      },
      {
        name: 'Rakhigarhi Archaeological Site Museum',
        description: 'Modern exhibition showcasing terracotta pottery, carnelian beads, copper mirrors, gold ornaments, and 3D recreations of Harappan life.',
        type: 'museum',
        timing: '10:00 AM - 05:00 PM (Closed Mondays)',
        entryFee: '₹20 per person',
      },
      {
        name: 'Harappan Bead & Pottery Workshop Reconstruction',
        description: 'Demonstration area where local potters revive ancient motifs using traditional foot wheels and native clay.',
        type: 'culinary',
        timing: '11:00 AM - 04:00 PM',
        entryFee: 'Free / voluntary tip to artisans',
      },
    ],
    hiddenGems: [
      {
        name: 'Ancient Drishadvati River Bed Walk',
        description: 'An evocative peaceful stroll along the palaeo-channel where ancient merchant rivercraft once docked 5,000 years ago.',
        locationNote: 'Northern periphery of Mound 4',
      },
      {
        name: 'Village Community Heritage Interpretation Centre',
        description: 'A grassroots museum initiated by village elders preserving surface finds, stone grinders, and folklore.',
        locationNote: 'Rakhigarhi Village Panchayat Bhavan',
      },
    ],
    localDelicacies: [
      {
        name: 'Rustic Haryanvi Choorma & Milk',
        description: 'Hand-crushed wheat rotis sweetened with country jaggery and generously bathed in home-made yellow cow ghee.',
        mustTryAt: 'Village homestays & rural eateries',
      },
      {
        name: 'Bathua Raita & Hara Saag',
        description: 'Winter wild-chenopodium (bathua) whipped in fresh curd paired with mustard greens and fresh makki roti.',
        mustTryAt: 'Local agricultural dhabas',
      },
    ],
    travelTips: [
      'Carry drinking water and a sunhat as walking between archaeological mounds requires sun protection.',
      'Engage a resident village guide at the museum gate—their firsthand familiarity with the excavation brings every brick to life.',
    ],
    estimatedDailyBudgetPerPerson: {
      travelCost: 650,
      accommodationCost: 1100,
      foodCost: 500,
      localTransportCost: 250,
      activityCost: 150,
      totalEstimatedCost: 2650,
    },
  },
  {
    id: 'sheikh-chilli-tomb',
    name: 'Sheikh Chilli’s Tomb Complex',
    tagline: 'The Taj Mahal of Haryana & Sufi Sanctuary',
    region: 'Thanesar / Kurukshetra',
    district: 'Kurukshetra',
    state: 'Haryana',
    coordinates: [29.9806, 76.8228],
    heroImage: '/src/assets/images/humsafar_sheikh_chilli_1793858974818.jpg',
    galleryImages: [
      '/src/assets/images/humsafar_sheikh_chilli_1793858974818.jpg',
      '/src/assets/images/humsafar_hero_kurukshetra_1793858972455.jpg',
    ],
    description:
      'Perched atop an ancient mound overlooking Thanesar, Sheikh Chilli’s Tomb is a jewel of Mughal and Persian architecture. Dedicated to the Qadiriyya Sufi saint Abd-ur-Rahim (revered as Sheikh Chilli) and spiritual mentor to Prince Dara Shikoh, the complex features pearly marble domes, red sandstone colonnades, and peaceful courtyard gardens.',
    history:
      'Constructed in the mid-17th century during the reign of Emperor Shah Jahan. The complex integrates a Sufi mausoleum, an octagonal tomb of the saint’s wife, and an adjoining classical Islamic Madrasa with twelve pillared arcades.',
    significance:
      'Celebrated for its harmonious synthesis of Mughal decorative restraint, mathematical symmetry, and Dara Shikoh’s interfaith philosophical legacy.',
    whyVisit:
      'Marvel at the gleaming marble dome, explore the Archaeological Museum inside the Madrasa, and discover ancient artefacts spanning from the 1st millennium BCE.',
    category: 'culture',
    bestTimeToVisit: 'October to March; late afternoon for gentle golden photography lighting',
    recommendedDuration: 'Half Day to 1 Day',
    distanceFromDelhiKm: 158,
    distanceFromChandigarhKm: 92,
    famousAttractions: [
      {
        name: 'The White Marble Octagonal Mausoleum',
        description: 'Raised on a high stone terrace, topped by a graceful pear-shaped bulbous marble dome with floral finial.',
        type: 'monument',
        timing: '09:00 AM - 05:00 PM',
        entryFee: '₹25 ASI Ticket',
      },
      {
        name: 'Mughal Madrasa & Quadrangle Courtyard',
        description: 'Vast square courtyard surrounded by vaulted arches, cloisters, and an ASI museum exhibiting excavated pottery and coins.',
        type: 'museum',
        timing: '09:00 AM - 05:00 PM',
        entryFee: 'Included in ticket',
      },
      {
        name: 'Terracotta Museum Galleries',
        description: 'Showcasing delicate terracotta figurines, sealings, and household implements from Harsh Ka Tila excavations.',
        type: 'museum',
        timing: '10:00 AM - 05:00 PM',
        entryFee: 'Included in ticket',
      },
    ],
    hiddenGems: [
      {
        name: 'The Chini ki Masjid (Tile Mosque)',
        description: 'Small Mughal prayer hall preserving glimpses of vibrant blue and turquoise floral glazed ceramic tiles.',
        locationNote: 'North corner of the complex',
      },
      {
        name: 'Harsh ka Tila Excavated Trenches',
        description: 'Direct view into 15-meter vertical soil strata displaying six continuous periods of ancient civilization.',
        locationNote: 'Immediately adjacent to the western bastion',
      },
    ],
    localDelicacies: [
      {
        name: 'Thanesar Kulfi-Falooda',
        description: 'Rich pistachio kulfi served with handmade corn-starch vermicelli and rose syrup.',
        mustTryAt: 'Main bazaar near railway crossing',
      },
      {
        name: 'Bedmi Puri & Khatta-Meetha Petha',
        description: 'Crisp urad-dal stuffed puris with spicy potato curry and sweet-sour pumpkin sabzi.',
        mustTryAt: 'Heritage breakfast joints in Thanesar',
      },
    ],
    travelTips: [
      'The morning and late afternoon hours offer magnificent photographic symmetry when shadows fall across the red sandstone arches.',
      'The complex is very peaceful on weekdays, offering a quiet contemplative contrast to busier pilgrim centers.',
    ],
    estimatedDailyBudgetPerPerson: {
      travelCost: 550,
      accommodationCost: 1200,
      foodCost: 550,
      localTransportCost: 250,
      activityCost: 100,
      totalEstimatedCost: 2650,
    },
  },
  {
    id: 'sultanpur-national-park',
    name: 'Sultanpur Bird Sanctuary & Jheel',
    tagline: 'World Ramsar Wetland & Migratory Avian Haven',
    region: 'Gurugram / NCR',
    district: 'Gurugram',
    state: 'Haryana',
    coordinates: [28.4619, 76.8929],
    heroImage: '/src/assets/images/humsafar_morni_hills_1793858972974.jpg',
    galleryImages: [
      '/src/assets/images/humsafar_morni_hills_1793858972974.jpg',
      '/src/assets/images/humsafar_hero_kurukshetra_1793858972455.jpg',
    ],
    description:
      'A designated Ramsar Wetland of International Importance, Sultanpur National Park is a thriving oasis for over 250 resident and migratory bird species arriving from Siberia, Central Asia, and Eastern Europe.',
    history:
      'Conceptualized and brought to national prominence in 1972 by legendary ornithologist Dr. Salim Ali and Peter Jackson. Upgraded to a National Park in 1991.',
    significance:
      'Critical flyway staging ground for flamingos, Siberian cranes, bar-headed geese, northern pintails, and endangered black-necked storks.',
    whyVisit:
      'Early morning birdwatching from four elevated watchtowers, peaceful walking trails encircling the wetland, and educational wildlife interpretation centre.',
    category: 'nature',
    bestTimeToVisit: 'November to February for migratory bird spectacles',
    recommendedDuration: '1 Day',
    distanceFromDelhiKm: 42,
    distanceFromChandigarhKm: 270,
    famousAttractions: [
      {
        name: 'Wetland Walking Loop & Bird Hides',
        description: 'A 3.5 km well-maintained shaded walking trail with hidden camouflage blinds for close avian photography.',
        type: 'nature',
        timing: '07:00 AM - 04:30 PM (Closed Tuesdays)',
        entryFee: '₹15 per person + ₹50 camera fee',
      },
      {
        name: 'Salim Ali Interpretation Centre',
        description: 'Educational museum displaying interactive displays on bird migration routes and wetland ecology.',
        type: 'museum',
        timing: '09:00 AM - 04:00 PM',
        entryFee: 'Free entry with park ticket',
      },
    ],
    hiddenGems: [
      {
        name: 'Farrukhnagar Heritage Baoli & Sheesh Mahal',
        description: 'Located just 12 km away, an exquisite 18th-century octagonal stepwell (Ghaus Ali Shah Baoli) and Faujdar palace.',
        locationNote: 'Farrukhnagar town',
      },
    ],
    localDelicacies: [
      {
        name: 'Farm-Fresh Bajra Roti with Saag & Gur',
        description: 'Traditional rustic meal served at nearby eco-farms with hand-churned white butter and hot jaggery.',
        mustTryAt: 'Farrukhnagar road rural dhabas',
      },
    ],
    travelTips: [
      'Bring binoculars or rent one at the forest entry gate; binoculars elevate the experience dramatically.',
      'Arrive right at 7:00 AM when gates open; birds are most active during the first two hours of morning light.',
    ],
    estimatedDailyBudgetPerPerson: {
      travelCost: 400,
      accommodationCost: 1200,
      foodCost: 500,
      localTransportCost: 200,
      activityCost: 150,
      totalEstimatedCost: 2450,
    },
  },
];

// Curated authentic Local Guides
export const LOCAL_GUIDES: LocalGuide[] = [
  {
    id: 'guide-1',
    name: 'Dr. Rameshwar Vashisth',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    location: 'Kurukshetra, Haryana',
    rating: 4.9,
    reviewsCount: 148,
    yearsExperience: 18,
    languages: ['Hindi', 'English', 'Sanskrit', 'Haryanvi'],
    expertise: ['Mahabharata Archaeology', '48 Kos Pilgrimage Tirthas', 'Vedic Literature & Philosophy'],
    bio: 'Retired lecturer in Ancient Indian History and heritage researcher. Specializes in decoding temple iconography, Mahabharata geography, and Vedic rituals across Thanesar and Jyotisar.',
    dailyRateINR: 2200,
    halfDayRateINR: 1200,
    availability: 'Accepting Bookings',
    verifiedDemo: true,
  },
  {
    id: 'guide-2',
    name: 'Jaspreet "Jassi" Kaur',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    location: 'Panchkula & Morni Hills',
    rating: 4.95,
    reviewsCount: 112,
    yearsExperience: 9,
    languages: ['Punjabi', 'Hindi', 'English'],
    expertise: ['Shivalik Eco-Trekking', 'Birdwatching & Flora', 'Local Folk Lore & Legends'],
    bio: 'Certified naturalist and passionate outdoors guide. Leads bird identification walks along Tikkar Taal and reveals the botanical secrets of chir pine and medicinal Shivalik plants.',
    dailyRateINR: 2000,
    halfDayRateINR: 1100,
    availability: 'Available Today',
    verifiedDemo: true,
  },
  {
    id: 'guide-3',
    name: 'Mohammad Tariq Ansari',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    location: 'Kurukshetra & Panipat',
    rating: 4.88,
    reviewsCount: 94,
    yearsExperience: 14,
    languages: ['Hindi', 'Urdu', 'English'],
    expertise: ['Mughal & Sufi Architecture', 'Sheikh Chilli History', 'Old Thanesar Food Walks'],
    bio: 'Heritage conservation enthusiast who has documented North India’s Sufi shrines for over a decade. Passionate about sharing Dara Shikoh’s pluralistic philosophy and hidden culinary treasures.',
    dailyRateINR: 1800,
    halfDayRateINR: 1000,
    availability: 'Accepting Bookings',
    verifiedDemo: true,
  },
  {
    id: 'guide-4',
    name: 'Virender Singh Arya',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    location: 'Hisar & Rakhigarhi',
    rating: 4.92,
    reviewsCount: 86,
    yearsExperience: 11,
    languages: ['Hindi', 'Haryanvi', 'English'],
    expertise: ['Indus Valley Civilization', 'Harappan Potting & Seal Studies', 'Village Rural Homestays'],
    bio: 'Resident village heritage guide of Rakhigarhi who has assisted ASI teams during major excavation seasons. Offers unmatched storytelling about 5,000-year-old trade and drainage engineering.',
    dailyRateINR: 1900,
    halfDayRateINR: 1050,
    availability: 'Available Today',
    verifiedDemo: true,
  },
];

// Curated Group Experiences
export const GROUP_EXPERIENCES: GroupExperience[] = [
  {
    id: 'exp-1',
    title: 'Twilight Aarti & Mahabharata Heritage Walk',
    destination: 'Kurukshetra, Haryana',
    destinationId: 'kurukshetra',
    image: '/src/assets/images/humsafar_hero_kurukshetra_1793858972455.jpg',
    date: 'Upcoming Saturday',
    time: '04:30 PM - 07:30 PM',
    duration: '3 hours',
    organizer: {
      name: 'Kurukshetra Heritage Collective',
      title: 'Community Conservation Chapter',
      badge: 'Certified Heritage Walk',
    },
    groupSizeLimit: 14,
    currentBooked: 9,
    pricePerPersonINR: 650,
    category: 'Heritage Walk',
    meetingPoint: 'Northern Ghat Pavilion, Brahma Sarovar',
    highlights: [
      'Guided walk along historic Sarovar ghats with historical narration',
      'Exclusive viewing point for the sacred sunset Maha Aarti ceremony',
      'Traditional brass diya offering and hot kulhad masala chai tasting',
    ],
    includes: ['Expert historian guide', 'Aarti diya kit', 'Masala chai & local snack'],
  },
  {
    id: 'exp-2',
    title: 'Shivalik Dawn Birding & Tikkar Taal Lake Trail',
    destination: 'Morni Hills, Panchkula',
    destinationId: 'morni-hills',
    image: '/src/assets/images/humsafar_morni_hills_1793858972974.jpg',
    date: 'Upcoming Sunday',
    time: '06:00 AM - 10:30 AM',
    duration: '4.5 hours',
    organizer: {
      name: 'Shivalik Eco Wanderers',
      title: 'Eco-Tourism Naturalist Group',
      badge: 'Eco-Conscious',
    },
    groupSizeLimit: 12,
    currentBooked: 7,
    pricePerPersonINR: 850,
    category: 'Nature & Trek',
    meetingPoint: 'Tikkar Taal Boating Club Gate',
    highlights: [
      'Spotting 30+ migratory and endemic bird species with spotter scopes',
      'Gentle 4km guided pine forest trail to secluded lake overlook',
      'Outdoor herbal tea and hot steamed corn snack by the water',
    ],
    includes: ['Naturalist guide', 'Binoculars sharing', 'Herbal breakfast snack'],
  },
  {
    id: 'exp-3',
    title: 'Harappan Brick & Terracotta Pottery Workshop Walk',
    destination: 'Rakhigarhi, Hisar',
    destinationId: 'rakhigarhi',
    image: '/src/assets/images/humsafar_rakhigarhi_heritage_1793858973939.jpg',
    date: 'Next Saturday',
    time: '09:30 AM - 01:30 PM',
    duration: '4 hours',
    organizer: {
      name: 'Indus Valley Living History Forum',
      title: 'Archaeological Outreach',
      badge: 'Educational Archeology',
    },
    groupSizeLimit: 15,
    currentBooked: 11,
    pricePerPersonINR: 750,
    category: 'Cultural Immersion',
    meetingPoint: 'Rakhigarhi Site Museum Entrance Gate',
    highlights: [
      'Direct walkthrough of Mound 4 & 5 excavation trenches with site experts',
      'Hands-on clay pottery wheel session with local master craftsman',
      'Rural Haryanvi bajra roti, saag & fresh lassi lunch experience',
    ],
    includes: ['Site entry & guide', 'Pottery clay kit', 'Authentic rural lunch'],
  },
  {
    id: 'exp-4',
    title: 'Mughal Architecture & Terraced Garden Twilight Tour',
    destination: 'Pinjore Gardens, Panchkula',
    destinationId: 'pinjore-gardens',
    image: '/src/assets/images/humsafar_pinjore_gardens_1793858973138.jpg',
    date: 'Next Sunday',
    time: '04:00 PM - 07:30 PM',
    duration: '3.5 hours',
    organizer: {
      name: 'Patiala & Mughal Heritage Circle',
      title: 'Architectural Documentarians',
      badge: 'Heritage Architecture',
    },
    groupSizeLimit: 16,
    currentBooked: 10,
    pricePerPersonINR: 600,
    category: 'Historical Tour',
    meetingPoint: 'Main Archway Gate, Yadavindra Gardens',
    highlights: [
      'Detailed narrative on 17th-century gravity hydraulic water channels',
      'Illuminated sunset viewing of Shish Mahal and Jal Mahal',
      'Visit to the nearby 10th-century Bhima Devi Gurjara-Pratihara temple ruins',
    ],
    includes: ['Garden entry ticket', 'Expert architectural narration', 'Evening refreshment'],
  },
];

// Curated Itinerary Templates
export const CURATED_ITINERARIES: Record<string, ItineraryDay[]> = {
  kurukshetra: [
    {
      dayNumber: 1,
      title: 'Sacred Sarovars & Ancient Epic Foundations',
      morning: {
        time: '07:30 AM - 11:30 AM',
        place: 'Brahma Sarovar & Sannihit Sarovar',
        activity: 'Peaceful morning circumambulation along the serene ghats. Explore Sarveshwar Mahadev Temple located in the center of the lake reservoir.',
        estExpense: 200,
      },
      lunch: {
        place: 'Heritage Dhabha, Railway Road',
        foodItem: 'Traditional Bajra Khichri with white makhan & buttermilk lassi',
        estExpense: 350,
      },
      afternoon: {
        time: '01:30 PM - 05:00 PM',
        place: 'Sri Krishna Museum & Kurukshetra Panorama',
        activity: 'Immerse in rare archaeological sculptures, palm-leaf manuscripts, and the 3D diorama of the Mahabharata battlefield.',
        estExpense: 150,
      },
      evening: {
        time: '05:30 PM - 07:30 PM',
        place: 'Jyotisar Tirtha',
        activity: 'Sit beneath the immortal Banyan Tree (Akshaya Vat) where the Bhagavad Gita was delivered. Watch the evening laser light & sound presentation.',
        estExpense: 250,
      },
      dinner: {
        place: 'Old Thanesar Food Bazaar',
        foodItem: 'Bedmi Puri, Aloo Dum, and hot Kulhad Rabri-Jalebi',
        estExpense: 400,
      },
    },
    {
      dayNumber: 2,
      title: 'Mughal Splendor, Archaeology & Shakti Shrines',
      morning: {
        time: '08:30 AM - 11:30 AM',
        place: 'Sheikh Chilli’s Tomb & Madrasa Complex',
        activity: 'Photograph the pristine white marble dome, explore the Mughal Madrasa museum, and walk the archaeological trenches of Harsh Ka Tila.',
        estExpense: 250,
      },
      lunch: {
        place: 'Thanesar Town Traditional Thali',
        foodItem: 'Kadhi Pakora, Paneer Bhurji, Tandoori Rotis, and mint chutney',
        estExpense: 320,
      },
      afternoon: {
        time: '01:30 PM - 04:30 PM',
        place: 'Bhadrakali Shaktipeeth Temple',
        activity: 'Visit one of the 52 sacred Shaktipeeths of India, famous for its ancient step tank and traditional brass horse offerings.',
        estExpense: 150,
      },
      evening: {
        time: '05:00 PM - 07:30 PM',
        place: 'Brahma Sarovar Evening Aarti Ghat',
        activity: 'Witness the collective Maha Aarti chanting with floating butter lamps reflecting across the vast waters at twilight.',
        estExpense: 100,
      },
      dinner: {
        place: 'Sannihit Garden Restaurant',
        foodItem: 'Dal Makhani, Butter Naan, Gulab Jamun',
        estExpense: 450,
      },
    },
  ],
};
