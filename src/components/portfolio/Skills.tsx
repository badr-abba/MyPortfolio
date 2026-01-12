import { Code2, Database, BarChart3, GitBranch, Cloud, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SkillsProps {
  skills: {
    programming: string[];
    databases: string[];
    bigdata: string[];
    devops: string[];
    cloud: string[];
    soft: { en: string[]; fr: string[] };
  };
  sections: {
    en: Record<string, string>;
    fr: Record<string, string>;
  };
}

export function Skills({ skills, sections }: SkillsProps) {
  const { lang } = useLanguage();
  const sectionLabels = sections[lang];

  const skillCategories = [
    {
      key: 'programming',
      title: sectionLabels.programming,
      skills: skills.programming,
      icon: Code2,
      cardClass: 'skill-card-blue',
      iconClass: 'icon-bg-blue',
    },
    {
      key: 'databases',
      title: sectionLabels.databases,
      skills: skills.databases,
      icon: Database,
      cardClass: 'skill-card-teal',
      iconClass: 'icon-bg-teal',
    },
    {
      key: 'bigdata',
      title: sectionLabels.bigdata,
      skills: skills.bigdata,
      icon: BarChart3,
      cardClass: 'skill-card-purple',
      iconClass: 'icon-bg-purple',
    },
    {
      key: 'devops',
      title: sectionLabels.devops,
      skills: skills.devops,
      icon: GitBranch,
      cardClass: 'skill-card-green',
      iconClass: 'icon-bg-green',
    },
    {
      key: 'cloud',
      title: sectionLabels.cloud,
      skills: skills.cloud,
      icon: Cloud,
      cardClass: 'skill-card-teal',
      iconClass: 'icon-bg-teal',
    },
    {
      key: 'soft',
      title: sectionLabels.softSkills,
      skills: skills.soft[lang],
      icon: Users,
      cardClass: 'skill-card-pink',
      iconClass: 'icon-bg-pink',
    },
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          <span className="gradient-text">{sectionLabels.skillsTitle}</span>
        </h2>
        <div className="section-underline mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div key={category.key} className={`skill-card ${category.cardClass}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${category.iconClass}`}>
                  <category.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="badge-skill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}