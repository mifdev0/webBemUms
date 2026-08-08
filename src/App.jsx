import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Struktural from './components/Struktural.jsx';
import Artikel from './components/Artikel.jsx';
import Dokumentasi from './components/Dokumentasi.jsx';
import VisiMisi from './components/VisiMisi.jsx';
import HubungiKami from './components/HubungiKami.jsx';
import Oprec from './components/Oprec.jsx';
import LaporPres from './components/LaporPres.jsx';
import Volunteer from './components/Volunteer.jsx';
import AdminCMS from './components/AdminCMS.jsx';
import { getDB, saveDB } from './db.js';

export default function App() {
  const [db, setDb] = useState(() => getDB());
  const [activePage, setActivePage] = useState('beranda');

  // Handle URL hash routing (?admin or #admin)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash === 'admin') {
        setActivePage('admin');
      } else if (hash && ['beranda', 'struktural', 'artikel', 'dokumentasi', 'visimisi', 'hubungi', 'oprec', 'lapor', 'volunteer'].includes(hash)) {
        setActivePage(hash);
      } else {
        // Fallback or default
        setActivePage('beranda');
      }
    };
    
    // Check hash on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Wrap navigation changes to also update hash location
  const handlePageChange = (page) => {
    setActivePage(page);
    window.location.hash = page === 'beranda' ? '' : page;
  };

  // Automatically scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  // Update Database state and save to local storage
  const handleUpdateDB = (newDB) => {
    setDb(newDB);
    saveDB(newDB);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] text-[#1a1c1c] overflow-x-hidden font-body">
      {/* Dynamic Navigation Header */}
      <Navbar activePage={activePage} setActivePage={handlePageChange} />

      {/* Main Pages Content Switcher */}
      <main className="flex-grow">
        {activePage === 'beranda' && (
          <Hero db={db} setActivePage={handlePageChange} />
        )}
        {activePage === 'struktural' && (
          <Struktural db={db} />
        )}
        {activePage === 'artikel' && (
          <Artikel db={db} />
        )}
        {activePage === 'dokumentasi' && (
          <Dokumentasi db={db} />
        )}
        {activePage === 'visimisi' && (
          <VisiMisi db={db} />
        )}
        {activePage === 'hubungi' && (
          <HubungiKami db={db} />
        )}
        {activePage === 'oprec' && (
          <Oprec db={db} onUpdateDB={handleUpdateDB} />
        )}
        {activePage === 'lapor' && (
          <LaporPres db={db} onUpdateDB={handleUpdateDB} />
        )}
        {activePage === 'volunteer' && (
          <Volunteer db={db} onUpdateDB={handleUpdateDB} />
        )}
        {activePage === 'admin' && (
          <AdminCMS db={db} onUpdateDB={handleUpdateDB} />
        )}
      </main>

      {/* Shared Footer */}
      <Footer setActivePage={handlePageChange} />
    </div>
  );
}
