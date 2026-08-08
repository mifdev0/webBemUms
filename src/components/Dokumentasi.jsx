import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Dokumentasi({ db }) {
  const [activeAlbum, setActiveAlbum] = useState(null);
  const albums = db.albums || [];

  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b-4 border-black pb-6">
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tight leading-none">DOKUMENTASI DOKUMEN</h1>
          <p className="text-sm font-body uppercase tracking-wider text-secondary mt-2">
            Galeri Arsip Kegiatan & Aksi Nyata BEM UMS
          </p>
        </div>

        {/* Symmetric Grid with negative space */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {albums.length === 0 ? (
            <p className="text-secondary italic text-sm col-span-full text-center py-12">Belum ada album dokumentasi.</p>
          ) : (
            albums.map(a => (
              <div 
                key={a.id} 
                onClick={() => setActiveAlbum(a)}
                className="group cursor-pointer bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                {/* Album Preview Box: Grayscale to color hover */}
                <div className="aspect-[4/3] border-4 border-black bg-neutral-200 overflow-hidden relative mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
                  {a.photos && a.photos[0] ? (
                    <img src={a.photos[0]} alt={a.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center font-display text-xs p-4 text-center text-neutral-500 uppercase">
                      <span>Folder Galeri</span>
                      <span className="font-bold text-lg text-black mt-1">"{a.title}"</span>
                    </div>
                  )}

                  {/* Hover indicator arrow */}
                  <div className="absolute bottom-3 right-3 bg-black text-white p-2 border border-white translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowRight size={18} />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-body text-secondary uppercase font-bold">{a.date}</span>
                  <h3 className="text-xl font-display uppercase tracking-tight font-extrabold line-clamp-1">{a.title}</h3>
                  <p className="text-xs text-secondary leading-relaxed line-clamp-2">{a.desc}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Album Overlay / Gallery view */}
        {activeAlbum && (
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <div className="flex justify-between items-start border-b-2 border-black pb-4">
              <div>
                <span className="bg-black text-white text-[10px] font-display uppercase tracking-widest px-3 py-1">
                  ARSIP FOLDER GALERI: {activeAlbum.title}
                </span>
                <h3 className="text-3xl font-display uppercase tracking-tight mt-2">{activeAlbum.title}</h3>
                <p className="text-xs text-secondary font-body mt-1">{activeAlbum.date} — {activeAlbum.desc}</p>
              </div>
              <button 
                onClick={() => setActiveAlbum(null)}
                className="border-2 border-black px-3 py-1 hover:bg-neutral-100 font-display text-xs uppercase"
              >
                TUTUP GALERI [×]
              </button>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(!activeAlbum.photos || activeAlbum.photos.length === 0) ? (
                <div className="col-span-full py-12 border-2 border-dashed border-neutral-300 text-center text-secondary italic text-xs">
                  Tidak ada foto dalam album ini. Admin dapat menambahkan foto melalui Dashboard Admin.
                </div>
              ) : (
                activeAlbum.photos.map((ph, idx) => (
                  <div key={idx} className="border-2 border-black aspect-square overflow-hidden bg-neutral-100 group relative">
                    <img src={ph} alt={`Dokumentasi ${idx + 1}`} className="w-full h-full object-cover transition-all grayscale hover:grayscale-0 duration-300" />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
