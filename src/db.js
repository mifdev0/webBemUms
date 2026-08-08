// Database Mock using LocalStorage for Dynamic CMS Architecture

const DEFAULT_DATA = {
  // 1. Struktural
  periods: ["2026", "2025"],
  currentPeriod: "2026",
  pimpinan: {
    "2026": [
      { id: 1, name: "Muhammad Fadhil", role: "Ketua Umum BEM UMS", photo: "/assets/foto_ketua_bem.jpg", bio: "Memimpin dengan visi transformasi progresif untuk kemaslahatan mahasiswa UMS." },
      { id: 2, name: "Siti Rahmawati", role: "Wakil Ketua Umum BEM UMS", photo: "", bio: "Sinergi aksi dan kolaborasi nyata untuk pelayanan terbaik mahasiswa UMS." }
    ],
    "2025": [
      { id: 3, name: "Ahmad Dahlan", role: "Ketua Umum BEM UMS", photo: "", bio: "Membangun harmoni gerakan mahasiswa." },
      { id: 4, name: "Laila Fitriani", role: "Wakil Ketua Umum BEM UMS", photo: "", bio: "Mewujudkan gerakan advokasi yang tangguh." }
    ]
  },
  kementerian: {
    "2026": [
      { id: 1, name: "Kementerian Dalam Negeri", desc: "Mengoordinasikan hubungan internal organisasi, fakultas, dan lembaga mahasiswa di lingkungan UMS.", members: [
        { name: "Andi Saputra", title: "Menteri" },
        { name: "Rina Astuti", title: "Sekretaris Kementerian" },
        { name: "Budi Cahyono", title: "Dirjen Hubungan Internal" }
      ]},
      { id: 2, name: "Kementerian Luar Negeri", desc: "Membangun jaringan kemitraan strategis eksternal dengan BEM universitas lain, media, dan instansi nasional.", members: [
        { name: "Farhan Hakim", title: "Menteri" },
        { name: "Aisyah Nabila", title: "Sekretaris Kementerian" }
      ]},
      { id: 3, name: "Kementerian Advokasi & Kesejahteraan Mahasiswa", desc: "Mengawal kebijakan kampus, memperjuangkan hak-hak akademik dan finansial mahasiswa UMS.", members: [
        { name: "Deni Prasetyo", title: "Menteri" },
        { name: "Eka Lestari", title: "Dirjen Kesejahteraan" }
      ]},
      { id: 4, name: "Kementerian Pemberdayaan Sumber Daya Mahasiswa", desc: "Menyelenggarakan pelatihan kepemimpinan, kaderisasi, dan pengembangan potensi mahasiswa.", members: [
        { name: "Gilang Ramadhan", title: "Menteri" },
        { name: "Mega Utami", title: "Dirjen Kaderisasi" }
      ]},
      { id: 5, name: "Kementerian Seni, Olahraga & Kebudayaan", desc: "Mewadahi minat, bakat, dan apresiasi mahasiswa di bidang seni, olahraga, dan budaya.", members: [
        { name: "Heri Wibowo", title: "Menteri" },
        { name: "Putri Amanda", title: "Dirjen Olahraga" }
      ]},
      { id: 6, name: "Kementerian Sosial & Pengabdian Masyarakat", desc: "Melaksanakan program pengabdian, tanggap bencana, dan pemberdayaan masyarakat sekitar.", members: [
        { name: "Indra Wijaya", title: "Menteri" },
        { name: "Ria Safitri", title: "Dirjen Aksi Sosial" }
      ]}
    ],
    "2025": [
      { id: 1, name: "Kementerian Keorganisasian", desc: "Mengatur administrasi organisasi internal.", members: [{ name: "Taufik Hidayat", title: "Menteri" }]}
    ]
  },

  // 2. Artikel & Kegiatan
  categories: ["Semua", "Berita", "Opini", "Kegiatan"],
  articles: [
    { id: 1, title: "Revitalisasi Fasilitas Olahraga Kampus Terpadu", date: "2026-08-05", category: "Berita", thumbnail: "", desc: "BEM UMS bersama Rektorat menyepakati renovasi lapangan sepak bola dan gedung olahraga mulai September 2026." },
    { id: 2, title: "Suara Mahasiswa: Urgensi Kebebasan Akademik", date: "2026-08-01", category: "Opini", thumbnail: "", desc: "Ulasan mendalam mengenai peran mahasiswa dalam menjaga iklim demokrasi dan akademik yang sehat di kampus." },
    { id: 3, title: "Diskusi Publik: Masa Depan Pendidikan Tinggi", date: "2026-07-28", category: "Kegiatan", thumbnail: "", desc: "Menghadirkan tokoh nasional dalam mengupas arah kebijakan pendidikan pasca pergantian kurikulum nasional." }
  ],

  // 3. Dokumentasi (Albums)
  albums: [
    { id: 1, title: "PKKMB UMS 2026", date: "2026-07-15", desc: "Dokumentasi penyambutan mahasiswa baru tahun ajaran 2026/2027.", photos: [] },
    { id: 2, title: "Latihan Kepemimpinan Mahasiswa", date: "2026-06-10", desc: "Pelatihan manajerial tingkat menengah bagi calon pemimpin organisasi.", photos: [] },
    { id: 3, title: "Aksi Sosial Peduli Bencana", date: "2026-05-20", desc: "Penyaluran bantuan logistik dan trauma healing pasca bencana lokal.", photos: [] }
  ],

  // 4. Hubungi Kami
  contact: {
    whatsapp: "https://wa.me/6281234567890",
    instagram: "https://instagram.com/bem_ums",
    tiktok: "https://tiktok.com/@bem_ums",
    email: "bem@ums.ac.id",
    address: "Gedung Student Center UMS Lantai 2, Jl. Ahmad Yani, Pabelan, Kartasura, Sukoharjo, Jawa Tengah"
  },

  // 5. Oprec (Halaman Bergabung)
  oprec: {
    isOpen: true,
    title: "OPEN RECRUITMENT BEM UMS 2026",
    desc: "Mari bergabung menjadi bagian dari agen perubahan! Bersama Kabinet Transformasi Progresif, saatnya berdedikasi dan melangkah maju untuk UMS yang lebih berdaya saing global.",
    applicants: []
  },

  // 6. Lapor Pres!
  reports: [],
  laporDescription: "Sampaikan aspirasi, kritik, keluhan fasilitas, atau aduan akademik secara langsung kepada Ketua BEM UMS. Kerahasiaan identitas dan data Anda terjamin sepenuhnya.",

  // 7. Jadilah Volunteer
  volunteerCatalog: [
    { id: 1, title: "Volunteer UMS Mengajar", isOpen: true, requirements: "Mahasiswa aktif UMS minimal semester 3, memiliki minat mengajar anak-anak.", jobdesc: "Mengajar sekolah dasar di pinggiran kota selama 3 bulan.", schedule: "Agustus - Oktober 2026", applicants: [] },
    { id: 2, title: "Panitia Aksi Peduli Lingkungan", isOpen: false, requirements: "Terbuka untuk seluruh mahasiswa aktif UMS.", jobdesc: "Mengoordinasi aksi penanaman 1000 pohon di kawasan Lereng Lawu.", schedule: "Selesai (Juli 2026)", applicants: [] }
  ],

  // 8. Visi & Misi
  visiMisi: {
    visi: "MENCIPTAKAN EKOSISTEM KAMPUS YANG INKLUSIF DAN PROGRESIF",
    desc: "Visi kami adalah menjadi motor penggerak perubahan yang inklusif, transparan, dan berorientasi pada kesejahteraan mahasiswa melalui program kerja yang nyata dan berkelanjutan.",
    misi: [
      "Mengoptimalkan peran advokasi yang solutif bagi permasalahan akademik dan fasilitas mahasiswa.",
      "Membangun sinergi kolaboratif antar lembaga kemahasiswaan di tingkat fakultas dan universitas.",
      "Mendorong digitalisasi layanan informasi dan aspirasi mahasiswa yang transparan dan akuntabel.",
      "Menyelenggarakan kegiatan pengembangan minat bakat, keilmuan, dan aksi sosial masyarakat secara merata."
    ],
    pillars: [
      { id: 1, title: "Advokasi & Solutif", desc: "Mendampingi serta memperjuangkan aspirasi dan hak mahasiswa di segala tingkat kebijakan." },
      { id: 2, title: "Sinergi Kolaboratif", desc: "Memupuk kebersamaan dan kerja sama antar ormawa demi keselarasan gerak mahasiswa." },
      { id: 3, title: "Aksi Sosial Nyata", desc: "Mengabdi dengan ketulusan hati untuk memecahkan problematika kemasyarakatan." }
    ]
  }
};

export const getDB = () => {
  const data = localStorage.getItem("bem_ums_db");
  if (!data) {
    localStorage.setItem("bem_ums_db", JSON.stringify(DEFAULT_DATA));
    return DEFAULT_DATA;
  }
  const parsed = JSON.parse(data);
  // Auto-patch photo for Ketua Umum in existing localStorage session
  if (parsed.pimpinan && parsed.pimpinan["2026"]) {
    const fadhil = parsed.pimpinan["2026"].find(p => p.id === 1);
    if (fadhil && !fadhil.photo) {
      fadhil.photo = "/assets/foto_ketua_bem.jpg";
      localStorage.setItem("bem_ums_db", JSON.stringify(parsed));
    }
  }
  return parsed;
};

export const saveDB = (data) => {
  localStorage.setItem("bem_ums_db", JSON.stringify(data));
};
