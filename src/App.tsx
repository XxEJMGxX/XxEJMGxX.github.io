/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, Project } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { SkillsBento } from './components/SkillsBento';
import { ContactSection } from './components/ContactSection';
import { JavaQuizModal } from './components/JavaQuizModal';
import { LiveProjectModal } from './components/LiveProjectModal';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return saved === 'en' ? 'en' : 'es';
  });

  const [javaModalOpen, setJavaModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [liveModal, setLiveModal] = useState<{
    isOpen: boolean;
    project: Project | null;
    mode: 'live' | 'code';
  }>({
    isOpen: false,
    project: null,
    mode: 'live',
  });

  // Sync lang with HTML lang attribute and localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const handleOpenLiveModal = (project: Project, mode: 'live' | 'code') => {
    setLiveModal({
      isOpen: true,
      project,
      mode,
    });
  };

  const handleCloseLiveModal = () => {
    setLiveModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#2b211e] flex flex-col font-sans">
      {/* Sticky Glass Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenCv={() => setResumeModalOpen(true)}
      />

      {/* Main Content Container */}
      <main className="w-[min(1140px,92%)] mx-auto flex-1">
        {/* Hero Section */}
        <Hero
          lang={lang}
          onOpenCv={() => setResumeModalOpen(true)}
        />

        {/* Featured Projects Section */}
        <Projects
          lang={lang}
          onOpenJavaModal={() => setJavaModalOpen(true)}
          onOpenLiveModal={handleOpenLiveModal}
        />

        {/* Skills & Education Bento Section */}
        <SkillsBento lang={lang} />
      </main>

      {/* Footer & Contact Section */}
      <ContactSection lang={lang} />

      {/* Java Knowledge Quiz Modal (Scene Builder preview + playable quiz) */}
      <JavaQuizModal
        isOpen={javaModalOpen}
        onClose={() => setJavaModalOpen(false)}
        lang={lang}
      />

      {/* Live Project & Source Code Preview Modal */}
      <LiveProjectModal
        isOpen={liveModal.isOpen}
        onClose={handleCloseLiveModal}
        project={liveModal.project}
        mode={liveModal.mode}
        lang={lang}
      />

      {/* Full Resume / CV Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
