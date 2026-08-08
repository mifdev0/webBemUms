import React from 'react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="w-full bg-[#1a1c1c] text-white py-12 border-t-8 border-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 mb-8 border-b border-neutral-700 pb-8">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('beranda')}>
            <img 
              src="/assets/logo_bem.png" 
              alt="BEM UMS Logo" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain invert brightness-200 -mr-4 md:-mr-8"
            />
            <span className="font-display text-2xl uppercase tracking-tighter">BEM UMS</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {['Instagram', 'LinkedIn', 'TikTok', 'YouTube'].map(social => (
              <a 
                key={social} 
                href="#" 
                className="text-white hover:text-primary transition-colors font-body text-xs font-bold uppercase tracking-widest"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-neutral-400">
          <div className="font-body text-xs uppercase tracking-widest">
            © 2026 BEM UMS. ALL RIGHTS RESERVED
          </div>
          <div className="font-display text-xs uppercase text-neutral-500 tracking-wider">
            KABINET TRANSFORMASI PROGRESIF
          </div>
        </div>
      </div>
    </footer>
  );
}
