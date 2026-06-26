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

export interface LandingContent {
  hero: HeroContent;
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
}

export const defaultLandingContent: LandingContent = {
  hero: {
    badge: "Asisten Pribadi On-Demand",
    title: "Suruh Apa Saja,",
    titleHighlight: "Kami yang Bantu.",
    subtitle:
      "Platform personal assistant on-demand untuk membantu kebutuhan harianmu dengan cepat, aman, dan praktis.",
    primaryCta: "Buat Permintaan",
    primaryCtaHref: "/dashboard/new",
    secondaryCta: "Pelajari Lebih Lanjut",
    secondaryCtaHref: "#how",
    stats: [
      { value: "10K+", label: "Pengguna Aktif" },
      { value: "5K+", label: "Helper Terpercaya" },
      { value: "4.9★", label: "Rating Rata-rata" },
    ],
  },
  features: {
    heading: {
      eyebrow: "Fitur",
      title: "Semua yang kamu butuhkan dalam satu aplikasi",
      subtitle: "Fitur canggih yang dirancang untuk mempermudah kehidupan sehari-harimu.",
    },
    items: [
      {
        icon: "ClipboardList",
        title: "Permintaan Kustom",
        desc: "Buat tugas apa pun yang kamu butuhkan — dari belanja kebutuhan hingga antri layanan.",
      },
      {
        icon: "Zap",
        title: "Respon Cepat",
        desc: "Helper merespons dalam hitungan menit sehingga tugasmu langsung dikerjakan.",
      },
      {
        icon: "ShieldCheck",
        title: "Helper Terpercaya",
        desc: "Setiap helper telah terverifikasi dan dinilai oleh komunitas.",
      },
      {
        icon: "MapPin",
        title: "Lacak Langsung",
        desc: "Pantau perkembangan helper secara langsung di peta.",
      },
      {
        icon: "MessageCircle",
        title: "Chat Langsung",
        desc: "Chat bawaan untuk berkoordinasi langsung dengan helper.",
      },
      {
        icon: "Star",
        title: "Rating & Ulasan",
        desc: "Beri nilai setiap tugas dan bantu jaga kualitas layanan terbaik.",
      },
    ],
  },
  howItWorks: {
    heading: {
      eyebrow: "Cara Kerja",
      title: "Dapatkan bantuan dalam 4 langkah mudah",
    },
    steps: [
      {
        icon: "FileText",
        title: "Buat Permintaan",
        desc: "Jelaskan apa yang kamu butuhkan — judul, lokasi, budget, dan tanggal.",
      },
      {
        icon: "UserCheck",
        title: "Helper Menerima",
        desc: "Helper terpercaya menerima dan mengonfirmasi tugasmu dalam hitungan menit.",
      },
      {
        icon: "PackageCheck",
        title: "Tugas Selesai",
        desc: "Helper menyelesaikan tugas. Pantau progres secara langsung.",
      },
      {
        icon: "Star",
        title: "Beri Rating",
        desc: "Beri rating untuk membantu menjaga kualitas komunitas kami.",
      },
    ],
  },
  benefits: {
    heading: {
      eyebrow: "Keunggulan",
      title: "Mengapa memilih Suruhin?",
      subtitle:
        "Dirancang untuk mahasiswa, profesional, dan komunitas perkotaan yang ingin menyelesaikan lebih banyak hal tanpa stres.",
    },
    items: [
      {
        icon: "Clock",
        title: "Hemat Waktu",
        desc: "Serahkan urusan dan fokus pada hal yang penting.",
      },
      {
        icon: "Layers",
        title: "Layanan Fleksibel",
        desc: "Dari belanja hingga dokumen — semua bisa.",
      },
      {
        icon: "Tag",
        title: "Harga Transparan",
        desc: "Ketahui biaya di awal, tanpa biaya tersembunyi.",
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
      title: "Dicintai oleh ribuan pengguna",
    },
    items: [
      {
        name: "Andini Pratiwi",
        role: "Mahasiswa, Universitas Indonesia",
        quote: "Suruhin nyelametin gue banget pas lagi sibuk skripsi. Helper-nya cepet dan ramah!",
        initials: "AP",
      },
      {
        name: "Budi Santoso",
        role: "Freelance Designer",
        quote:
          "Praktis banget buat antrian bank dan urus dokumen. Hemat waktu, harga juga transparan.",
        initials: "BS",
      },
      {
        name: "Citra Ramadhani",
        role: "Founder, Kopiteria",
        quote: "Suruhin jadi andalan tim kami buat errand kantor. Quality helpers, top rating!",
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
        a: "Suruhin adalah platform personal assistant on-demand yang menghubungkan kamu dengan helper terpercaya untuk berbagai kebutuhan harian.",
      },
      {
        q: "Bagaimana cara membuat request?",
        a: "Daftar akun, klik 'Buat Permintaan', isi detail tugas dan budget, lalu tunggu helper menerima.",
      },
      {
        q: "Apakah helper-nya aman dan terpercaya?",
        a: "Semua helper kami melalui proses verifikasi identitas dan memiliki sistem rating dari komunitas.",
      },
      {
        q: "Bagaimana sistem pembayaran?",
        a: "Pembayaran dilakukan secara cashless melalui platform, dengan jaminan keamanan dan refund jika tugas tidak selesai.",
      },
      {
        q: "Apakah saya bisa jadi helper?",
        a: "Tentu! Daftarkan diri sebagai helper, lengkapi verifikasi, dan mulai dapatkan penghasilan tambahan.",
      },
    ],
  },
  finalCta: {
    title: "Siap mempermudah hidupmu?",
    subtitle:
      "Bergabung dengan 10.000+ pengguna yang mempercayai Suruhin setiap hari untuk menyelesaikan tugas.",
    cta: "Mulai Gunakan Suruhin",
    ctaHref: "/register",
  },
};
