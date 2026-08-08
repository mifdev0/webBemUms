import React from 'react';
import { Phone, Mail, MapPin, Share2 } from 'lucide-react';

export default function HubungiKami({ db }) {
  const contact = db.contact || {};

  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b-4 border-black pb-6">
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tight leading-none">HUBUNGI KAMI</h1>
          <p className="text-sm font-body uppercase tracking-wider text-secondary mt-2">
            Saluran Resmi Hubungan Masyarakat BEM UMS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 4 Service boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Box 1: WhatsApp */}
            <div className="bg-white border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[160px]">
              <div>
                <div className="w-10 h-10 rounded-none bg-emerald-100 border-2 border-black flex items-center justify-center mb-3">
                  <Phone className="text-emerald-700" size={20} />
                </div>
                <h3 className="font-display uppercase text-lg">WhatsApp Admin</h3>
                <p className="text-xs text-secondary font-body mt-1">Konsultasi cepat atau pertanyaan seputar BEM UMS.</p>
              </div>
              <a 
                href={contact.whatsapp} 
                target="_blank" 
                rel="noreferrer" 
                className="mt-4 inline-block text-center neo-btn text-xs py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                KIRIM PESAN
              </a>
            </div>

            {/* Box 2: Email */}
            <div className="bg-white border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[160px]">
              <div>
                <div className="w-10 h-10 rounded-none bg-blue-100 border-2 border-black flex items-center justify-center mb-3">
                  <Mail className="text-blue-700" size={20} />
                </div>
                <h3 className="font-display uppercase text-lg">Surel Resmi</h3>
                <p className="text-xs text-secondary font-body mt-1">Untuk keperluan persuratan, kemitraan, dan proposal formal.</p>
              </div>
              <a 
                href={`mailto:${contact.email}`} 
                className="mt-4 inline-block text-center neo-btn text-xs py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                KIRIM EMAIL
              </a>
            </div>

            {/* Box 3: Social Media */}
            <div className="bg-white border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[160px] sm:col-span-2">
              <div>
                <div className="w-10 h-10 rounded-none bg-purple-100 border-2 border-black flex items-center justify-center mb-3">
                  <Share2 className="text-purple-700" size={20} />
                </div>
                <h3 className="font-display uppercase text-lg">Instagram & TikTok</h3>
                <p className="text-xs text-secondary font-body mt-1">Rilis publikasi konten infografis harian, kegiatan, dan live update agenda kampus.</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <a 
                  href={contact.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-center neo-btn text-xs py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold"
                >
                  INSTAGRAM
                </a>
                <a 
                  href={contact.tiktok} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-center neo-btn text-xs py-2 bg-black hover:bg-neutral-900 text-white border-2 border-neutral-700 font-bold"
                >
                  TIKTOK
                </a>
              </div>
            </div>
          </div>

          {/* Address Box */}
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-none bg-red-100 border-2 border-black flex items-center justify-center mb-4">
                <MapPin className="text-red-700" size={24} />
              </div>
              <h3 className="font-display uppercase text-2xl tracking-tight mb-3">SEKRETARIAT BEM UMS</h3>
              <p className="text-sm text-secondary font-body leading-relaxed mb-6">
                {contact.address}
              </p>
            </div>
            
            {/* Map Placeholder Graphic (Neo-Brutalist flat styling) */}
            <div className="border-3 border-black h-48 bg-neutral-200 flex flex-col items-center justify-center text-center p-4">
              <span className="font-display uppercase text-sm tracking-widest text-neutral-600">PETA PABELAN UMS</span>
              <span className="font-body text-[10px] text-secondary mt-1">Gedung SC UMS Lantai 2</span>
              <div className="w-16 h-1 bg-primary mt-2"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
