export type EventType =
  | 'Ganesh Utsav'
  | 'Ganesh Chaturthi'
  | 'Puja'
  | 'Birthday'
  | 'Wedding'
  | 'Anniversary'
  | 'Housewarming'
  | 'Festival'
  | 'Custom';

export type BackgroundStyle = 'classic-ivory' | 'warm-cream' | 'light-beige' | 'parchment';

export type TextColorPreset = 'maroon' | 'deep-red' | 'burgundy' | 'bronze' | 'custom';

export type FloralPalette = 'orange-yellow' | 'pink-orange' | 'red-gold' | 'royal-marigold';

export type GaneshArtStyle = 'traditional-line-art' | 'minimal-elegant' | 'ornamental-royal' | 'mandala-ganesh';

export interface InvitationData {
  eventType: EventType;
  smallHeading: string;
  mainHeading: string;
  year: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  additionalLocation: string;
  locationDescription: string;
  // Optional fields
  hostName?: string;
  familyName?: string;
  phoneNumber?: string;
  googleMapsLink?: string;
  rsvpText?: string;
  customMessage?: string;
}

export interface DecorationSettings {
  showTopFlowers: boolean;
  showSideGarlands: boolean;
  showHangingLanterns: boolean;
  showGaneshArt: boolean;
  showMandalaBg: boolean;
  showBottomBorder: boolean;
  showHangingChains: boolean;
  showCornerOrnaments: boolean;
}

export interface StyleSettings {
  bgStyle: BackgroundStyle;
  customBgColor?: string;
  primaryTextColor: string; // hex or color
  secondaryTextColor: string;
  accentGoldColor: string;
  floralPalette: FloralPalette;
  ganeshStyle: GaneshArtStyle;
  decorations: DecorationSettings;
  mainFontFamily: 'yatra' | 'rozha' | 'cinzel' | 'playfair';
  scriptFontFamily: 'alex-brush' | 'great-vibes' | 'kalam';
}

export interface TemplatePreset {
  id: string;
  name: string;
  category: 'Ganesh Festival' | 'Extensible';
  description: string;
  data: Partial<InvitationData>;
  style: Partial<StyleSettings>;
}
