import React, { useState } from 'react';

export default function Struktural({ db }) {
  const [selectedPeriod, setSelectedPeriod] = useState(db.currentPeriod);
  const [selectedDept, setSelectedDept] = useState(null);

  const periods = db.periods || [];
  const leaders = db.pimpinan[selectedPeriod] || [];
  const depts = db.kementerian[selectedPeriod] || [];

  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header / Period Select */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-black pb-6 gap-4">
          <div>
            <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tight leading-none">STRUKTUR ORGANISASI</h1>
            <p className="text-sm font-body uppercase tracking-wider text-secondary mt-2">
              Jajaran Pimpinan & Kementerian Kabinet BEM UMS
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="font-display text-sm tracking-wider uppercase">PERIODE:</span>
            <select
              value={selectedPeriod}
              onChange={(e) => {
                setSelectedPeriod(e.target.value);
                setSelectedDept(null); // Reset detail kementerian saat ganti periode
              }}
              className="border-3 border-black bg-white px-4 py-2 font-display text-sm uppercase tracking-wider shadow-[3px_3px_0px_0px_#1a1c1c] outline-none"
            >
              {periods.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pimpinan Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-display uppercase border-b-2 border-black pb-2 max-w-xs">Pimpinan Umum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leaders.length === 0 ? (
              <p className="text-secondary italic text-sm">Data pimpinan belum diisi untuk periode ini.</p>
            ) : (
              leaders.map(l => (
                <div key={l.id} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-6 items-center">
                  {/* Photo with asymmetrical shadow */}
                  <div className="relative w-32 h-40 border-4 border-black bg-neutral-200 shrink-0 overflow-hidden grayscale">
                    {l.photo ? (
                      <img src={l.photo} alt={l.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display text-xs text-center text-neutral-400 p-2">
                        NO PHOTO
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <span className="bg-primary text-white text-[10px] font-display uppercase tracking-widest px-2.5 py-1 border border-black">
                      {l.role}
                    </span>
                    <h3 className="text-2xl font-display uppercase tracking-tight mt-1">{l.name}</h3>
                    <p className="text-xs text-secondary font-body leading-relaxed">{l.bio}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kementerian Section Grid */}
        <div className="space-y-6 pt-6 border-t-2 border-black">
          <h2 className="text-2xl font-display uppercase border-b-2 border-black pb-2 max-w-xs">Kementerian Kabinet</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {depts.length === 0 ? (
              <p className="text-secondary italic text-sm">Data kementerian belum diisi untuk periode ini.</p>
            ) : (
              depts.map((d, index) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDept(d)}
                  className={`border-4 border-black p-6 cursor-pointer transition-all ${
                    selectedDept?.id === d.id 
                      ? 'bg-primary text-white translate-x-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                      : 'bg-white text-black hover:bg-neutral-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <span className="font-display text-4xl block mb-2 opacity-30">0{index + 1}</span>
                  <h3 className="text-lg font-display uppercase tracking-tight mb-2 line-clamp-2">{d.name}</h3>
                  <p className={`text-xs font-body line-clamp-3 leading-relaxed ${
                    selectedDept?.id === d.id ? 'text-white/80' : 'text-secondary'
                  }`}>
                    {d.desc}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`text-[10px] font-display uppercase tracking-widest ${
                      selectedDept?.id === d.id ? 'text-white border-white' : 'text-black border-black'
                    } border-b pb-0.5`}>
                      Lihat Jajaran Anggota
                    </span>
                    <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Active Department Details / Drawer Overlay */}
        {selectedDept && (
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <div className="flex justify-between items-start border-b-2 border-black pb-4">
              <div>
                <span className="bg-black text-white text-[10px] font-display uppercase tracking-widest px-3 py-1">
                  DETAIL KEMENTERIAN
                </span>
                <h3 className="text-3xl font-display uppercase tracking-tight mt-2">{selectedDept.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedDept(null)}
                className="border-2 border-black p-1 hover:bg-neutral-100 font-bold"
              >
                CLOSE [×]
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-3">
                <h4 className="font-display text-sm uppercase text-primary border-b border-neutral-300 pb-1">Tugas & Fungsi Utama</h4>
                <p className="text-sm font-body text-secondary leading-relaxed">{selectedDept.desc}</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-display text-sm uppercase text-primary border-b border-neutral-300 pb-1">Susunan Pengurus Jajaran</h4>
                <div className="space-y-2">
                  {selectedDept.members.length === 0 ? (
                    <p className="text-xs text-secondary italic">Belum ada pengurus diinput.</p>
                  ) : (
                    selectedDept.members.map((m, i) => (
                      <div key={i} className="flex justify-between items-center bg-neutral-50 border border-black p-2.5">
                        <span className="font-bold text-xs">{m.name}</span>
                        <span className="bg-neutral-200 text-neutral-800 text-[10px] font-display uppercase px-2 py-0.5 border border-black">
                          {m.title}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
