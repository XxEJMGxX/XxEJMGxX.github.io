import React, { useState, useEffect } from 'react';
import { Language, Project, PORTFOLIO_CONTENT } from '../data/portfolioData';
import { X, ExternalLink, Code2, Globe, Check, BookOpen } from 'lucide-react';

interface LiveProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  mode: 'live' | 'code';
  lang: Language;
}

export const LiveProjectModal: React.FC<LiveProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  mode,
  lang,
}) => {
  const [activeFood, setActiveFood] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  // Authentic glossary from Sabor Binacional (Hablando en Plata)
  const glossary = PORTFOLIO_CONTENT.saborBinacionalGlossary;

  // Code snippets for each project
  const getCodeSnippet = () => {
    if (project.id === 'sabor-binacional') {
      return `<!-- pages/hablando-plata.html — Sabor Binacional (Código Oficial) -->
<main class="glosario-container fade-in">
  <section class="glosario-header">
    <h1>Hablando en Plata</h1>
    <p>
      El mismo cambur de allá te resbala aquí con otro nombre. Glosario
      binacional de términos culinarios para que no te quedes en las nubes.
    </p>
  </section>

  <div class="glosario-grid">
    <!-- Término: Mecato / Chuchería -->
    <article class="glosario-card">
      <div class="glosario-title">
        <h3>Mecato vs Chuchería</h3>
        <span class="glosario-country-tag tag-co">🇨🇴 Mecato</span>
        <span class="glosario-country-tag tag-ve">🇻🇪 Chuchería</span>
      </div>
      <p class="glosario-desc">
        Golosinas, dulces comerciales, snacks o "galguerías" de paquete,
        usualmente ultraprocesados que se comen entre comidas principales...
      </p>
    </article>

    <!-- Término: Pasaboca / Pasapalo -->
    <article class="glosario-card">
      <div class="glosario-title">
        <h3>Pasaboca vs Pasapalo</h3>
        <span class="glosario-country-tag tag-co">🇨🇴 Pasaboca</span>
        <span class="glosario-country-tag tag-ve">🇻🇪 Pasapalo</span>
      </div>
      <p class="glosario-desc">
        Aperitivos o pequeños bocados salados que se sirven en fiestas...
      </p>
    </article>
  </div>
</main>`;
    }

    return `// quiz/src/main/java/com/javafx/GestorArchivos.java — Java Quiz
package com.javafx;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class GestorArchivos {
    private static final String DIRECTORIO_DATOS = System.getProperty("user.home") + File.separator + "JavaQuiz";
    private static final String RUTA_PREGUNTAS = DIRECTORIO_DATOS + File.separator + "preguntas.txt";
    private static final String RUTA_PUNTUACIONES = DIRECTORIO_DATOS + File.separator + "puntuaciones.txt";

    // Inicializa la base de datos de 15 preguntas CSV y archivo de puntuaciones
    public void crearArchivosIniciales() {
        File directorio = new File(DIRECTORIO_DATOS);
        if (!directorio.exists()) directorio.mkdirs();
        // ...
    }

    public List<Pregunta> leerPreguntas() {
        List<Pregunta> lista = new ArrayList<>();
        // Parsea preguntas estructuradas en CSV con enunciado, 4 opciones y respuesta correcta
        return lista;
    }
}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b211e]/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#f7f5f0] border border-[#c5b4a5] rounded-[24px] p-6 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Window Topbar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#c5b4a5]/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#eae4dc] px-2.5 py-1 rounded-full border border-[#c5b4a5]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c86d58]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#d4a359]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#7a9a76]"></span>
              <span className="ml-1 text-xs font-mono text-[#5c4b45]">{project.windowUrl}</span>
            </div>
            <span className="text-sm font-bold text-[#2b211e] hidden sm:inline">{project.title}</span>
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#8f5843] text-white hover:bg-[#754432] transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'Abrir Web' : 'Open Web'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#eae4dc] text-[#5c4b45] hover:text-[#2b211e] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          {mode === 'code' ? (
            /* Code Repository Viewer */
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#8f5843]" />
                  <span className="text-xs font-bold text-[#2b211e]">
                    {lang === 'es' ? 'Código Fuente Estructurado' : 'Structured Source Code'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#eae4dc] border border-[#c5b4a5] text-[#2b211e] hover:border-[#8f5843]"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>GitHub</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-[#eae4dc] border border-[#c5b4a5] text-[#2b211e] hover:border-[#8f5843]"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{lang === 'es' ? 'Copiado' : 'Copied'}</span>
                      </>
                    ) : (
                      <span>{lang === 'es' ? 'Copiar código' : 'Copy code'}</span>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-[#333]">
                <pre>{getCodeSnippet()}</pre>
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-[#eae4dc] border border-[#c5b4a5] text-xs text-[#5c4b45]">
                <p className="font-semibold text-[#2b211e] mb-1">
                  {lang === 'es' ? 'Estructura del Repositorio:' : 'Repository Structure:'}
                </p>
                <p>
                  {lang === 'es'
                    ? 'Cumple estándares modernos de maquetación semántica, accesibilidad WCAG y CSS responsivo.'
                    : 'Adheres to modern semantic HTML standards, WCAG accessibility, and responsive CSS architecture.'}
                </p>
              </div>
            </div>
          ) : (
            /* Live Interactive Prototype: Hablando en Plata */
            <div>
              {/* Official Project Banner: 100% visible without cropping */}
              <div className="rounded-2xl border border-[#c5b4a5] overflow-hidden mb-4 relative shadow-sm w-full aspect-[1024/506] bg-[#14161d]">
                <img
                  src="/assets/aistudio/image_17a916bd.png"
                  alt="Sabor Binacional - El sabor que une fronteras"
                  className="w-full h-full object-contain object-center"
                />
              </div>

              <div className="bg-[#eae4dc] p-4 rounded-2xl border border-[#c5b4a5] mb-4 text-center">
                <h4 className="text-lg font-bold text-[#2b211e]">
                  Hablando en Plata — {lang === 'es' ? 'Glosario Culinario Binacional' : 'Binational Culinary Glossary'}
                </h4>
                <p className="text-xs text-[#5c4b45] max-w-xl mx-auto mt-1 italic">
                  &ldquo;{lang === 'es'
                    ? 'El mismo cambur de allá te resbala aquí con otro nombre. Glosario binacional de términos culinarios para que no te quedes en las nubes.'
                    : 'The same food from over there rolls off with another name here. Binational glossary of everyday culinary terms across borders.'}&rdquo;
                </p>
                {project.liveUrl && (
                  <div className="mt-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#8f5843] text-white hover:bg-[#754432] transition-colors shadow-xs"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Visitar sitio web oficial en vivo' : 'Visit live official website'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Glossary Item Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {glossary.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveFood(idx)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 ${
                      activeFood === idx
                        ? 'bg-[#8f5843] text-white border-[#8f5843] shadow-xs'
                        : 'bg-[#f7f5f0] text-[#2b211e] border-[#c5b4a5] hover:border-[#8f5843]'
                    }`}
                  >
                    <span className="text-base shrink-0">{item.emoji}</span>
                    <div className="min-w-0">
                      <p className="truncate font-bold">{item.title}</p>
                      <p className={`text-[10px] truncate ${activeFood === idx ? 'text-white/80' : 'text-[#8f5843]'}`}>
                        {item.category[lang]}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Term Comparison Card */}
              {glossary[activeFood] && (
                <div className="bg-[#eae4dc] border border-[#c5b4a5] p-5 rounded-2xl shadow-xs">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#c5b4a5]/60">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#8f5843]" />
                      <span className="font-bold text-sm text-[#2b211e]">
                        {glossary[activeFood].title}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold bg-[#f7f5f0] text-[#8f5843] px-2.5 py-0.5 rounded-full border border-[#c5b4a5]">
                      {glossary[activeFood].category[lang]}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                    {/* Colombia Column */}
                    <div className="bg-[#f7f5f0] p-4 rounded-xl border-2 border-amber-200/90 shadow-xs">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-1">
                        <span>🇨🇴 Colombia</span>
                      </div>
                      <h5 className="font-extrabold text-base text-[#2b211e]">
                        {glossary[activeFood].colombia}
                      </h5>
                    </div>

                    {/* Venezuela Column */}
                    <div className="bg-[#f7f5f0] p-4 rounded-xl border-2 border-sky-200/90 shadow-xs">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800 mb-1">
                        <span>🇻🇪 Venezuela</span>
                      </div>
                      <h5 className="font-extrabold text-base text-[#2b211e]">
                        {glossary[activeFood].venezuela}
                      </h5>
                    </div>
                  </div>

                  <div className="p-4 bg-[#f7f5f0] rounded-xl border border-[#c5b4a5] text-xs text-[#5c4b45] leading-relaxed">
                    <strong className="text-[#2b211e] block mb-1.5 font-bold">
                      {lang === 'es' ? 'Definición y contexto cultural binacional:' : 'Definition & shared cultural context:'}
                    </strong>
                    {glossary[activeFood].description[lang]}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-[#c5b4a5]/60 flex items-center justify-between">
          <div className="text-xs text-[#5c4b45]">
            <span>{project.tags.join(' • ')}</span>
          </div>

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
