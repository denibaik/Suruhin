import {
  ClipboardList,
  Zap,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Star,
  FileText,
  UserCheck,
  PackageCheck,
  Clock,
  Layers,
  Tag,
  Lock,
  type LucideIcon,
} from "lucide-react";

// Map nama icon (string, disimpan di konten landing) ke komponen lucide.
// Dipakai oleh komponen Features, HowItWorks, dan Benefits agar item
// dapat diedan dengan icon yang dapat dipilih dari admin.

export const landingIcons: Record<string, LucideIcon> = {
  ClipboardList,
  Zap,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Star,
  FileText,
  UserCheck,
  PackageCheck,
  Clock,
  Layers,
  Tag,
  Lock,
};

export const landingIconNames = Object.keys(landingIcons);

export function resolveIcon(name: string): LucideIcon {
  return landingIcons[name] ?? ClipboardList;
}
