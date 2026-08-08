import React, { useState } from 'react';

export default function Volunteer({ db, onUpdateDB }) {
  const [selectedVol, setSelectedVol] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    email: '',
    faculty: '',
    commitment: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const catalog = db.volunteerCatalog || [];

  const handleSignup = (e) => {
    e.preventDefault();
    if (!selectedVol) return;
    if (!formData.name || !formData.nim || !formData.commitment) {
      alert('Harap isi Nama, NIM, dan Komitmen Anda.');
      return;
    }

    const updatedCatalog = catalog.map(v => {
      if (v.id === selectedVol.id) {
        const applicants = v.applicants || [];
        return {
          ...v,
          applicants: [...applicants, { ...formData, id: Date.now() }]
        };
      }
      return v;
    });

    onUpdateDB({ ...db, volunteerCatalog: updatedCatalog });
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b-4 border-black pb-6">
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tight leading-none">JADILAH VOLUNTEER</h1>
          <p className="text-sm font-body uppercase tracking-wider text-secondary mt-2">
            Salurkan Kepedulian Sosial & Kontribusi Nyata Bersama Komunitas Relawan BEM UMS
          </p>
        </div>

        {/* Catalog list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {catalog.map(v => (
            <div 
              key={v.id} 
              className="bg-white border-4 border-black p-6 relative flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              {/* Status Recruitment Ribbon (Pita solid "DIBUKA") */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 font-display text-xs border-2 border-black uppercase tracking-wider ${
                  v.isOpen ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {v.isOpen ? 'DIBUKA' : 'DITUTUP'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-body text-secondary uppercase font-bold tracking-widest block mb-1">
                  JADWAL: {v.schedule}
                </span>
                <h3 className="text-2xl font-display uppercase tracking-tight mb-4 border-b border-neutral-300 pb-2 pr-20">
                  {v.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-primary">Syarat & Ketentuan:</h4>
                    <p className="text-xs font-body text-secondary leading-relaxed">{v.requirements}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-primary">Deskripsi Tugas (Job Desc):</h4>
                    <p className="text-xs font-body text-secondary leading-relaxed">{v.jobdesc}</p>
                  </div>
                </div>
              </div>

              <div>
                {v.isOpen ? (
                  <button 
                    onClick={() => {
                      setSelectedVol(v);
                      setSubmitted(false);
                      setFormData({ name: '', nim: '', email: '', faculty: '', commitment: '' });
                    }}
                    className="w-full neo-btn text-xs py-3"
                  >
                    DAFTAR VOLUNTEER
                  </button>
                ) : (
                  <button 
                    disabled 
                    className="w-full border-3 border-neutral-400 text-neutral-400 font-display text-xs py-3 uppercase tracking-wider cursor-not-allowed bg-neutral-100"
                  >
                    PENDAFTARAN DITUTUP
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal/Overlay Form Pendaftaran */}
        {selectedVol && (
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto space-y-6">
            <div className="flex justify-between items-start border-b-2 border-black pb-4">
              <div>
                <span className="bg-black text-white text-[10px] font-display uppercase tracking-widest px-3 py-1">
                  FORMULIR VOLUNTEER
                </span>
                <h3 className="text-2xl font-display uppercase tracking-tight mt-2">{selectedVol.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedVol(null)}
                className="border-2 border-black px-2.5 py-0.5 hover:bg-neutral-100 font-bold"
              >
                BATAL [×]
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <span className="material-symbols-outlined text-5xl text-emerald-600">volunteer_activism</span>
                <h4 className="text-2xl font-display uppercase">Pendaftaran Sukses!</h4>
                <p className="text-xs text-secondary font-body leading-relaxed max-w-sm mx-auto">
                  Terima kasih atas kontribusi Anda! Data diri Anda telah masuk ke katalog relawan BEM UMS. Koordinator kegiatan akan menghubungi Anda segera.
                </p>
                <button onClick={() => setSelectedVol(null)} className="neo-btn px-6 py-2 text-xs">TUTUP</button>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase">Nama Lengkap *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Masukkan nama lengkap" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="neo-input text-xs" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase">NIM Mahasiswa *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Masukkan NIM" 
                      value={formData.nim}
                      onChange={e => setFormData({ ...formData, nim: e.target.value })}
                      className="neo-input text-xs" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase">Email *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="Contoh: relawan@student.ums.ac.id" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="neo-input text-xs" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase">Fakultas / Program Studi *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Contoh: FKI / Informatika" 
                      value={formData.faculty}
                      onChange={e => setFormData({ ...formData, faculty: e.target.value })}
                      className="neo-input text-xs" 
                    />
                  </div>
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase">Komitmen Relawan (Pernyataan Singkat) *</label>
                    <textarea 
                      required 
                      rows={3} 
                      placeholder="Saya bersedia mengikuti alur pelaksanaan program dan bertugas dengan penuh tanggung jawab..." 
                      value={formData.commitment}
                      onChange={e => setFormData({ ...formData, commitment: e.target.value })}
                      className="neo-input text-xs h-20 resize-none" 
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-black">
                  <button type="submit" className="w-full neo-btn text-xs py-3.5 bg-black hover:bg-neutral-900 border-3 text-white">
                    KIRIM PENDAFTARAN KOMITMEN
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
