import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ActiveSectionProvider } from '@/context/ActiveSectionContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ActiveSectionProvider>
          <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Education />
            <Projects />
            <Certifications />
            <Contact />
            <Footer />
          </div>
        </ActiveSectionProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
