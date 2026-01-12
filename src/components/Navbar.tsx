import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useActiveSection } from '@/context/ActiveSectionContext';
import portfolioData from '@/data/portfolio.json';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { activeSection } = useActiveSection();

  const navItems = portfolioData.nav[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const isActive = (key: string) => activeSection === key;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'glass py-3 shadow-lg shadow-primary/5' : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-xl md:text-2xl font-display font-bold text-gradient"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          BA.
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {Object.entries(navItems).map(([key, label]) => (
            <button
              key={key}
              onClick={() => scrollToSection(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${isActive(key)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {label}
              {isActive(key) && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-primary/10 rounded-full border border-primary/30"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Theme & Language Toggle */}
        <div className="flex items-center gap-2 md:gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="p-2.5 rounded-full glass hover:bg-secondary transition-all duration-300 border border-border/50"
          >
            <Globe className="w-4 h-4 md:w-5 md:h-5" />
            <span className="sr-only">Toggle Language</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-full glass hover:bg-secondary transition-all duration-300 border border-border/50"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4 h-4 md:w-5 md:h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-4 h-4 md:w-5 md:h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full glass border border-border/50 z-50"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden border border-border/50 shadow-2xl overflow-y-auto max-h-[80vh] bg-card/95 backdrop-blur-3xl"
          >
            <div className="p-4 flex flex-col gap-1">
              {Object.entries(navItems).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`text-left py-3 px-4 rounded-xl transition-all duration-300 font-medium ${isActive(key)
                      ? 'bg-primary/10 text-primary border border-primary/30'
                      : 'hover:bg-accent/10 hover:pl-6'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
