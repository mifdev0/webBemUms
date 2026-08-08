import React, { useState } from 'react';

export default function Artikel({ db }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = db.categories || ["Semua"];
  const articles = db.articles || [];

  // Filter articles based on selected label/category
  const filteredArticles = selectedCategory === 'Semua' 
    ? articles 
    : articles.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b-4 border-black pb-6">
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tight leading-none">ARTIKEL & KEGIATAN</h1>
          <p className="text-sm font-body uppercase tracking-wider text-secondary mt-2">
            Ikuti Rilis Berita, Opini, dan Dokumentasi Kegiatan Resmi BEM UMS
          </p>
        </div>

        {/* Filter Category Chips (Minimalist) */}
        <div className="flex flex-wrap gap-2.5">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-2 font-display text-xs uppercase border-3 border-black transition-all ${
                selectedCategory === c 
                  ? 'bg-black text-white translate-x-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' 
                  : 'bg-white text-black hover:bg-neutral-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Articles Grid (Flat Design) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {filteredArticles.length === 0 ? (
            <div className="col-span-full py-12 text-center border-4 border-dashed border-neutral-400">
              <p className="text-secondary italic">Belum ada artikel yang dipublikasikan dalam kategori ini.</p>
            </div>
          ) : (
            filteredArticles.map(a => (
              <article 
                key={a.id} 
                className="bg-white border-4 border-black flex flex-col justify-between hover:translate-x-1 hover:-translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  {/* Thumbnail on top */}
                  <div className="relative aspect-[16/10] border-b-4 border-black bg-neutral-200 overflow-hidden">
                    {a.thumbnail ? (
                      <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display text-xs text-secondary p-4 text-center">
                        NO IMAGE THUMBNAIL
                      </div>
                    )}
                    
                    {/* Contrast category block label */}
                    <div className="absolute top-3 left-3 bg-black text-white px-2.5 py-1 text-[10px] font-display uppercase tracking-wider border border-white">
                      {a.category}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-body text-secondary uppercase font-bold">{a.date}</span>
                    <h3 className="text-xl font-display uppercase leading-tight text-black font-extrabold line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="text-xs font-body text-secondary leading-relaxed line-clamp-3">
                      {a.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button className="w-full neo-btn text-xs py-2 bg-neutral-100 text-black hover:bg-neutral-200 border-2 shadow-[2px_2px_0px_0px_#000] active:translate-y-1">
                    BACA SELENGKAPNYA
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
