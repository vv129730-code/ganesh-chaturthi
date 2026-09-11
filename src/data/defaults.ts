import { InvitationData, StyleSettings, TemplatePreset } from '../types';

export const DEFAULT_INVITATION_DATA: InvitationData = {
  eventType: 'Ganesh Utsav',
  smallHeading: "Can’t cha Raja",
  mainHeading: 'Ganesh Utsav',
  year: '2026',
  description: '“We are celebrating Ganesh Utsav at our place please grace the occasion with your presence”',
  date: '14 SEPTEMBER 2026',
  time: 'AT 7:00 PM',
  venue: '33 Cantt Kanpur Club',
  additionalLocation: 'Campus Gate No.3',
  locationDescription: 'Ganesh Utsav celebrated near\nShidd Peeth Durga Dham\nMandir',
  hostName: '',
  familyName: '',
  phoneNumber: '',
  googleMapsLink: '',
  rsvpText: '',
  customMessage: '',
};

export const DEFAULT_STYLE_SETTINGS: StyleSettings = {
  bgStyle: 'warm-cream',
  primaryTextColor: '#741124', // Rich traditional dark maroon
  secondaryTextColor: '#8C2338',
  accentGoldColor: '#D4942A',
  floralPalette: 'orange-yellow',
  ganeshStyle: 'traditional-line-art',
  mainFontFamily: 'yatra',
  scriptFontFamily: 'alex-brush',
  decorations: {
    showTopFlowers: true,
    showSideGarlands: true,
    showHangingLanterns: true,
    showGaneshArt: true,
    showMandalaBg: true,
    showBottomBorder: true,
    showHangingChains: true,
    showCornerOrnaments: true,
  },
};

export const BACKGROUND_STYLES = [
  { id: 'classic-ivory', name: 'Classic Ivory', color: '#FFF5E1', patternColor: '#F0D49C' },
  { id: 'warm-cream', name: 'Warm Cream', color: '#FFF1D2', patternColor: '#ECCB8A' },
  { id: 'light-beige', name: 'Light Beige', color: '#FBF3E4', patternColor: '#E4CF9F' },
  { id: 'parchment', name: 'Vintage Parchment', color: '#F8E9CB', patternColor: '#DDBB7D' },
];

export const TEXT_COLOR_PRESETS = [
  { id: 'maroon', name: 'Traditional Maroon', hex: '#741124' },
  { id: 'deep-red', name: 'Deep Crimson', hex: '#8F1426' },
  { id: 'burgundy', name: 'Rich Burgundy', hex: '#581020' },
  { id: 'bronze', name: 'Royal Bronze', hex: '#7B4A12' },
];

