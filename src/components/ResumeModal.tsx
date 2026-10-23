import React, { useEffect } from 'react';
import { Language, PORTFOLIO_CONTENT } from '../data/portfolioData';
import { X, Printer, Download, Mail, Phone, MapPin, Award, GraduationCap, Code, Briefcase, HeartHandshake, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, lang }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = PORTFOLIO_CONTENT;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b211e]/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#f7f5f0] border border-[#c5b4a5] rounded-[24px] p-6 sm:p-8 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top actions */}
        <div className="flex items-center justify-between pb-4 border-b border-[#c5b4a5]/60">
          <div className="flex items-center gap-2">
            <span className="text-xl">📄</span>
            <h3 className="font-bold text-lg text-[#2b211e]">
              {lang === 'es' ? 'Curriculum Vitae Oficial — Elías Nieto Urieta' : 'Official Curriculum Vitae — Elías Nieto Urieta'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/CV_Elias_Nieto_DAW.pdf"
              download="CV_Elias_Nieto_DAW.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#8f5843] text-white hover:bg-[#754432] transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Descargar PDF Oficial' : 'Download Official PDF'}</span>
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#eae4dc] border border-[#c5b4a5] text-[#2b211e] hover:border-[#8f5843] transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#8f5843]" />
              <span>{lang === 'es' ? 'Imprimir' : 'Print'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#eae4dc] text-[#5c4b45] hover:text-[#2b211e] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Body */}
        <div className="mt-4 flex-1 overflow-y-auto pr-2 space-y-6 text-sm">
          {/* Header & Personal Info */}
          <div className="bg-[#eae4dc] p-5 sm:p-6 rounded-2xl border border-[#c5b4a5]">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-[#2b211e] tracking-tight">
                  ELÍAS NIETO URIETA
                </h1>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#8f5843] mt-1">
                  {content.hero.titleBadge[lang]}
                </p>
              </div>

              {/* Contact metadata */}
              <div className="text-xs text-[#5c4b45] space-y-1 sm:text-right">
                <div className="flex items-center md:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#8f5843]" />
                  <a href={`tel:${content.contact.phoneRaw}`} className="hover:text-[#8f5843]">
                    {content.contact.phone}
                  </a>
                </div>
                <div className="flex items-center md:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8f5843]" />
                  <span>{content.contact.location}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#8f5843]" />
                  <a href={`mailto:${content.contact.email}`} className="hover:text-[#8f5843]">
                    {content.contact.email}
                  </a>
                </div>
                <div className="flex flex-wrap items-center md:justify-end gap-3 pt-1 font-semibold">
                  <a
                    href="https://github.com/XxEJMGxX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8f5843] hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>GitHub: XxEJMGxX</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.linkedin.com/in/elias-nieto-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8f5843] hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Languages pill bar */}
            <div className="mt-4 pt-3 border-t border-[#c5b4a5]/60 text-xs text-[#5c4b45] flex flex-wrap gap-4 items-center">
              <span className="font-bold text-[#2b211e]">
                {lang === 'es' ? 'IDIOMAS:' : 'LANGUAGES:'}
              </span>
              <span className="bg-[#f7f5f0] px-2.5 py-0.5 rounded-full border border-[#c5b4a5]">
                <strong>Inglés:</strong> C1
              </span>
              <span className="bg-[#f7f5f0] px-2.5 py-0.5 rounded-full border border-[#c5b4a5]">
                <strong>Francés:</strong> A1
              </span>
              <span className="bg-[#f7f5f0] px-2.5 py-0.5 rounded-full border border-[#c5b4a5]">
                <strong>Español:</strong> Nativo
              </span>
            </div>
          </div>

          {/* Sobre Mí */}
          <div>
            <h4 className="font-bold text-sm text-[#8f5843] mb-2 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>{lang === 'es' ? 'Sobre Mí' : 'About Me'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#5c4b45] leading-relaxed bg-[#f7f5f0] p-4 rounded-xl border border-[#c5b4a5]">
              {content.hero.bio[lang]}
            </p>
          </div>

          {/* Formación Académica & Cursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-sm text-[#8f5843] mb-2 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>{lang === 'es' ? 'Formación Académica' : 'Academic Education'}</span>
              </h4>
              <div className="space-y-2">
                {content.skillsSection.educationList.map((edu, i) => (
                  <div key={i} className="p-3 bg-[#eae4dc] rounded-xl border border-[#c5b4a5]">
                    <h5 className="font-bold text-xs sm:text-sm text-[#2b211e]">{edu.degree[lang]}</h5>
                    <p className="text-xs text-[#5c4b45]">{edu.institution} ({edu.period})</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-[#8f5843] mb-2 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{lang === 'es' ? 'Cursos Técnicos' : 'Technical Courses'}</span>
              </h4>
              <div className="space-y-2">
                {content.skillsSection.coursesList.map((crs, i) => (
                  <div key={i} className="p-3 bg-[#eae4dc] rounded-xl border border-[#c5b4a5]">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs text-[#2b211e]">{crs.title}</h5>
                      <span className="text-[10px] font-mono text-[#8f5843] bg-[#f7f5f0] px-1.5 py-0.5 rounded">
                        {crs.period}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5c4b45] mt-1">{crs.details[lang]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experiencia Laboral */}
          <div>
            <h4 className="font-bold text-sm text-[#8f5843] mb-2 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>{lang === 'es' ? 'Experiencia Laboral' : 'Work Experience'}</span>
            </h4>
            {content.workExperience.map((exp, idx) => (
              <div key={idx} className="p-4 bg-[#eae4dc] rounded-xl border border-[#c5b4a5]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h5 className="font-bold text-sm text-[#2b211e]">{exp.role[lang]}</h5>
                  <span className="text-xs font-mono text-[#8f5843]">{exp.period}</span>
                </div>
                <div className="text-xs font-semibold text-[#5c4b45] mb-2">{exp.company}</div>
                <p className="text-xs text-[#5c4b45] leading-relaxed mb-2.5">
                  {exp.description[lang]}
                </p>
                <div className="flex flex-wrap gap-1">
                  {exp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-[#f7f5f0] text-[#5c4b45] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#c5b4a5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Competencias Técnicas */}
          <div>
            <h4 className="font-bold text-sm text-[#8f5843] mb-2 uppercase tracking-wider flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>{lang === 'es' ? 'Competencias Técnicas' : 'Technical Competencies'}</span>
            </h4>
            <div className="space-y-2.5 text-xs">
              {content.skillsSection.skillsList.map((skill, sIdx) => (
                <div key={sIdx} className="p-3 bg-[#eae4dc] rounded-xl border border-[#c5b4a5]">
                  <strong className="text-[#2b211e] block mb-1">
                    • {skill.category[lang]}
                  </strong>
                  <p className="text-[#5c4b45] mb-2 leading-relaxed">
                    {skill.description[lang]}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {skill.items.map((it, itIdx) => (
                      <span
                        key={itIdx}
                        className="bg-[#f7f5f0] text-[#2b211e] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#c5b4a5]"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Habilidades Blandas */}
          <div>
            <h4 className="font-bold text-sm text-[#8f5843] mb-2 uppercase tracking-wider flex items-center gap-2">
              <HeartHandshake className="w-4 h-4" />
              <span>{lang === 'es' ? 'Habilidades Personales' : 'Personal & Soft Skills'}</span>
            </h4>
            <div className="flex flex-wrap gap-1.5 p-3.5 bg-[#eae4dc] rounded-xl border border-[#c5b4a5]">
              {content.skillsSection.softSkills.map((sk, skIdx) => (
                <span
                  key={skIdx}
                  className="bg-[#f7f5f0] text-[#2b211e] text-xs font-semibold px-2.5 py-1 rounded-md border border-[#c5b4a5]"
                >
                  ✓ {sk[lang]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-[#c5b4a5]/60 flex items-center justify-between">
          <a
            href="/CV_Elias_Nieto_DAW.pdf"
            download="CV_Elias_Nieto_DAW.pdf"
            className="text-xs font-bold text-[#8f5843] hover:underline inline-flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'es' ? 'Descargar archivo PDF original' : 'Download original PDF file'}</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#8f5843] text-white font-semibold text-xs md:text-sm hover:bg-[#754432] transition-colors"
          >
            {lang === 'es' ? 'Cerrar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
