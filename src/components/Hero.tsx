import React from 'react';
import { Language, PORTFOLIO_CONTENT } from '../data/portfolioData';
import { ArrowDown, Mail, FileText, CheckCircle2, Download, MapPin } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenCv }) => {
  const content = PORTFOLIO_CONTENT.hero;

  return (
    <section id="sobre-mi" className="pt-8 pb-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Information & CTAs */}
        <div className="lg:col-span-7 order-2 lg:order-1 text-left">
          {/* Status Badge & Location */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5b4a5] bg-[#eae4dc] text-[#8f5843] text-xs font-bold tracking-wide shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span>{content.statusBadge[lang]}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c5b4a5]/60 bg-[#f7f5f0] text-[#5c4b45] text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#8f5843]" />
              <span>{content.location}</span>
            </div>
          </div>

          {/* Full Name Title matching CV */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-[#2b211e] leading-[1.08] mb-2">
            {content.fullName}
          </h1>

          {/* Professional Role & Subtitle */}
          <div className="mb-6">
            <span className="inline-block text-base md:text-lg font-extrabold uppercase tracking-wider text-[#8f5843] mb-1">
              {content.titleBadge[lang]}
            </span>
            <p className="text-sm md:text-base font-medium text-[#5c4b45]">
              {content.subtitle[lang]}
            </p>
          </div>

          {/* Profile Box */}
          <div className="bg-[#eae4dc] border border-[#c5b4a5] rounded-[20px] p-5 md:p-6 mb-6 text-[#5c4b45] text-sm md:text-base leading-relaxed shadow-xs relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#8f5843] rounded-l-full opacity-80" />
            <p>{content.bio[lang]}</p>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-b from-[#9d6550] to-[#8f5843] hover:from-[#8f5843] hover:to-[#754432] shadow-md shadow-[#8f5843]/20 hover:-translate-y-0.5 transition-all"
            >
              <span>{content.ctaProjects[lang]}</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-[#2b211e] bg-[#eae4dc] border border-[#c5b4a5] hover:border-[#8f5843] hover:-translate-y-0.5 transition-all shadow-xs"
            >
              <Mail className="w-4 h-4 text-[#8f5843]" />
              <span>{content.ctaContact[lang]}</span>
            </a>

            <button
              type="button"
              onClick={onOpenCv}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-[#5c4b45] bg-[#f7f5f0] border border-[#c5b4a5] hover:border-[#8f5843] hover:text-[#8f5843] hover:-translate-y-0.5 transition-all shadow-xs"
            >
              <FileText className="w-4 h-4 text-[#8f5843]" />
              <span>{content.ctaCv[lang]}</span>
            </button>

            <a
              href={content.pdfUrl}
              download="CV_Elias_Nieto_DAW.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-xs text-[#8f5843] bg-[#eae4dc] border border-[#c5b4a5] hover:border-[#8f5843] hover:-translate-y-0.5 transition-all shadow-xs"
              title={lang === 'es' ? 'Descargar PDF del CV' : 'Download CV PDF'}
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </a>
          </div>
        </div>

        {/* Right Column: Hero Photo Card */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
          <div className="w-full max-w-[340px] bg-[#eae4dc] border border-[#c5b4a5] rounded-[24px] p-6 text-center shadow-xl shadow-[#2b211e]/8 relative transition-transform hover:-translate-y-1 duration-300">
            {/* Top decorative badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f7f5f0] border border-[#c5b4a5] rounded-full px-3 py-0.5 text-[11px] font-bold text-[#8f5843] tracking-wide shadow-xs flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>DAW 2025/2026</span>
            </div>

            {/* Avatar Circle with gradient ring */}
            <div className="w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-5 rounded-full p-1.5 bg-gradient-to-tr from-[#8f5843] via-[#c5b4a5] to-[#eae4dc] shadow-lg shadow-[#2b211e]/15">
              <img
                src="/assets/foto.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/aistudio/Image_1_b1adfe14.jpeg';
                }}
                alt="Elías Nieto Urieta"
                className="w-full h-full object-cover object-[center_18%] rounded-full bg-[#f7f5f0] border border-white/60"
                loading="eager"
              />
            </div>

            {/* Card Information */}
            <h3 className="font-bold text-base sm:text-lg text-[#2b211e] mb-1">
              {content.photoTitle[lang]}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[#5c4b45] mb-3">
              {content.photoLangs[lang]}
            </p>

            {/* Highlights pill row */}
            <div className="pt-3 border-t border-[#c5b4a5]/50 flex flex-wrap justify-center gap-1.5 text-[11px] text-[#5c4b45] font-semibold">
              <span className="bg-[#f7f5f0] px-2 py-0.5 rounded-md border border-[#c5b4a5]/60">
                CS50x (2024)
              </span>
              <span className="bg-[#f7f5f0] px-2 py-0.5 rounded-md border border-[#c5b4a5]/60">
                Platzi (2023)
              </span>
              <span className="bg-[#f7f5f0] px-2 py-0.5 rounded-md border border-[#c5b4a5]/60">
                PHP & Java MVC
              </span>
              <span className="bg-[#f7f5f0] px-2 py-0.5 rounded-md border border-[#c5b4a5]/60">
                Docker & SQL
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
