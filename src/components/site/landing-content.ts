// Definisi tipe dan konten default untuk landing page.
// Konten default ini di-ekstrak langsung dari komponen-komponen landing
// yang awalnya hardcoded, sehingga tampilan awal tidak berubah.
//
// Konten dapat di-override dari sisi server (lihat landing.functions.ts)
// dan diedit melalui halaman /admin/landing.

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  badge: string;
  imageUrl: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  stats: HeroStat[];
}

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

export interface SectionHeading {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export interface HowItWorksStep {
  icon: string;
  title: string;
  desc: string;
}

export interface BenefitItem {
  icon: string;
  title: string;
  desc: string;
}

export interface BenefitContent {
  heading: SectionHeading;
  items: BenefitItem[];
}

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  initials: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FinalCtaContent {
  title: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface FooterContent {
  description: string;
  email: string;
  phone: string;
  location: string;
  copyright: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
}

export interface LandingTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: "Inter" | "Arial" | "Georgia" | "system-ui";
  borderRadius: "0.5rem" | "0.75rem" | "1rem" | "1.5rem";
  buttonStyle: "solid" | "soft" | "outline";
}

export interface LandingContent {
  hero: HeroContent;
  about: AboutContent;
  features: {
    heading: SectionHeading;
    items: FeatureItem[];
  };
  howItWorks: {
    heading: SectionHeading;
    steps: HowItWorksStep[];
  };
  benefits: BenefitContent;
  testimonials: {
    heading: SectionHeading;
    items: TestimonialItem[];
  };
  faq: {
    heading: SectionHeading;
    items: FaqItem[];
  };
  finalCta: FinalCtaContent;
  footer: FooterContent;
  theme: LandingTheme;
}

export const defaultLandingContent: LandingContent = {
  hero: {
    badge: "Teman Pendamping On-Demand",
    imageUrl: "",
    title: "Tak Perlu Sendiri,",
    titleHighlight: "Ada yang Menemani.",
    subtitle:
      "Suruhin menghadirkan teman pendamping terpercaya untuk momen yang bikin deg-degan — dari sidang skripsi hingga pulang malam yang aman dari klitih.",
    primaryCta: "Cari Pendamping",
    primaryCtaHref: "/dashboard/new",
    secondaryCta: "Pelajari Lebih Lanjut",
    secondaryCtaHref: "#how",
    stats: [
      { value: "8K+", label: "Ditemani dengan Aman" },
      { value: "3K+", label: "Pendamping Terverifikasi" },
      { value: "4.9★", label: "Rating Rata-rata" },
    ],
  },
  about: {
    eyebrow: "Tentang Suruhin",
    title: "Teman yang hadir saat kamu membutuhkannya",
    description:
      "Suruhin menghubungkanmu dengan pendamping terverifikasi untuk memberi rasa aman, dukungan, dan keberanian dalam menjalani momen penting.",
    imageUrl: "",
  },
  features: {
    heading: {
      eyebrow: "Layanan",
      title: "Pendamping untuk setiap momen penting",
      subtitle: "Pilih jenis pendampingan sesuai kebutuhanmu — kami siap menemani.",
    },
    items: [
      {
        icon: "Presentation",
        title: "Temani Sidang Skripsi",
        desc: "Ditemani hingga ruang sidang agar lebih tenang, percaya diri, dan tidak sendirian menghadapi penguji.",
      },
      {
        icon: "Moon",
        title: "Antar Pulang Malam",
        desc: "Pendamping menemani perjalananmu di malam hari agar aman dari klitih dan gangguan lain.",
      },
      {
        icon: "HeartHandshake",
        title: "Teman Curhat & Menemani",
        desc: "Butuh teman ngobrol atau sekadar ditemani beraktivitas? Ada pendamping yang siap mendengar.",
      },
      {
        icon: "MapPin",
        title: "Lacak Perjalanan Langsung",
        desc: "Bagikan lokasi secara langsung ke orang terdekat selama kamu didampingi.",
      },
      {
        icon: "Siren",
        title: "Tombol Darurat",
        desc: "Satu ketukan untuk mengirim sinyal darurat ke kontak pentingmu bila terjadi sesuatu.",
      },
      {
        icon: "BadgeCheck",
        title: "Pendamping Terverifikasi",
        desc: "Setiap pendamping melewati verifikasi identitas dan dinilai oleh komunitas.",
      },
    ],
  },
  howItWorks: {
    heading: {
      eyebrow: "Cara Kerja",
      title: "Dapatkan pendamping dalam 4 langkah mudah",
    },
    steps: [
      {
        icon: "BookOpen",
        title: "Ceritakan Kebutuhanmu",
        desc: "Pilih jenis pendampingan, tentukan lokasi, waktu, dan durasi yang kamu inginkan.",
      },
      {
        icon: "UserCheck",
        title: "Pendamping Menerima",
        desc: "Pendamping terverifikasi menerima dan mengonfirmasi permintaanmu dalam hitungan menit.",
      },
      {
        icon: "Footprints",
        title: "Ditemani dengan Aman",
        desc: "Pendamping menemanimu selama momen berlangsung. Bagikan lokasi ke orang terdekat.",
      },
      {
        icon: "Star",
        title: "Beri Rating",
        desc: "Beri rating untuk membantu menjaga kualitas dan keamanan komunitas kami.",
      },
    ],
  },
  benefits: {
    heading: {
      eyebrow: "Keunggulan",
      title: "Mengapa memilih Suruhin?",
      subtitle:
        "Dirancang untuk mahasiswa dan warga kota yang ingin merasa aman dan tidak sendirian di momen-momen penting.",
    },
    items: [
      {
        icon: "ShieldCheck",
        title: "Rasa Aman Utama",
        desc: "Setiap pendamping terverifikasi, dilengkapi pelacakan lokasi dan tombol darurat.",
      },
      {
        icon: "Smile",
        title: "Dukungan Emosional",
        desc: "Bukan sekadar teman jalan — pendamping yang siap menenangkan dan menyemangati.",
      },
      {
        icon: "Clock",
        title: "Siap Kapan Saja",
        desc: "Tersedia sepanjang hari, termasuk larut malam saat kamu paling butuh ditemani.",
      },
      {
        icon: "Lock",
        title: "Transaksi Aman",
        desc: "Pembayaran terlindungi dengan jaminan pengembalian dana penuh.",
      },
    ],
  },
  testimonials: {
    heading: {
      eyebrow: "Testimoni",
      title: "Cerita mereka yang tak lagi sendiri",
    },
    items: [
      {
        name: "Andini Pratiwi",
        role: "Mahasiswa, Universitas Indonesia",
        quote:
          "Ditemani sampai ruang sidang bikin gue jauh lebih tenang. Nggak nyangka ada layanan kayak gini!",
        initials: "AP",
      },
      {
        name: "Budi Santoso",
        role: "Karyawan Shift Malam",
        quote:
          "Pulang kerja tengah malam jadi nggak was-was lagi soal klitih. Pendampingnya sigap dan bikin nyaman.",
        initials: "BS",
      },
      {
        name: "Citra Ramadhani",
        role: "Mahasiswa Perantau",
        quote:
          "Pas lagi down banget, ada teman yang nemenin dan dengerin. Ngerasa nggak sendirian di kota orang.",
        initials: "CR",
      },
    ],
  },
  faq: {
    heading: {
      eyebrow: "FAQ",
      title: "Pertanyaan yang sering ditanyakan",
    },
    items: [
      {
        q: "Apa itu Suruhin?",
        a: "Suruhin adalah platform teman pendamping on-demand yang menghubungkan kamu dengan pendamping terpercaya untuk momen penting — seperti sidang skripsi atau pulang malam agar tetap aman.",
      },
      {
        q: "Bagaimana cara memesan pendamping?",
        a: "Daftar akun, klik 'Cari Pendamping', pilih jenis pendampingan, lokasi, dan waktu, lalu tunggu pendamping menerima.",
      },
      {
        q: "Apakah pendampingnya aman dan terpercaya?",
        a: "Semua pendamping melewati verifikasi identitas, dilengkapi pelacakan lokasi langsung, dan memiliki sistem rating dari komunitas.",
      },
      {
        q: "Bagaimana keamanan saat pendampingan malam hari?",
        a: "Kamu bisa membagikan lokasi secara langsung ke orang terdekat dan menggunakan tombol darurat kapan pun selama pendampingan berlangsung.",
      },
      {
        q: "Apakah saya bisa menjadi pendamping?",
        a: "Tentu! Daftarkan diri sebagai pendamping, lengkapi verifikasi, dan mulai dapatkan penghasilan sambil membantu orang lain merasa aman.",
      },
    ],
  },
  finalCta: {
    title: "Siap ditemani kapan pun kamu butuh?",
    subtitle:
      "Bergabung dengan ribuan orang yang mempercayai Suruhin untuk merasa aman dan tidak sendirian di momen penting.",
    cta: "Mulai Cari Pendamping",
    ctaHref: "/register",
  },
  footer: {
    description:
      "Platform teman pendamping on-demand untuk rasa aman dan dukungan di momen penting.",
    email: "hello@suruhin.id",
    phone: "+62 812 3456 7890",
    location: "Yogyakarta, Indonesia",
    copyright: "Suruhin. Hak cipta dilindungi undang-undang.",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    linkedinUrl: "",
  },
  theme: {
    primaryColor: "#2563eb",
    secondaryColor: "#0f2a82",
    backgroundColor: "#ffffff",
    textColor: "#111827",
    fontFamily: "Inter",
    borderRadius: "1rem",
    buttonStyle: "solid",
  },
};
