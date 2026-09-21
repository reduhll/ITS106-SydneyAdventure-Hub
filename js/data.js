/* ============================================
   Shared experience catalogue used by the
   homepage, experiences page and booking calculator.
   ============================================ */
var EXPERIENCES = [
  {
    id: "blue-mountains-hike",
    title: "Blue Mountains Hike",
    category: "Adventure",
    duration: "6 hours",
    durationHrs: 6,
    price: 129,
    availability: "Daily, 7:00 AM departure",
    description: "A guided walk through eucalypt forest to lookouts over the Three Sisters and the Jamison Valley, with a stop at a cascading waterfall.",
    image: "img/blue-mountains-hike.jpg",
    media: "media-hike",
    icon: "mountain"
  },
  {
    id: "harbour-kayak",
    title: "Sydney Harbour Kayak Trail",
    category: "Water Adventure",
    duration: "2.5 hours",
    durationHrs: 2.5,
    price: 89,
    availability: "Tue \u2013 Sun, morning & afternoon",
    description: "Paddle a calm stretch of harbour past bushland coves, with a guide pointing out marine life and harbourside history along the way.",
   image: "img/harbour-kayak.jpg",
    media: "media-water",
    icon: "kayak"
  },
  {
    id: "wildlife-sanctuary",
    title: "Wildlife Sanctuary Encounter",
    category: "Family",
    duration: "3 hours",
    durationHrs: 3,
    price: 69,
    availability: "Daily",
    description: "Meet koalas, wallabies and native birds at a native wildlife sanctuary, with a keeper talk on local conservation efforts.",
    image: "img/wildlife-sanctuary.jpg",
    media: "media-wildlife",
    icon: "leaf"
  },
  {
    id: "coastal-walk",
    title: "Bondi to Coogee Coastal Walk",
    category: "Sightseeing",
    duration: "3 hours",
    durationHrs: 3,
    price: 45,
    availability: "Daily",
    description: "An easy clifftop walk linking six beaches, ocean pools and sandstone headlands, finishing with coffee in Coogee.",
    image: "img/coastal-walk.jpg",
    media: "media-coast",
    icon: "wave"
  },
  {
    id: "botanic-garden-tour",
    title: "Royal Botanic Garden Guided Tour",
    category: "Cultural",
    duration: "1.5 hours",
    durationHrs: 1.5,
    price: 35,
    availability: "Daily, 10:00 AM & 2:00 PM",
    description: "A relaxed walk through the Royal Botanic Garden with a horticulturist, covering native plant collections and harbour views.",
    image: "img/botanic-garden-tour.jpg",
    media: "media-garden",
    icon: "sprout"
  },
  {
    id: "hawkesbury-cruise",
    title: "Hawkesbury River Eco Cruise",
    category: "Family",
    duration: "4 hours",
    durationHrs: 4,
    price: 99,
    availability: "Fri \u2013 Sun",
    description: "Cruise the Hawkesbury's quiet backwaters, spotting sea eagles and river life, with a light lunch served on board.",
    image: "img/hawkesbury-cruise.jpg",
    media: "media-cruise",
    icon: "boat"
  }
];

var EXTRAS = [
  { id: "lunch", label: "Packed lunch", price: 15 },
  { id: "photos", label: "Professional photo package", price: 25 },
  { id: "transfer", label: "Hotel pickup & drop-off", price: 20 },
  { id: "gear", label: "Extra gear hire (boots / wetsuit)", price: 12 }
];

var ICONS = {
  mountain: '<svg viewBox="0 0 64 64" fill="none" stroke="#F5F0E1" stroke-width="2.2" stroke-linejoin="round"><path d="M4 50 L24 18 L32 30 L40 14 L60 50 Z"/><circle cx="46" cy="16" r="4" fill="#F5F0E1" stroke="none"/></svg>',
  kayak: '<svg viewBox="0 0 64 64" fill="none" stroke="#F5F0E1" stroke-width="2.2" stroke-linecap="round"><path d="M6 40 Q32 28 58 40 Q32 50 6 40 Z"/><path d="M20 20 L44 44"/><path d="M16 16 L24 24 M40 40 L48 48"/></svg>',
  leaf: '<svg viewBox="0 0 64 64" fill="none" stroke="#F5F0E1" stroke-width="2.2" stroke-linecap="round"><path d="M14 50 C14 26 26 12 50 10 C48 34 34 46 14 50 Z"/><path d="M16 48 C26 38 34 30 48 14"/></svg>',
  wave: '<svg viewBox="0 0 64 64" fill="none" stroke="#F5F0E1" stroke-width="2.2" stroke-linecap="round"><path d="M4 26 Q12 18 20 26 T36 26 T52 26 T60 26"/><path d="M4 38 Q12 30 20 38 T36 38 T52 38 T60 38"/><path d="M4 50 Q12 42 20 50 T36 50 T52 50 T60 50"/></svg>',
  sprout: '<svg viewBox="0 0 64 64" fill="none" stroke="#F5F0E1" stroke-width="2.2" stroke-linecap="round"><path d="M32 56 V30"/><path d="M32 30 C32 16 20 12 12 12 C12 24 20 30 32 30 Z"/><path d="M32 22 C32 14 40 10 48 10 C48 20 42 24 32 22 Z"/></svg>',
  boat: '<svg viewBox="0 0 64 64" fill="none" stroke="#F5F0E1" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"><path d="M8 40 H56 L48 52 H16 Z"/><path d="M32 40 V14"/><path d="M32 16 L48 30 H32 Z"/></svg>'
};
