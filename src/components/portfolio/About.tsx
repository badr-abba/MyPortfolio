import { useLanguage } from '@/contexts/LanguageContext';

interface AboutProps {
  bio: { en: string; fr: string };
  sections: {
    en: Record<string, string>;
    fr: Record<string, string>;
  };
}

export function About({ bio, sections }: AboutProps) {
  const { lang, t } = useLanguage();
  const sectionLabels = sections[lang];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          <span className="gradient-text">{sectionLabels.aboutTitle}</span>
        </h2>
        <div className="section-underline mb-12" />

        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground text-center leading-relaxed">
            {t(bio)}
          </p>
        </div>
      </div>
    </section>
  );
}
