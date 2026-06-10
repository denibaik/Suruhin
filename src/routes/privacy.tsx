import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Kebijakan Privasi — Suruhin" },
      {
        name: "description",
        content:
          "Pelajari bagaimana Suruhin mengumpulkan, menggunakan, dan melindungi data pribadimu.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight">Kebijakan Privasi</h1>
            <p className="mt-3 text-muted-foreground">
              Berlaku mulai: <span className="font-medium text-foreground">1 Juni 2026</span>
            </p>
            <p className="mt-4 text-muted-foreground">
              Privasi kamu adalah prioritas kami. Kebijakan ini menjelaskan bagaimana Suruhin
              mengumpulkan, menggunakan, dan melindungi informasi pribadimu saat kamu menggunakan
              layanan kami. Harap baca kebijakan ini dengan saksama.
            </p>
          </div>

          <div className="space-y-10">
            <Section title="1. Informasi yang Kami Kumpulkan">
              <p>
                Ketika kamu mendaftar dan menggunakan Suruhin, kami mengumpulkan beberapa jenis
                informasi, antara lain:
              </p>
              <ul>
                <li>
                  <strong>Informasi Identitas:</strong> Nama lengkap, alamat email, nomor telepon,
                  tanggal lahir, dan foto profil yang kamu berikan saat pendaftaran.
                </li>
                <li>
                  <strong>Informasi Lokasi:</strong> Lokasi yang kamu masukkan saat membuat
                  permintaan, termasuk alamat penjemputan dan tujuan tugas.
                </li>
                <li>
                  <strong>Informasi Transaksi:</strong> Riwayat permintaan, detail pembayaran (tidak
                  termasuk nomor kartu lengkap), dan riwayat penilaian.
                </li>
                <li>
                  <strong>Data Penggunaan:</strong> Informasi tentang cara kamu berinteraksi dengan
                  platform, termasuk halaman yang dikunjungi, fitur yang digunakan, dan waktu akses.
                </li>
                <li>
                  <strong>Data Perangkat:</strong> Jenis perangkat, sistem operasi, alamat IP, dan
                  identifikasi unik perangkat untuk keperluan keamanan.
                </li>
              </ul>
            </Section>

            <Section title="2. Cara Penggunaan Informasi">
              <p>Kami menggunakan informasi yang dikumpulkan untuk tujuan berikut:</p>
              <ul>
                <li>Memproses dan memenuhi permintaan layanan yang kamu buat.</li>
                <li>
                  Mencocokkan kamu dengan Helper yang paling sesuai berdasarkan lokasi dan
                  ketersediaan.
                </li>
                <li>Memverifikasi identitas dan mencegah penipuan di platform.</li>
                <li>
                  Mengirimkan notifikasi terkait status permintaan, promosi, dan pembaruan layanan.
                </li>
                <li>
                  Meningkatkan kualitas platform berdasarkan analisis pola penggunaan secara
                  agregat.
                </li>
                <li>Menyelesaikan sengketa antara Pengguna dan Helper.</li>
                <li>Mematuhi kewajiban hukum yang berlaku di Indonesia.</li>
              </ul>
            </Section>

            <Section title="3. Berbagi Informasi">
              <p>
                Suruhin tidak menjual data pribadimu kepada pihak ketiga. Kami hanya berbagi
                informasi dalam kondisi berikut:
              </p>
              <ul>
                <li>
                  <strong>Dengan Helper:</strong> Nama, lokasi tugas, dan nomor telepon kamu
                  dibagikan kepada Helper yang menerima permintaanmu agar tugas dapat diselesaikan.
                </li>
                <li>
                  <strong>Mitra Pembayaran:</strong> Data transaksi yang diperlukan diteruskan
                  kepada penyedia layanan pembayaran terverifikasi untuk memproses transaksi.
                </li>
                <li>
                  <strong>Pihak Berwenang:</strong> Kami dapat mengungkap informasi jika diwajibkan
                  oleh hukum, putusan pengadilan, atau permintaan resmi dari instansi penegak hukum.
                </li>
                <li>
                  <strong>Mitra Teknologi:</strong> Penyedia layanan cloud, analitik, dan
                  infrastruktur yang mendukung operasional Suruhin, dengan perjanjian kerahasiaan
                  yang mengikat.
                </li>
              </ul>
            </Section>

            <Section title="4. Keamanan Data">
              <p>
                Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk
                melindungi data pribadimu dari akses tidak sah, perubahan, pengungkapan, atau
                penghancuran. Langkah-langkah ini meliputi:
              </p>
              <ul>
                <li>Enkripsi data saat transit menggunakan protokol TLS/HTTPS.</li>
                <li>Enkripsi data sensitif saat disimpan di server kami.</li>
                <li>Pembatasan akses data berdasarkan prinsip least privilege.</li>
                <li>Pemantauan keamanan dan audit log secara berkala.</li>
                <li>Autentikasi dua faktor untuk akses ke sistem internal.</li>
              </ul>
              <p>
                Meskipun demikian, tidak ada metode transmisi data melalui internet yang sepenuhnya
                aman. Kami mendorong kamu untuk menjaga kerahasiaan kata sandi dan segera
                menghubungi kami jika mencurigai adanya akses tidak sah ke akunmu.
              </p>
            </Section>

            <Section title="5. Cookie dan Teknologi Pelacakan">
              <p>
                Suruhin menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan
                pengalaman pengguna. Jenis cookie yang kami gunakan meliputi:
              </p>
              <ul>
                <li>
                  <strong>Cookie Esensial:</strong> Diperlukan untuk fungsi dasar platform seperti
                  sesi login dan keamanan. Tidak dapat dinonaktifkan.
                </li>
                <li>
                  <strong>Cookie Preferensi:</strong> Menyimpan pengaturan pilihanmu seperti bahasa
                  dan tampilan. Dapat dinonaktifkan melalui pengaturan browser.
                </li>
                <li>
                  <strong>Cookie Analitik:</strong> Membantu kami memahami cara penggunaan platform
                  secara agregat dan anonim untuk perbaikan layanan.
                </li>
              </ul>
              <p>
                Kamu dapat mengatur preferensi cookie melalui pengaturan browser. Menonaktifkan
                cookie tertentu mungkin memengaruhi fungsionalitas beberapa fitur platform.
              </p>
            </Section>

            <Section title="6. Hak Pengguna">
              <p>
                Sesuai dengan regulasi perlindungan data yang berlaku, kamu memiliki hak-hak berikut
                terkait data pribadimu:
              </p>
              <ul>
                <li>
                  <strong>Hak Akses:</strong> Meminta salinan data pribadi yang kami simpan
                  tentangmu.
                </li>
                <li>
                  <strong>Hak Koreksi:</strong> Meminta perbaikan data yang tidak akurat atau tidak
                  lengkap.
                </li>
                <li>
                  <strong>Hak Penghapusan:</strong> Meminta penghapusan data pribadimu, tunduk pada
                  kewajiban hukum dan kebutuhan operasional yang berlaku.
                </li>
                <li>
                  <strong>Hak Pembatasan:</strong> Meminta pembatasan pemrosesan data dalam kondisi
                  tertentu.
                </li>
                <li>
                  <strong>Hak Portabilitas:</strong> Menerima data dalam format yang dapat dibaca
                  mesin untuk dipindahkan ke layanan lain.
                </li>
                <li>
                  <strong>Hak Keberatan:</strong> Menolak pemrosesan data untuk tujuan tertentu
                  seperti pemasaran langsung.
                </li>
              </ul>
              <p>
                Untuk mengajukan permintaan terkait hak-hak di atas, silakan hubungi kami melalui
                email di bawah ini. Kami akan merespons dalam waktu maksimal 14 hari kerja.
              </p>
            </Section>

            <Section title="7. Kontak Kami">
              <p>
                Jika kamu memiliki pertanyaan, kekhawatiran, atau permintaan terkait kebijakan
                privasi ini atau pengelolaan data pribadimu, jangan ragu untuk menghubungi tim
                Privacy Suruhin:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:privacy@suruhin.id" className="text-primary hover:underline">
                    privacy@suruhin.id
                  </a>
                </li>
                <li>
                  <strong>Alamat:</strong> Jl. Sudirman No. 1, Jakarta Pusat, DKI Jakarta 10220,
                  Indonesia
                </li>
                <li>
                  <strong>Telepon:</strong> +62 812 3456 7890 (Senin–Jumat, 09.00–18.00 WIB)
                </li>
              </ul>
              <p>
                Suruhin berkomitmen untuk menangani setiap pertanyaan dan keluhan privasi secara
                serius dan transparan. Kebijakan privasi ini terakhir diperbarui pada{" "}
                <span className="font-medium text-foreground">1 Juni 2026</span>.
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-foreground">{title}</h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed [&_p]:text-[15px] [&_li]:text-[15px] [&_ul]:mt-2 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc">
        {children}
      </div>
    </section>
  );
}
