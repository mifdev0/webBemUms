import React, { useState } from 'react';
import { 
  Users, FileText, Image, Phone, UserCheck, AlertTriangle, 
  Settings, Layers, Plus, Trash2, Edit3, Check, X, Download 
} from 'lucide-react';

export default function AdminCMS({ db, onUpdateDB }) {
  const [activeTab, setActiveTab] = useState('struktural');

  // --- State for Forms ---
  // Period Form
  const [newPeriod, setNewPeriod] = useState('');
  
  // Member Form
  const [selectedPeriod, setSelectedPeriod] = useState(db.currentPeriod);
  const [memberForm, setMemberForm] = useState({ id: null, name: '', role: '', photo: '', bio: '' });
  const [isEditingMember, setIsEditingMember] = useState(false);

  // Department Form
  const [deptForm, setDeptForm] = useState({ id: null, name: '', desc: '', members: [] });
  const [isEditingDept, setIsEditingDept] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberTitle, setNewMemberTitle] = useState('');

  // Article Form
  const [articleForm, setArticleForm] = useState({ id: null, title: '', category: 'Berita', date: '', thumbnail: '', desc: '' });
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  // Album Form
  const [albumForm, setAlbumForm] = useState({ id: null, title: '', date: '', desc: '', photos: [] });
  const [isEditingAlbum, setIsEditingAlbum] = useState(false);
  const [tempPhotoUrl, setTempPhotoUrl] = useState('');

  // Contact Form
  const [contactForm, setContactForm] = useState({ ...db.contact });

  // Oprec Form
  const [oprecTitle, setOprecTitle] = useState(db.oprec.title);
  const [oprecDesc, setOprecDesc] = useState(db.oprec.desc);
  const [oprecIsOpen, setOprecIsOpen] = useState(db.oprec.isOpen);

  // Lapor Pres
  const [laporDesc, setLaporDesc] = useState(db.laporDescription);

  // Volunteer Catalog Form
  const [volForm, setVolForm] = useState({ id: null, title: '', isOpen: true, requirements: '', jobdesc: '', schedule: '' });
  const [isEditingVol, setIsEditingVol] = useState(false);

  // Visi Misi Form
  const [visiMisiForm, setVisiMisiForm] = useState({
    visi: db.visiMisi.visi,
    desc: db.visiMisi.desc,
    misi: [...db.visiMisi.misi],
    pillars: [...db.visiMisi.pillars]
  });
  const [newMisiText, setNewMisiText] = useState('');

  // Save changes wrapper
  const save = (updatedData) => {
    onUpdateDB({ ...db, ...updatedData });
    alert('Perubahan berhasil disimpan!');
  };

  // --- Handler Functions ---
  // Period Handlers
  const handleAddPeriod = () => {
    if (!newPeriod.trim()) return;
    if (db.periods.includes(newPeriod.trim())) {
      alert('Periode tahun sudah ada!');
      return;
    }
    const updated = {
      periods: [newPeriod.trim(), ...db.periods],
      pimpinan: { ...db.pimpinan, [newPeriod.trim()]: [] },
      kementerian: { ...db.kementerian, [newPeriod.trim()]: [] }
    };
    onUpdateDB({ ...db, ...updated });
    setNewPeriod('');
  };

  // Pimpinan / Member Handlers
  const handleSaveMember = () => {
    const list = db.pimpinan[selectedPeriod] || [];
    let updatedList;
    if (isEditingMember) {
      updatedList = list.map(m => m.id === memberForm.id ? { ...memberForm } : m);
    } else {
      updatedList = [...list, { ...memberForm, id: Date.now() }];
    }
    const updatedPimpinan = { ...db.pimpinan, [selectedPeriod]: updatedList };
    onUpdateDB({ ...db, pimpinan: updatedPimpinan });
    setMemberForm({ id: null, name: '', role: '', photo: '', bio: '' });
    setIsEditingMember(false);
  };

  const handleEditMember = (m) => {
    setMemberForm(m);
    setIsEditingMember(true);
  };

  const handleDeleteMember = (id) => {
    if(!confirm('Hapus profil pimpinan ini?')) return;
    const list = db.pimpinan[selectedPeriod] || [];
    const updatedPimpinan = { ...db.pimpinan, [selectedPeriod]: list.filter(m => m.id !== id) };
    onUpdateDB({ ...db, pimpinan: updatedPimpinan });
  };

  // Department Handlers
  const handleSaveDept = () => {
    const list = db.kementerian[selectedPeriod] || [];
    let updatedList;
    if (isEditingDept) {
      updatedList = list.map(d => d.id === deptForm.id ? { ...deptForm } : d);
    } else {
      updatedList = [...list, { ...deptForm, id: Date.now() }];
    }
    const updatedKementerian = { ...db.kementerian, [selectedPeriod]: updatedList };
    onUpdateDB({ ...db, kementerian: updatedKementerian });
    setDeptForm({ id: null, name: '', desc: '', members: [] });
    setIsEditingDept(false);
  };

  const handleAddMemberToDept = () => {
    if (!newMemberName.trim()) return;
    const updatedMembers = [...deptForm.members, { name: newMemberName.trim(), title: newMemberTitle.trim() || 'Anggota' }];
    setDeptForm({ ...deptForm, members: updatedMembers });
    setNewMemberName('');
    setNewMemberTitle('');
  };

  const handleRemoveMemberFromDept = (idx) => {
    const updatedMembers = deptForm.members.filter((_, i) => i !== idx);
    setDeptForm({ ...deptForm, members: updatedMembers });
  };

  const handleDeleteDept = (id) => {
    if(!confirm('Hapus kementerian ini beserta anggotanya?')) return;
    const list = db.kementerian[selectedPeriod] || [];
    const updatedKementerian = { ...db.kementerian, [selectedPeriod]: list.filter(d => d.id !== id) };
    onUpdateDB({ ...db, kementerian: updatedKementerian });
  };

  // Article Handlers
  const handleSaveArticle = () => {
    let updatedList;
    if (isEditingArticle) {
      updatedList = db.articles.map(a => a.id === articleForm.id ? { ...articleForm } : a);
    } else {
      updatedList = [...db.articles, { ...articleForm, id: Date.now() }];
    }
    onUpdateDB({ ...db, articles: updatedList });
    setArticleForm({ id: null, title: '', category: 'Berita', date: '', thumbnail: '', desc: '' });
    setIsEditingArticle(false);
  };

  const handleDeleteArticle = (id) => {
    if(!confirm('Hapus artikel ini?')) return;
    onUpdateDB({ ...db, articles: db.articles.filter(a => a.id !== id) });
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    if (db.categories.includes(newCategory.trim())) return;
    onUpdateDB({ ...db, categories: [...db.categories, newCategory.trim()] });
    setNewCategory('');
  };

  // Album Handlers
  const handleSaveAlbum = () => {
    let updatedList;
    if (isEditingAlbum) {
      updatedList = db.albums.map(a => a.id === albumForm.id ? { ...albumForm } : a);
    } else {
      updatedList = [...db.albums, { ...albumForm, id: Date.now() }];
    }
    onUpdateDB({ ...db, albums: updatedList });
    setAlbumForm({ id: null, title: '', date: '', desc: '', photos: [] });
    setIsEditingAlbum(false);
  };

  const handleAddPhotoToAlbum = () => {
    if (!tempPhotoUrl.trim()) return;
    setAlbumForm({ ...albumForm, photos: [...albumForm.photos, tempPhotoUrl.trim()] });
    setTempPhotoUrl('');
  };

  const handleDeleteAlbum = (id) => {
    if(!confirm('Hapus album ini?')) return;
    onUpdateDB({ ...db, albums: db.albums.filter(a => a.id !== id) });
  };

  // Volunteer Handlers
  const handleSaveVol = () => {
    let updatedList;
    if (isEditingVol) {
      updatedList = db.volunteerCatalog.map(v => v.id === volForm.id ? { ...volForm } : v);
    } else {
      updatedList = [...db.volunteerCatalog, { ...volForm, id: Date.now(), applicants: [] }];
    }
    onUpdateDB({ ...db, volunteerCatalog: updatedList });
    setVolForm({ id: null, title: '', isOpen: true, requirements: '', jobdesc: '', schedule: '' });
    setIsEditingVol(false);
  };

  const handleDeleteVol = (id) => {
    if(!confirm('Hapus katalog volunteer ini?')) return;
    onUpdateDB({ ...db, volunteerCatalog: db.volunteerCatalog.filter(v => v.id !== id) });
  };

  // Export JSON (for backup/rekap)
  const downloadJSON = (data, filename) => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-6 md:px-12">
      {/* Newspaper style header */}
      <div className="max-w-7xl mx-auto mb-10 heading-koran pb-4">
        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight">DASHBOARD ADMIN BEM UMS</h1>
        <p className="text-sm font-body uppercase tracking-wider text-secondary">
          ARSITEKTUR DYNAMIC CMS & LOG ASPIRASI MAHASISWA — KABINET 2026
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-2">
          {[
            { id: 'struktural', name: '1. Struktural', icon: Users },
            { id: 'artikel', name: '2. Artikel & Berita', icon: FileText },
            { id: 'dokumentasi', name: '3. Dokumentasi', icon: Image },
            { id: 'hubungi', name: '4. Hubungi Kami', icon: Phone },
            { id: 'oprec', name: '5. Oprec (Gabung)', icon: UserCheck },
            { id: 'lapor', name: '6. Lapor Pres!', icon: AlertTriangle },
            { id: 'volunteer', name: '7. Volunteer', icon: Layers },
            { id: 'visimisi', name: '8. Visi & Misi', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 p-4 font-display uppercase tracking-wider text-left border-3 border-black text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-white translate-x-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                  : 'bg-white text-black hover:bg-neutral-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="col-span-12 lg:col-span-9 bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          
          {/* TAB 1: STRUKTURAL */}
          {activeTab === 'struktural' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display uppercase border-b-2 border-black pb-2">Manajemen Struktural Organisasi</h2>
              
              {/* Year/Period Control */}
              <div className="p-4 bg-neutral-50 border-2 border-black">
                <h3 className="font-display uppercase mb-2">Periode Tahun</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {db.periods.map(p => (
                    <span 
                      key={p} 
                      onClick={() => setSelectedPeriod(p)}
                      className={`px-3 py-1 font-body text-sm font-bold border-2 border-black cursor-pointer ${
                        selectedPeriod === p ? 'bg-primary text-white' : 'bg-white text-black'
                      }`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 max-w-sm">
                  <input 
                    type="text" 
                    placeholder="Tambah Periode Baru (Contoh: 2027)" 
                    value={newPeriod}
                    onChange={e => setNewPeriod(e.target.value)}
                    className="neo-input flex-1 py-1 px-3 text-sm"
                  />
                  <button onClick={handleAddPeriod} className="neo-btn px-4 py-1 text-xs">Tambah</button>
                </div>
              </div>

              {/* Jajaran Pimpinan */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-display text-xl uppercase">1. Jajaran Pimpinan ({selectedPeriod})</h3>
                  <button 
                    onClick={() => {
                      setIsEditingMember(false);
                      setMemberForm({ id: null, name: '', role: '', photo: '', bio: '' });
                    }} 
                    className="neo-btn-secondary px-3 py-1 text-xs"
                  >
                    Tambah Pimpinan
                  </button>
                </div>

                {/* Form Pimpinan */}
                {(memberForm.id !== null || isEditingMember || memberForm.name !== '') && (
                  <div className="p-4 border-2 border-black space-y-3 bg-neutral-50">
                    <h4 className="font-display text-sm uppercase">{isEditingMember ? 'Edit Pimpinan' : 'Tambah Pimpinan Baru'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="Nama Lengkap" 
                        value={memberForm.name} 
                        onChange={e => setMemberForm({ ...memberForm, name: e.target.value })}
                        className="neo-input text-sm"
                      />
                      <input 
                        type="text" 
                        placeholder="Jabatan (Contoh: Ketua Umum)" 
                        value={memberForm.role} 
                        onChange={e => setMemberForm({ ...memberForm, role: e.target.value })}
                        className="neo-input text-sm"
                      />
                      <input 
                        type="text" 
                        placeholder="URL Foto Profil (Opsional)" 
                        value={memberForm.photo} 
                        onChange={e => setMemberForm({ ...memberForm, photo: e.target.value })}
                        className="neo-input text-sm md:col-span-2"
                      />
                      <textarea 
                        placeholder="Bio singkat" 
                        value={memberForm.bio} 
                        onChange={e => setMemberForm({ ...memberForm, bio: e.target.value })}
                        className="neo-input text-sm md:col-span-2 h-20"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleSaveMember} className="neo-btn px-4 py-2 text-xs">Simpan</button>
                      <button 
                        onClick={() => setMemberForm({ id: null, name: '', role: '', photo: '', bio: '' })} 
                        className="neo-btn-secondary px-4 py-2 text-xs"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                )}

                {/* List Pimpinan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(db.pimpinan[selectedPeriod] || []).map(m => (
                    <div key={m.id} className="p-4 border-2 border-black bg-white flex justify-between items-start">
                      <div>
                        <h4 className="font-display uppercase text-lg">{m.name}</h4>
                        <p className="text-xs font-bold text-primary mb-1">{m.role}</p>
                        <p className="text-xs text-secondary">{m.bio}</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => handleEditMember(m)} className="p-1 hover:text-primary"><Edit3 size={16} /></button>
                        <button onClick={() => handleDeleteMember(m.id)} className="p-1 hover:text-red-600"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Jajaran Kementerian */}
              <div className="space-y-4 pt-4 border-t-2 border-black">
                <div className="flex justify-between items-center">
                  <h3 className="font-display text-xl uppercase">2. Kementerian ({selectedPeriod})</h3>
                  <button 
                    onClick={() => {
                      setIsEditingDept(false);
                      setDeptForm({ id: null, name: '', desc: '', members: [] });
                    }} 
                    className="neo-btn-secondary px-3 py-1 text-xs"
                  >
                    Tambah Kementerian
                  </button>
                </div>

                {/* Form Kementerian */}
                {(deptForm.id !== null || isEditingDept || deptForm.name !== '') && (
                  <div className="p-4 border-2 border-black space-y-3 bg-neutral-50">
                    <h4 className="font-display text-sm uppercase">{isEditingDept ? 'Edit Kementerian' : 'Tambah Kementerian Baru'}</h4>
                    <div className="space-y-3">
                      <input 
                        type="text" 
                        placeholder="Nama Kementerian" 
                        value={deptForm.name} 
                        onChange={e => setDeptForm({ ...deptForm, name: e.target.value })}
                        className="neo-input w-full text-sm"
                      />
                      <textarea 
                        placeholder="Deskripsi Tugas & Fungsi" 
                        value={deptForm.desc} 
                        onChange={e => setDeptForm({ ...deptForm, desc: e.target.value })}
                        className="neo-input w-full text-sm h-20"
                      />
                      
                      {/* Sub Form Add Members to Dept */}
                      <div className="p-3 border border-black bg-white space-y-2">
                        <h5 className="font-display text-xs uppercase">Anggota Jajaran Kementerian</h5>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {deptForm.members.map((member, i) => (
                            <span key={i} className="inline-flex items-center gap-1 bg-neutral-100 border border-black text-xs px-2 py-0.5">
                              {member.name} ({member.title})
                              <button onClick={() => handleRemoveMemberFromDept(i)} className="hover:text-red-600 font-bold">×</button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Nama Jajaran" 
                            value={newMemberName} 
                            onChange={e => setNewMemberName(e.target.value)}
                            className="neo-input text-xs flex-1"
                          />
                          <input 
                            type="text" 
                            placeholder="Jabatan (cth: Dirjen)" 
                            value={newMemberTitle} 
                            onChange={e => setNewMemberTitle(e.target.value)}
                            className="neo-input text-xs w-32"
                          />
                          <button onClick={handleAddMemberToDept} className="neo-btn px-3 py-1 text-xs">Tambah</button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={handleSaveDept} className="neo-btn px-4 py-2 text-xs">Simpan</button>
                      <button 
                        onClick={() => setDeptForm({ id: null, name: '', desc: '', members: [] })} 
                        className="neo-btn-secondary px-4 py-2 text-xs"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                )}

                {/* List Kementerian */}
                <div className="space-y-3">
                  {(db.kementerian[selectedPeriod] || []).map(d => (
                    <div key={d.id} className="p-4 border-2 border-black bg-white flex justify-between items-start">
                      <div>
                        <h4 className="font-display uppercase text-lg">{d.name}</h4>
                        <p className="text-xs text-secondary mb-2">{d.desc}</p>
                        <p className="text-xs font-bold uppercase text-primary">Anggota ({d.members.length}):</p>
                        <div className="text-xs text-neutral-600 flex flex-wrap gap-2 mt-1">
                          {d.members.map((m, idx) => (
                            <span key={idx} className="bg-neutral-50 px-2 py-0.5 border border-neutral-300">{m.name} ({m.title})</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => {
                            setDeptForm(d);
                            setIsEditingDept(true);
                          }} 
                          className="p-1 hover:text-primary"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => handleDeleteDept(d.id)} className="p-1 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTIKEL */}
          {activeTab === 'artikel' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display uppercase border-b-2 border-black pb-2">Manajemen Artikel & Kegiatan</h2>
              
              {/* Category label setup */}
              <div className="p-4 bg-neutral-50 border-2 border-black">
                <h3 className="font-display uppercase mb-2">Kategori Label</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {db.categories.map(c => (
                    <span key={c} className="bg-black text-white text-xs uppercase px-3 py-1 font-bold border border-black">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 max-w-sm">
                  <input 
                    type="text" 
                    placeholder="Kategori Baru" 
                    value={newCategory} 
                    onChange={e => setNewCategory(e.target.value)}
                    className="neo-input text-xs flex-1 py-1"
                  />
                  <button onClick={handleAddCategory} className="neo-btn px-4 py-1 text-xs">Tambah</button>
                </div>
              </div>

              {/* Form Artikel */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-display text-xl uppercase">Daftar Artikel</h3>
                  <button 
                    onClick={() => {
                      setIsEditingArticle(false);
                      setArticleForm({ id: null, title: '', category: 'Berita', date: '', thumbnail: '', desc: '' });
                    }} 
                    className="neo-btn-secondary px-3 py-1 text-xs"
                  >
                    Tulis Artikel Baru
                  </button>
                </div>

                {(articleForm.id !== null || isEditingArticle || articleForm.title !== '') && (
                  <div className="p-4 border-2 border-black bg-neutral-50 space-y-3">
                    <h4 className="font-display text-sm uppercase">{isEditingArticle ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="Judul Artikel" 
                        value={articleForm.title}
                        onChange={e => setArticleForm({ ...articleForm, title: e.target.value })}
                        className="neo-input text-sm md:col-span-2"
                      />
                      <select 
                        value={articleForm.category}
                        onChange={e => setArticleForm({ ...articleForm, category: e.target.value })}
                        className="neo-input text-sm bg-white"
                      >
                        {db.categories.filter(c => c !== 'Semua').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <input 
                        type="date" 
                        value={articleForm.date}
                        onChange={e => setArticleForm({ ...articleForm, date: e.target.value })}
                        className="neo-input text-sm"
                      />
                      <input 
                        type="text" 
                        placeholder="URL Gambar Thumbnail" 
                        value={articleForm.thumbnail}
                        onChange={e => setArticleForm({ ...articleForm, thumbnail: e.target.value })}
                        className="neo-input text-sm md:col-span-2"
                      />
                      <textarea 
                        placeholder="Konten deskripsi artikel..." 
                        value={articleForm.desc}
                        onChange={e => setArticleForm({ ...articleForm, desc: e.target.value })}
                        className="neo-input text-sm md:col-span-2 h-32"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleSaveArticle} className="neo-btn px-4 py-2 text-xs">Simpan Artikel</button>
                      <button 
                        onClick={() => setArticleForm({ id: null, title: '', category: 'Berita', date: '', thumbnail: '', desc: '' })} 
                        className="neo-btn-secondary px-4 py-2 text-xs"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                )}

                {/* List Artikel */}
                <div className="space-y-3">
                  {db.articles.map(a => (
                    <div key={a.id} className="p-4 border-2 border-black bg-white flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-black text-white px-2 py-0.5 text-[10px] uppercase font-bold">{a.category}</span>
                          <span className="text-xs text-neutral-500">{a.date}</span>
                        </div>
                        <h4 className="font-display text-lg uppercase">{a.title}</h4>
                        <p className="text-xs text-neutral-600 line-clamp-2">{a.desc}</p>
                      </div>
                      <div className="flex gap-1 ml-4">
                        <button 
                          onClick={() => {
                            setArticleForm(a);
                            setIsEditingArticle(true);
                          }} 
                          className="p-2 hover:text-primary"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => handleDeleteArticle(a.id)} className="p-2 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DOKUMENTASI */}
          {activeTab === 'dokumentasi' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display uppercase border-b-2 border-black pb-2">Manajemen Galeri Dokumentasi</h2>
              
              <div className="flex justify-between items-center">
                <h3 className="font-display text-xl uppercase">Album Kegiatan</h3>
                <button 
                  onClick={() => {
                    setIsEditingAlbum(false);
                    setAlbumForm({ id: null, title: '', date: '', desc: '', photos: [] });
                  }} 
                  className="neo-btn-secondary px-3 py-1 text-xs"
                >
                  Buat Album Baru
                </button>
              </div>

              {/* Form Album */}
              {(albumForm.id !== null || isEditingAlbum || albumForm.title !== '') && (
                <div className="p-4 border-2 border-black bg-neutral-50 space-y-3">
                  <h4 className="font-display text-sm uppercase">{isEditingAlbum ? 'Edit Album' : 'Buat Album Baru'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Nama Kegiatan (Cth: PKKMB 2026)" 
                      value={albumForm.title}
                      onChange={e => setAlbumForm({ ...albumForm, title: e.target.value })}
                      className="neo-input text-sm"
                    />
                    <input 
                      type="date" 
                      value={albumForm.date}
                      onChange={e => setAlbumForm({ ...albumForm, date: e.target.value })}
                      className="neo-input text-sm"
                    />
                    <textarea 
                      placeholder="Deskripsi Album/Kegiatan" 
                      value={albumForm.desc}
                      onChange={e => setAlbumForm({ ...albumForm, desc: e.target.value })}
                      className="neo-input text-sm md:col-span-2 h-20"
                    />

                    {/* Photo upload subform */}
                    <div className="p-3 border border-black bg-white md:col-span-2 space-y-2">
                      <h5 className="font-display text-xs uppercase">Unggah Multi-Foto (URL)</h5>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {albumForm.photos.map((ph, idx) => (
                          <div key={idx} className="relative w-16 h-16 border border-black bg-neutral-100 flex items-center justify-center text-[10px] text-center font-bold">
                            Foto {idx + 1}
                            <button 
                              onClick={() => {
                                const up = albumForm.photos.filter((_, i) => i !== idx);
                                setAlbumForm({ ...albumForm, photos: up });
                              }} 
                              className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Masukkan URL Foto" 
                          value={tempPhotoUrl}
                          onChange={e => setTempPhotoUrl(e.target.value)}
                          className="neo-input text-xs flex-1"
                        />
                        <button onClick={handleAddPhotoToAlbum} className="neo-btn px-3 py-1 text-xs">Tambahkan Foto</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={handleSaveAlbum} className="neo-btn px-4 py-2 text-xs">Simpan Album</button>
                    <button 
                      onClick={() => setAlbumForm({ id: null, title: '', date: '', desc: '', photos: [] })} 
                      className="neo-btn-secondary px-4 py-2 text-xs"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

              {/* List Albums */}
              <div className="space-y-4">
                {db.albums.map(a => (
                  <div key={a.id} className="p-4 border-2 border-black bg-white flex justify-between items-start">
                    <div>
                      <h4 className="font-display text-lg uppercase">{a.title}</h4>
                      <p className="text-xs text-neutral-500 font-bold uppercase mb-1">{a.date}</p>
                      <p className="text-xs text-secondary mb-2">{a.desc}</p>
                      <span className="bg-neutral-100 text-xs px-2.5 py-1 border border-black font-bold uppercase">
                        {a.photos.length} FOTO UNGGAHAN
                      </span>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <button 
                        onClick={() => {
                          setAlbumForm(a);
                          setIsEditingAlbum(true);
                        }} 
                        className="p-2 hover:text-primary"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDeleteAlbum(a.id)} className="p-2 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: HUBUNGI KAMI */}
          {activeTab === 'hubungi' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display uppercase border-b-2 border-black pb-2">Konfigurasi Hubungi Kami</h2>
              
              <div className="space-y-4 max-w-xl">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase">Link WhatsApp</label>
                  <input 
                    type="text" 
                    value={contactForm.whatsapp}
                    onChange={e => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                    className="neo-input text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase">Instagram URL</label>
                  <input 
                    type="text" 
                    value={contactForm.instagram}
                    onChange={e => setContactForm({ ...contactForm, instagram: e.target.value })}
                    className="neo-input text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase">TikTok URL</label>
                  <input 
                    type="text" 
                    value={contactForm.tiktok}
                    onChange={e => setContactForm({ ...contactForm, tiktok: e.target.value })}
                    className="neo-input text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase">Email Sekretariat</label>
                  <input 
                    type="email" 
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    className="neo-input text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase">Alamat Sekretariat</label>
                  <textarea 
                    value={contactForm.address}
                    onChange={e => setContactForm({ ...contactForm, address: e.target.value })}
                    className="neo-input text-sm h-24"
                  />
                </div>

                <button 
                  onClick={() => save({ contact: contactForm })} 
                  className="neo-btn px-6 py-3 text-sm mt-2"
                >
                  Simpan Kontak
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: OPREC */}
          {activeTab === 'oprec' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display uppercase border-b-2 border-black pb-2">Manajemen Orec (Pendaftaran)</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 border-2 border-black bg-neutral-50">
                <div className="md:col-span-2">
                  <h3 className="font-display uppercase text-lg">Status Pendaftaran</h3>
                  <p className="text-xs text-secondary">Buka atau tutup akses formulir pendaftaran jajaran BEM.</p>
                </div>
                <button 
                  onClick={() => {
                    const status = !oprecIsOpen;
                    setOprecIsOpen(status);
                    save({ oprec: { ...db.oprec, isOpen: status } });
                  }}
                  className={`px-4 py-2 font-display text-sm border-2 border-black uppercase ${
                    oprecIsOpen ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                  }`}
                >
                  {oprecIsOpen ? 'DIBUKA (KLIK TUTUP)' : 'DITUTUP (KLIK BUKA)'}
                </button>
              </div>

              <div className="space-y-4 max-w-xl">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase">Judul Pengumuman</label>
                  <input 
                    type="text" 
                    value={oprecTitle}
                    onChange={e => setOprecTitle(e.target.value)}
                    className="neo-input text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase">Deskripsi Ajakan</label>
                  <textarea 
                    value={oprecDesc}
                    onChange={e => setOprecDesc(e.target.value)}
                    className="neo-input text-sm h-28"
                  />
                </div>
                <button 
                  onClick={() => save({ oprec: { ...db.oprec, title: oprecTitle, desc: oprecDesc } })} 
                  className="neo-btn px-6 py-3 text-sm"
                >
                  Simpan Info Oprec
                </button>
              </div>

              {/* Database Pendaftar */}
              <div className="pt-6 border-t-2 border-black space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-display text-xl uppercase">Database Pendaftar Jajaran BEM</h3>
                    <p className="text-xs text-secondary">Total pendaftar masuk: {db.oprec.applicants.length}</p>
                  </div>
                  <button 
                    onClick={() => downloadJSON(db.oprec.applicants, 'rekap_pendaftar_oprec.json')}
                    className="neo-btn-secondary flex items-center gap-2 px-3 py-1.5 text-xs"
                    disabled={db.oprec.applicants.length === 0}
                  >
                    <Download size={14} /> Unduh Rekapan
                  </button>
                </div>

                <div className="border-2 border-black overflow-x-auto bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-100 border-b-2 border-black uppercase font-display">
                        <th className="p-3 border-r border-black">Nama</th>
                        <th className="p-3 border-r border-black">NIM / Fak</th>
                        <th className="p-3 border-r border-black">Pilihan 1</th>
                        <th className="p-3 border-r border-black">Pilihan 2</th>
                        <th className="p-3">CV/Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {db.oprec.applicants.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="p-4 text-center text-secondary">Belum ada pendaftar masuk.</td>
                        </tr>
                      ) : (
                        db.oprec.applicants.map((a, idx) => (
                          <tr key={idx} className="border-b border-black last:border-b-0 hover:bg-neutral-50">
                            <td className="p-3 border-r border-black font-bold">{a.name}</td>
                            <td className="p-3 border-r border-black">{a.nim} / {a.faculty}</td>
                            <td className="p-3 border-r border-black">{a.choice1}</td>
                            <td className="p-3 border-r border-black">{a.choice2}</td>
                            <td className="p-3 truncate max-w-[120px]">
                              <a href={a.cvLink} target="_blank" rel="noreferrer" className="text-primary hover:underline">{a.cvLink}</a>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: LAPOR PRES */}
          {activeTab === 'lapor' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display uppercase border-b-2 border-black pb-2">Layanan Advokasi "Lapor Pres!"</h2>
              
              <div className="space-y-4 max-w-xl">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase">Deskripsi Layanan Advokasi</label>
                  <textarea 
                    value={laporDesc}
                    onChange={e => setLaporDesc(e.target.value)}
                    className="neo-input text-sm h-28"
                  />
                </div>
                <button 
                  onClick={() => save({ laporDescription: laporDesc })} 
                  className="neo-btn px-6 py-3 text-sm"
                >
                  Simpan Info Advokasi
                </button>
              </div>

              {/* Log Laporan Masuk */}
              <div className="pt-6 border-t-2 border-black space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-display text-xl uppercase">Aspirasi & Laporan Mahasiswa (Terpusat)</h3>
                    <p className="text-xs text-red-600 font-bold">Privasi Terjamin - Hanya untuk Jajaran Inti BEM</p>
                  </div>
                  <button 
                    onClick={() => downloadJSON(db.reports, 'laporan_laporpres.json')}
                    className="neo-btn-secondary flex items-center gap-2 px-3 py-1.5 text-xs"
                    disabled={db.reports.length === 0}
                  >
                    <Download size={14} /> Unduh Laporan
                  </button>
                </div>

                <div className="space-y-3">
                  {db.reports.length === 0 ? (
                    <div className="p-6 border-2 border-dashed border-neutral-400 text-center text-secondary">
                      Tidak ada laporan atau aspirasi masuk.
                    </div>
                  ) : (
                    db.reports.map(r => (
                      <div key={r.id} className="p-4 border-2 border-black bg-white space-y-2">
                        <div className="flex justify-between items-center border-b border-black pb-1.5">
                          <span className="font-bold text-xs uppercase">Pengirim: {r.name} ({r.faculty} / NIM: {r.nim})</span>
                          <button 
                            onClick={() => {
                              if(!confirm('Hapus laporan ini dari server?')) return;
                              onUpdateDB({ ...db, reports: db.reports.filter(rep => rep.id !== r.id) });
                            }} 
                            className="text-neutral-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-neutral-800 font-body whitespace-pre-wrap">{r.aspiration}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: VOLUNTEER */}
          {activeTab === 'volunteer' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display uppercase border-b-2 border-black pb-2">Manajemen Katalog Volunteer</h2>
              
              <div className="flex justify-between items-center">
                <h3 className="font-display text-xl uppercase">Katalog Pilihan Volunteer</h3>
                <button 
                  onClick={() => {
                    setIsEditingVol(false);
                    setVolForm({ id: null, title: '', isOpen: true, requirements: '', jobdesc: '', schedule: '' });
                  }} 
                  className="neo-btn-secondary px-3 py-1 text-xs"
                >
                  Tambah Kegiatan Volunteer
                </button>
              </div>

              {/* Form Volunteer */}
              {(volForm.id !== null || isEditingVol || volForm.title !== '') && (
                <div className="p-4 border-2 border-black bg-neutral-50 space-y-3">
                  <h4 className="font-display text-sm uppercase">{isEditingVol ? 'Edit Kegiatan Volunteer' : 'Tambah Kegiatan Volunteer Baru'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Nama Kegiatan" 
                      value={volForm.title}
                      onChange={e => setVolForm({ ...volForm, title: e.target.value })}
                      className="neo-input text-sm md:col-span-2"
                    />
                    <input 
                      type="text" 
                      placeholder="Jadwal Pelaksanaan" 
                      value={volForm.schedule}
                      onChange={e => setVolForm({ ...volForm, schedule: e.target.value })}
                      className="neo-input text-sm"
                    />
                    <select 
                      value={volForm.isOpen ? 'open' : 'closed'}
                      onChange={e => setVolForm({ ...volForm, isOpen: e.target.value === 'open' })}
                      className="neo-input text-sm bg-white"
                    >
                      <option value="open">DIBUKA</option>
                      <option value="closed">DITUTUP</option>
                    </select>
                    <textarea 
                      placeholder="Syarat Ketentuan" 
                      value={volForm.requirements}
                      onChange={e => setVolForm({ ...volForm, requirements: e.target.value })}
                      className="neo-input text-sm md:col-span-2 h-20"
                    />
                    <textarea 
                      placeholder="Job description" 
                      value={volForm.jobdesc}
                      onChange={e => setVolForm({ ...volForm, jobdesc: e.target.value })}
                      className="neo-input text-sm md:col-span-2 h-20"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleSaveVol} className="neo-btn px-4 py-2 text-xs">Simpan Kegiatan</button>
                    <button 
                      onClick={() => setVolForm({ id: null, title: '', isOpen: true, requirements: '', jobdesc: '', schedule: '' })} 
                      className="neo-btn-secondary px-4 py-2 text-xs"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

              {/* List Volunteer */}
              <div className="space-y-4">
                {db.volunteerCatalog.map(v => (
                  <div key={v.id} className="p-4 border-2 border-black bg-white flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 text-[10px] border border-black font-bold uppercase ${
                          v.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {v.isOpen ? 'DIBUKA' : 'DITUTUP'}
                        </span>
                        <span className="text-xs text-neutral-500">{v.schedule}</span>
                      </div>
                      <h4 className="font-display text-lg uppercase">{v.title}</h4>
                      <p className="text-xs text-neutral-700 font-bold mt-1">Syarat: <span className="font-normal text-secondary">{v.requirements}</span></p>
                      
                      {/* Sub Rekap Pendaftar */}
                      <div className="mt-3 bg-neutral-50 p-2.5 border border-black max-w-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-display text-[10px] uppercase">Pendaftar ({v.applicants?.length || 0}):</span>
                          <button 
                            onClick={() => downloadJSON(v.applicants || [], `rekap_${v.title.toLowerCase().replace(/\s+/g, '_')}.json`)}
                            className="text-[9px] font-bold uppercase underline hover:text-primary"
                            disabled={!v.applicants || v.applicants.length === 0}
                          >
                            Download Rekap
                          </button>
                        </div>
                        <div className="max-h-24 overflow-y-auto text-[10px]">
                          {!v.applicants || v.applicants.length === 0 ? (
                            <span className="text-neutral-500">Belum ada mahasiswa mendaftar.</span>
                          ) : (
                            v.applicants.map((app, i) => (
                              <div key={i} className="border-b border-neutral-300 py-1 last:border-0">
                                {app.name} ({app.nim} / {app.faculty}) — Komitmen: "{app.commitment}"
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <button 
                        onClick={() => {
                          setVolForm(v);
                          setIsEditingVol(true);
                        }} 
                        className="p-2 hover:text-primary"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDeleteVol(v.id)} className="p-2 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: VISI MISI */}
          {activeTab === 'visimisi' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display uppercase border-b-2 border-black pb-2">Manajemen Konten Visi & Misi</h2>
              
              <div className="space-y-4 max-w-xl">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase">Visi Utama</label>
                  <textarea 
                    value={visiMisiForm.visi}
                    onChange={e => setVisiMisiForm({ ...visiMisiForm, visi: e.target.value })}
                    className="neo-input text-sm h-20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase">Deskripsi Penjelas Visi</label>
                  <textarea 
                    value={visiMisiForm.desc}
                    onChange={e => setVisiMisiForm({ ...visiMisiForm, desc: e.target.value })}
                    className="neo-input text-sm h-28"
                  />
                </div>
              </div>

              {/* Misi List */}
              <div className="pt-4 border-t-2 border-black space-y-4 max-w-xl">
                <h3 className="font-display text-xl uppercase">Daftar Poin Misi</h3>
                <div className="space-y-2">
                  {visiMisiForm.misi.map((m, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-neutral-50 p-2.5 border border-black text-sm">
                      <span className="font-display font-bold text-primary">{idx + 1}.</span>
                      <p className="flex-1">{m}</p>
                      <button 
                        onClick={() => {
                          const updated = visiMisiForm.misi.filter((_, i) => i !== idx);
                          setVisiMisiForm({ ...visiMisiForm, misi: updated });
                        }} 
                        className="hover:text-red-600 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Misi Baru..." 
                    value={newMisiText}
                    onChange={e => setNewMisiText(e.target.value)}
                    className="neo-input text-sm flex-1"
                  />
                  <button 
                    onClick={() => {
                      if(!newMisiText.trim()) return;
                      setVisiMisiForm({ ...visiMisiForm, misi: [...visiMisiForm.misi, newMisiText.trim()] });
                      setNewMisiText('');
                    }} 
                    className="neo-btn px-4 text-xs"
                  >
                    Tambah
                  </button>
                </div>
              </div>

              {/* Three Pillars */}
              <div className="pt-4 border-t-2 border-black space-y-4">
                <h3 className="font-display text-xl uppercase">Organisasi Tiga Pilar / Nilai Utama</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {visiMisiForm.pillars.map((p, idx) => (
                    <div key={p.id} className="p-3 border-2 border-black bg-white space-y-2">
                      <span className="bg-primary text-white font-display text-xs px-2 py-0.5">Pilar {idx + 1}</span>
                      <input 
                        type="text" 
                        value={p.title}
                        onChange={e => {
                          const updated = visiMisiForm.pillars.map(x => x.id === p.id ? { ...x, title: e.target.value } : x);
                          setVisiMisiForm({ ...visiMisiForm, pillars: updated });
                        }}
                        className="neo-input text-xs w-full font-bold"
                      />
                      <textarea 
                        value={p.desc}
                        onChange={e => {
                          const updated = visiMisiForm.pillars.map(x => x.id === p.id ? { ...x, desc: e.target.value } : x);
                          setVisiMisiForm({ ...visiMisiForm, pillars: updated });
                        }}
                        className="neo-input text-xs w-full h-20"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => save({ visiMisi: visiMisiForm })}
                className="neo-btn px-6 py-3 text-sm mt-4"
              >
                Simpan Visi & Misi
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
