import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useActiveSection } from '@/context/ActiveSectionContext';
import portfolioData from '@/data/portfolio.json';

const Footer = () => {
  const { language } = useLanguage();
  const { activeSection } = useActiveSection();
  const { profile, nav } = portfolioData;

  const navItems = nav[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (key: string) => activeSection === key;

  return (
    <footer className="py-12 border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-2 md:gap-3">
            {Object.entries(navItems).map(([key, label]) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive(key)
                    ? 'bg-gradient-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={`mailto:${profile.email}`}
              className="p-3 rounded-full glass hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-primary" />

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} {profile.name}. {language === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
