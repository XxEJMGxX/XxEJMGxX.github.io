import React, { useState } from 'react';
import { Language, PORTFOLIO_CONTENT } from '../data/portfolioData';
import { Code2, GraduationCap, Layers, Database, Wrench, Sparkles, CheckCircle2, Server, Briefcase, HeartHandshake } from 'lucide-react';

interface SkillsBentoProps {
  lang: Language;
}

export const SkillsBento: React.FC<SkillsBentoProps> = ({ lang }) => {
  const content = PORTFOLIO_CONTENT.skillsSection;
  const experience = PORTFOLIO_CONTENT.workExperience;
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const categoryIcons = [
    <Sparkles key="ui" className="w-4 h-4 text-[#8f5843]" />,
    <Layers key="be" className="w-4 h-4 text-[#8f5843]" />,
    <Database key="db" className="w-4 h-4 text-[#8f5843]" />,
    <Server key="srv" className="w-4 h-4 text-[#8f5843]" />,
    <Wrench key="tool" className="w-4 h-4 text-[#8f5843]" />
  ];

  return (
    <section id="habilidades" className="py-12 md:py-16">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2b211e]">
          {content.title[lang]}
        </h2>
        <p className="text-sm sm:text-base text-[#5c4b45] mt-1.5">
          {lang === 'es'
            ? 'Competencias técnicas oficiales, experiencia laboral y formación continua según currículum.'
            : 'Official technical competencies, work experience, and continuous education from CV.'}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Box 1: Tech Stack & Competencies (span 7) */}
        <div className="lg:col-span-7 bg-[#eae4dc] border border-[#c5b4a5] rounded-[22px] p-6 sm:p-7 shadow-md shadow-[#2b211e]/5 relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#f7f5f0] rounded-xl border border-[#c5b4a5]">
                  <Code2 className="w-5 h-5 text-[#8f5843]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#8f5843]">
                  {content.techStackTitle[lang]}
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#8f5843] bg-[#f7f5f0] px-3 py-1 rounded-full border border-[#c5b4a5]">
                2.º DAW
              </span>
            </div>

            <div className="space-y-3.5">
              {content.skillsList.map((skillGroup, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveCategory(idx)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className={`p-4 rounded-xl border transition-all ${
                    activeCategory === idx
                      ? 'bg-[#f7f5f0] border-[#8f5843] shadow-xs'
                      : 'bg-[#f7f5f0]/75 border-[#c5b4a5]/70 hover:border-[#8f5843]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-[#2b211e]">
                    {categoryIcons[idx]}
                    <span>{skillGroup.category[lang]}</span>
                  </div>

                  <p className="text-xs text-[#5c4b45] mb-2.5 leading-relaxed">
                    {skillGroup.description[lang]}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="bg-[#eae4dc] text-[#5c4b45] text-xs font-semibold px-2.5 py-0.5 rounded-md border border-[#c5b4a5]/60 hover:text-[#2b211e] hover:border-[#8f5843] transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills Section inside Bento Box 1 */}
          <div className="mt-6 pt-5 border-t border-[#c5b4a5]/60">
            <div className="flex items-center gap-2 mb-3">
              <HeartHandshake className="w-4 h-4 text-[#8f5843]" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#8f5843]">
                {content.softSkillsTitle[lang]}
              </h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {content.softSkills.map((soft, sIdx) => (
                <span
                  key={sIdx}
                  className="bg-[#f7f5f0] text-[#2b211e] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#c5b4a5] hover:border-[#8f5843] transition-colors"
                >
                  ✓ {soft[lang]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Box 2: Education, Certifications & Work Experience (span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Work Experience Card */}
          <div className="bg-[#eae4dc] border border-[#c5b4a5] rounded-[22px] p-6 shadow-md shadow-[#2b211e]/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#f7f5f0] rounded-xl border border-[#c5b4a5]">
                  <Briefcase className="w-4 h-4 text-[#8f5843]" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#8f5843]">
                  {lang === 'es' ? 'Experiencia Laboral' : 'Work Experience'}
                </h3>
              </div>
            </div>

            {experience.map((exp, expIdx) => (
              <div
                key={expIdx}
                className="p-4 bg-[#f7f5f0] rounded-xl border border-[#c5b4a5]"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-bold text-sm text-[#2b211e]">{exp.role[lang]}</h4>
                </div>
                <div className="text-xs font-semibold text-[#8f5843] mb-1">{exp.company}</div>
                <div className="text-[11px] font-mono text-[#5c4b45] mb-2">{exp.period}</div>
                <p className="text-xs text-[#5c4b45] leading-relaxed mb-3">
                  {exp.description[lang]}
                </p>
                <div className="flex flex-wrap gap-1">
                  {exp.tags.map((t, tidx) => (
                    <span
                      key={tidx}
                      className="bg-[#eae4dc] text-[10px] font-semibold text-[#5c4b45] px-2 py-0.5 rounded border border-[#c5b4a5]/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education & Courses Card */}
          <div className="bg-[#eae4dc] border border-[#c5b4a5] rounded-[22px] p-6 shadow-md shadow-[#2b211e]/5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#f7f5f0] rounded-xl border border-[#c5b4a5]">
                    <GraduationCap className="w-4 h-4 text-[#8f5843]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#8f5843]">
                    {content.educationTitle[lang]}
                  </h3>
                </div>
              </div>

              {/* Degrees */}
              <div className="space-y-3 mb-4">
                {content.educationList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#f7f5f0] rounded-xl border border-[#c5b4a5] hover:border-[#8f5843] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-bold text-xs sm:text-sm text-[#2b211e]">
                        {item.degree[lang]}
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-[#8f5843] bg-[#eae4dc] px-2 py-0.5 rounded border border-[#c5b4a5] shrink-0">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-[#5c4b45] mb-1">{item.institution}</p>

                    <div className="flex items-center gap-1.5 text-[11px] text-[#8f5843] font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Courses */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-[#8f5843] uppercase tracking-wider block">
                  {lang === 'es' ? 'Cursos Técnicos Certificados' : 'Certified Technical Courses'}
                </span>
                {content.coursesList.map((course, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 bg-[#f7f5f0] rounded-xl border border-[#c5b4a5] text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-[#2b211e]">{course.title}</strong>
                      <span className="text-[10px] font-mono text-[#8f5843] bg-[#eae4dc] px-1.5 py-0.5 rounded">
                        {course.period}
                      </span>
                    </div>
                    <p className="text-[#5c4b45] text-[11px] mt-1">{course.details[lang]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages footer */}
            <div className="mt-5 pt-3 border-t border-[#c5b4a5]/60 text-xs text-[#5c4b45] flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-[#2b211e]">
                {lang === 'es' ? 'Idiomas:' : 'Languages:'}
              </span>
              <div className="flex gap-2">
                <span className="font-bold text-[#2b211e] bg-[#f7f5f0] px-2 py-0.5 rounded-full border border-[#c5b4a5]">
                  Inglés C1
                </span>
                <span className="font-bold text-[#2b211e] bg-[#f7f5f0] px-2 py-0.5 rounded-full border border-[#c5b4a5]">
                  Francés A1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
