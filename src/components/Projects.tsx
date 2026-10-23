import React, { useState } from 'react';
import { Language, Project, PORTFOLIO_CONTENT } from '../data/portfolioData';
import { ExternalLink, Sparkles } from 'lucide-react';

interface ProjectsProps {
  lang: Language;
  onOpenJavaModal: () => void;
  onOpenLiveModal: (project: Project, mode: 'live' | 'code') => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  lang,
  onOpenJavaModal,
  onOpenLiveModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'web' | 'desktop'>('all');
  const allProjects = PORTFOLIO_CONTENT.projects;

  const filteredProjects =
    filter === 'all'
      ? allProjects
      : allProjects.filter((p) => p.category === filter);

  const webCount = allProjects.filter((p) => p.category === 'web').length;
  const desktopCount = allProjects.filter((p) => p.category === 'desktop').length;

  return (
    <section id="proyectos" className="py-12 md:py-16">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2b211e]">
              {lang === 'es' ? 'Proyectos Destacados' : 'Featured Projects'}
            </h2>
            <p className="text-sm sm:text-base text-[#5c4b45] mt-1.5 max-w-2xl">
              {lang === 'es'
                ? 'Acceso directo a las demos interactivas, vistas previas de interfaz y repositorios de código.'
                : 'Direct access to live demos, UI previews, and source code repositories.'}
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 bg-[#eae4dc] p-1 rounded-full border border-[#c5b4a5] w-fit shadow-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-[#8f5843] text-white shadow-xs'
                  : 'text-[#5c4b45] hover:text-[#2b211e]'
              }`}
            >
              {lang === 'es' ? 'Todos' : 'All'} ({allProjects.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('web')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                filter === 'web'
                  ? 'bg-[#8f5843] text-white shadow-xs'
                  : 'text-[#5c4b45] hover:text-[#2b211e]'
              }`}
            >
              Web ({webCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('desktop')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                filter === 'desktop'
                  ? 'bg-[#8f5843] text-white shadow-xs'
                  : 'text-[#5c4b45] hover:text-[#2b211e]'
              }`}
            >
              Java & Desktop ({desktopCount})
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid: 2 columns for clean presentation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="bg-[#eae4dc] border border-[#c5b4a5] rounded-[22px] overflow-hidden flex flex-col shadow-md shadow-[#2b211e]/5 hover:shadow-xl hover:shadow-[#2b211e]/10 hover:-translate-y-1.5 hover:border-[#8f5843] transition-all duration-300"
          >
            {/* Window bar with macOS-like colored dots and URL */}
            <div className="bg-[#dfd7cc] px-4 py-2.5 border-b border-[#c5b4a5] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c86d58]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4a359]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#7a9a76]"></span>
              </div>
              <span className="bg-[#f7f5f0] px-3 py-0.5 rounded-md text-[11px] font-mono text-[#5c4b45] flex-1 text-center truncate border border-[#c5b4a5]/40 mx-2">
                {project.windowUrl}
              </span>
              <span className="text-[10px] font-bold text-[#8f5843] bg-[#f7f5f0] px-2.5 py-0.5 rounded-full border border-[#c5b4a5]/60 shrink-0">
                {project.badge[lang]}
              </span>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8f5843] hover:text-[#754432] p-0.5"
                  title={lang === 'es' ? 'Abrir enlace externo' : 'Open external link'}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Preview Banner: aspect-[1024/506] and object-contain ensures 100% complete view without cropping on any screen size */}
            <div className="w-full aspect-[1024/506] bg-[#14161d] flex items-center justify-center border-b border-[#c5b4a5] relative group overflow-hidden">
              {project.previewImage ? (
                <img
                  src={project.previewImage}
                  alt={project.title}
                  className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              ) : (
                <div className="flex flex-col items-center p-5 text-center">
                  <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                    {project.icon}
                  </div>
                  <strong className="text-xs sm:text-sm font-bold text-[#2b211e]">
                    {project.badge[lang]}
                  </strong>
                </div>
              )}
            </div>

            {/* Project Body */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-xl text-[#2b211e] mb-2">{project.title}</h3>

              <p className="text-sm text-[#5c4b45] leading-relaxed mb-5 flex-1">
                {project.description[lang]}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#f7f5f0] border border-[#c5b4a5] px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#2b211e] hover:border-[#8f5843] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons matching the user's styling */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                {project.hasUiModal ? (
                  <>
                    <button
                      type="button"
                      id="openModalBtn"
                      onClick={onOpenJavaModal}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-b from-[#9d6550] to-[#8f5843] hover:from-[#8f5843] hover:to-[#754432] shadow-sm shadow-[#8f5843]/20 hover:-translate-y-0.5 transition-all"
                    >
                      <span>{lang === 'es' ? '🖼️ Ver Mockup / Capturas' : '🖼️ View UI Mockup'}</span>
                    </button>
                    {project.codeUrl ? (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-[#2b211e] bg-[#f7f5f0] border border-[#c5b4a5] hover:border-[#8f5843] hover:-translate-y-0.5 transition-all"
                      >
                        <span>{lang === 'es' ? '💻 Código' : '💻 Code'}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onOpenLiveModal(project, 'code')}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-[#2b211e] bg-[#f7f5f0] border border-[#c5b4a5] hover:border-[#8f5843] hover:-translate-y-0.5 transition-all"
                      >
                        <span>{lang === 'es' ? '💻 Código' : '💻 Code'}</span>
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {/* Live Web Link with direct access to user's URL */}
                    <a
                      href={project.liveUrl || 'https://xxejmgxx.github.io/Sabor-Binacional/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-b from-[#9d6550] to-[#8f5843] hover:from-[#8f5843] hover:to-[#754432] shadow-sm shadow-[#8f5843]/20 hover:-translate-y-0.5 transition-all"
                    >
                      <span>{lang === 'es' ? '🌐 Ver Web' : '🌐 Live Demo'}</span>
                      <ExternalLink className="w-3 h-3 text-white/80" />
                    </a>

                    {/* Interactive Glossary button & code link */}
                    <button
                      type="button"
                      onClick={() => onOpenLiveModal(project, 'live')}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-semibold text-xs text-[#8f5843] bg-[#f7f5f0] border border-[#c5b4a5] hover:border-[#8f5843] hover:-translate-y-0.5 transition-all"
                      title={lang === 'es' ? 'Diccionario Interactivo' : 'Interactive Glossary'}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{lang === 'es' ? 'Glosario' : 'Glossary'}</span>
                    </button>

                    {project.codeUrl ? (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-[#2b211e] bg-[#f7f5f0] border border-[#c5b4a5] hover:border-[#8f5843] hover:-translate-y-0.5 transition-all"
                      >
                        <span>{lang === 'es' ? '💻 Código' : '💻 Code'}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onOpenLiveModal(project, 'code')}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-[#2b211e] bg-[#f7f5f0] border border-[#c5b4a5] hover:border-[#8f5843] hover:-translate-y-0.5 transition-all"
                      >
                        <span>{lang === 'es' ? '💻 Código' : '💻 Code'}</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
