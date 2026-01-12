import { useLanguage } from '@/contexts/LanguageContext';

interface FooterProps {
  name: string;
}

export function Footer({ name }: FooterProps) {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {year} {name}. {lang === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
        </p>
      </div>
    </footer>
  );
}
