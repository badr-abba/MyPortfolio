import { ExternalLink, Github, Database, Code2, Shield, ShieldCheck, Server, LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CertificationsProps {
  certifications: Array<{
    name: string;
    issuer: string;
    date: string | { en: string; fr: string };
    link: string;
    icon: string;
  }>;
  sections: {
    en: Record<string, string>;
    fr: Record<string, string>;
  };
}

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  database: Database,
  code: Code2,
  shield: Shield,
  'shield-check': ShieldCheck,
  server: Server,
};

export function Certifications({ certifications, sections }: CertificationsProps) {
  const { lang } = useLanguage();
  const sectionLabels = sections[lang];

  const getDate = (date: string | { en: string; fr: string }) => {
    if (typeof date === 'string') return date;
    return date[lang];
  };

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          <span className="gradient-text">{sectionLabels.certificationsTitle}</span>
        </h2>
        <div className="section-underline mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => {
            const IconComponent = iconMap[cert.icon] || Code2;
            
            return (
              <a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="certification-card group"
              >
                <div className="icon-gradient w-12 h-12 flex-shrink-0">
                  <IconComponent size={24} className="text-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-primary">{getDate(cert.date)}</p>
                </div>
                <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
