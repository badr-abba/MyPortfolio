import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import portfolioData from '@/data/portfolio.json';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const { language, t } = useLanguage();
  const { profile, hero, sections } = portfolioData;
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const typingTexts = hero.typingText[language];

  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex];
    // Slower typing for more "premium" feel
    const typeSpeed = isDeleting ? 40 : 100;
    const pauseTime = isDeleting ? 400 : 2500;

    if (!isDeleting && displayText === currentFullText) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentFullText.substring(0, displayText.length - 1)
          : currentFullText.substring(0, displayText.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, typingTexts]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-subtle" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-warning/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-semibold mb-3 md:mb-4 text-lg"
            >
              {language === 'en' ? "Hello, I'm" : 'Bonjour, je suis'}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 md:mb-6"
            >
              <span className="text-gradient animate-gradient">{profile.name}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-4 md:mb-6"
            >
              {t(profile.role)}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="h-16 md:h-20 flex items-center justify-center lg:justify-start mb-6 md:mb-8"
            >
              <p className="text-base md:text-lg lg:text-xl font-medium">
                <span className="typing-cursor">{displayText}</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <Button variant="gradient" size="lg" className="gap-2 shadow-lg shadow-primary/25" asChild>
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" download>
                  <Download className="w-4 h-4" />
                  {t(sections[language].downloadCV)}
                </a>
              </Button>

              <div className="flex gap-2 md:gap-3">
                <Button variant="glass" size="icon" className="hover:bg-primary/10 hover:border-primary/50 transition-all duration-300" asChild>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="glass" size="icon" className="hover:bg-primary/10 hover:border-primary/50 transition-all duration-300" asChild>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="glass" size="icon" className="hover:bg-primary/10 hover:border-primary/50 transition-all duration-300" asChild>
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute inset-[-20px] rounded-full border-2 border-dashed border-primary/20 animate-rotate-slow" />
              <div className="absolute inset-[-40px] rounded-full border border-accent/10" />

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-30 animate-pulse-glow" />

              {/* Profile image container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden gradient-border">
                {!imageError ? (
                  <img
                    src={profile.photoUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
              </div>

              {/* Open to Work Badge - Top of profile image */}
              {profile.openToWork && profile.openToWorkMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                >
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 dark:bg-green-500/20 backdrop-blur-md border border-green-600/30 dark:border-green-400/30 text-green-700 dark:text-green-300 shadow-xl shadow-green-500/10 font-bold tracking-wide">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 dark:bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600 dark:bg-green-400"></span>
                    </span>
                    <span className="text-sm whitespace-nowrap uppercase">{t(profile.openToWorkMessage)}</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-sm font-medium hidden md:block">{language === 'en' ? 'Scroll Down' : 'Défiler'}</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-current rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
