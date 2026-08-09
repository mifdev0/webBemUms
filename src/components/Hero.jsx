import React from 'react';
import { ArrowRight, Sparkles, AlertTriangle, Layers, UserCheck } from 'lucide-react';

export default function Hero({ db, setActivePage }) {
  const oprec = db.oprec || {};
  const currentPeriod = db.currentPeriod;
  const recentArticles = (db.articles || []).slice(0, 3);
  const leaders = db.pimpinan[currentPeriod] || [];
  const president = leaders.find(l => l.id === 1 || l.role.toLowerCase().includes('ketua'));
  const presidentPhoto = president?.photo || '';
  const visiMisi = db.visiMisi || {};

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO MAIN SECTION */}
      <section className="relative w-full px-6 md:px-12 pt-28 pb-12 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto">
          
          <div className="col-span-12 lg:col-span-7 flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-body text-xs font-black text-primary uppercase tracking-widest bg-red-50 border border-primary px-3 py-1">
                KABINET AKTIF {currentPeriod}
              </span>
              <span className="w-12 h-[2px] bg-primary"></span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl uppercase leading-none tracking-tight">
              KABINET<br />
              TRANSFORMASI<br />
              <span className="text-primary">PROGRESIF</span>
            </h1>

            <div className="max-w-xl space-y-6">
              <p className="font-display text-xl sm:text-2xl uppercase text-black">
                Badan Eksekutif Mahasiswa Universitas Muhammadiyah Surakarta
              </p>
              <p className="font-body text-sm text-secondary leading-relaxed">
                Bergerak dengan integritas, berinovasi dengan aksi. Wadah aspirasi mahasiswa Universitas Muhammadiyah Surakarta untuk mewujudkan kampus yang berdaya saing global.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => setActivePage('oprec')}
                  className="neo-btn px-6 py-3.5 text-xs flex items-center gap-2"
                >
                  <UserCheck size={16} /> GABUNG KABINET
                </button>
                <button 
                  onClick={() => setActivePage('struktural')}
                  className="neo-btn-secondary px-6 py-3.5 text-xs flex items-center gap-2"
                >
                  LIHAT STRUKTURAL <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Hero Visual Card (Brutalist style with photo mock & offset shadows) */}
          <div className="col-span-12 lg:col-span-5 relative mt-8 lg:mt-0 max-w-sm mx-auto w-full px-4">
            <div className="absolute -top-1 left-1 md:-top-4 md:-left-4 font-display text-xs uppercase bg-[#1a1c1c] text-white px-3 py-1.5 z-20 border-2 border-black">
              PERIODE {currentPeriod}
            </div>
            <div className="absolute top-4 left-8 md:top-6 md:left-6 w-[calc(100%-32px)] md:w-full h-full bg-primary z-0 border-4 border-black"></div>
            <div className="relative z-10 aspect-[3/4] overflow-hidden grayscale border-4 border-black bg-white flex flex-col justify-center items-center text-center shadow-[4px_4px_0px_0px_#000]">
              {presidentPhoto ? (
                <img src={presidentPhoto} alt="Presiden BEM UMS" className="w-full h-full object-cover" />
              ) : (
                <div className="p-6 flex flex-col items-center">
                  <Sparkles className="text-primary mb-4" size={48} />
                  <span className="font-display text-2xl uppercase">FOTO UTAMA PRESIDEN BEM UMS</span>
                  <span className="font-body text-[10px] text-secondary mt-2">KABINET TRANSFORMASI PROGRESIF</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR (Neo-Brutalist Layout) */}
      <section className="w-full bg-[#1a1c1c] py-12 px-6 md:px-12 border-y-4 border-black text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start sm:border-r border-neutral-700/60 last:border-r-0 pr-4">
            <span className="font-display text-primary text-6xl md:text-8xl">15</span>
            <span className="font-body text-xs font-bold text-neutral-300 uppercase mt-1">Tahun Berdiri & Mengabdi</span>
          </div>
          <div className="flex flex-col items-center sm:items-start sm:border-r border-neutral-700/60 last:border-r-0 pr-4">
            <span className="font-display text-primary text-6xl md:text-8xl">06</span>
            <span className="font-body text-xs font-bold text-neutral-300 uppercase mt-1">Kementerian Aktif</span>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-display text-primary text-6xl md:text-8xl">80+</span>
            <span className="font-body text-xs font-bold text-neutral-300 uppercase mt-1">Anggota Struktural Kabinet</span>
          </div>
        </div>
      </section>

      {/* 3. RECENT ARTICLES PREVIEW */}
      <section className="w-full px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 border-b-2 border-black pb-4">
          <div>
            <h2 className="font-display text-4xl uppercase tracking-tight">ARTIKEL TERBARU</h2>
            <p className="text-xs text-secondary font-body uppercase mt-1">Rilis Berita, Rilis Gerakan, dan Opini Mahasiswa</p>
          </div>
          <button 
            onClick={() => setActivePage('artikel')}
            className="flex items-center gap-2 text-primary font-display text-xs uppercase border-b-2 border-primary pb-0.5 hover:opacity-85 transition-opacity"
          >
            LIHAT SEMUA ARTIKEL <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentArticles.map(a => (
            <article 
              key={a.id} 
              onClick={() => setActivePage('artikel')}
              className="bg-white border-3 border-black p-4 flex flex-col justify-between hover:translate-x-1 transition-all shadow-[4px_4px_0px_0px_#000] cursor-pointer"
            >
              <div>
                <div className="aspect-[16/10] bg-neutral-100 border-2 border-black mb-3 relative overflow-hidden">
                  {a.thumbnail ? (
                    <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-[10px] text-neutral-400">NO IMAGES</div>
                  )}
                  <span className="absolute top-2 left-2 bg-black text-white px-2 py-0.5 text-[9px] font-display uppercase tracking-wider">
                    {a.category}
                  </span>
                </div>
                <span className="text-[9px] text-neutral-500 font-bold block mb-1">{a.date}</span>
                <h3 className="font-display text-lg uppercase leading-tight line-clamp-2 mb-2">{a.title}</h3>
                <p className="text-xs text-secondary line-clamp-3 leading-relaxed">{a.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 text-[10px] font-display text-primary flex items-center gap-1">
                SELENGKAPNYA <ArrowRight size={10} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. LAYANAN INTERAKTIF BOXES */}
      <section className="w-full px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 border-4 border-black">
          <div className="lg:col-span-4 bg-primary text-white p-8 flex flex-col justify-between min-h-[250px]">
            <h2 className="font-display text-5xl uppercase leading-none">LAYANAN<br />PUBLIK</h2>
            <p className="text-xs font-body leading-relaxed text-white/80 max-w-xs mt-4">
              Akses cepat ruang partisipasi mahasiswa, layanan advokasi aspirasi terpadu, dan pendaftaran relawan sosial.
            </p>
          </div>

          <div className="lg:col-span-8 p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white">
            
            {/* Lapor Pres */}
            <div 
              onClick={() => setActivePage('lapor')}
              className="group p-5 border-3 border-black bg-neutral-50 hover:bg-black hover:text-white transition-colors cursor-pointer flex flex-col justify-between min-h-[180px] shadow-[4px_4px_0px_0px_#000]"
            >
              <div>
                <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-white text-black mb-3">
                  <AlertTriangle size={18} />
                </div>
                <h3 className="font-display text-xl uppercase mb-1">Lapor Pres!</h3>
                <p className="text-xs font-body text-secondary group-hover:text-neutral-300 leading-relaxed">
                  Aspirasi dan pengaduan advokasi mahasiswa UMS langsung terhubung ke Ketua BEM.
                </p>
              </div>
              <span className="text-[10px] font-display text-primary group-hover:text-white mt-4 flex items-center gap-1">
                MASUK KANAL <ArrowRight size={10} />
              </span>
            </div>

            {/* Volunteer */}
            <div 
              onClick={() => setActivePage('volunteer')}
              className="group p-5 border-3 border-black bg-neutral-50 hover:bg-black hover:text-white transition-colors cursor-pointer flex flex-col justify-between min-h-[180px] shadow-[4px_4px_0px_0px_#000]"
            >
              <div>
                <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-white text-black mb-3">
                  <Layers size={18} />
                </div>
                <h3 className="font-display text-xl uppercase mb-1">Jadilah Volunteer</h3>
                <p className="text-xs font-body text-secondary group-hover:text-neutral-300 leading-relaxed">
                  Daftarkan diri berkontribusi dalam berbagai aksi sosial & pemberdayaan masyarakat.
                </p>
              </div>
              <span className="text-[10px] font-display text-primary group-hover:text-white mt-4 flex items-center gap-1">
                DAFTAR VOLUNTEER <ArrowRight size={10} />
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 5. VISI MISI OVERVIEW */}
      <section className="w-full px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="font-display text-xs text-primary uppercase tracking-widest font-bold">Visi & Nilai Utama</span>
          <h2 className="font-display text-3xl sm:text-5xl uppercase leading-none">
            {visiMisi.visi}
          </h2>
          <p className="text-sm font-body text-secondary leading-relaxed">
            {visiMisi.desc}
          </p>
          <button 
            onClick={() => setActivePage('visimisi')}
            className="neo-btn px-6 py-3 text-xs"
          >
            BACA VISI MISI SELENGKAPNYA
          </button>
        </div>

        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 gap-4">
          {visiMisi.pillars.map((p, idx) => (
            <div key={p.id} className="flex gap-4 items-start p-3 bg-neutral-50 border border-neutral-300">
              <span className="w-6 h-6 shrink-0 bg-black text-white font-display text-xs flex items-center justify-center font-bold">
                0{idx + 1}
              </span>
              <div>
                <h4 className="font-display uppercase text-sm">{p.title}</h4>
                <p className="text-xs text-secondary leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
