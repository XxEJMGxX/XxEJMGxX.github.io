import React, { useState } from 'react';
import { Language, PORTFOLIO_CONTENT } from '../data/portfolioData';
import { Mail, Phone, Copy, Check, Send, ExternalLink, MapPin } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const content = PORTFOLIO_CONTENT.contact;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showQuickNote, setShowQuickNote] = useState(false);
  const [noteSender, setNoteSender] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [sentStatus, setSentStatus] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSendQuickNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteBody.trim()) return;

    // Open mailto link with pre-filled content
    const subject = encodeURIComponent(
      lang === 'es'
        ? `Contacto desde el Portafolio web - ${noteSender || 'Empresa / Reclutador'}`
        : `Contact from Web Portfolio - ${noteSender || 'Company / Recruiter'}`
    );
    const body = encodeURIComponent(
      `Remitente: ${noteSender || 'No especificado'}\n\n${noteBody}\n\nEnviado desde el portafolio de Elías Nieto.`
    );
    window.location.href = `mailto:${content.email}?subject=${subject}&body=${body}`;

    setSentStatus(
      lang === 'es' ? 'Abriendo cliente de correo...' : 'Opening email client...'
    );
    setTimeout(() => {
      setSentStatus(null);
      setShowQuickNote(false);
      setNoteBody('');
      setNoteSender('');
    }, 2500);
  };

  return (
    <footer id="contacto" className="mt-16 bg-[#eae4dc] border-t border-[#c5b4a5] py-12 md:py-16">
      <div className="w-[min(1140px,92%)] mx-auto">
        {/* Main contact bar matching the original structure */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-8 border-b border-[#c5b4a5]/60">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2b211e] mb-2">
              {content.title[lang]}
            </h2>
            <p className="text-sm sm:text-base text-[#5c4b45] max-w-xl">
              {content.subtitle[lang]}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Email button */}
            <div className="relative group">
              <a
                href={`mailto:${content.email}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-b from-[#9d6550] to-[#8f5843] hover:from-[#8f5843] hover:to-[#754432] shadow-md shadow-[#8f5843]/20 hover:-translate-y-0.5 transition-all"
              >
                <span>✉️</span>
                <span>{content.email}</span>
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(content.email, 'email')}
                title={lang === 'es' ? 'Copiar email' : 'Copy email'}
                aria-label="Copy email"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-black/20 text-white hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Phone button */}
            <div className="relative group">
              <a
                href={`tel:${content.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-[#2b211e] bg-[#f7f5f0] border border-[#c5b4a5] hover:border-[#8f5843] hover:-translate-y-0.5 transition-all shadow-xs"
              >
                <span>📞</span>
                <span>{content.phone}</span>
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(content.phone, 'phone')}
                title={lang === 'es' ? 'Copiar teléfono' : 'Copy phone'}
                aria-label="Copy phone"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#eae4dc] text-[#5c4b45] hover:text-[#2b211e] transition-colors opacity-0 group-hover:opacity-100"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* GitHub button */}
            <a
              href={content.github || "https://github.com/XxEJMGxX"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil de GitHub"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-sm text-[#2b211e] bg-[#f7f5f0] border border-[#c5b4a5] hover:border-[#8f5843] hover:-translate-y-0.5 transition-all shadow-xs"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>

            {/* LinkedIn button */}
            <a
              href={content.linkedin || "https://www.linkedin.com/in/elias-nieto-dev/"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil de LinkedIn"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-sm text-[#2b211e] bg-[#f7f5f0] border border-[#c5b4a5] hover:border-[#8f5843] hover:-translate-y-0.5 transition-all shadow-xs"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        {/* Quick Message Form Toggle */}
        <div className="pt-6">
          {!showQuickNote ? (
            <button
              type="button"
              onClick={() => setShowQuickNote(true)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#8f5843] hover:text-[#754432] transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {lang === 'es'
                  ? '¿Prefieres redactar un mensaje directo rápido? Clic aquí'
                  : 'Prefer to draft a quick direct message? Click here'}
              </span>
            </button>
          ) : (
            <form
              onSubmit={handleSendQuickNote}
              className="max-w-xl bg-[#f7f5f0] p-5 rounded-2xl border border-[#c5b4a5] animate-in fade-in duration-200 mt-2"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm text-[#2b211e]">
                  {lang === 'es' ? 'Mensaje directo a Elías' : 'Direct Message to Elías'}
                </h4>
                <button
                  type="button"
                  onClick={() => setShowQuickNote(false)}
                  className="text-xs text-[#5c4b45] hover:text-[#2b211e]"
                >
                  {lang === 'es' ? 'Cancelar' : 'Cancel'}
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#5c4b45] mb-1">
                    {lang === 'es' ? 'Tu nombre / Empresa / Correo' : 'Your name / Company / Email'}
                  </label>
                  <input
                    type="text"
                    value={noteSender}
                    onChange={(e) => setNoteSender(e.target.value)}
                    placeholder={lang === 'es' ? 'Ej. Reclutador Tech, TechCorp' : 'e.g., Tech Recruiter, TechCorp'}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#c5b4a5] bg-[#eae4dc]/60 focus:bg-[#f7f5f0] focus:border-[#8f5843] outline-hidden text-[#2b211e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5c4b45] mb-1">
                    {lang === 'es' ? 'Propuesta o Mensaje' : 'Proposal or Message'}
                  </label>
                  <textarea
                    rows={3}
                    value={noteBody}
                    onChange={(e) => setNoteBody(e.target.value)}
                    placeholder={
                      lang === 'es'
                        ? 'Hola Elías, nos gustaría conversar contigo acerca de una oportunidad de prácticas de desarrollo web...'
                        : 'Hi Elías, we would love to talk to you about a web development internship opportunity...'
                    }
                    className="w-full text-xs p-2.5 rounded-xl border border-[#c5b4a5] bg-[#eae4dc]/60 focus:bg-[#f7f5f0] focus:border-[#8f5843] outline-hidden text-[#2b211e]"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  {sentStatus ? (
                    <span className="text-xs font-semibold text-emerald-700">{sentStatus}</span>
                  ) : (
                    <span className="text-[11px] text-[#5c4b45]">
                      {lang === 'es' ? 'Se abrirá tu cliente de correo' : 'Will open your email client'}
                    </span>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8f5843] text-white text-xs font-bold hover:bg-[#754432] transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Enviar' : 'Send'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-8 pt-6 border-t border-[#c5b4a5]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5c4b45]">
          <p>© {new Date().getFullYear()} Elías José Nieto Urieta • Madrid, España</p>
          <p>
            {lang === 'es'
              ? 'Desarrollado con HTML5, Tailwind CSS y React'
              : 'Built with HTML5, Tailwind CSS and React'}
          </p>
        </div>
      </div>
    </footer>
  );
};
