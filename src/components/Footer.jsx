import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center bg-surface-container-lowest border-t border-white/5 gap-6">
      <div className="flex items-center gap-2">
        <span className="text-on-surface-variant font-headline font-bold text-sm tracking-tighter">Reel Insight Pro</span>
        <span className="text-on-surface-variant/30 text-xs">— Premium Creator Tooling</span>
      </div>
      <div className="flex gap-8 text-on-surface-variant/60 font-label text-[10px] tracking-widest uppercase">
        <a className="hover:text-primary transition-colors" href="#">Documentation</a>
        <a className="hover:text-primary transition-colors" href="#">Privacy</a>
        <a className="hover:text-primary transition-colors" href="#">API Status</a>
      </div>
      <div className="flex gap-4">
        <a className="p-2 rounded-lg bg-white/5 text-on-surface-variant hover:text-primary transition-all" href="#">
          <span className="material-symbols-outlined text-lg">language</span>
        </a>
        <a className="p-2 rounded-lg bg-white/5 text-on-surface-variant hover:text-primary transition-all" href="#">
          <span className="material-symbols-outlined text-lg">terminal</span>
        </a>
      </div>
    </footer>
  );
}