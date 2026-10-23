import React, { useState, useEffect } from 'react';
import { Language, PORTFOLIO_CONTENT } from '../data/portfolioData';
import { FileText } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenCv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onOpenCv }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-4 z-50 w-[min(1140px,92%)] mx-auto">
      <nav
        aria-label="Navegación principal"
        className={`px-5 py-3 rounded-full border transition-all duration-300 flex items-center justify-between backdrop-blur-md ${
          scrolled
            ? 'bg-[#f7f5f0]/95 border-[#c5b4a5]/70 shadow-lg shadow-[#2b211e]/5'
            : 'bg-[#f7f5f0]/85 border-[#c5b4a5]/50 shadow-md shadow-[#2b211e]/5'
        }`}
      >
        {/* Brand */}
        <a
          href="#"
          className="font-extrabold text-lg tracking-tight text-[#2b211e] hover:opacity-90 transition-opacity"
        >
          {PORTFOLIO_CONTENT.brand.first}{' '}
          <span className="text-[#8f5843]">{PORTFOLIO_CONTENT.brand.last}</span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 list-none text-sm font-medium text-[#2b211e]">
          <li>
            <a
              href="#sobre-mi"
              className="hover:text-[#8f5843] transition-colors py-1 px-2 rounded-lg hover:bg-[#eae4dc]/50"
            >
              {PORTFOLIO_CONTENT.nav.about[lang]}
            </a>
          </li>
          <li>
            <a
              href="#proyectos"
              className="hover:text-[#8f5843] transition-colors py-1 px-2 rounded-lg hover:bg-[#eae4dc]/50"
            >
              {PORTFOLIO_CONTENT.nav.projects[lang]}
            </a>
          </li>
          <li>
            <a
              href="#habilidades"
              className="hover:text-[#8f5843] transition-colors py-1 px-2 rounded-lg hover:bg-[#eae4dc]/50"
            >
              {PORTFOLIO_CONTENT.nav.skills[lang]}
            </a>
          </li>
          <li>
            <a
              href="#contacto"
              className="hover:text-[#8f5843] transition-colors py-1 px-2 rounded-lg hover:bg-[#eae4dc]/50"
            >
              {PORTFOLIO_CONTENT.nav.contact[lang]}
            </a>
          </li>
        </ul>

        {/* Controls: CV & Language Switch & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenCv}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-[#c5b4a5] bg-[#eae4dc] text-[#2b211e] hover:border-[#8f5843] hover:text-[#8f5843] transition-colors shadow-xs"
            title={lang === 'es' ? 'Ver Curriculum Vitae' : 'View Resume'}
          >
            <FileText className="w-3.5 h-3.5 text-[#8f5843]" />
            <span>{PORTFOLIO_CONTENT.nav.cv[lang]}</span>
          </button>

          <button
            id="langBtn"
            type="button"
            onClick={onToggleLang}
            aria-label={lang === 'es' ? 'Cambiar idioma a inglés' : 'Switch language to Spanish'}
            className="px-3 py-1 rounded-full text-xs font-semibold border border-[#c5b4a5] bg-[#eae4dc] text-[#5c4b45] hover:border-[#8f5843] transition-all cursor-pointer shadow-xs"
          >
            <span className={lang === 'es' ? 'text-[#8f5843] font-bold' : 'opacity-60'}>ES</span>
            {' | '}
            <span className={lang === 'en' ? 'text-[#8f5843] font-bold' : 'opacity-60'}>EN</span>
          </button>

          {/* Hamburger toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Alternar menú de navegación"
            aria-expanded={isOpen}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 p-1.5 rounded-lg border border-[#c5b4a5] bg-[#eae4dc]/70 hover:bg-[#eae4dc] transition-colors"
          >
            <span
              className={`w-4 h-0.5 bg-[#2b211e] rounded-full transition-transform duration-200 ${
                isOpen ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`w-4 h-0.5 bg-[#2b211e] rounded-full my-0.5 transition-opacity duration-200 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-4 h-0.5 bg-[#2b211e] rounded-full transition-transform duration-200 ${
                isOpen ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 p-4 bg-[#eae4dc] border border-[#c5b4a5] rounded-2xl shadow-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            href="#sobre-mi"
            onClick={closeMenu}
            className="px-3 py-2 text-sm font-medium text-[#2b211e] hover:text-[#8f5843] hover:bg-[#f7f5f0] rounded-xl transition-colors"
          >
            {PORTFOLIO_CONTENT.nav.about[lang]}
          </a>
          <a
            href="#proyectos"
            onClick={closeMenu}
            className="px-3 py-2 text-sm font-medium text-[#2b211e] hover:text-[#8f5843] hover:bg-[#f7f5f0] rounded-xl transition-colors"
          >
            {PORTFOLIO_CONTENT.nav.projects[lang]}
          </a>
          <a
            href="#habilidades"
            onClick={closeMenu}
            className="px-3 py-2 text-sm font-medium text-[#2b211e] hover:text-[#8f5843] hover:bg-[#f7f5f0] rounded-xl transition-colors"
          >
            {PORTFOLIO_CONTENT.nav.skills[lang]}
          </a>
          <a
            href="#contacto"
            onClick={closeMenu}
            className="px-3 py-2 text-sm font-medium text-[#2b211e] hover:text-[#8f5843] hover:bg-[#f7f5f0] rounded-xl transition-colors"
          >
            {PORTFOLIO_CONTENT.nav.contact[lang]}
          </a>
          <button
            type="button"
            onClick={() => {
              closeMenu();
              onOpenCv();
            }}
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl bg-[#8f5843] text-white hover:bg-[#754432] transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>{PORTFOLIO_CONTENT.nav.cv[lang]}</span>
          </button>
        </div>
      )}
    </header>
  );
};
