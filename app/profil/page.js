'use client';

import Link from 'next/link';
import { useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import { CONTACT_MESSAGES_STORAGE_KEY, readStoredRecords, saveStoredRecords } from '@/lib/demo-data';
import { ClockIcon, MailIcon, PinIcon, TelegramIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { SITE, formatPhone, hasTelegram, hasWhatsApp, telegramLink, whatsappLink } from '@/lib/site-config';

const principles = [
  { number: '01', title: 'Kenali kebutuhan', text: 'Kami mulai dengan memahami tujuan, kebiasaan, dan tantangan belajar setiap siswa.', tone: 'bg-blue-50 text-primary-700' },
  { number: '02', title: 'Susun langkah', text: 'Materi dan ritme belajar disusun agar terasa terarah sekaligus realistis untuk dijalani.', tone: 'bg-amber-50 text-amber-700' },
  { number: '03', title: 'Tumbuh bersama', text: 'Tutor mendampingi proses, memberi umpan balik, dan merayakan progres sekecil apa pun.', tone: 'bg-emerald-50 text-emerald-700' },
];

const faqs = [
  { question: 'Apakah bisa konsultasi sebelum memilih program?', answer: 'Tentu. Ceritakan kebutuhan belajar melalui formulir pendaftaran, lalu tim kami akan membantu memberikan rekomendasi program yang sesuai.' },
  { question: 'Apakah jadwal belajar bisa disesuaikan?', answer: 'Kami menyediakan beberapa pilihan jadwal dan kelas privat dengan jadwal yang dapat dibicarakan sesuai ketersediaan.' },
  { question: 'Bagaimana cara mengetahui perkembangan belajar?', answer: 'Siswa mendapat pendampingan dan evaluasi rutin agar perkembangan serta materi yang masih perlu diperkuat dapat dibicarakan bersama.' },
];

const fieldClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:ring-4 focus:ring-primary-100';

export default function ProfilPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ nama: '', kontak: '', pesan: '' });
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState(null); // { tone: 'success' | 'info', text, link? }
  const [sending, setSending] = useState(false);

  const validateForm = () => {
    if (!form.nama.trim() || !form.kontak.trim() || !form.pesan.trim()) return 'Nama, kontak, dan pesan perlu diisi.';
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.kontak.trim());
    const isPhone = form.kontak.replace(/\D/g, '').length >= 9;
    if (!isEmail && !isPhone) return 'Isi kontak dengan nomor HP/WhatsApp atau email yang valid.';
    return '';
  };

  const composeText = () => `Halo ${SITE.name}, saya ${form.nama.trim()}.\n\n${form.pesan.trim()}\n\nKontak saya: ${form.kontak.trim()}`;

  const saveLocal = (channel) => {
    try {
      const messages = readStoredRecords(CONTACT_MESSAGES_STORAGE_KEY, []);
      saveStoredRecords(CONTACT_MESSAGES_STORAGE_KEY, [
        { ...form, channel, id: `contact-${Date.now()}`, tanggal: new Date().toISOString().slice(0, 10) },
        ...messages,
      ]);
    } catch (error) {
      console.error('Pesan kontak tidak dapat disimpan di perangkat ini.', error);
    }
  };

  // Membuka WhatsApp admin dengan pesan yang sudah terisi otomatis.
  const sendViaWhatsApp = () => {
    setFormError('');
    setStatus(null);
    const error = validateForm();
    if (error) return setFormError(error);
    const link = whatsappLink(composeText());
    if (!link) return setFormError('Nomor WhatsApp admin belum diatur.');
    saveLocal('whatsapp');
    window.open(link, '_blank', 'noopener,noreferrer');
    setStatus({ tone: 'success', text: 'WhatsApp dibuka di tab baru. Tekan "Kirim" di WhatsApp untuk mengirim pesan Anda.' });
  };

  // Meneruskan pesan ke admin lewat bot Telegram (route /api/kontak).
  const sendViaTelegram = async (event) => {
    event.preventDefault();
    setFormError('');
    setStatus(null);
    const error = validateForm();
    if (error) return setFormError(error);

    setSending(true);
    try {
      const response = await fetch('/api/kontak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: event.currentTarget.website?.value || '' }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.ok) {
        saveLocal('telegram');
        setStatus({ tone: 'success', text: 'Pesan terkirim ke admin melalui Telegram. Kami akan segera menghubungi Anda.' });
        setForm({ nama: '', kontak: '', pesan: '' });
      } else if (result.configured === false && hasTelegram) {
        saveLocal('telegram-manual');
        setStatus({ tone: 'info', text: 'Bot Telegram belum aktif. Silakan lanjutkan chat langsung ke admin kami di Telegram.', link: telegramLink() });
      } else {
        setFormError(result.error || 'Pesan belum terkirim. Silakan coba lagi atau gunakan WhatsApp.');
      }
    } catch (err) {
      console.error(err);
      setFormError('Koneksi bermasalah. Silakan coba lagi atau gunakan WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-50 via-white to-amber-50/70">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex items-center gap-3">
            <span className="h-1 w-10 rounded-full bg-secondary-500" />
            <p className="text-xs font-bold tracking-[0.18em] text-primary-800 uppercase">Kenali Bimble Wanda</p>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Profil & kontak</h1>

          <article className="mt-7 grid overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl shadow-primary-900/5 lg:grid-cols-2">
            <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-gradient-to-br from-primary-100 via-sky-50 to-amber-100 p-8 sm:min-h-[330px]">
              <div className="absolute -left-12 -top-16 h-56 w-56 rounded-full border-[28px] border-white/50" />
              <div className="absolute -bottom-24 -right-14 h-64 w-64 rounded-full bg-secondary-200/40" />
              <div className="absolute left-[18%] top-[20%] h-4 w-4 rounded-full bg-secondary-400" />
              <div className="absolute right-[20%] top-[25%] h-3 w-3 rounded-full bg-primary-400" />
              <div className="relative max-w-sm rounded-3xl border border-white/80 bg-white/85 p-7 text-center shadow-lg shadow-primary-900/10 backdrop-blur">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-700 text-lg font-black text-white shadow-lg shadow-primary-700/20">BW</span>
                <p className="mt-4 text-lg font-bold text-slate-900">Belajar, tumbuh, berprestasi</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Ruang belajar yang mendukung setiap anak berkembang dengan percaya diri.</p>
                <div className="mt-5 flex justify-center gap-2" aria-hidden="true">
                  <span className="h-1.5 w-8 rounded-full bg-primary-600" />
                  <span className="h-1.5 w-5 rounded-full bg-secondary-400" />
                  <span className="h-1.5 w-3 rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
              <span className="text-xs font-bold tracking-[0.16em] text-primary-700 uppercase">Tentang Bimble Wanda</span>
              <h2 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-slate-950 sm:text-3xl">Teman belajar untuk membuka lebih banyak kemungkinan.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">Bimble Wanda didirikan dengan visi untuk memberikan pendidikan tambahan berkualitas tinggi yang dapat diakses oleh semua kalangan. Kami percaya bahwa setiap anak memiliki potensi unik yang perlu digali dan dikembangkan.</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">Misi kami adalah menciptakan lingkungan belajar yang inspiratif, menyediakan materi yang relevan dan terkini, serta didukung oleh tenaga pengajar profesional dan berdedikasi tinggi untuk memastikan setiap siswa mencapai prestasi akademik terbaiknya.</p>
              <Link href="/daftar" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-700/15 transition hover:-translate-y-0.5 hover:bg-primary-800">Mulai konsultasi <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        </div>
      </section>

      <section id="kontak" className="scroll-mt-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.18em] text-primary-700 uppercase">Kami siap membantu</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Mari terhubung.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">Chat langsung dengan admin melalui WhatsApp atau Telegram, atau tinggalkan pesan dan kami akan menghubungi Anda.</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ChannelCard
              href={hasWhatsApp ? whatsappLink(`Halo ${SITE.name}, saya ingin bertanya tentang program bimbingan belajar.`) : ''}
              icon={<WhatsAppIcon className="h-6 w-6" />}
              iconClass="bg-[#25D366] text-white shadow-lg shadow-emerald-600/25"
              title="WhatsApp"
              detail={hasWhatsApp ? formatPhone(SITE.whatsapp) : 'Nomor belum diatur'}
              cta="Chat sekarang"
              accent="hover:border-emerald-300 hover:shadow-emerald-900/10"
              ctaClass="text-emerald-700"
            />
            <ChannelCard
              href={hasTelegram ? telegramLink() : ''}
              icon={<TelegramIcon className="h-6 w-6" />}
              iconClass="bg-[#229ED9] text-white shadow-lg shadow-sky-600/25"
              title="Telegram"
              detail={hasTelegram ? `@${SITE.telegram}` : 'Username belum diatur'}
              cta="Buka Telegram"
              accent="hover:border-sky-300 hover:shadow-sky-900/10"
              ctaClass="text-sky-700"
            />
          </div>

          <div className="mt-5 grid items-stretch gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="send-message-heading">
              <div className="border-b border-slate-100 pb-4">
                <h3 id="send-message-heading" className="text-lg font-bold text-slate-900">Kirim pesan</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">Pilih cara kirim: buka WhatsApp, atau teruskan otomatis ke admin via Telegram.</p>
              </div>

              {status && (
                <div role="status" className={`mt-4 rounded-2xl border px-4 py-3 text-sm leading-6 ${status.tone === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-sky-200 bg-sky-50 text-sky-800'}`}>
                  {status.text}
                  {status.link && <a href={status.link} target="_blank" rel="noopener noreferrer" className="ml-1 font-semibold underline underline-offset-2">Buka Telegram →</a>}
                </div>
              )}
              {formError && <p role="alert" className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{formError}</p>}

              <form onSubmit={sendViaTelegram} className="mt-5 space-y-4" noValidate>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-700">Nama lengkap</span>
                    <input value={form.nama} onChange={(event) => setForm({ ...form, nama: event.target.value })} autoComplete="name" maxLength={100} className={fieldClass} placeholder="Masukkan nama Anda" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-700">No. WhatsApp / email</span>
                    <input value={form.kontak} onChange={(event) => setForm({ ...form, kontak: event.target.value })} autoComplete="tel" maxLength={100} className={fieldClass} placeholder="08xx atau nama@email.com" />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-700">Pesan <span className="font-normal text-slate-400">{form.pesan.length}/2000</span></span>
                  <textarea value={form.pesan} onChange={(event) => setForm({ ...form, pesan: event.target.value })} rows={5} maxLength={2000} className={`${fieldClass} resize-y`} placeholder="Contoh: Saya ingin tahu jadwal kelas SMP untuk anak saya..." />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button type="button" onClick={sendViaWhatsApp} disabled={!hasWhatsApp} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-[#1ebe5b] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0">
                    <WhatsAppIcon /> Kirim via WhatsApp
                  </button>
                  <button type="submit" disabled={sending} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#229ED9] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-[#1c8cc2] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0">
                    {sending ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" /> : <TelegramIcon />}
                    {sending ? 'Mengirim...' : 'Kirim via Telegram'}
                  </button>
                </div>
                <p className="text-center text-[11px] leading-5 text-slate-400">Data Anda hanya dipakai untuk membalas pertanyaan ini.</p>
              </form>
            </section>

            <div className="flex flex-col gap-5">
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="contact-information-heading">
                <h3 id="contact-information-heading" className="text-base font-bold text-slate-900">Informasi kontak</h3>
                <ul className="mt-4 space-y-4">
                  <InfoRow icon={<PinIcon className="h-4 w-4" />} label="Alamat" value={SITE.address} />
                  <InfoRow icon={<MailIcon className="h-4 w-4" />} label="Email" value={SITE.email} href={SITE.email ? `mailto:${SITE.email}` : ''} />
                  <InfoRow icon={<ClockIcon className="h-4 w-4" />} label="Jam operasional" value={SITE.hours} />
                </ul>
              </section>

              <section className="flex min-h-[280px] flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm" aria-labelledby="location-heading">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-5 py-4">
                  <h3 id="location-heading" className="flex items-center gap-2 text-sm font-bold text-slate-900"><PinIcon className="h-4 w-4 text-primary-700" /> Lokasi kami</h3>
                  {SITE.address && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary-700 hover:text-primary-900">Buka di Maps ↗</a>}
                </div>
                {SITE.mapsEmbedUrl ? (
                  <iframe title={`Peta lokasi ${SITE.name}`} src={SITE.mapsEmbedUrl} className="min-h-[240px] w-full flex-1 border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                ) : (
                  <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#eef4f1] p-8">
                    <div className="absolute inset-0 opacity-60" aria-hidden="true">
                      <div className="absolute -left-10 top-10 h-5 w-[120%] rotate-[14deg] border-y-8 border-white" />
                      <div className="absolute left-[30%] -top-12 h-[140%] w-5 rotate-[24deg] border-x-8 border-white" />
                      <div className="absolute right-[18%] -top-1/4 h-[150%] w-4 -rotate-[38deg] border-x-8 border-white" />
                      <div className="absolute bottom-[18%] left-[12%] h-12 w-24 rounded-2xl bg-emerald-100" />
                    </div>
                    <div className="relative max-w-xs rounded-2xl border border-white bg-white/90 p-5 text-center shadow-lg shadow-slate-900/10 backdrop-blur">
                      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><PinIcon /></span>
                      <p className="mt-3 text-sm font-bold text-slate-900">Peta lokasi</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Peta akan tampil setelah alamat resmi ditambahkan.</p>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.18em] text-primary-700 uppercase">Cara kami mendampingi</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Proses belajar yang terasa personal.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">Setiap perjalanan belajar berbeda. Dukungan kami mengikuti kebutuhan, bukan sebaliknya.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.number} className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5">
              <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold ${principle.tone}`}>{principle.number}</span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{principle.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-xs font-bold tracking-[0.18em] text-primary-700 uppercase">Pertanyaan umum</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Ada yang ingin ditanyakan?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">Mulai dari kebutuhan belajar dan pilihan jadwal—kami siap membantu.</p>
            <a href="#kontak" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900">Kirim pertanyaan <span aria-hidden="true">→</span></a>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white">
                <button type="button" className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-800" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  {faq.question}
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${openFaq === index ? 'bg-primary-700 text-white' : 'bg-slate-100 text-slate-500'}`}>{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && <p className="px-5 pb-5 text-sm leading-6 text-slate-500">{faq.answer}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function ChannelCard({ href, icon, iconClass, title, detail, cta, accent, ctaClass }) {
  const content = (
    <>
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconClass}`}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-bold text-slate-900">{title}</span>
        <span className="mt-0.5 block truncate text-sm text-slate-500">{detail}</span>
      </span>
      {href && <span className={`hidden shrink-0 text-sm font-semibold sm:inline ${ctaClass}`}>{cta} →</span>}
    </>
  );
  const base = 'flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition';
  if (!href) return <div className={`${base} opacity-70`}>{content}</div>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} hover:-translate-y-0.5 hover:shadow-xl ${accent}`}>{content}</a>;
}

function InfoRow({ icon, label, value, href }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">{label}</p>
        {value ? (
          href ? <a href={href} className="mt-0.5 block break-words text-sm text-slate-700 hover:text-primary-700">{value}</a> : <p className="mt-0.5 text-sm text-slate-700">{value}</p>
        ) : (
          <p className="mt-0.5 text-sm italic text-slate-400">Belum diisi</p>
        )}
      </div>
    </li>
  );
}
