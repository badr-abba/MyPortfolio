import { useEffect, useState } from 'react';
import { MapPin, Download, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroProps {
  profile: {
    name: string;
    role: { en: string; fr: string };
    bio: { en: string; fr: string };
    location: string;
    linkedin: string;
    github: string;
    email: string;
    photoUrl: string;
    resumeUrl: string;
    openToWork: boolean;
    openToWorkMessage: { en: string; fr: string };
  };
  typingTexts: { en: string[]; fr: string[] };
}

export function Hero({ profile, typingTexts }: HeroProps) {
  const { lang, t } = useLanguage();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = typingTexts[lang];

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    const typingSpeed = isDeleting ? 30 : 50;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex, texts]);

  // Reset typing when language changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentTextIndex(0);
    setIsDeleting(false);
  }, [lang]);

  const firstName = profile.name.split(' ')[1] || profile.name.split(' ')[0];

  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-muted">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&size=320&background=1e293b&color=22d3ee`;
                }}
              />
            </div>
            {profile.openToWork && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 open-to-work whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {t(profile.openToWorkMessage)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="text-center lg:text-left flex-1">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 border border-border/50 px-4 py-2 mb-6">
              <MapPin size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">{profile.location}</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {lang === 'en' ? "Hi, I'm " : "Salut, je suis "}
              <span className="gradient-text">{firstName}</span>
            </h1>

            {/* Role */}
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-4">
              {t(profile.role)}
            </h2>

            {/* Typing Animation */}
            <p className="text-lg text-muted-foreground mb-8 h-8">
              {displayedText}
              <span className="typing-cursor" />
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
              >
                <a href="#projects">
                  {lang === 'en' ? 'View Projects' : 'Voir Projets'}
                  <ArrowRight size={18} className="ml-2" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-muted-foreground/30 hover:border-foreground"
              >
                <a href={profile.resumeUrl} download>
                  <Download size={18} className="mr-2" />
                  {lang === 'en' ? 'Download CV' : 'Télécharger CV'}
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden lg:flex flex-col items-center mt-16 text-muted-foreground">
          <span className="text-sm mb-2">{lang === 'en' ? 'Learn more' : 'En savoir plus'}</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
