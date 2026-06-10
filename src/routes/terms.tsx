import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Syarat & Ketentuan — Suruhin" },
      { name: "description", content: "Baca syarat dan ketentuan penggunaan layanan Suruhin." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight">Syarat &amp; Ketentuan</h1>
            <p className="mt-3 text-muted-foreground">
              Berlaku mulai: <span className="font-medium text-foreground">1 Juni 2026</span>
            </p>
            <p className="mt-4 text-muted-foreground">
              Selamat datang di Suruhin. Dengan mengakses atau menggunakan layanan kami, kamu
              menyetujui syarat dan ketentuan berikut. Harap baca dengan saksama sebelum menggunakan
              platform kami.
            </p>
          </div>

          <div className="space-y-10">
            <Section title="1. Ketentuan Penggunaan">
              <p>
                Suruhin adalah platform personal assistant on-demand yang menghubungkan Pengguna
                (pihak yang membutuhkan bantuan) dengan Helper (pihak yang memberikan bantuan).
                Dengan mendaftar dan menggunakan layanan ini, kamu mengakui bahwa kamu berusia
                minimal 17 tahun dan memiliki kapasitas hukum untuk mengikat perjanjian.
              </p>
              <p>
                Kamu dilarang menggunakan platform ini untuk tujuan yang melanggar hukum, termasuk
                namun tidak terbatas pada kegiatan penipuan, pelecehan, atau distribusi konten
                ilegal. Pelanggaran terhadap ketentuan ini dapat mengakibatkan penghentian akun
                secara permanen.
              </p>
            </Section>

            <Section title="2. Pendaftaran Akun">
              <p>
                Untuk menggunakan layanan Suruhin secara penuh, kamu wajib mendaftarkan akun dengan
                informasi yang akurat, lengkap, dan terkini. Kamu bertanggung jawab atas keamanan
                kata sandi dan seluruh aktivitas yang terjadi di bawah akunmu.
              </p>
              <p>
                Suruhin berhak menolak pendaftaran atau menangguhkan akun yang dicurigai menggunakan
                identitas palsu, melakukan penipuan, atau melanggar ketentuan ini. Satu orang hanya
                diperbolehkan memiliki satu akun aktif sebagai Pengguna maupun satu akun aktif
                sebagai Helper.
              </p>
            </Section>

            <Section title="3. Layanan Helper">
              <p>
                Helper adalah individu terverifikasi yang terdaftar di platform Suruhin untuk
                memberikan layanan asisten pribadi. Suruhin melakukan verifikasi identitas dasar
                terhadap setiap Helper sebelum mereka diizinkan menerima permintaan.
              </p>
              <p>
                Suruhin bertindak sebagai perantara antara Pengguna dan Helper, dan bukan sebagai
                pemberi kerja Helper. Helper merupakan mitra independen. Oleh karena itu, Suruhin
                tidak bertanggung jawab atas kualitas layanan Helper secara langsung, namun kami
                menyediakan mekanisme pelaporan dan penilaian untuk menjaga standar layanan.
              </p>
              <p>
                Pengguna dapat menilai Helper setelah tugas selesai. Penilaian ini digunakan untuk
                memastikan kualitas ekosistem layanan di platform Suruhin.
              </p>
            </Section>

            <Section title="4. Pembayaran dan Biaya">
              <p>
                Semua transaksi pembayaran dilakukan melalui platform Suruhin menggunakan metode
                pembayaran yang tersedia. Harga layanan disepakati antara Pengguna dan Helper
                sebelum tugas dimulai, mengacu pada estimasi yang ditampilkan di platform.
              </p>
              <p>
                Suruhin mengenakan biaya layanan (service fee) sebesar persentase tertentu dari
                nilai transaksi untuk setiap permintaan yang berhasil diselesaikan. Rincian biaya
                layanan akan selalu ditampilkan secara transparan sebelum konfirmasi pembayaran.
              </p>
              <p>
                Pengembalian dana (refund) hanya dapat dilakukan jika Helper membatalkan tugas
                secara sepihak atau tugas tidak dapat diselesaikan karena kesalahan Helper yang
                dapat diverifikasi. Kebijakan refund selengkapnya tersedia di Pusat Bantuan.
              </p>
            </Section>

            <Section title="5. Tanggung Jawab Pengguna">
              <p>
                Sebagai Pengguna, kamu bertanggung jawab untuk memberikan instruksi yang jelas,
                aman, dan legal kepada Helper. Permintaan yang bersifat berbahaya, ilegal, atau
                melanggar norma kesusilaan tidak akan dilayani dan dapat mengakibatkan penangguhan
                akun.
              </p>
              <p>
                Kamu setuju untuk memperlakukan Helper dengan hormat dan profesional. Tindakan
                pelecehan, ancaman, atau intimidasi terhadap Helper merupakan pelanggaran serius
                yang dapat dilaporkan kepada pihak berwenang.
              </p>
              <p>
                Pengguna juga bertanggung jawab memastikan bahwa barang atau informasi yang
                diberikan kepada Helper untuk diserahkan kepada pihak ketiga adalah legal dan tidak
                melanggar hak pihak manapun.
              </p>
            </Section>

            <Section title="6. Privasi Data">
              <p>
                Kami berkomitmen melindungi data pribadimu. Pengumpulan, penggunaan, dan penyimpanan
                data dilakukan sesuai dengan Kebijakan Privasi kami yang tersedia di{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  suruhin.id/privacy
                </a>
                . Dengan menggunakan layanan ini, kamu menyetujui praktik privasi yang tertuang
                dalam kebijakan tersebut.
              </p>
            </Section>

            <Section title="7. Penghentian Layanan">
              <p>
                Suruhin berhak untuk menangguhkan atau menghentikan akses pengguna ke platform kapan
                saja, dengan atau tanpa pemberitahuan sebelumnya, jika pengguna melanggar ketentuan
                ini atau melakukan tindakan yang merugikan platform, pengguna lain, atau Helper.
              </p>
              <p>
                Pengguna juga dapat menghapus akunnya sendiri kapan saja melalui halaman Pengaturan
                Akun. Penghapusan akun tidak membatalkan kewajiban pembayaran yang sudah terjadi
                sebelumnya.
              </p>
            </Section>

            <Section title="8. Perubahan Ketentuan">
              <p>
                Suruhin dapat memperbarui syarat dan ketentuan ini sewaktu-waktu. Perubahan material
                akan diberitahukan melalui email terdaftar atau notifikasi dalam aplikasi paling
                lambat 14 hari sebelum perubahan berlaku.
              </p>
              <p>
                Penggunaan layanan secara berkelanjutan setelah tanggal berlakunya perubahan
                dianggap sebagai penerimaan terhadap ketentuan yang diperbarui. Jika kamu tidak
                menyetujui perubahan tersebut, kamu dapat menghentikan penggunaan layanan dan
                menghapus akunmu.
              </p>
              <p>
                Untuk pertanyaan terkait syarat dan ketentuan ini, silakan hubungi kami di{" "}
                <a href="mailto:legal@suruhin.id" className="text-primary hover:underline">
                  legal@suruhin.id
                </a>
                .
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
      <div className="space-y-3 text-muted-foreground leading-relaxed [&_p]:text-[15px]">
        {children}
      </div>
    </section>
  );
}
