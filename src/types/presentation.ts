import type {NativeVoiceConfig} from '../data/nativeVoice';
export interface ImageAsset {
  src?: string;
  alt: string;
  recommendedWidth: number;
  recommendedHeight: number;
  fit: 'contain' | 'cover';
}
export interface Benefit { id: string; title: string; shortDescription?: string }
export interface Challenge { id: string; title: string; description?: string; benefitId: string }
export interface JourneyTouchpoint { id: string; title: string; icon?: string; iconImage?: ImageAsset; personaLabel?: string; tag?: string }
export interface Persona {
  id: string; name: string; role: string; quote?: string; image: ImageAsset;
  chapterTitle: string; chapterSubtitle?: string;
  overviewTouchpoints: JourneyTouchpoint[]; recapTouchpoints: JourneyTouchpoint[];
}
export interface ValuePoint { logo?: ImageAsset; id: string; metric?: string; title: string; description?: string }
export interface TeamMember {id:string;name:string;role:string;specialty?:string;image:ImageAsset}
export interface CustomerStory {name:string;context:string;title:string;metrics:{value:string;label:string;detail:string}[];relevance:string;sourceUrl:string}
export interface PresentationConfig {
  keyTakeaways?:{title:string;benefits:[Benefit,Benefit,Benefit]};
  contactCenter?:import('../data/contactCenter').ContactCenterConfig;
  customerStory?:CustomerStory;
  hiddenScreens?:string[];
  slideOrder?:string[];
  nativeVoice?:NativeVoiceConfig;
  team?: {title:string;members:TeamMember[]};
  schemaVersion: 1;
  customer: { name: string; logo: ImageAsset; primaryColor?: string; secondaryColor?: string };
  presentation: { title: string; subtitle?: string; date?: string; heroImage: ImageAsset };
  challenges: [Challenge, Challenge, Challenge];
  benefits: [Benefit, Benefit, Benefit];
  personas: Persona[];
  valuePoints: ValuePoint[];
  valueAudience: {personaId:string;label:string}[];
  closing: { title: string; subtitle?: string; vendorName: string; vendorLogo: ImageAsset };
  labels: { discovery: string; focus: string; journeyHub: string; customerValue: string; beginDemo: string; journeyComplete: string; continue: string };
}
