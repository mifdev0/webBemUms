import React from 'react';

export default function VisiMisi({ db }) {
  const data = db.visiMisi || {};

  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* SECTION 1: HERO VISI */}
        <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-primary text-white font-display text-xs px-4 py-1.5 border-b-4 border-r-4 border-black uppercase tracking-wider">
            Visi Utama BEM UMS
          </div>
          <div className="mt-6 space-y-4">
            <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-black leading-none pt-4">
              "{data.visi}"
            </h1>
            <p className="text-sm md:text-base font-body text-secondary leading-relaxed max-w-3xl">
              {data.desc}
            </p>
          </div>
        </div>

        {/* SECTION 2: LIST VERTIKAL MISI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 bg-black text-white p-6 border-4 border-black">
            <h2 className="text-3xl font-display uppercase tracking-wider text-primary">MISI ORGANISASI</h2>
            <p className="text-xs font-body text-neutral-400 mt-2 leading-relaxed">
              Langkah-langkah strategis dan program aksi berkelanjutan untuk mewujudkan visi ekosistem kampus progresif.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {data.misi.map((m, idx) => (
              <div 
                key={idx} 
                className="bg-white border-3 border-black p-5 flex gap-4 items-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {/* Numbered box (sharp corners, red background, white text) */}
                <div className="w-8 h-8 shrink-0 bg-primary text-white flex items-center justify-center font-display border-2 border-black font-bold">
                  0{idx + 1}
                </div>
                <p className="text-sm font-body text-black leading-relaxed font-bold">
                  {m}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: GRID 3 PILAR */}
        <div className="space-y-6 pt-8 border-t-4 border-black">
          <div className="text-center space-y-1">
            <span className="font-display text-xs text-primary uppercase tracking-widest font-bold">
              KABINET TRANSFORMASI PROGRESIF
            </span>
            <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight">
              TIGA PILAR ORGANISASI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {data.pillars.map((p, idx) => (
              <div 
                key={p.id} 
                className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Icon placeholder styled with a brutalist square shape */}
                  <div className="w-12 h-12 bg-primary text-white font-display border-2 border-black flex items-center justify-center font-bold text-lg mb-4 shadow-[2px_2px_0px_0px_#000]">
                    P{idx + 1}
                  </div>
                  <h3 className="text-lg font-display uppercase tracking-tight mb-2 border-b border-black pb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs font-body text-secondary leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-6 pt-2 border-t border-neutral-200">
                  <span className="text-[9px] font-display uppercase tracking-wider text-neutral-400">
                    Nilai Keberlanjutan
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
