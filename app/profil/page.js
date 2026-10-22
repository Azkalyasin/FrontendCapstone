'use client';

import Link from 'next/link';
import { useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import { CONTACT_MESSAGES_STORAGE_KEY, readStoredRecords, saveStoredRecords } from '@/lib/demo-data';

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

const contactItems = [
  { label: 'Alamat', value: '', icon: 'M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' },
  { label: 'Telepon', value: '', icon: 'M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-8-8l2-2-1-4Z' },
  { label: 'Email', value: '', icon: 'M3 5h18v14H3z M3 6l9 7 9-7' },
];

const fieldClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:ring-4 focus:ring-primary-100';

export default function ProfilPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' });
  const [formError, setFormError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError('');

    if (!form.nama.trim() || !form.email.trim() || !form.pesan.trim()) {
      setFormError('Nama, email, dan pesan perlu diisi.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError('Masukkan alamat email yang valid.');
      return;
    }

    try {
      const messages = readStoredRecords(CONTACT_MESSAGES_STORAGE_KEY, []);
      saveStoredRecords(CONTACT_MESSAGES_STORAGE_KEY, [
        { ...form, id: `contact-${Date.now()}`, tanggal: new Date().toISOString().slice(0, 10) },
        ...messages,
      ]);
      setSent(true);
      setForm({ nama: '', email: '', pesan: '' });
    } catch (error) {
      console.error('Pesan kontak tidak dapat disimpan di perangkat ini.', error);
      setFormError('Pesan belum tersimpan. Silakan coba kembali.');
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
            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">Hubungi kami atau kirim pertanyaan tentang program dan kebutuhan belajar.</p>
          </div>

          <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5">
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="contact-information-heading">
                <h3 id="contact-information-heading" className="border-b border-slate-200 pb-3 text-base font-bold text-slate-900">Informasi kontak</h3>
                <div className="mt-4 space-y-4">
                  {contactItems.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon} /></svg>
                      </span>
                      <div>
                        <p className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">{item.label}</p>
                        {item.value ? <p className="mt-1 text-sm text-slate-700">{item.value}</p> : <p className="mt-1 text-sm italic text-slate-400">Belum diisi</p>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs leading-5 text-slate-400">Informasi alamat, telepon, dan email dapat dilengkapi di halaman ini.</p>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="send-message-heading">
                <h3 id="send-message-heading" className="border-b border-slate-200 pb-3 text-base font-bold text-slate-900">Kirim pesan</h3>
                {sent && <p role="status" className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs leading-5 text-emerald-800">Pesan tersimpan di browser ini sebagai demo; pesan belum dikirim ke server.</p>}
                {formError && <p role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs text-rose-700">{formError}</p>}
                <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-bold tracking-wide text-slate-600 uppercase">Nama lengkap</span>
                    <input value={form.nama} onChange={(event) => setForm({ ...form, nama: event.target.value })} autoComplete="name" className={fieldClass} placeholder="Masukkan nama Anda" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-bold tracking-wide text-slate-600 uppercase">Email</span>
                    <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" className={fieldClass} placeholder="nama@email.com" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-bold tracking-wide text-slate-600 uppercase">Pesan</span>
                    <textarea value={form.pesan} onChange={(event) => setForm({ ...form, pesan: event.target.value })} rows={4} className={`${fieldClass} resize-y`} placeholder="Tulis pesan Anda di sini..." />
                  </label>
                  <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-5 py-3 text-xs font-bold tracking-wide text-white transition hover:bg-primary-800">Kirim pesan <span aria-hidden="true">→</span></button>
                  <p className="text-center text-[10px] leading-4 text-slate-400">Formulir ini masih dalam mode demo lokal.</p>
                </form>
              </section>
            </div>

            <section className="flex min-h-[360px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:min-h-full" aria-labelledby="location-heading">
              <div className="flex items-center gap-2 bg-slate-950 px-5 py-4 text-white">
                <svg className="h-4 w-4 text-secondary-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 6h5v12H3zM8 8h6v10H8zM14 5h7v13h-7z" /></svg>
                <h3 id="location-heading" className="text-xs font-bold tracking-[0.14em] uppercase">Lokasi kami</h3>
              </div>
              <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#eef4f1] p-8">
                <div className="absolute inset-0 opacity-60" aria-hidden="true">
                  <div className="absolute -left-10 top-16 h-5 w-[120%] rotate-[18deg] border-y-8 border-white bg-transparent" />
                  <div className="absolute left-[28%] -top-12 h-[140%] w-5 rotate-[24deg] border-x-8 border-white bg-transparent" />
                  <div className="absolute right-[18%] top-[-20%] h-[140%] w-4 rotate-[-38deg] border-x-8 border-white bg-transparent" />
                  <div className="absolute bottom-[20%] left-[-10%] h-4 w-[120%] rotate-[-12deg] border-y-8 border-white bg-transparent" />
                  <div className="absolute left-[14%] top-[22%] h-10 w-20 rounded-full bg-emerald-100" />
                  <div className="absolute bottom-[18%] right-[14%] h-14 w-24 rounded-2xl bg-emerald-100" />
                </div>
                <div className="relative max-w-sm rounded-3xl border border-white bg-white/90 p-7 text-center shadow-xl shadow-slate-900/10 backdrop-blur">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                  </span>
                  <h4 className="mt-4 text-base font-bold text-slate-900">Peta lokasi</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-500">Peta akan ditampilkan setelah alamat resmi Bimble Wanda ditambahkan.</p>
                </div>
              </div>
            </section>
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
