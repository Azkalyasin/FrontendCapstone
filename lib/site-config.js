// Konfigurasi identitas & kontak Bimble Wanda.
// Semua nilai diambil dari environment variable (lihat .env.example) agar
// nomor WhatsApp, username Telegram, alamat, dll. bisa diganti tanpa mengubah kode.

export const SITE = {
  name: 'Bimble Wanda',
  tagline: 'Belajar, tumbuh, berprestasi',
  // Nomor WhatsApp admin, format bebas (0812..., +62812..., 62812...).
  whatsapp: process.env.NEXT_PUBLIC_WA_NUMBER || '',
  // Username Telegram admin/bot tanpa "@", contoh: bimblewanda
  telegram: (process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || '').replace(/^@/, ''),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  address: process.env.NEXT_PUBLIC_ADDRESS || '',
  // URL embed Google Maps (Bagikan > Sematkan peta > salin nilai src).
  mapsEmbedUrl: process.env.NEXT_PUBLIC_MAPS_EMBED_URL || '',
  hours: process.env.NEXT_PUBLIC_OPENING_HOURS || 'Senin–Sabtu, 08.00–20.00',
};

/** Ubah nomor lokal (08xx) menjadi format internasional (628xx) untuk wa.me. */
export function normalizePhone(phone = '') {
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  if (digits.startsWith('8')) return `62${digits}`;
  return digits;
}

/** Tampilkan nomor dalam format yang mudah dibaca, contoh: +62 812-3456-7890 */
export function formatPhone(phone = '') {
  const digits = normalizePhone(phone);
  if (!digits) return '';
  const local = digits.slice(2);
  return `+62 ${local.slice(0, 3)}-${local.slice(3, 7)}-${local.slice(7)}`.replace(/-$/, '');
}

/** Link WhatsApp click-to-chat dengan pesan terisi otomatis. */
export function whatsappLink(text = '', phone = SITE.whatsapp) {
  const number = normalizePhone(phone);
  if (!number) return '';
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

/** Link Telegram ke username admin/bot. */
export function telegramLink(username = SITE.telegram) {
  return username ? `https://t.me/${username}` : '';
}

export const hasWhatsApp = Boolean(SITE.whatsapp);
export const hasTelegram = Boolean(SITE.telegram);
