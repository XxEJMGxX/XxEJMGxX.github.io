import React, { useState, useEffect } from 'react';
import { Language, PORTFOLIO_CONTENT } from '../data/portfolioData';
import {
  X,
  Play,
  Image as ImageIcon,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Trophy,
  User,
  ExternalLink
} from 'lucide-react';

interface JavaQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface ScoreRecord {
  id: string;
  player: string;
  score: number;
  errors: number;
  grade: string;
  date: string;
}

export const JavaQuizModal: React.FC<JavaQuizModalProps> = ({ isOpen, onClose, lang }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'interactive'>('preview');

  // Screenshots state
  const javaProject = PORTFOLIO_CONTENT.projects.find((p) => p.id === 'java-quiz');
  const screenshots = javaProject?.screenshots || [];
  const [activeShotIdx, setActiveShotIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Interactive Quiz State mirroring JavaFX MVC implementation (Quiz.java & GestorArchivos.java)
  const questions = PORTFOLIO_CONTENT.quizQuestions;
  const [quizState, setQuizState] = useState<'menu' | 'playing' | 'results'>('menu');
  const [playerName, setPlayerName] = useState('Elías Nieto');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [errorsCount, setErrorsCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [timerActive, setTimerActive] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Stored leaderboard scores (mirroring puntuaciones.txt)
  const [leaderboard, setLeaderboard] = useState<ScoreRecord[]>(() => {
    const saved = localStorage.getItem('javaquiz_scores');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      { id: '1', player: 'Elías Nieto', score: 15, errors: 0, grade: '10.0', date: '2026-03-24' },
      { id: '2', player: 'Profesor DAW', score: 14, errors: 1, grade: '9.3', date: '2026-03-22' },
      { id: '3', player: 'Compañero DAW', score: 12, errors: 3, grade: '8.0', date: '2026-03-20' },
      { id: '4', player: 'Visitante Web', score: 11, errors: 4, grade: '7.3', date: '2026-03-18' }
    ];
  });

  // Save leaderboard to localStorage
  useEffect(() => {
    localStorage.setItem('javaquiz_scores', JSON.stringify(leaderboard));
  }, [leaderboard]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showLeaderboard) {
          setShowLeaderboard(false);
        } else if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      } else if (isOpen && activeTab === 'preview' && !isZoomed) {
        if (e.key === 'ArrowLeft') {
          setActiveShotIdx((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
        } else if (e.key === 'ArrowRight') {
          setActiveShotIdx((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isZoomed, showLeaderboard, activeTab, screenshots.length]);

  // Countdown timer for interactive quiz (20s per question like JavaFX Timeline)
  useEffect(() => {
    if (!isOpen || activeTab !== 'interactive' || quizState !== 'playing' || hasAnswered || !timerActive) return;

    if (secondsLeft <= 0) {
      // Time expired
      setHasAnswered(true);
      setErrorsCount((prev) => prev + 1);
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, activeTab, quizState, secondsLeft, hasAnswered, timerActive]);

  const handleStartQuiz = () => {
    setCurrentIdx(0);
    setSelectedKey(null);
    setHasAnswered(false);
    setScore(0);
    setErrorsCount(0);
    setSecondsLeft(20);
    setTimerActive(true);
    setQuizState('playing');
  };

  const handleSelectAnswer = (key: string) => {
    if (hasAnswered) return;
    setSelectedKey(key);
    setHasAnswered(true);
    const isCorrect = key === questions[currentIdx].correctKey;
    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      setErrorsCount((e) => e + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedKey(null);
      setHasAnswered(false);
      setSecondsLeft(20);
    } else {
      // Finish quiz and calculate academic grade like calcularNotaFinal()
      const total = questions.length;
      const finalScore = score + (selectedKey === questions[currentIdx].correctKey ? 0 : 0);
      const gradeVal = ((finalScore * 10) / total).toFixed(1);

      const newRecord: ScoreRecord = {
        id: Date.now().toString(),
        player: playerName.trim() || 'Jugador Anónimo',
        score: finalScore,
        errors: total - finalScore,
        grade: gradeVal,
        date: new Date().toISOString().split('T')[0]
      };

      setLeaderboard((prev) => [newRecord, ...prev].slice(0, 15));
      setTimerActive(false);
      setQuizState('results');
    }
  };

  if (!isOpen) return null;

  const currentQ = questions[currentIdx] || questions[0];
  const currentShot = screenshots[activeShotIdx] || screenshots[0];
  const finalGrade = ((score * 10) / questions.length).toFixed(1);

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2b211e]/75 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          className="w-full max-w-4xl bg-[#f7f5f0] border border-[#c5b4a5] rounded-[24px] p-4 sm:p-6 shadow-2xl overflow-hidden relative max-h-[94vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#c5b4a5]/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8f5843]"></span>
                <h3 className="text-base sm:text-lg font-extrabold text-[#2b211e]">
                  Quiz de Conocimientos de Java
                </h3>
                <span className="text-xs bg-[#8f5843]/15 text-[#8f5843] font-bold px-2 py-0.5 rounded-full">
                  JavaFX 17 • MVC
                </span>
              </div>
              <p className="text-xs text-[#5c4b45] mt-0.5">
                {lang === 'es'
                  ? 'Aplicación de escritorio interactiva desarrollada con JavaFX 17, Scene Builder y hojas de estilo CSS modulares.'
                  : 'Interactive desktop application built with JavaFX 17, Gluon Scene Builder, and modular CSS stylesheets.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#eae4dc] text-[#5c4b45] hover:text-[#2b211e] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab switch */}
          <div className="flex items-center gap-2 mt-3.5 bg-[#eae4dc] p-1 rounded-xl border border-[#c5b4a5]/70 w-fit">
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'preview'
                  ? 'bg-[#f7f5f0] text-[#8f5843] shadow-xs'
                  : 'text-[#5c4b45] hover:text-[#2b211e]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Capturas Reales (Mockup)' : 'Real Screenshots (Mockup)'}</span>
              <span className="text-[10px] bg-[#8f5843]/15 text-[#8f5843] font-bold px-1.5 py-0.2 rounded-full ml-0.5">
                {screenshots.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('interactive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'interactive'
                  ? 'bg-[#8f5843] text-white shadow-xs'
                  : 'text-[#5c4b45] hover:text-[#2b211e]'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{lang === 'es' ? '▶️ Jugar Test Online Oficial' : '▶️ Play Official Online Test'}</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-3.5 flex-1 overflow-y-auto pr-1">
            {activeTab === 'preview' ? (
              <div className="space-y-4">
                {/* Desktop Window Frame for the real Screenshot */}
                <div className="rounded-2xl border border-[#c5b4a5] overflow-hidden shadow-lg bg-[#14161d] text-white">
                  {/* macOS / JavaFX Desktop Titlebar */}
                  <div className="bg-[#1e2029] px-4 py-2.5 flex items-center justify-between border-b border-[#2b2d38]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#e06c75]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#e5c07b]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#98c379]"></span>
                      <span className="ml-2 font-mono text-xs text-[#abb2bf] font-medium hidden sm:inline">
                        JavaQuiz - Edición DAW
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-[#8f5843] bg-[#f7f5f0] px-2 py-0.5 rounded font-bold">
                        {activeShotIdx + 1} / {screenshots.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsZoomed(true)}
                        className="p-1 rounded hover:bg-[#2b2d38] text-[#abb2bf] hover:text-white transition-colors"
                        title={lang === 'es' ? 'Ampliar imagen' : 'Zoom in'}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Main Display Image - 100% visible uncropped */}
                  <div className="relative bg-[#0d0e12] flex items-center justify-center min-h-[240px] sm:min-h-[320px] max-h-[460px] group overflow-hidden p-2 sm:p-3">
                    <img
                      src={currentShot.src}
                      alt={currentShot.title[lang]}
                      className="w-full h-auto max-h-[440px] object-contain transition-transform duration-200 cursor-pointer rounded-lg"
                      onClick={() => setIsZoomed(true)}
                    />

                    {/* Left / Right Carousel arrows */}
                    <button
                      type="button"
                      onClick={() =>
                        setActiveShotIdx((prev) =>
                          prev > 0 ? prev - 1 : screenshots.length - 1
                        )
                      }
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#8f5843] transition-all opacity-85 group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveShotIdx((prev) =>
                          prev < screenshots.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#8f5843] transition-all opacity-85 group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Caption Bar below image so no part of the screenshot is blocked */}
                  <div className="bg-[#1a1c24] border-t border-[#2b2d38] px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-[#e5c07b] mr-2">
                        {currentShot.title[lang]}:
                      </span>
                      <span className="text-[#abb2bf]">{currentShot.desc[lang]}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsZoomed(true)}
                      className="inline-flex items-center gap-1 text-[11px] text-[#8f5843] bg-[#f7f5f0] px-2.5 py-1 rounded-md font-semibold hover:bg-white shrink-0 self-start sm:self-auto transition-colors"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>{lang === 'es' ? 'Ver en grande' : 'Enlarge'}</span>
                    </button>
                  </div>
                </div>

                {/* Horizontal Thumbnail Strip for Quick Navigation */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 text-xs text-[#5c4b45]">
                    <span className="font-bold text-[#2b211e]">
                      {lang === 'es' ? 'Galería de Pantallas del Proyecto:' : 'Project Screen Gallery:'}
                    </span>
                    <span>
                      {lang === 'es'
                        ? 'Haz clic o usa las flechas para explorar'
                        : 'Click or use arrows to navigate'}
                    </span>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {screenshots.map((shot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveShotIdx(idx)}
                        className={`shrink-0 w-20 sm:w-24 h-14 rounded-lg overflow-hidden border-2 transition-all relative ${
                          activeShotIdx === idx
                            ? 'border-[#8f5843] scale-105 shadow-md shadow-[#8f5843]/20 ring-2 ring-[#8f5843]/40'
                            : 'border-[#c5b4a5] opacity-70 hover:opacity-100 hover:border-[#8f5843]'
                        }`}
                        title={shot.title[lang]}
                      >
                        <img
                          src={shot.src}
                          alt={shot.title[lang]}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute bottom-0.5 right-0.5 bg-black/70 text-white text-[9px] font-mono px-1 rounded">
                          {idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Technical highlight banner */}
                <div className="p-3.5 rounded-xl bg-[#eae4dc] border border-[#c5b4a5] text-xs text-[#5c4b45] flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#8f5843] shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-[#2b211e]">
                      {lang === 'es' ? 'Detalles Técnicos de la Implementación:' : 'Technical Implementation Details:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Desarrollado bajo el patrón arquitectónico MVC en Java 17. La interfaz visual fue construida con Gluon Scene Builder y decorada con hojas de estilo CSS modulares (animaciones de hover, temporizador con Timeline reactivo y ventana modal para histórico de partidas).'
                      : 'Built using the MVC architectural pattern in Java 17. The visual interface was designed with Gluon Scene Builder and customized with modular CSS (reactive countdown Timeline, custom button states, and persistent match history dialog).'}
                  </div>
                </div>
              </div>
            ) : (
              /* Authentic Interactive Playable Mode mirroring JavaQuiz MVC */
              <div>
                {quizState === 'menu' && (
                  <div className="bg-[#eae4dc] p-6 sm:p-8 rounded-2xl border border-[#c5b4a5] text-center max-w-xl mx-auto shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-[#8f5843]/15 text-[#8f5843] mx-auto flex items-center justify-center mb-3">
                      <Award className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-[#2b211e]">
                      JavaQuiz - Edición DAW
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5c4b45] mt-1.5 mb-6">
                      {lang === 'es'
                        ? '15 preguntas de examen tipo test extraídas directamente del banco original de la aplicación. 20 segundos de temporizador por pregunta y calificación ponderada sobre 10.0.'
                        : '15 multiple-choice questions extracted directly from the original desktop bank. 20-second countdown timer per question and academic grading over 10.0.'}
                    </p>

                    <div className="bg-[#f7f5f0] p-4 rounded-xl border border-[#c5b4a5] mb-5 text-left">
                      <label className="block text-xs font-bold text-[#2b211e] mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#8f5843]" />
                        <span>{lang === 'es' ? 'Nombre del Jugador:' : 'Player Name:'}</span>
                      </label>
                      <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder={lang === 'es' ? 'Introduce tu nombre' : 'Enter your name'}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5b4a5] bg-white text-sm font-semibold text-[#2b211e] focus:outline-none focus:ring-2 focus:ring-[#8f5843]"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                      <button
                        type="button"
                        onClick={handleStartQuiz}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8f5843] text-white font-bold text-sm hover:bg-[#754432] shadow-md shadow-[#8f5843]/20 transition-all hover:-translate-y-0.5"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>{lang === 'es' ? 'Comenzar Examen (15 Preguntas)' : 'Start Exam (15 Questions)'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowLeaderboard(true)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#f7f5f0] border border-[#c5b4a5] text-[#2b211e] font-bold text-sm hover:border-[#8f5843] transition-all"
                      >
                        <Trophy className="w-4 h-4 text-amber-600" />
                        <span>{lang === 'es' ? 'Ver Clasificación' : 'View Leaderboard'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {quizState === 'playing' && (
                  <div className="bg-[#eae4dc] p-5 sm:p-6 rounded-2xl border border-[#c5b4a5]">
                    {/* Header info */}
                    <div className="flex items-center justify-between mb-3 text-xs font-bold text-[#5c4b45]">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#f7f5f0] px-2.5 py-1 rounded-lg border border-[#c5b4a5] text-[#2b211e]">
                          {lang === 'es'
                            ? `Pregunta ${currentIdx + 1} de ${questions.length}`
                            : `Question ${currentIdx + 1} of ${questions.length}`}
                        </span>
                        <span className="hidden sm:inline text-[#8f5843]">
                          👤 {playerName || 'Jugador'}
                        </span>
                      </div>

                      <div
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          secondsLeft <= 5
                            ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                            : 'bg-[#f7f5f0] text-[#8f5843] border border-[#c5b4a5]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{secondsLeft}s</span>
                      </div>
                    </div>

                    {/* Visual Progress Bar (representing JavaFX ProgressBar) */}
                    <div className="w-full bg-[#c5b4a5]/40 h-2.5 rounded-full overflow-hidden mb-5">
                      <div
                        className="bg-[#8f5843] h-full transition-all duration-300"
                        style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                      />
                    </div>

                    {/* Question text */}
                    <div className="bg-[#f7f5f0] p-4 rounded-xl border border-[#c5b4a5] mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8f5843] block mb-1">
                        {lang === 'es' ? 'Enunciado de la Pregunta' : 'Question Prompt'}
                      </span>
                      <h4 className="text-base sm:text-lg font-extrabold text-[#2b211e]">
                        {currentQ.question[lang]}
                      </h4>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 gap-2.5 mb-4">
                      {currentQ.options.map((opt) => {
                        const isSelected = selectedKey === opt.key;
                        const isCorrect = opt.key === currentQ.correctKey;

                        let btnStyle = 'bg-[#f7f5f0] border-[#c5b4a5] hover:border-[#8f5843] text-[#2b211e]';
                        if (hasAnswered) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-950 font-bold shadow-xs';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'bg-rose-100 border-2 border-rose-500 text-rose-950 font-medium';
                          } else {
                            btnStyle = 'bg-[#f7f5f0]/60 border-[#c5b4a5]/50 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            disabled={hasAnswered}
                            onClick={() => handleSelectAnswer(opt.key)}
                            className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${btnStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                                  isSelected
                                    ? isCorrect
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-rose-600 text-white'
                                    : isCorrect && hasAnswered
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-[#eae4dc] text-[#5c4b45]'
                                }`}
                              >
                                {opt.key}
                              </span>
                              <span className="text-sm font-semibold">{opt.text}</span>
                            </div>
                            {hasAnswered && isCorrect && (
                              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Real-time explanation */}
                    {hasAnswered && (
                      <div className="p-4 rounded-xl bg-[#f7f5f0] border border-[#c5b4a5] mb-4 text-xs">
                        <p className="font-bold text-sm mb-1 flex items-center gap-1.5">
                          {selectedKey === currentQ.correctKey ? (
                            <span className="text-emerald-700 flex items-center gap-1">
                              ✅ {lang === 'es' ? '¡Respuesta Correcta!' : 'Correct Answer!'}
                            </span>
                          ) : (
                            <span className="text-rose-700 flex items-center gap-1">
                              ❌ {lang === 'es' ? 'Respuesta Incorrecta' : 'Incorrect Answer'}
                            </span>
                          )}
                        </p>
                        <p className="text-[#5c4b45] leading-relaxed">
                          {currentQ.explanation[lang]}
                        </p>
                      </div>
                    )}

                    {/* Next / Submit Button */}
                    {hasAnswered && (
                      <div className="flex justify-between items-center pt-2">
                        <div className="text-xs text-[#5c4b45] font-semibold">
                          <span>{lang === 'es' ? 'Aciertos acumulados:' : 'Score:'} </span>
                          <strong className="text-emerald-700">{score}</strong> •{' '}
                          <span>{lang === 'es' ? 'Errores:' : 'Errors:'} </span>
                          <strong className="text-rose-700">{errorsCount}</strong>
                        </div>
                        <button
                          type="button"
                          onClick={handleNextQuestion}
                          className="px-5 py-2.5 rounded-xl bg-[#8f5843] text-white font-bold text-xs sm:text-sm hover:bg-[#754432] transition-colors shadow-xs"
                        >
                          {currentIdx + 1 < questions.length
                            ? lang === 'es'
                              ? 'Siguiente Pregunta →'
                              : 'Next Question →'
                            : lang === 'es'
                            ? 'Ver Resultados Finales'
                            : 'See Final Results'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {quizState === 'results' && (
                  <div className="text-center py-6 sm:py-8 bg-[#eae4dc] rounded-2xl border border-[#c5b4a5] p-6 max-w-lg mx-auto shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-[#8f5843]/15 text-[#8f5843] mx-auto flex items-center justify-center mb-3">
                      <Trophy className="w-8 h-8 text-[#8f5843]" />
                    </div>
                    <h4 className="text-2xl font-extrabold text-[#2b211e] mb-1">
                      {lang === 'es' ? 'Resultados del Quiz' : 'Quiz Results'}
                    </h4>
                    <p className="text-xs text-[#5c4b45] mb-4">
                      {lang === 'es' ? 'Jugador evaluado:' : 'Assessed Player:'}{' '}
                      <strong className="text-[#2b211e]">{playerName}</strong>
                    </p>

                    {/* Academic Note Card mirroring calcularNotaFinal() */}
                    <div className="bg-[#f7f5f0] p-5 rounded-2xl border border-[#c5b4a5] mb-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#8f5843] block mb-1">
                        {lang === 'es' ? 'Nota Académica Final' : 'Final Academic Grade'}
                      </span>
                      <div className="text-4xl font-black text-[#8f5843] mb-2">
                        {finalGrade} <span className="text-lg font-bold text-[#5c4b45]">/ 10.0</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#c5b4a5]/60 text-xs">
                        <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                          <span className="text-emerald-800 font-medium block">
                            {lang === 'es' ? 'Aciertos' : 'Correct'}
                          </span>
                          <strong className="text-emerald-900 text-lg font-bold">{score} / {questions.length}</strong>
                        </div>
                        <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                          <span className="text-rose-800 font-medium block">
                            {lang === 'es' ? 'Errores' : 'Errors'}
                          </span>
                          <strong className="text-rose-900 text-lg font-bold">{questions.length - score}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                      <button
                        type="button"
                        onClick={handleStartQuiz}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8f5843] text-white font-bold text-xs sm:text-sm hover:bg-[#754432] transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>{lang === 'es' ? 'Repetir Quiz' : 'Retry Quiz'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowLeaderboard(true)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#f7f5f0] border border-[#c5b4a5] text-[#2b211e] font-bold text-xs sm:text-sm hover:border-[#8f5843] transition-colors"
                      >
                        <Trophy className="w-4 h-4 text-amber-600" />
                        <span>{lang === 'es' ? 'Ver Clasificación' : 'View Ranking'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="mt-4 pt-3 border-t border-[#c5b4a5]/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#5c4b45]">
                {javaProject?.codeUrl && (
                  <a
                    href={javaProject.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#8f5843] hover:underline"
                  >
                    <span>GitHub: XxEJMGxX/Java-Quiz</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </span>
            </div>

            <button
              type="button"
              id="closeModalBtn"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#8f5843] text-white font-semibold text-xs md:text-sm hover:bg-[#754432] transition-colors"
            >
              {lang === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard Modal (mirroring tertiary.fxml & GestorArchivos.java) */}
      {showLeaderboard && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 bg-black/75 flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowLeaderboard(false)}
        >
          <div
            className="w-full max-w-md bg-[#f7f5f0] border border-[#c5b4a5] rounded-2xl p-5 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#c5b4a5]/60 mb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-600" />
                <h4 className="font-extrabold text-[#2b211e]">
                  {lang === 'es' ? 'Clasificación y Puntuaciones' : 'Score Leaderboard'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowLeaderboard(false)}
                className="p-1 rounded-full hover:bg-[#eae4dc] text-[#5c4b45]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-[#5c4b45] mb-3">
              {lang === 'es'
                ? 'Histórico de partidas persistido localmente (formato oficial de GestorArchivos.java):'
                : 'Locally persisted match history (official GestorArchivos.java format):'}
            </p>

            <div className="max-h-64 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
              {leaderboard.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-[#eae4dc] p-3 rounded-xl border border-[#c5b4a5] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#8f5843] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-[#2b211e]">{item.player}</p>
                      <p className="text-[10px] text-[#5c4b45]">
                        Aciertos: {item.score} | Errores: {item.errors}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[#8f5843] font-bold text-sm">{item.grade}</span>
                    <span className="text-[9px] text-[#5c4b45] block">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#c5b4a5]/60 flex justify-end">
              <button
                type="button"
                onClick={() => setShowLeaderboard(false)}
                className="px-4 py-2 rounded-xl bg-[#8f5843] text-white font-semibold text-xs hover:bg-[#754432]"
              >
                {lang === 'es' ? 'Volver al Quiz' : 'Back to Quiz'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / Zoom Dialog for Fullscreen Screenshot inspection */}
      {isZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setIsZoomed(false)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-3 text-white z-10">
            <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded">
              {activeShotIdx + 1} / {screenshots.length}
            </span>
            <button
              type="button"
              onClick={() => setIsZoomed(false)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            className="max-w-6xl max-h-[85vh] relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentShot.src}
              alt={currentShot.title[lang]}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />

            <button
              type="button"
              onClick={() =>
                setActiveShotIdx((prev) =>
                  prev > 0 ? prev - 1 : screenshots.length - 1
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white hover:bg-[#8f5843] transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveShotIdx((prev) =>
                  prev < screenshots.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white hover:bg-[#8f5843] transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-3 text-center text-white max-w-xl">
            <h4 className="font-bold text-sm">{currentShot.title[lang]}</h4>
            <p className="text-xs text-white/70 mt-0.5">{currentShot.desc[lang]}</p>
          </div>
        </div>
      )}
    </>
  );
};
