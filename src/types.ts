export type TypographyStyle = 'sans' | 'serif' | 'mono' | 'luxury';

export type CardFormat = '90x50' | '85x55'; // milímetros

export type StickerFormat = 
  | 'capsule-lid-35'   // Círculo Ø 35 mm (vaso soufflé 28 ml / 1 oz)
  | 'capsule-lid-45'   // Círculo Ø 45 mm (vaso soufflé 50-60 ml / 2 oz)
  | 'security-strap'   // Tira / precinto cruzado 18 × 80 mm
  | 'tasting-badge-50' // Cuadrada 50 × 50 mm con notas de degustación
  | 'mini-rect-60x40'; // Rectangular 60 × 40 mm

export interface BrandProfile {
  id: string;
  name: string;
  brandName: string;
  tagline: string;
  subtagline: string;
  logoUrl: string;
  logoScale: number; // 0.5 a 1.5
  logoShape: 'default' | 'circle' | 'square';
  primaryColor: string; // Background / deep base (ej: #090D16)
  cardBgColor: string;  // Surface color (ej: #111827)
  accentColor: string;  // Highlight / gold (ej: #D4AF37)
  textColor: string;    // Main text (ej: #FFFFFF)
  secondaryTextColor: string; // Subtitle text (ej: #94A3B8)
  borderColor: string;  // Border lines (ej: #D4AF37)
  typography: TypographyStyle;
  isCustomUploadedLogo?: boolean;
}

export interface ContactData {
  personName: string;
  role: string;
  phone: string;
  email: string;
  instagram: string;
  location: string;
  sinpe: string;
  website: string;
}

export interface QrConfig {
  type: 'whatsapp' | 'url' | 'instagram' | 'custom';
  whatsappCountry: string;
  whatsappNumber: string;
  whatsappMessage: string;
  url: string;
  qrFgColor: string;
  qrBgColor: string;
  includeCenterLogo: boolean;
  callToAction: string;
}

export interface TastingData {
  sampleName: string;
  sampleSubtitle: string;
  badge: string;
  instructions: string;
  ingredients: string;
  allergens: string;
  lot: string;
  date: string;
  storage: string;
  volume: string;
}

export type ActiveTab = 'business-card' | 'tasting-stickers' | 'print-sheet';
export type CardSide = 'front' | 'back' | 'both';
