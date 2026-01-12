import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  nav: {
    en: Record<string, string>;
    fr: Record<string, string>;
  };
  name: string;
}

export function Navbar({ nav, name }: NavbarProps) {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = nav[lang];
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);

  const navLinks = [
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'experience', href: '#experience' },
    { key: 'projects', href: '#projects' },
    { key: 'certifications', href: '#certifications' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="text-xl font-bold gradient-text">
            {initials}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="nav-link text-sm font-medium"
              >
                {navItems[link.key]}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Toggle */}
            <div className="flex items-center rounded-full border border-border overflow-hidden">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  lang === 'en' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  lang === 'fr' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                FR
              </button>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              size="sm"
              className="hidden md:inline-flex bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <a href="#contact">{lang === 'en' ? 'Get in Touch' : 'Me Contacter'}</a>
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="nav-link text-sm font-medium py-2"
                >
                  {navItems[link.key]}
                </a>
              ))}
              <Button
                asChild
                className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-2"
              >
                <a href="#contact" onClick={() => setIsOpen(false)}>
                  {lang === 'en' ? 'Get in Touch' : 'Me Contacter'}
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}