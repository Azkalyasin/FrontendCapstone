// POST /api/kontak
// Meneruskan pesan kontak / notifikasi pendaftaran ke admin melalui Telegram Bot API.
// Token bot TIDAK pernah dikirim ke browser — hanya dibaca di server.
//
// Env yang dibutuhkan (frontend/.env.local):
//   TELEGRAM_BOT_TOKEN=123456:ABC...   (dari @BotFather)
//   TELEGRAM_CHAT_ID=123456789         (chat/grup admin yang menerima notifikasi)

const MAX_LENGTH = { nama: 100, kontak: 100, pesan: 2000 };

function escapeHtml(value = '') {
  return String(value).replace(/[&<>]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[char]);
}

function buildMessage(body) {
  if (body.type === 'pendaftaran') {
    const d = body.data || {};
    const rows = [
      ['Nama', d.nama],
      ['TTL', [d.tempatLahir, d.tanggalLahir].filter(Boolean).join(', ')],
      ['Jenis kelamin', d.jenisKelamin],
      ['Alamat', d.alamat],
      ['No. HP/WA', d.telepon],
      ['Orang tua/wali', d.namaOrangTua],
      ['Jenjang', d.jenjang],
      ['Program', d.program],
    ];
    return [
      '<b>📝 Pendaftaran baru — Bimble Wanda</b>',
      '',
      ...rows.filter(([, v]) => v).map(([k, v]) => `<b>${k}:</b> ${escapeHtml(String(v).slice(0, 300))}`),
    ].join('\n');
  }

  return [
    '<b>💬 Pesan baru dari website — Bimble Wanda</b>',
    '',
    `<b>Nama:</b> ${escapeHtml(body.nama)}`,
    `<b>Kontak:</b> ${escapeHtml(body.kontak)}`,
    '',
    escapeHtml(body.pesan),
  ].join('\n');
}

function validate(body) {
  if (body.type === 'pendaftaran') {
    const d = body.data || {};
    if (!d.nama || !d.telepon) return 'Data pendaftaran tidak lengkap.';
    return '';
  }
  for (const field of ['nama', 'kontak', 'pesan']) {
    const value = typeof body[field] === 'string' ? body[field].trim() : '';
    if (!value) return 'Nama, kontak, dan pesan perlu diisi.';
    if (value.length > MAX_LENGTH[field]) return `Isian ${field} terlalu panjang.`;
  }
  return '';
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Format data tidak valid.' }, { status: 400 });
  }

  // Honeypot sederhana untuk menyaring bot spam.
  if (body?.website) return Response.json({ ok: true });

  const error = validate(body || {});
  if (error) return Response.json({ ok: false, error }, { status: 400 });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return Response.json(
      { ok: false, configured: false, error: 'Notifikasi Telegram belum dikonfigurasi.' },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: buildMessage(body), parse_mode: 'HTML' }),
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) {
      console.error('Telegram API error:', result.description || response.status);
      return Response.json({ ok: false, error: 'Pesan gagal diteruskan ke admin.' }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error('Gagal menghubungi Telegram:', err);
    return Response.json({ ok: false, error: 'Server tidak dapat menghubungi Telegram.' }, { status: 502 });
  }
}
