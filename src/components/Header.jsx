import React from 'react';

export default function Header({ status = 'idle', user = { avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC09QtTtYJDCrP5oXt545M1xXhvkIczCxD_hkUny_YtvFqRJwKJqQlt93ovaWBVNMtQ32xRsBxcJ-jQP532gvQDHxUmH1Uyr7BwKQ3vBu2-OfClNPsZVXMMH6MR5JWdG8aZbbsZXU_LL0Kh-zI4Tb9cALNbUBcBFgiH_9lT3fqqmj6UzbED2VaqyrxASQpL7g5KsWshlBRSFwES24iGeI-Q3fyNcDzrv0YF1F_X78PujHUSEWdsvC48-cHp4QZl4SJ0-0wqs-K1zz2B" } }) {
  return (
    <header className="bg-[#0f131e]/80 backdrop-blur-md dark:bg-[#0f131e]/80 docked full-width top-0 z-50 border-b border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex justify-between items-center px-6 h-16 w-full fixed">
      <div className="flex items-center gap-8">
        <span className="text-xl font-black bg-gradient-to-r from-[#00f0ff] to-[#cf5cff] bg-clip-text text-transparent font-headline">Reel Insight Pro</span>
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-[#00f0ff] font-semibold border-b-2 border-[#00f0ff] pb-1 font-plus-jakarta-sans text-sm tracking-wide" href="#">Overview</a>
          <a className="text-[#dfe2f2]/60 hover:text-[#dfe2f2] transition-colors font-plus-jakarta-sans text-sm tracking-wide" href="#">Audience</a>
          <a className="text-[#dfe2f2]/60 hover:text-[#dfe2f2] transition-colors font-plus-jakarta-sans text-sm tracking-wide" href="#">Competitors</a>
          <a className="text-[#dfe2f2]/60 hover:text-[#dfe2f2] transition-colors font-plus-jakarta-sans text-sm tracking-wide" href="#">Reports</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {status === 'complete' && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/20">
            <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-container">API Connected</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button className="p-2 text-[#dfe2f2]/60 hover:bg-white/5 transition-all duration-300 rounded-lg">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-[#dfe2f2]/60 hover:bg-white/5 transition-all duration-300 rounded-lg">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-white/10 overflow-hidden ml-2">
            <img alt="User Profile Avatar" className="w-full h-full object-cover" src={user.avatar} />
          </div>
        </div>
      </div>
    </header>
  );
}