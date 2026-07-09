import {
  ShieldCheck,
  MapPin,
  MessageCircle,
  Star,
  UserCheck,
  Clock,
  Lock,
  Moon,
  GraduationCap,
  HeartHandshake,
  Users,
  PhoneCall,
  Navigation,
  Footprints,
  BookOpen,
  Car,
  Smile,
  Presentation,
  BadgeCheck,
  Siren,
  Route,
  type LucideIcon,
} from "lucide-react";

// Map nama icon (string, disimpan di konten landing) ke komponen lucide.
// Dipakai oleh komponen Features, HowItWorks, dan Benefits agar item
// dapat diedit dengan icon yang dapat dipilih dari admin.

export const landingIcons: Record<string, LucideIcon> = {
  ShieldCheck,
  MapPin,
  MessageCircle,
  Star,
  UserCheck,
  Clock,
  Lock,
  Moon,
  GraduationCap,
  HeartHandshake,
  Users,
  PhoneCall,
  Navigation,
  Footprints,
  BookOpen,
  Car,
  Smile,
  Presentation,
  BadgeCheck,
  Siren,
  Route,
};

export const landingIconNames = Object.keys(landingIcons);

export function resolveIcon(name: string): LucideIcon {
  return landingIcons[name] ?? HeartHandshake;
}
