import { Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExperienceProps {
  experience: Array<{
    role: { en: string; fr: string };
    company: string;
    date: { en: string; fr: string };
    description: { en: string; fr: string };
    tasks: { en: string[]; fr: string[] };
  }>;
  education: Array<{
    degree: { en: string; fr: string };
    school: string;
    year: string;
    description: { en: string; fr: string };
  }>;
  sections: {
    en: Record<string, string>;
    fr: Record<string, string>;
  };
}

export function Experience({ experience, education, sections }: ExperienceProps) {
  const { lang, t } = useLanguage();
  const sectionLabels = sections[lang];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience Column */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
              <Briefcase className="text-primary" size={28} />
              <span className="gradient-text">{sectionLabels.experienceTitle}</span>
            </h2>
            
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div 
                  key={index} 
                  className="relative pl-8 border-l-2 border-primary/30 pb-8 last:pb-0"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <div className="text-sm text-primary mb-1">{t(exp.date)}</div>
                  <h3 className="text-lg font-semibold mb-1">{t(exp.role)}</h3>
                  <div className="text-muted-foreground mb-3">{exp.company}</div>
                  <p className="text-sm text-muted-foreground mb-3">{t(exp.description)}</p>
                  <ul className="space-y-1">
                    {exp.tasks[lang].map((task, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-secondary" size={28} />
              <span className="gradient-text">{sectionLabels.educationTitle}</span>
            </h2>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div 
                  key={index} 
                  className="relative pl-8 border-l-2 border-secondary/30 pb-8 last:pb-0"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-secondary" />
                  <div className="text-sm text-secondary mb-1">{edu.year}</div>
                  <h3 className="text-lg font-semibold mb-1">{t(edu.degree)}</h3>
                  <div className="text-muted-foreground mb-2">{edu.school}</div>
                  <p className="text-sm text-muted-foreground">{t(edu.description)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
