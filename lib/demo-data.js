export const PROGRAMS_STORAGE_KEY = 'bimbel-wanda-programs';
export const ACHIEVEMENTS_STORAGE_KEY = 'bimbel-wanda-achievements';
export const REGISTRATIONS_STORAGE_KEY = 'bimbel-wanda-registrations';
export const CONTACT_MESSAGES_STORAGE_KEY = 'bimbel-wanda-contact-messages';

export const DEFAULT_PROGRAMS = [
  {
    id: 'program-sd',
    nama: 'Reguler SD',
    deskripsi: 'Pendampingan belajar yang menyenangkan untuk memperkuat fondasi akademik dan rasa percaya diri.',
    tingkat: 'SD',
    jenjang: 'SD',
    durasi: '3 bulan',
    jadwal: 'Senin & Rabu, 15.00–16.30',
    biaya: 350000,
    kuota: 12,
  },
  {
    id: 'program-smp',
    nama: 'Intensif SMP',
    deskripsi: 'Belajar lebih terarah dengan latihan soal, pendampingan tugas, dan evaluasi rutin.',
    tingkat: 'SMP',
    jenjang: 'SMP',
    durasi: '3 bulan',
    jadwal: 'Selasa & Kamis, 16.00–18.00',
    biaya: 500000,
    kuota: 12,
  },
  {
    id: 'program-sma',
    nama: 'Persiapan UTBK SMA',
    deskripsi: 'Strategi belajar dan pembahasan intensif untuk melangkah ke perguruan tinggi impian.',
    tingkat: 'SMA',
    jenjang: 'SMA',
    durasi: '4 bulan',
    jadwal: 'Senin, Rabu & Jumat, 17.00–19.00',
    biaya: 650000,
    kuota: 10,
  },
  {
    id: 'program-private',
    nama: 'Kelas Privat',
    deskripsi: 'Materi dan waktu belajar disesuaikan dengan kebutuhan serta target belajar siswa.',
    tingkat: 'Semua jenjang',
    jenjang: 'Semua jenjang',
    durasi: 'Fleksibel',
    jadwal: 'Atur jadwal bersama tutor',
    biaya: 800000,
    kuota: 5,
  },
];

export const DEFAULT_ACHIEVEMENTS = [
  {
    id: 'achievement-1',
    namaSiswa: 'Ahmad Fauzi',
    judul: 'Juara Olimpiade Matematika Tingkat Kota',
    deskripsi: 'Ketekunan belajar dan latihan rutin membuahkan prestasi membanggakan di kompetisi matematika tingkat kota.',
    kategori: 'Akademik',
    tahun: 2025,
    tanggal: '2025-08-12',
    foto: '',
  },
  {
    id: 'achievement-2',
    namaSiswa: 'Siti Nurhaliza',
    judul: 'Lolos Seleksi Perguruan Tinggi Negeri',
    deskripsi: 'Berhasil meraih kursi di perguruan tinggi negeri setelah mengikuti program persiapan intensif.',
    kategori: 'Akademik',
    tahun: 2025,
    tanggal: '2025-06-20',
    foto: '',
  },
  {
    id: 'achievement-3',
    namaSiswa: 'Budi Santoso',
    judul: 'Juara Lomba Pidato Bahasa Inggris',
    deskripsi: 'Kepercayaan diri dan kemampuan berbahasa berkembang lewat latihan yang konsisten.',
    kategori: 'Seni & Bahasa',
    tahun: 2024,
    tanggal: '2024-11-05',
    foto: '',
  },
  {
    id: 'achievement-4',
    namaSiswa: 'Citra Lestari',
    judul: 'Medali Kejuaraan Taekwondo Pelajar',
    deskripsi: 'Prestasi olahraga yang diraih dengan disiplin, semangat, dan dukungan belajar yang seimbang.',
    kategori: 'Olahraga',
    tahun: 2024,
    tanggal: '2024-09-18',
    foto: '',
  },
];

export const DEFAULT_REGISTRATIONS = [
  {
    id: 'registration-1',
    nama: 'Nadia Putri',
    email: 'nadia@example.com',
    telepon: '081234567890',
    program: 'Intensif SMP',
    jenjang: 'SMP',
    pesan: '',
    status: 'Baru',
    tanggal: '2026-10-12',
  },
  {
    id: 'registration-2',
    nama: 'Rafi Pratama',
    email: 'rafi@example.com',
    telepon: '081298765432',
    program: 'Persiapan UTBK SMA',
    jenjang: 'SMA',
    pesan: 'Ingin mengikuti kelas sore.',
    status: 'Dihubungi',
    tanggal: '2026-10-10',
  },
  {
    id: 'registration-3',
    nama: 'Maya Anindya',
    email: 'maya@example.com',
    telepon: '082112223333',
    program: 'Reguler SD',
    jenjang: 'SD',
    pesan: '',
    status: 'Baru',
    tanggal: '2026-10-08',
  },
];

export function readStoredRecords(key, fallback) {
  const stored = window.localStorage.getItem(key);
  return stored === null ? fallback : JSON.parse(stored);
}

export function saveStoredRecords(key, records) {
  window.localStorage.setItem(key, JSON.stringify(records));
}

export function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}
