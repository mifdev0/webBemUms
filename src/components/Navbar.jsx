import React, { useState } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'struktural', label: 'Struktural' },
    { id: 'artikel', label: 'Artikel' },
    { id: 'dokumentasi', label: 'Dokumentasi' },
    { id: 'visimisi', label: 'Visi & Misi' },
    { id: 'hubungi', label: 'Hubungi Kami' }
  ];

  const services = [
    { id: 'lapor', label: 'Lapor Pres!' },
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'oprec', label: 'Oprec Jajaran' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b-4 border-black">
      <div className="h-16 md:h-20 w-full px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('beranda')}>
          <img 
            src="/assets/logo_bem.png" 
            alt="BEM UMS Logo" 
            className="w-16 h-16 md:w-28 md:h-28 object-contain py-1 z-10 -mr-3 md:-mr-6"
          />
          <span className="font-display text-lg md:text-xl uppercase tracking-tighter">BEM UMS</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`font-body text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activePage === item.id 
                  ? 'text-primary border-b-2 border-primary pb-1' 
                  : 'text-black hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          {/* Submenu for interactive services */}
          <div 
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button 
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="font-body text-xs font-bold uppercase tracking-wider text-black hover:text-primary flex items-center gap-1 cursor-pointer pb-2"
            >
              Layanan <span className="text-[10px]">▼</span>
            </button>
            {/* Dropdown wrapper container with no empty physical hover gap */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full pt-1 w-48 z-50">
                <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {services.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setActivePage(s.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left font-body text-xs font-bold uppercase p-3 hover:bg-neutral-100 border-b border-black last:border-0 cursor-pointer ${
                        activePage === s.id ? 'text-primary' : 'text-black'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActivePage('oprec')}
            className="hidden sm:inline-block bg-primary text-white border-2 border-black font-display text-xs px-5 py-2 uppercase hover:bg-primary-container shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 active:translate-y-0.5"
          >
            GABUNG KABINET
          </button>

          {/* Hamburger Menu Icon */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden flex flex-col gap-1.5 p-2 border border-transparent hover:border-black"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t-2 border-black py-4 px-6 space-y-3">
          <div className="flex flex-col gap-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsOpen(false);
                }}
                className={`text-left font-body text-xs font-bold uppercase py-2 border-b border-neutral-100 ${
                  activePage === item.id ? 'text-primary' : 'text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <span className="text-[9px] font-display text-secondary tracking-widest uppercase block mb-1">Daftar Layanan</span>
              {services.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActivePage(s.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left font-body text-xs font-bold uppercase py-2 pl-3 border-l-2 border-black mb-1 ${
                    activePage === s.id ? 'text-primary' : 'text-black'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => {
              setActivePage('oprec');
              setIsOpen(false);
            }}
            className="bg-primary text-white border-2 border-black font-display text-xs w-full py-3 uppercase text-center mt-2 shadow-[2px_2px_0px_0px_#000]"
          >
            GABUNG KABINET
          </button>
        </div>
      )}
    </header>
  );
}
