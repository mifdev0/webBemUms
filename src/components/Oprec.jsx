import React, { useState } from 'react';

export default function Oprec({ db, onUpdateDB }) {
  const oprec = db.oprec || {};
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    email: '',
    faculty: '',
    choice1: '',
    choice2: '',
    cvLink: '',
    reason: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Available Ministries
  const kementerians = db.kementerian[db.currentPeriod] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!oprec.isOpen) {
      alert('Pendaftaran saat ini sedang ditutup.');
      return;
    }
    if (!formData.name || !formData.nim || !formData.faculty || !formData.choice1) {
      alert('Harap isi field wajib (*).');
      return;
    }

    const updatedApplicants = [...(oprec.applicants || []), { ...formData, id: Date.now() }];
    const updatedOprec = { ...oprec, applicants: updatedApplicants };
    
    onUpdateDB({ ...db, oprec: updatedOprec });
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Status Recrutiment Tag */}
        <div className="flex justify-center mb-6">
          <span className={`px-4 py-2 font-display text-sm border-3 border-black uppercase tracking-wider ${
            oprec.isOpen ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
          }`}>
            REKRUTMEN {oprec.isOpen ? 'DIBUKA' : 'DITUTUP'}
          </span>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 border-b-4 border-black pb-8 mb-8">
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight leading-none">
            {oprec.title}
          </h1>
          <p className="text-sm font-body text-secondary max-w-2xl mx-auto leading-relaxed">
            {oprec.desc}
          </p>
        </div>

        {submitted ? (
          <div className="bg-white border-4 border-black p-8 text-center space-y-4 shadow-[8px_8px_0px_0px_#000]">
            <span className="material-symbols-outlined text-6xl text-emerald-600">check_circle</span>
            <h2 className="text-3xl font-display uppercase">Pendaftaran Terkirim!</h2>
            <p className="text-sm font-body text-secondary max-w-md mx-auto">
              Terima kasih telah mendaftar di BEM UMS. Data Anda telah masuk ke database kami. Silakan pantau pengumuman selanjutnya di Instagram resmi BEM UMS.
            </p>
            <button 
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '', nim: '', email: '', faculty: '', choice1: '', choice2: '', cvLink: '', reason: ''
                });
              }}
              className="neo-btn px-6 py-2 text-xs"
            >
              DAFTAR LAGI
            </button>
          </div>
        ) : (
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_#000]">
            {!oprec.isOpen ? (
              <div className="text-center py-8 space-y-3">
                <span className="material-symbols-outlined text-5xl text-red-600">lock</span>
                <h3 className="text-2xl font-display uppercase">Pendaftaran Ditutup</h3>
                <p className="text-sm text-secondary font-body">
                  Maaf, saat ini masa pendaftaran jajaran struktural belum dibuka atau sudah berakhir. Hubungi Humas untuk informasi lebih lanjut.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-display uppercase border-b border-black pb-2">Formulir Data Diri & Preferensi</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase">Nama Lengkap *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Contoh: Budi Gunawan"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="neo-input text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase">NIM Mahasiswa *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Contoh: L200230001"
                      value={formData.nim}
                      onChange={e => setFormData({ ...formData, nim: e.target.value })}
                      className="neo-input text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase">Surat Elektronik (Email) *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="Contoh: budi@student.ums.ac.id"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="neo-input text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase">Fakultas / Program Studi *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Contoh: FKI / Teknik Informatika"
                      value={formData.faculty}
                      onChange={e => setFormData({ ...formData, faculty: e.target.value })}
                      className="neo-input text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase">Pilihan Kementerian 1 *</label>
                    <select 
                      required
                      value={formData.choice1}
                      onChange={e => setFormData({ ...formData, choice1: e.target.value })}
                      className="neo-input text-sm bg-white"
                    >
                      <option value="">-- Pilih Kementerian --</option>
                      {kementerians.map(k => (
                        <option key={k.id} value={k.name}>{k.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase">Pilihan Kementerian 2 (Opsional)</label>
                    <select 
                      value={formData.choice2}
                      onChange={e => setFormData({ ...formData, choice2: e.target.value })}
                      className="neo-input text-sm bg-white"
                    >
                      <option value="">-- Pilih Kementerian --</option>
                      {kementerians.map(k => (
                        <option key={k.id} value={k.name}>{k.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-bold uppercase">Tautan Link CV / Berkas Pendukung *</label>
                    <input 
                      type="url" 
                      required
                      placeholder="Contoh: https://drive.google.com/drive/..."
                      value={formData.cvLink}
                      onChange={e => setFormData({ ...formData, cvLink: e.target.value })}
                      className="neo-input text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-bold uppercase">Alasan Bergabung & Motivasi</label>
                    <textarea 
                      placeholder="Tuliskan motivasi singkat Anda bergabung dengan jajaran BEM UMS..."
                      value={formData.reason}
                      onChange={e => setFormData({ ...formData, reason: e.target.value })}
                      className="neo-input text-sm h-28"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-black">
                  <button type="submit" className="w-full neo-btn text-base py-4">
                    DAFTAR SEKARANG
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
