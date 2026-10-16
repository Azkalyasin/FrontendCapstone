'use client';

import Link from 'next/link';
import { useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';

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

export default function ProfilPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-50 via-white to-amber-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-bold text-primary-800 shadow-sm ring-1 ring-primary-100">Tentang Bimble Wanda</span>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">Kami percaya, belajar seharusnya membuka lebih banyak kemungkinan.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Bimble Wanda hadir sebagai teman belajar yang membantu siswa merasa didukung, memahami materi dengan lebih percaya diri, dan bertumbuh sesuai potensinya.</p>
              <Link href="/daftar" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-700/20 transition hover:bg-primary-800">Kenali program kami <span aria-hidden="true">→</span></Link>
            </div>
            <div className="relative rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-primary-900/10 sm:p-8">
              <span className="absolute right-7 top-6 text-5xl text-secondary-300" aria-hidden="true">“</span>
              <p className="mt-8 max-w-lg text-2xl font-semibold leading-relaxed">Bukan hanya memahami pelajaran. Kami ingin setiap siswa percaya pada kemampuannya sendiri.</p>
              <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 font-bold">W</span>
                <div><p className="text-sm font-semibold">Tim Bimble Wanda</p><p className="mt-0.5 text-xs text-slate-400">Teman tumbuh dan belajar</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.18em] text-primary-700 uppercase">Cara kami mendampingi</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Proses yang terasa personal.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">Setiap perjalanan belajar berbeda. Dukungan kami mengikuti kebutuhan, bukan sebaliknya.</p>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
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
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-xs font-bold tracking-[0.18em] text-primary-700 uppercase">Pertanyaan umum</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Ada yang ingin ditanyakan?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">Mulai dari kebutuhan belajar dan pilihan jadwal—kami siap membantu.</p>
            <Link href="/daftar" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900">Tanya tim kami <span aria-hidden="true">→</span></Link>
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