export const FLORAL_PALETTES = [
  {
    id: 'orange-yellow',
    name: 'Classic Marigold (Orange & Yellow)',
    primary: '#F57C00',
    secondary: '#FFB300',
    accent: '#D84315',
    foliage: '#33691E',
  },
  {
    id: 'pink-orange',
    name: 'Lotus & Genda (Pink & Orange)',
    primary: '#E64A19',
    secondary: '#FF8A65',
    accent: '#C2185B',
    foliage: '#2E7D32',
  },
  {
    id: 'red-gold',
    name: 'Sindoor & Gold (Deep Red & Amber)',
    primary: '#B71C1C',
    secondary: '#FFB300',
    accent: '#E65100',
    foliage: '#1B5E20',
  },
  {
    id: 'royal-marigold',
    name: 'Royal Saffron (Vibrant Golden Glow)',
    primary: '#FF6F00',
    secondary: '#FFD54F',
    accent: '#BF360C',
    foliage: '#33691E',
  },
];

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'classic-ganesh',
    name: 'Classic Ganesh Utsav',
    category: 'Ganesh Festival',
    description: 'The signature 2026 festive invitation with authentic marigold canopy, lanterns & Ganesha line art.',
    data: DEFAULT_INVITATION_DATA,
    style: {
      ...DEFAULT_STYLE_SETTINGS,
      ganeshStyle: 'traditional-line-art',
      bgStyle: 'warm-cream',
      primaryTextColor: '#741124',
    },
  },
  {
    id: 'royal-ganesh',
    name: 'Royal Ganesh',
    category: 'Ganesh Festival',
    description: 'Grand festive aesthetic with deep burgundy typography and ornamental royal Ganesha artwork.',
    data: {
      ...DEFAULT_INVITATION_DATA,
      smallHeading: "Shree Ganeshaya Namah",
      mainHeading: 'Ganesh Utsav',
    },
    style: {
      ...DEFAULT_STYLE_SETTINGS,
      ganeshStyle: 'ornamental-royal',
      bgStyle: 'classic-ivory',
      primaryTextColor: '#581020',
      accentGoldColor: '#C4841D',
      mainFontFamily: 'cinzel',
    },
  },
  {
    id: 'minimal-ganesh',
    name: 'Minimal Ganesh',
    category: 'Ganesh Festival',
    description: 'Serene, clean Indian invitation with delicate line art and generous negative space.',
    data: {
      ...DEFAULT_INVITATION_DATA,
      smallHeading: "|| Om Gan Ganpataye Namah ||",
    },
    style: {
      ...DEFAULT_STYLE_SETTINGS,
      ganeshStyle: 'minimal-elegant',
      bgStyle: 'light-beige',
      primaryTextColor: '#741124',
      decorations: {
        ...DEFAULT_STYLE_SETTINGS.decorations,
        showSideGarlands: false,
        showHangingLanterns: true,
      },
    },
  },
  {
    id: 'mandala-festive',
    name: 'Mandala Festive',
    category: 'Ganesh Festival',
    description: 'Intricate golden sacred geometry mandala with rich marigold floral garland borders.',
    data: DEFAULT_INVITATION_DATA,
    style: {
      ...DEFAULT_STYLE_SETTINGS,
      ganeshStyle: 'mandala-ganesh',
      bgStyle: 'warm-cream',
      floralPalette: 'royal-marigold',
      primaryTextColor: '#8F1426',
    },
  },
  {
    id: 'diwali-puja',
    name: 'Laxmi Ganesh Puja',
    category: 'Extensible',
    description: 'Festive design suited for auspicious Deepavali or home celebration pujas.',
    data: {
      eventType: 'Puja',
      smallHeading: '|| Shubh Labh ||',
      mainHeading: 'Maha Puja & Aarti',
      year: '2026',
      description: '“You are cordially invited to join us for our auspicious Festive Puja & Prasad”',
      date: '24 OCTOBER 2026',
      time: 'AT 6:30 PM',
      venue: 'Anand Bhavan Residency',
      additionalLocation: 'Community Hall, 2nd Floor',
      locationDescription: 'Near Civil Lines Green Park\nFollowed by Dinner & Aarti',
    },
    style: {
      ...DEFAULT_STYLE_SETTINGS,
      ganeshStyle: 'ornamental-royal',
      bgStyle: 'classic-ivory',
      floralPalette: 'red-gold',
      primaryTextColor: '#741124',
    },
  },
  {
    id: 'griha-pravesh',
    name: 'Griha Pravesh (Housewarming)',
    category: 'Extensible',
    description: 'Traditional home blessing invitation with golden motifs and sacred Ganesha blessing.',
    data: {
      eventType: 'Housewarming',
      smallHeading: '|| Griha Pravesham ||',
      mainHeading: 'New Home Blessing',
      year: '2026',
      description: '“We solicit your gracious presence and blessings on the auspicious occasion of our Housewarming Ceremony”',
      date: '18 NOVEMBER 2026',
      time: 'AT 9:00 AM ONWARDS',
      venue: 'Villa No. 42, Palm Greens',
      additionalLocation: 'Sector 50',
      locationDescription: 'Satyanarayan Katha at 10:00 AM\nLunch to follow at 1:00 PM',
    },
    style: {
      ...DEFAULT_STYLE_SETTINGS,
      ganeshStyle: 'traditional-line-art',
      bgStyle: 'warm-cream',
      primaryTextColor: '#581020',
    },
  },
];
