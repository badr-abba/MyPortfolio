import { usePortfolioData } from '@/hooks/usePortfolioData';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Skills } from '@/components/portfolio/Skills';
import { Experience } from '@/components/portfolio/Experience';
import { Projects } from '@/components/portfolio/Projects';
import { Certifications } from '@/components/portfolio/Certifications';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';

const Index = () => {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error Loading Portfolio</h1>
          <p className="text-muted-foreground">{error || 'Failed to load data'}</p>
        </div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar nav={data.nav} name={data.profile.name} />
        <Hero profile={data.profile} typingTexts={data.hero.typingText} />
        <About bio={data.profile.bio} sections={data.sections} />
        <Skills skills={data.skills} sections={data.sections} />
        <Experience 
          experience={data.experience} 
          education={data.education} 
          sections={data.sections} 
        />
        <Projects projects={data.projects} sections={data.sections} />
        <Certifications certifications={data.certifications} sections={data.sections} />
        <Contact profile={data.profile} sections={data.sections} />
        <Footer name={data.profile.name} />
      </div>
    </LanguageProvider>
  );
};

export default Index;
